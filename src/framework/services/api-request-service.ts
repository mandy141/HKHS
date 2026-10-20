import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AlertController, Config } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { InputFormBaseModel } from '../models/dynamic-form-model/input-form-base-model';
import { InputFieldBaseModel } from '../models/dynamic-form-model/input-field-base-model';
import { ConstantAttributes } from '../attributes/constant-attributes';
import { LoadingSpinnerService } from './loading-spinner-service';
import { LocalStorageService } from './local-storage-service';
import { Events } from 'ionic-angular';
import { UserBaseModel } from '../models/user-base-model';
import { DeviceService } from './device-service';
import { ApiResultModel } from '../models/dynamic-form-model/api-result-model';
import { ConfigBaseModel } from '../models/config-base-model';
import { ConfigService } from './config-service';
import { Network } from '@ionic-native/network';
import { combineAll } from 'rxjs/operators';

export enum ConnectionStatusEnum {
    Online,
    Offline
}
@Injectable()
export class ApiRequestService {

    private connectStatus: ConnectionStatusEnum;

    constructor(private httpClient: HttpClient, private cd: ChangeDetectorRef, private loadingSrv: LoadingSpinnerService, private alertCtrl: AlertController,
        private localStorageSrv: LocalStorageService, private events: Events, private deviceSrv: DeviceService, private configSrv: ConfigService, private network: Network) {   
            this.connectStatus = ConnectionStatusEnum.Online;             
    }    

