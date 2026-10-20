import { Component, Input, ViewChild } from '@angular/core';
import { NavParams, IonicPage, Slides, Events, ViewController } from 'ionic-angular';
import { ApiRequestService }    from '../../../services/api-request-service';
import { UserMaintLayoutBaseModel } from '../../../models/layout-form-model/user-maint-layout-form-base-model';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { ApiResultModel } from '../../../models/dynamic-form-model/api-result-model';
import { UserBaseModel } from '../../../models/user-base-model';
import { LocalStorageService } from '../../../services/local-storage-service';
import { ConfigService } from '../../../services/config-service';
//import { OneSignal, OneSignalOriginal } from '@ionic-native/onesignal';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin';
import { DeviceService } from '../../../services/device-service';

@IonicPage()
@Component({
    selector: 'user-maint-form',
    templateUrl: 'user-maint-form.html'
})

export class UserMaintForm {

    private data: UserMaintLayoutBaseModel;
    private currentStep: number = 1;
    
    //Step 1
    private inputUserName: string;
    private inputPhoneNo: string;
    private inputCountryCode: string;
    private sStep01ValidationMsg: string;

    //Step 2
    private sPasscodeSentTime: string;
    private inputPasscode: string;    
    private sPasscodeResentMsg: string;
    private sStep02ValidationMsg: string;
    private isAllowResendSMS: boolean = false;
    private timeLeft: number = 60;
    private interval;

    //Step 3
    private resetPasswordUserIdentity: UserBaseModel;
    private inputPassword: string;
    private inputConfirmPassword: string;
    private inputOldPassword: string;
    private sStep03ValidationMsg: string;    

