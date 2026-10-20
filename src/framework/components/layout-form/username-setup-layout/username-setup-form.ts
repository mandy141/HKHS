import { Component, Input, ViewChild } from '@angular/core';
import { NavParams, IonicPage, Slides, Events, ViewController } from 'ionic-angular';
import { ApiRequestService }    from '../../../services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { ApiResultModel } from '../../../models/dynamic-form-model/api-result-model';
import { UserBaseModel } from '../../../models/user-base-model';
import { LocalStorageService } from '../../../services/local-storage-service';
import { ConfigService } from '../../../services/config-service';
import { OneSignal } from '@ionic-native/onesignal';
import { DeviceService } from '../../../services/device-service';
import { UserNameSetupLayoutBaseModel } from '../../../models/layout-form-model/username-setup-layout-form-base-model';

@IonicPage()
@Component({
    selector: 'username-setup-form',
    templateUrl: 'username-setup-form.html'
})

export class UserNameSetupForm {
    private data: UserNameSetupLayoutBaseModel;

    private typeUserName: string;

    private inputUsername: string;
    private sSubmitUsernameValidationMsg: string;
    private sPasscodeSentMsg: string;
    
    private isAllowResendSMS: boolean = true;
    private timeLeft: number = 0;
    private interval;

    private inputPasscode: string;
    private sSubmitPasscodeValidationMsg: string;
    private sUserNameVerifiedMsg: string;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private apiReqService : ApiRequestService, private loadingSrv: LoadingSpinnerService, 
        private events: Events, private localStorageSrv: LocalStorageService, private configSrv: ConfigService) {
            this.typeUserName = ConstantAttributes.LOGIN_ID_TYPE_EMAIL;
    }

    get ConstantAttributes() { return ConstantAttributes};  

    ngOnInit(){
        if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME))
        {
            //PENDING
            var paramObj = {};
            paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_LOAD_LAYOUT_FORM;
            paramObj[ConstantAttributes.PARAM_CRUD_MODE] = this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE);
            if(this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS))
            {
                var additionalParams : { key: string, value: string} [] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
                for(let additionalParam of additionalParams)
                {
                    paramObj[additionalParam.key] = additionalParam.value;
                }
            }

            this.apiReqService.callAPIRequest<UserNameSetupLayoutBaseModel>(paramObj, true)
            .then((_data: UserNameSetupLayoutBaseModel) => {       

                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();      

                if(_data) {                                 
                    this.data = _data;

                    //console.log(this.data);
                    if(this.data.lblPasscodeSentMsg && this.data.lblPasscodeSentMsg.length > 0)
                        this.sPasscodeSentMsg = this.data.lblPasscodeSentMsg;

                    if(this.data.lblVerifiedUsernames && this.data.lblVerifiedUsernames.length > 0)
                        this.sUserNameVerifiedMsg = this.data.lblVerifiedUsernames;
                }    
                else
                {
                    this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
                }
            }).catch(error => {        
                if(error && error.status === 401)     
                {
                    //Do Nothing
                }
                else
                    this.onBackToHome();    
            }); 
        }
        else
            this.onBackToHome();
    }

    private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }

    private getlblUserName() {
        if(this.typeUserName == ConstantAttributes.LOGIN_ID_TYPE_MOBILE)
            return this.data.lblMobile;
        else
            return this.data.lblEmail;
    }

    private onSubmitUsername() {

        if(this.typeUserName == ConstantAttributes.LOGIN_ID_TYPE_MOBILE)
        {
            //Validate Mobile No.
            var rePhone = new RegExp(this.data.validatePhoneNoPattern);
            if(!rePhone.test(this.inputUsername.trim())) {                
                this.sSubmitUsernameValidationMsg = this.data.lblInvalidPhoneNoMsg;
                return;
            }
        }
        else
        {
            //Validate Email
            var reEmail = new RegExp(this.data.validateEmailPattern);
            if(!reEmail.test(this.inputUsername.trim())) {                
                this.sSubmitUsernameValidationMsg = this.data.lblInvalidEmailMsg;
                return;
            }
        }                    

        this.sSubmitUsernameValidationMsg = null;
                
        var paramObj = {};
        paramObj[ConstantAttributes.PARAM_USERNAME] = this.inputUsername.trim();   
        if(this.typeUserName == ConstantAttributes.LOGIN_ID_TYPE_EMAIL)
        {                
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_EMAIL_SETUP;          
        }
        else
        {
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_MOBILE_SETUP;          
        }
        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER; 
                
        this.apiReqService.callAPIRequest<ApiResultModel<string>>(paramObj, true, null, true)
        .then((data: ApiResultModel<string>) => {  
            
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();

            if(data && data.result) 
            {
                this.isAllowResendSMS = false;
                this.sPasscodeSentMsg = data.result;                

                this.startTimer();
            }    
            else
            {
                this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }       
        }).catch(error => {
            this.sSubmitUsernameValidationMsg = error;                               
        });        
    }

    private startTimer() {
        clearInterval(this.interval);
        this.timeLeft = 60;
        this.isAllowResendSMS = false;

        this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.isAllowResendSMS = true;
            clearInterval(this.interval);
          }
        },1000)
    }

    private get showCounter() {
        if(this.timeLeft == 0)
            return "";
        else
            return "(" + this.timeLeft + ")";
    }

    private isAllowSubmitUsername() {
        if(this.inputUsername && this.inputUsername.trim().length > 0)
            return true;
        else
            return false;
    }

    private onSubmitPasscode() {
        this.sSubmitPasscodeValidationMsg = null;
            
        var paramObj = {};            

        paramObj[ConstantAttributes.PARAM_PASSCODE] = this.inputPasscode.trim();    
        paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_CHECK_PASSCODE_FOR_USERNAME_SETUP;
        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER;    

        this.inputPasscode = null;
        
        this.apiReqService.callAPIRequest<ApiResultModel<string>>(paramObj, true, null, true)
        .then((data: ApiResultModel<string>) => {    

            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();

            if(data && data.result) 
            {                    
                this.sUserNameVerifiedMsg = data.result;
            }       
            else
            {
                this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }    
        }).catch(error => {                
                this.sSubmitPasscodeValidationMsg = error;                                
        });
    }

    private isAllowSubmitPasscode() {
        if(this.inputPasscode && this.inputPasscode.trim().length > 0)
            return true;
        else
            return false;
    }
}