    get ConstantAttributes() { return ConstantAttributes; }   

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            this.connectStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            this.connectStatus = ConnectionStatusEnum.Online;
        });
    }
    
    getAPIConfig()
    {
        return this.httpClient.get('assets/config/config.json')
        .toPromise() 
        .then(response => {
            if(response)               
            {
                var responseModel = response as ConfigBaseModel;
                this.configSrv.API_HOST = responseModel.apiHost;
                this.configSrv.API_NAME = responseModel.apiName;
                this.configSrv.PDF_VIEWER = responseModel.pdf_viewer;
                this.configSrv.UPLOAD_FILE = responseModel.upload_file;
                this.configSrv.REQ_PROJ_CODE = responseModel.reqProjCode;
                this.configSrv.REQ_PHASE_CODE = responseModel.reqPhaseCode;
                this.configSrv.APP_VERSION = responseModel.appVersion;
                this.configSrv.APP_CODE = responseModel.appCode;
                this.configSrv.BYPASS_CLIENT_VALIDATION = responseModel.byPassClientValidation;
                return responseModel;
            }
            else
                return null;            
        })
        .catch(error => {                      
            this.handleError(error);  
        });
    }

    callAPIRequest<T>(paramObj: {}, bShowSpinner: boolean, controlsToDisable?: AbstractControl[], doNotHandlerErrorInside?: boolean): Promise<T|void> {

        //Check Network Status
        if(this.connectStatus == ConnectionStatusEnum.Offline)
        {
            this.loadingSrv.dismissAllLoading();

            let alert = this.alertCtrl.create({
                message: ConstantAttributes.GENERAL_ERROR_NETWORK_OFFLINE,
                buttons: [              
                {
                    text: 'Ok',
                    handler: () => {}
                }
                ]
            });
            alert.present();

            throw ConstantAttributes.GENERAL_ERROR_NETWORK_OFFLINE;
        }

        if(this.configSrv.API_HOST && this.configSrv.API_NAME)
        {
            let sURL = `${this.configSrv.API_HOST}/${this.configSrv.API_NAME}`;

            if(bShowSpinner)
                this.loadingSrv.createLoadingSpinner();

            this.disableControlsForAsync(controlsToDisable);

            //App & Proj Details
            paramObj[ConstantAttributes.PARAM_APP_CODE] = this.configSrv.APP_CODE;

            
            /*
            if(this.configSrv.REQ_PROJ_CODE)
            {
                paramObj[ConstantAttributes.PARAM_REQUEST_PROJ_CODE] = this.configSrv.REQ_PROJ_CODE;                
            }  
            
            if(this.configSrv.REQ_PHASE_CODE)
            {
                paramObj[ConstantAttributes.PARAM_REQUEST_PHASE_CODE] = this.configSrv.REQ_PHASE_CODE;                
            }
            */
            
           //get ProjCode
           paramObj[ConstantAttributes.PARAM_REQUEST_PROJ_CODE] = this.localStorageSrv.getProj();

           //get PhaseCode
           paramObj[ConstantAttributes.PARAM_REQUEST_PHASE_CODE] = this.localStorageSrv.getPhase();

            //Get Lang & JWT from local storage
            paramObj[ConstantAttributes.PARAM_LANG] = this.localStorageSrv.getLang();
            
            //Screen Size
            paramObj[ConstantAttributes.PARAM_SCREEN_SIZE] = this.deviceSrv.getScreenSize();

            //Platform
            paramObj[ConstantAttributes.PARAM_PLATFORM] = this.deviceSrv.getPlatform();
            //console.log('sURL='+ sURL);
            //console.log(paramObj);
            return this.httpClient.post(sURL, paramObj, {})
                .toPromise()
                .then(response => {
                    if(bShowSpinner)
                        this.loadingSrv.dismissLoading();

                    this.enableControlsForAsync(controlsToDisable);                
                    
                    var responseModel = response as T;                              

                    this.refreshUser(responseModel[ConstantAttributes.RESPONSE_USER_IDENTITY], paramObj[ConstantAttributes.PARAM_REQUEST_TYPE], paramObj[ConstantAttributes.PARAM_ENTITY_NAME]);

                    return responseModel;
                })
                .catch(error => {
                    //console.log('error no token');
                    //console.log(error);
                    this.loadingSrv.dismissAllLoading();
                    this.enableControlsForAsync(controlsToDisable); 

                    if(error && error.status === 401)
                    {
                        throw error;
                    }
                    else
                    {
                        if(doNotHandlerErrorInside)
                            throw error;            
                        else
                            this.handleError(error);
                    }
                }); 
        }
        else
        {
            this.loadingSrv.dismissAllLoading();
            this.enableControlsForAsync(controlsToDisable);
            return new Promise(null);
        }              
    }   

    private refreshUser(userIdentity: UserBaseModel, requestType: string, entityName: string)
    {
        if(userIdentity && userIdentity.token)
        {
            //console.log('check requestType = '+requestType)
            if( requestType == ConstantAttributes.API_REQUEST_TYPE_LOAD_APP || 
                requestType == ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_REGISTRATION ||
                requestType == ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_RESET_PASSWORD ||
                requestType == ConstantAttributes.API_REQUEST_TYPE_CHECK_PASSCODE || 
                requestType == ConstantAttributes.API_REQUEST_TYPE_RESET_PASSWORD)
            {
                return false;
            }            
            else
            {
                this.localStorageSrv.setUser(userIdentity); 
                return true;    
            }
        }   
    }    
    
    //MISC
    

    private disableControlsForAsync(formControls: AbstractControl[])
    {
        if(formControls)
        {
            for(let formControl of formControls)
            {
                var inputFieldModel = formControl['fieldModel'] as InputFieldBaseModel;      
                this.recursiveEnableDisableModelForAsync(inputFieldModel, true);
            }
        }
    }

    private enableControlsForAsync(formControls: AbstractControl[])
    {
        if(formControls)
        {
            for(let formControl of formControls)
            {
                var inputFieldModel = formControl['fieldModel'] as InputFieldBaseModel;                
                this.recursiveEnableDisableModelForAsync(inputFieldModel, false);
            }
        }
    }    

    private recursiveEnableDisableModelForAsync(targetInputFieldModel: InputFieldBaseModel, isDisable: boolean)
    {
        if(targetInputFieldModel.asyncProcessCnt == null)
            targetInputFieldModel.asyncProcessCnt = 0;

        if(isDisable)
            targetInputFieldModel.asyncProcessCnt ++;
        else
            targetInputFieldModel.asyncProcessCnt --;

        this.cd.detectChanges();
        
        //Field Group Case
        if(targetInputFieldModel.fieldgroupFormModel && targetInputFieldModel.fieldgroupFormModel.inputFieldModels)
        {
            for(let inputField of targetInputFieldModel.fieldgroupFormModel.inputFieldModels)
            {
                this.recursiveEnableDisableModelForAsync(inputField, isDisable);
            }
        }

        //Sub Form Case
        if(targetInputFieldModel.inputFormModels)
        {
            for(let subForm of targetInputFieldModel.inputFormModels)
            {
                for(let inputField of subForm.inputFieldModels)
                {
                    this.recursiveEnableDisableModelForAsync(inputField, isDisable);
                }
            }
        }
    }    

    public handleError(error: any): Promise<any> {

        var errorDispMsg = "";

        if(error)
        {
            errorDispMsg =  error;            

            let alert = this.alertCtrl.create({
                //title:  ConstantAttributes.GENERAL_ERROR_SERVER_MSG_TITLE,
                message: errorDispMsg,
                buttons: [              
                {
                    text: 'Ok',
                    handler: () => {}
                }
                ]
            });
            alert.present();
        }

        throw errorDispMsg;
    }       
}