    //Step 4
    private newUserIdentity: UserBaseModel;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private apiReqService : ApiRequestService, private loadingSrv: LoadingSpinnerService, 
        private events: Events, private localStorageSrv: LocalStorageService, private configSrv: ConfigService, private oneSignal: OneSignalPlugin, private deviceSrv: DeviceService) {
    }

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

            this.apiReqService.callAPIRequest<UserMaintLayoutBaseModel>(paramObj, true)
            .then((_data: UserMaintLayoutBaseModel) => {       

                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();      

                if(_data) {                     
            
                    this.data = _data;

                    //Set Default Country Code
                    this.inputCountryCode = this.configSrv.DEFAULT_COUNTRY_CODE;        
                    
                    //Set Starting Step
                    if(this.isChangePassword)
                        this.currentStep = 3;
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

    /*private get isForgotPassword() {        
        if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_FORGOT_PASSWORD)
            return true;
        else
            return false;
    }*/

    private get isChangePassword() {
        if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_CHANGE_PASSWORD)
            return true;
        else
            return false;
    }    

    private loginWithName() {
        if(this.data.loginIDType == ConstantAttributes.LOGIN_ID_TYPE_NAME)
            return true;
        else
            return false;
      }
    
    private authWithName() {
        if(this.data.authMode == ConstantAttributes.LOGIN_ID_TYPE_NAME)
            return true;
        else
            return false;
      }
          
    private get inputPhoneNoDesc() {
        if(this.authWithName())
            return this.inputUserName;
        else
            return '+' + this.inputCountryCode + " " + this.inputPhoneNo;
    }

    private isAllowNextStep() {
        switch(this.currentStep) {
            case 1:
                if(this.authWithName())
                {
                    if(this.inputUserName && this.inputUserName.trim().length > 0)
                        return true;
                    else
                        return false;
                }
                else
                {
                    if(this.inputCountryCode && this.inputPhoneNo &&
                        this.inputCountryCode.trim().length > 0 && this.inputPhoneNo.trim().length > 0)
                    {
                        if(this.loginWithName())
                        {
                            if(this.inputUserName && this.inputUserName.trim().length > 0)
                                return true;
                            else
                                return false;
                        }
                        else
                            return true;
                    }
                    else
                    {
                        return false;                
                    }
                }
            case 2:
                if(this.inputPasscode && this.inputPasscode.trim().length > 0)
                {
                    return true;
                }
                else
                {
                    return false;                
                }
            case 3:
                if(this.inputPassword && this.inputConfirmPassword && this.inputConfirmPassword &&
                    this.inputPassword.trim().length > 0 && this.inputConfirmPassword.trim().length > 0
                    && this.inputConfirmPassword.trim().length > 0)
                {
                    return true;
                }
                else
                {
                    return false;                
                }
            default:
                return false;
        }
    }

    private onNextStep() {
            switch(this.currentStep) {
                case 1:
                    this.onSendSMS();
                    break;
                case 2:
                    this.onCheckPasscode();
                    break;
                case 3:
                    this.onResetPassword();
                    break;
                default:
                    break;
            }
    }

    private onSendSMS() {

        if(!this.authWithName())
        {
            if(!(this.inputCountryCode && this.inputPhoneNo &&
                this.inputCountryCode.trim().length > 0 && this.inputPhoneNo.trim().length > 0))
            {
                if(this.currentStep == 1)
                    this.sStep01ValidationMsg = this.data.lblMandatoryPhoneNoMsg;
                else if(this.currentStep == 2)
                    this.sStep02ValidationMsg = this.data.lblMandatoryPhoneNoMsg;

                return;
            }
            else
            {
                //Validate Phone No. & CountryCode
                var rePhone = new RegExp(this.data.validatePhoneNoPattern);
                var reCountryCode = new RegExp(this.data.validateCountryCodePattern);
                if(!reCountryCode.test(this.inputCountryCode.trim()) || !rePhone.test(this.inputPhoneNo.trim())) {
                    if(this.currentStep == 1)
                        this.sStep01ValidationMsg = this.data.lblInvalidPhoneNoMsg;
                    else if(this.currentStep == 2)
                        this.sStep02ValidationMsg = this.data.lblInvalidPhoneNoMsg;

                    return;
                }
            }
        }
        
        if(this.loginWithName() || this.authWithName())
        {
            if(!this.inputUserName || this.inputUserName.trim().length == 0)
            {
                if(this.currentStep == 1)
                    this.sStep01ValidationMsg = this.data.lblMandatoryUserNameMsg;
                else if(this.currentStep == 2)
                    this.sStep02ValidationMsg = this.data.lblMandatoryUserNameMsg;
                
                return;
            }
            else
            {
                //Validate User Name
                var reUserName = new RegExp(this.data.validateUserNamePattern);
                if(!reUserName.test(this.inputUserName.trim())) {
                    if(this.currentStep == 1)
                        this.sStep01ValidationMsg = this.data.lblInvalidUserNameMsg;
                    else if(this.currentStep == 2)
                        this.sStep02ValidationMsg = this.data.lblInvalidUserNameMsg;

                    return;
                }
            }
        }            

        if(this.currentStep == 1)
        {
            this.sStep01ValidationMsg = null;
        }
        else if(this.currentStep == 2)
        {
            this.sPasscodeResentMsg = null;
            this.sStep02ValidationMsg = null;
        }
                
        var paramObj = {};
        if(this.loginWithName() || this.authWithName())
            paramObj[ConstantAttributes.PARAM_USERNAME] = this.inputUserName.trim();           

        if(!this.authWithName())
        {
            paramObj[ConstantAttributes.PARAM_PHONE_NO_PREFIX] = this.inputCountryCode.trim(); 
            paramObj[ConstantAttributes.PARAM_PHONE_NO] = this.inputPhoneNo.trim();         
        }

        if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_FORGOT_PASSWORD)          
        {                    
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_RESET_PASSWORD;
        }
        else if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_USER_REGISTRATION)              
        {                
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_REGISTRATION;  
        }

        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER; 
                
        this.apiReqService.callAPIRequest<ApiResultModel<string>>(paramObj, true, null, true)
        .then((data: ApiResultModel<string>) => {  
            
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();

            if(data && data.result) 
            {
                this.isAllowResendSMS = false;

                if(this.currentStep == 1)
                {
                    this.sPasscodeSentTime = data.result;
                    this.currentStep = 2;
                }
                else if(this.currentStep == 2)
                {
                    this.sPasscodeResentMsg = this.data.lblResendPasscodeMsg + "(" + data.result + ")";
                }

                this.startTimer();
            }    
            else
            {
                this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }       
        }).catch(error => {
            if(this.currentStep == 1)
                this.sStep01ValidationMsg = error;
            else
                this.sStep02ValidationMsg = error;                               
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

    private onCheckPasscode()
    {
        if(this.inputPasscode && this.inputPasscode.trim().length > 0)
        {
            if(!this.authWithName())
            {
                if(!(this.inputCountryCode && this.inputPhoneNo &&
                    this.inputCountryCode.trim().length > 0 && this.inputPhoneNo.trim().length > 0))
                {
                    this.sStep02ValidationMsg = this.data.lblMandatoryPhoneNoMsg;
                    return;
                }
                else
                {
                    //Validate Phone No. & CountryCode
                    var rePhone = new RegExp(this.data.validatePhoneNoPattern);
                    var reCountryCode = new RegExp(this.data.validateCountryCodePattern);
                    if(!reCountryCode.test(this.inputCountryCode.trim()) || !rePhone.test(this.inputPhoneNo.trim())) {
                        this.sStep02ValidationMsg = this.data.lblInvalidPhoneNoMsg;
                        return;
                    }
                }
            }
            
            if(this.loginWithName() || this.authWithName())
            {
                if(!this.inputUserName || this.inputUserName.trim().length == 0)
                {
                    this.sStep02ValidationMsg = this.data.lblMandatoryUserNameMsg;                    
                    return;
                }
                else
                {
                    //Validate User Name
                    var reUserName = new RegExp(this.data.validateUserNamePattern);
                    if(!reUserName.test(this.inputUserName.trim())) {
                        this.sStep02ValidationMsg = this.data.lblInvalidUserNameMsg;
                        return;
                    }
                }
            }            

            this.sPasscodeResentMsg = null;
            this.sStep02ValidationMsg = null;
            
            var paramObj = {};
            if(this.loginWithName() || this.authWithName())
                paramObj[ConstantAttributes.PARAM_USERNAME] = this.inputUserName;
            
            if(!this.authWithName())
            {
                paramObj[ConstantAttributes.PARAM_PHONE_NO_PREFIX] = this.inputCountryCode.trim();                        
                paramObj[ConstantAttributes.PARAM_PHONE_NO] = this.inputPhoneNo.trim();     
            }

            paramObj[ConstantAttributes.PARAM_PASSCODE] = this.inputPasscode.trim();    
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_CHECK_PASSCODE;
            paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER;    

            if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_FORGOT_PASSWORD)          
            {                    
                paramObj[ConstantAttributes.PARAM_PASSCODE_FOR] = ConstantAttributes.PASSCODE_FOR_RESET_PWD;
            }
            else if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_USER_REGISTRATION)              
            {                
                paramObj[ConstantAttributes.PARAM_PASSCODE_FOR] = ConstantAttributes.PASSCODE_FOR_NEW_REG;  
            }

            this.inputPasscode = null;
            
            this.apiReqService.callAPIRequest<ApiResultModel<boolean>>(paramObj, true, null, true)
            .then((data: ApiResultModel<boolean>) => {    

                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();

                if(data && data.result && data.userIdentity) 
                {                    
                    this.resetPasswordUserIdentity = data.userIdentity;
                    this.currentStep = 3;
                }       
                else
                {
                    this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
                }    
            }).catch(error => {                
                    this.sStep02ValidationMsg = error;                                
            });
        }
        else
        {
            this.sStep02ValidationMsg = this.data.lblMandatoryPasscodeMsg;
        }
    }

    private onResetPassword()
    {
        if(this.inputPassword && this.inputConfirmPassword && this.inputOldPassword &&
            this.inputPassword.trim().length > 0 && this.inputConfirmPassword.trim().length > 0 &&
            this.inputOldPassword.trim().length > 0 &&
            this.inputPassword.trim() == this.inputConfirmPassword.trim())
        {

            //Validate Password Format
            var re = new RegExp(this.data.validatePasswordPattern)
            if(!re.test(this.inputPassword.trim())) {
                this.sStep03ValidationMsg = this.data.lblInvalidPasswordMsg;
                return;
            }

            this.sStep03ValidationMsg = null;
            
            var paramObj = {};
            
            if(!this.isChangePassword)
                paramObj[ConstantAttributes.PARAM_RESET_PASSWORD_USER_IDENTITY] = this.resetPasswordUserIdentity;                         

            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_RESET_PASSWORD;
            paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER;
            paramObj[ConstantAttributes.PARAM_CRUD_MODE] = ConstantAttributes.CRUD_MODE_UPDATE
            paramObj[ConstantAttributes.PARAM_NEW_PASSWORD] = this.inputPassword.trim();  
            paramObj[ConstantAttributes.PARAM_CONFIRM_PASSWORD] = this.inputConfirmPassword.trim();  
            paramObj[ConstantAttributes.PARAM_OLD_PASSWORD] = this.inputOldPassword.trim();

            this.inputPassword = null;
            this.inputConfirmPassword = null;

            if(this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_ANDROID ||
                this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS)
            {
                /*
                this.oneSignal.getIds().then((id) => {            
                    paramObj[ConstantAttributes.PARAM_NOTIFICATION_PLAYER_ID] = id.userId;
                    this.coreResetPassword(paramObj);
                });
                */
                var self = this;
                this.oneSignal.getDeviceState(function (stateChanges) {
                    //console.log("login osid = " + stateChanges.userId);
                    paramObj[ConstantAttributes.PARAM_NOTIFICATION_PLAYER_ID] = stateChanges.userId;
                    //console.log(JSON.stringify(paramObj));
                    self.coreResetPassword(paramObj);
                });
            }
            else
            {
                this.coreResetPassword(paramObj);
            }
        }    
        else
        {
            this.sStep03ValidationMsg = this.data.lblMandatoryPasswordMsg;
        }    
    }

    private coreResetPassword(paramObj)
    {
        this.apiReqService.callAPIRequest<ApiResultModel<boolean>>(paramObj, true, null, true)
            .then((data: ApiResultModel<boolean>) => {    

                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();

                if(data && data.result && data.userIdentity) 
                {  
                    if(this.isChangePassword)                  
                        this.localStorageSrv.setUser(data.userIdentity);     
                    else
                        this.newUserIdentity = data.userIdentity;
                    
                    this.currentStep = 4;
                } 
                else
                {
                    this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
                }          
            }).catch(error => {
                this.sStep03ValidationMsg = error;                                
            });
    }

    private onFinished() {
        if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_USER_REGISTRATION ||
        this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME) == ConstantAttributes.ENTITY_FORGOT_PASSWORD)
        {
            //Login Automatically
            //this.viewCtrl.dismiss();
            this.localStorageSrv.setUser(this.newUserIdentity);
            this.events.publish(ConstantAttributes.EVENT_RELOAD_MENU);
        }
        else
            this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }    
}
