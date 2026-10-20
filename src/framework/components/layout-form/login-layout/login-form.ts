import { Component, Input, ViewChild } from '@angular/core';
import { NavParams, IonicPage, Platform, Events, AlertController} from 'ionic-angular';
import { LoginLayoutBaseModel } from '../../../models/layout-form-model/login-layout-form-base-model';
import { ApiRequestService }    from '../../../services/api-request-service';
import { UserBaseModel } from '../../../models/user-base-model';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { NavController } from 'ionic-angular';
import { CheckPointBaseModel } from '../../../models/check-point-base-model';
import { LocalStorageService } from '../../../services/local-storage-service';
import { ApiResultModel } from '../../../models/dynamic-form-model/api-result-model';
import { MenuBaseModel } from '../../../models/menu-base-model';
import { ConfigService } from '../../../services/config-service';
import { DeviceService } from '../../../services/device-service';
//import { OneSignal, OneSignalOriginal } from '@ionic-native/onesignal';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin';
import { CookieService } from 'ngx-cookie-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'login-form',
    templateUrl: 'login-form.html'
})
export class LoginForm {

  data: LoginLayoutBaseModel;

  private inputUserName: string;
  private inputCountryCode: string;
  private inputPhoneNo: string;
  private inputPassword: string;
  private isSaveLogin: boolean = true;
  private isAgree: boolean = false;

  private isCountryCodeValid: boolean = true;
  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;
  private loginFailMsg: string = null;

  private strUserID: string;
  private strUserPW: string;

  

  constructor(private navParams: NavParams, private apiReqService : ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService, 
    private navCtrl: NavController, private localStorageSrv: LocalStorageService, private configSrv: ConfigService, private deviceSrv: DeviceService, 
    private oneSignal: OneSignalPlugin, private alertCtrl: AlertController, private cookieService: CookieService, private storage: Storage, 
    public platform: Platform, private localStorage: LocalStorageService) {}

  ngOnInit(){
    if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME))
    {
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

        this.apiReqService.callAPIRequest<LoginLayoutBaseModel>(paramObj, true)
        .then((_data: LoginLayoutBaseModel) => {   

            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();

            if(_data)
            {
                this.data = _data;

                //Set Default Country Code
                this.inputCountryCode = this.configSrv.DEFAULT_COUNTRY_CODE;
            }
            else
            {
                this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }
        });
        this.getLogin();
    }
    else
        this.onBackToHome();    
  }

  private isApp() {
      return this.deviceSrv.isApp;
  }

  private onBackToHome() {      
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }  

  private onLogin()
  {    
    this.loginFailMsg = null;

    if(this.isAgree == false)
    {
        this.loginFailMsg = this.data.lblAgree; 
    }
    else
    {

        if(!this.validate())
            return ;

        var paramObj = {};
        if(this.loginWithName())
            paramObj[ConstantAttributes.PARAM_USERNAME] = this.inputUserName.trim();
        else if(this.loginWithMobile())
            paramObj[ConstantAttributes.PARAM_USERNAME] = this.inputCountryCode.trim() + this.inputPhoneNo.trim();
            
        paramObj[ConstantAttributes.PARAM_PASSWORD] = this.inputPassword.trim();
        paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_AUTHENTICATE;
        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = ConstantAttributes.ENTITY_USER;

        

        if(this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_ANDROID ||
            this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS)
        {
            /*
            this.oneSignal.getIds().then((id) => {            
                paramObj[ConstantAttributes.PARAM_NOTIFICATION_PLAYER_ID] = id.userId;
                this.coreLogin(paramObj);
                //this.setLogin(this.inputUserName.trim(),this.inputPassword.trim());
            });
            */

            var self = this;
                this.oneSignal.getDeviceState(function (stateChanges) {
                    //console.log("login osid = " + stateChanges.userId);
                    paramObj[ConstantAttributes.PARAM_NOTIFICATION_PLAYER_ID] = stateChanges.userId;
                    //console.log(JSON.stringify(paramObj));
                    self.coreLogin(paramObj);
                });
        }
        else
        {
            this.coreLogin(paramObj);
            //this.setLogin(this.inputUserName.trim(),this.inputPassword.trim());
        }
        this.inputPassword = null;
    }
  }

  private coreLogin(paramObj)
  {
    this.apiReqService.callAPIRequest<MenuBaseModel>(paramObj, true, null, true)
    .then((data: MenuBaseModel) => {  
        //console.log(data);  
        if(data) 
        {         
            //console.log(data);  
            this.setLogin(paramObj[ConstantAttributes.PARAM_USERNAME], paramObj[ConstantAttributes.PARAM_PASSWORD], String(this.isAgree))   
            //this.setProjPhase(data.reqProjCode, data.reqPhaseCode)
            this.localStorage.setProj(data.reqProjCode); 
            this.localStorage.setPhase(data.reqPhaseCode); 
            this.localStorage.setTheme(data.appTheme);
            this.events.subscribe('theme:toggle', () => {data.appTheme}); 
            this.events.publish(ConstantAttributes.EVENT_APP_AFTER_LOGIN, data);
            
        }
        else
        {
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }           
    }).catch(error => {        
            this.loginFailMsg = error;                
    });
  }

  private loginWithName() {
    if(this.data.loginIDType == ConstantAttributes.LOGIN_ID_TYPE_NAME)
        return true;
    else
        return false;
  }

  private loginWithMobile() {
    if(this.data.loginIDType == ConstantAttributes.LOGIN_ID_TYPE_MOBILE)
        return true;
    else
        return false;
  }

  private get lblBrowserMsg() {
      return this.data.lblBrowserMsg;
  }

  private get lblCopyRight() {
      return this.data.lblCopyRightMsg;
  }

  private get lblAppVersion() {
    return this.configSrv.APP_VERSION;
  }

  private onForgotPassword()
  {
      this.navCtrl.push(this.configSrv.FORGOT_PASSWORD_FORM_MODEL.componentName, this.configSrv.FORGOT_PASSWORD_FORM_MODEL);
  }

  private onUserRegistration()
  {
    this.navCtrl.push(this.configSrv.USER_REGISTRATION_FORM_MODEL.componentName, this.configSrv.USER_REGISTRATION_FORM_MODEL);
  }

  private validate():boolean {
    this.isCountryCodeValid = true;
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if(this.loginWithName())
    {
        if (!this.inputUserName ||this.inputUserName.length == 0) {
            this.isUsernameValid = false;
        }
    }
    else if(this.loginWithMobile())
    {
        if (!this.inputCountryCode || this.inputCountryCode.length == 0) {
            this.isCountryCodeValid = false;
        }

        if (!this.inputPhoneNo || this.inputPhoneNo.length == 0) {
            this.isUsernameValid = false;
        }
    }
    else
    {
        this.isCountryCodeValid = false;
        this.isUsernameValid = false;
    }

    if (!this.inputPassword || this.inputPassword.length == 0) {
        this.isPasswordValid = false;
    }
    
    return this.isPasswordValid && this.isUsernameValid && this.isCountryCodeValid;
 }

 private onDisclaimer() {
    if (this.deviceSrv.isApp) {
        if (this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS)
          //window.open(this.data.disclaimerPDF, '_system', 'location=yes');
          this.configSrv.openURL(this.data.disclaimerPDF);
        else
          //window.open(this.data.disclaimerPDF);
          this.configSrv.openURL(this.data.disclaimerPDF);
      }
      else
        //window.open(this.data.disclaimerPDF, "_system");
        this.configSrv.openURL(this.data.disclaimerPDF);
 }

 private setLogin(loginID: string, loginPW: string, isAgree: string)
 {
    if (!this.platform.is('core')) {
        if(this.isSaveLogin)
        {
            this.storage.set(ConstantAttributes.COOKIE_USERID, loginID);      
            this.storage.set(ConstantAttributes.COOKIE_USERPW, loginPW);
            this.storage.set(ConstantAttributes.COOKIE_ISAGREE, isAgree)        
        }
        else
        {
            this.storage.remove(ConstantAttributes.COOKIE_USERID)
            this.storage.remove(ConstantAttributes.COOKIE_USERPW);
            this.storage.remove(ConstantAttributes.COOKIE_ISAGREE);
        }
    }
    else
    {
        if(this.isSaveLogin)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_USERID))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERID);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_USERID, loginID, 360);

            if(this.cookieService.check(ConstantAttributes.COOKIE_USERPW))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERPW);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_USERPW, loginPW, 360);

            if(this.cookieService.check(ConstantAttributes.COOKIE_ISAGREE))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_ISAGREE);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_ISAGREE, isAgree, 360);
        }
        else
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_USERID))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERID);
            }
            if(this.cookieService.check(ConstantAttributes.COOKIE_USERPW))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERPW);
            }
            if(this.cookieService.check(ConstantAttributes.COOKIE_ISAGREE))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_ISAGREE);
            }
        }
    
    }
 }


 private setProjPhase(projCode: string, phaseCode: string)
 {
    if (!this.platform.is('core')) {
        //if(this.isSaveLogin)
        //{
            this.storage.set(ConstantAttributes.COOKIE_PROJ, projCode);      
            this.storage.set(ConstantAttributes.COOKIE_PHASE, phaseCode);          
        //}
        /*
        else
        {
            this.storage.remove(ConstantAttributes.COOKIE_PROJ)
            this.storage.remove(ConstantAttributes.COOKIE_PHASE);
        }
        */
    }
    else
    {
        //if(this.isSaveLogin)
        //{
            if(this.cookieService.check(ConstantAttributes.COOKIE_PROJ))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_PROJ);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_PROJ, projCode, 360);

            if(this.cookieService.check(ConstantAttributes.COOKIE_PHASE))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_PHASE);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_PHASE, phaseCode, 360);
        //}
        /*
        else
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_USERID))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERID);
            }
            if(this.cookieService.check(ConstantAttributes.COOKIE_USERPW))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USERPW);
            }
        }*/
    }
 }
 private getLogin()
 {
    if (this.deviceSrv.isApp) {
        if(this.isSaveLogin)
        {
            //this.storage.get(ConstantAttributes.COOKIE_USERID, loginID);      
            //this.storage.set(ConstantAttributes.COOKIE_USERPW, loginPW);
            this.storage.get(ConstantAttributes.COOKIE_USERID).then((sLoginID: string) => {
                if(sLoginID)
                {
                    this.inputUserName = sLoginID;
                }
            });  
            
            this.storage.get(ConstantAttributes.COOKIE_USERPW).then((sLoginPW: string) => {
                if(sLoginPW)
                {
                    this.inputPassword = sLoginPW;
                }
            });

            this.storage.get(ConstantAttributes.COOKIE_ISAGREE).then((sIsAgree: string) => {
                if(sIsAgree)
                {
                    ////console.log(sIsAgree);
                    if(sIsAgree == "true")
                    {
                        this.isAgree = true;
                    }
                    else
                    {
                        this.isAgree = false;
                    }

                    
                }
            });

            
        }
    }
    else
    {
        if(this.cookieService.check(ConstantAttributes.COOKIE_USERID))
        {
            this.inputUserName = this.cookieService.get(ConstantAttributes.COOKIE_USERID);
            if(this.isSaveLogin)
            {
                this.cookieService.set(ConstantAttributes.COOKIE_USERID, this.inputUserName, 360);
            }
        }

        if(this.cookieService.check(ConstantAttributes.COOKIE_USERPW))
        {
            this.inputPassword = this.cookieService.get(ConstantAttributes.COOKIE_USERPW);
            if(this.isSaveLogin)
            {
                this.cookieService.set(ConstantAttributes.COOKIE_USERPW, this.inputPassword, 360);
            }
        }

        if(this.cookieService.check(ConstantAttributes.COOKIE_ISAGREE))
        {
            this.isAgree = Boolean(this.cookieService.get(ConstantAttributes.COOKIE_ISAGREE));
            if(this.isSaveLogin)
            {
                this.cookieService.set(ConstantAttributes.COOKIE_ISAGREE, String(this.isAgree), 360);
            }
        }
    }
 }

    private onEnter(){
        //do search
        this.onLogin();
    }

}
