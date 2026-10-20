import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DynamicFormControlService }    from '../framework/services/dynamic-form-control-service';
import { ApiRequestService }    from '../framework/services/api-request-service';
import { AppBaseModel }    from '../framework/models/app-base-model';
import { MenuBaseModel }    from '../framework/models/menu-base-model';
import { UserBaseModel }    from '../framework/models/user-base-model';
import { CheckPointBaseModel }    from '../framework/models/check-point-base-model';
import { ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../framework/services/loading-spinner-service';
import { LocalStorageService } from '../framework/services/local-storage-service';
import { ConstantAttributes } from '../framework/attributes/constant-attributes';
import { DemoService } from '../demo/demo-service';
import { HttpParams } from '@angular/common/http';
import { ConfigBaseModel } from '../framework/models/config-base-model';
import { KeyValueBaseModel } from '../framework/models/key-value-base-model';
import { ConfigService } from '../framework/services/config-service';
import { DeviceService } from '../framework/services/device-service';
//import { OneSignal, OSNotificationPayload, OneSignalOriginal } from '@ionic-native/onesignal';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin';
import { OneSignalAttributes } from '../framework/attributes/onesignal-attributes';
import { ApiResultModel } from '../framework/models/dynamic-form-model/api-result-model';

import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
  templateUrl: 'app.html',
  providers: [ DynamicFormControlService, ApiRequestService]  
})
export class MyApp {  

  private appInitByPushNoti : boolean = false;
  private settingMenuOpen: boolean = false;
  private backButtonPressed: boolean = false;
  private varPush: boolean = true;
  theme:string;

  @ViewChild(Nav) nav: Nav;
  
  get ConstantAttributes() { return ConstantAttributes};  

  constructor(public platform: Platform, public statusBar: StatusBar, public deviceSrv: DeviceService, public oneSignal: OneSignalPlugin, public splashScreen: SplashScreen, private controlService:DynamicFormControlService, 
    private toastCtrl: ToastController, private apiReqService : ApiRequestService, private menuCtrl: MenuController, private events: Events, 
    private loadingSrv: LoadingSpinnerService, private localStorage: LocalStorageService, private demoSrv: DemoService, private alertCtrl: AlertController, private configSrv: ConfigService,
    public mobileAccessibility: MobileAccessibility, private screenOrientation: ScreenOrientation) {
    this.initializeApp();

    events.subscribe(ConstantAttributes.EVENT_APP_AFTER_LOGIN, (menuOj: MenuBaseModel) => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_AFTER_LOGIN);
      this.refreshMenuAfterLogin(menuOj);
      //this.navToUserNameSetup();
    });

    events.subscribe(ConstantAttributes.EVENT_APP_SESSION_EXPIRED, () => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_SESSION_EXPIRED);
      this.onSessionExpired();
    });

    events.subscribe(ConstantAttributes.EVENT_RELOAD_MENU, (shortcutItem: CheckPointBaseModel) => {
      //console.log("ENTER " + ConstantAttributes.EVENT_RELOAD_MENU);
      if(shortcutItem)
        this.reloadMenu(false, shortcutItem);
      else
        this.reloadMenu();
    });

    events.subscribe(ConstantAttributes.EVENT_APP_BACK_TO_HOME, () => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_BACK_TO_HOME);
      this.navToHomePage();    
    });

    events.subscribe(ConstantAttributes.EVENT_APP_REDIRECT_PAGE, (menuOj: MenuBaseModel) => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_REDIRECT_PAGE);
      this.navToRedirectPage(menuOj);    
    });

    events.subscribe(ConstantAttributes.EVENT_APP_NAV_TO_PAGE, (shortcutItem: CheckPointBaseModel) => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_NAV_TO_PAGE);
      this.openPage(shortcutItem);
    });

    events.subscribe(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE, (shortcutItem: CheckPointBaseModel) => {
      //console.log("ENTER " + ConstantAttributes.EVENT_APP_PUSH_TO_PAGE);
      this.openPage(shortcutItem, true);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.splashScreen.hide();   
      /*
      this.mobileAccessibility.getTextZoom().then(textZoom => {
        if (textZoom != 100) {
          this.mobileAccessibility.setTextZoom(100);
        }
      });
      */

     //this.theme = 'theme_2';
     this.events.subscribe('theme:toggle', () => {
      this.theme});
     
      this.platform.registerBackButtonAction(() => {
        if(this.menuCtrl.isOpen()){
          this.menuCtrl.close();
        }else{
          if(this.nav.canGoBack()){
             this.nav.pop(); //which navigates user to back page :)
          }else{
             let currentPage = this.nav.getActive();
            if(currentPage.component.name == "DashBoardForm" || currentPage.component.name == "TermsConditionsLayout"){
              if(this.currentLang == ConstantAttributes.LANG_ENG)
              {
                /*
               const alert = this.alertCtrl.create({
                    title: 'Exit the app',
                    message: 'Do you want to exit the app?',
                   buttons: [{
                        text: 'No!',
                        role: 'cancel',
                        handler: () => {
                          //console.log('canceled :)');
                        }
                    },{
                            text: 'Yes',
                            handler: () => {
                              this.platform.exitApp();
                            }
                        }]
                    });
                   alert.present();
                  */ 
                  if (this.backButtonPressed) {
                    this.platform.exitApp();
                  } else 
                  {
                    this.toastCtrl.create({
                      message: 'Press again to exit',
                      duration: 2000,
                      position: 'bottom'
                    }).present();
                    this.backButtonPressed = true;
                    setTimeout(() => this.backButtonPressed = false, 2000)
                  }
                  
                }
                else
                {
                  /* 
                    const alert = this.alertCtrl.create({
                      title: '',
                      message: '請按"是"退出?',
                      buttons: [{
                          text: '否!',
                          role: 'cancel',
                          handler: () => {
                            //console.log('canceled :)');
                          }
                      },{
                              text: '是',
                              handler: () => {
                                this.platform.exitApp();
                              }
                          }]
                      });
                     alert.present();
                 }*/ 
                   
                 if (this.backButtonPressed) {
                  this.platform.exitApp();
                  } else 
                  {
                    this.toastCtrl.create({
                      message: '再按一次退出應用',
                      duration: 2000,
                     position: 'bottom'
                    }).present();
                    this.backButtonPressed = true;
                   setTimeout(() => this.backButtonPressed = false, 2000)
                }
            }
          }else{
             this.navToHomePage();
           }
          }
       }
      },1);
        
      if (!this.platform.is('core')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByName("black");

      //Initialize Notification
      if(this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_ANDROID ||
      this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS)
      {
        this.OneSignalInit();
        /*
        if (this.platform.is('android')) {
          this.oneSignal.startInit(OneSignalAttributes.ONE_SIGNAL_APP_ID, OneSignalAttributes.ONE_SIGNAL_GOOGLE_PROJECT_NUMBER);
      }
      else if (this.platform.is('ios')) {
            this.oneSignal.startInit(OneSignalAttributes.ONE_SIGNAL_APP_ID);
      }


        //this.oneSignal.startInit(OneSignalAttributes.ONE_SIGNAL_APP_ID, OneSignalAttributes.ONE_SIGNAL_GOOGLE_PROJECT_NUMBER);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);            
        
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));      
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));     
        
        this.oneSignal.endInit(); 
        */        
      }

      //console.log("getPush");
      //console.log(this.getPush);
      this.varPush =  (this.getPush == "true");

      this.currentFont
      //Initialize Network Detection
      this.apiReqService.initializeNetworkEvents();
    });
  }

  private OneSignalInit(): void {
    // Uncomment to set OneSignal device logging to VERBOSE  
    //OneSignal.setLogLevel(6, 0);

    OneSignal.setLocationShared(false);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId(OneSignalAttributes.ONE_SIGNAL_APP_ID);
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      //console.log("User accepted notifications: " + accepted);
    });

    var self = this;
    var notificationOpenedCallback = function(jsonData) {
      var notificationData = JSON.stringify(jsonData)
      //console.log('notificationOpenedCallback: ' + notificationData);
      self.appInitByPushNoti = true;
      //console.log('additionalData: ' + JSON.parse(notificationData).notification.additionalData.noticeID);
    };
    
    OneSignal.setNotificationOpenedHandler(notificationOpenedCallback);

  }

  
  /*
  private onPushReceived(payload: OSNotificationPayload) {
    //alert('Push Received:' + payload.body);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    //alert('Push Opened:' + payload.body);
    this.appInitByPushNoti = true;
  }
  */

  ngOnInit(){
    this.initAppContent();
    // For Local Demo
    //this.initDemoAppContent();    
  }

  //For Local Demo Purpose
  initDemoAppContent()
  {
    this.loadingSrv.createLoadingSpinner();
    this.demoSrv.initDemoJSONObj();
    var self = this;
    setTimeout(function() { 
      self.loadingSrv.dismissAllLoading();
      self.initAppContent() 
    }, 2000);
  }

  initAppContent()
  {
    //Get API Config
    this.apiReqService.getAPIConfig()
    .then((data:ConfigBaseModel) => {
      //Manual Create Loading Spinner
      this.loadingSrv.createLoadingSpinner();

      //call load guest token before load app (SR-19-120 by phoebe 20190916)
      
      var paramObj = {};
      paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_LOAD_GUEST_TOKEN;
      paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.ConstantAttributes.ENTITY_APPLICATION;
      this.apiReqService.callAPIRequest<ApiResultModel<boolean>>(paramObj, false)
        .then((data: ApiResultModel<boolean>) => {
          if (data && data.userIdentity) {
            this.configSrv.GUEST_MODEL = data.userIdentity;
      
            var paramObj = {};
            paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_LOAD_APP;
            paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.ConstantAttributes.ENTITY_APPLICATION;
            this.apiReqService.callAPIRequest<AppBaseModel>(paramObj, false)
            .then((data: AppBaseModel) => {     
              if(data)
              {
                this.configSrv.CURRENT_APP_MODEL = data;

                //Add Background Image of Tool Bar & Title Bar & Content
                this.configSrv.setDataDrivenBackgroundImage();
                
                //Add Custom CSS
                this.controlService.addCustomStyles(this.configSrv.CURRENT_APP_MODEL.appCSS);

                //Add Custom JS
                this.controlService.addCustomJS(this.configSrv.CURRENT_APP_MODEL.appJS);          

                //Load Menu.
                this.reloadMenu(this.appInitByPushNoti);          
              }
              else
              {
                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();
                this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
              }
            }).catch(error => { 
              //Do Nothing
            });
          }
          else {
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
          }
        }).catch(error => {
          //console.log(error);
          //Do Nothing
        }); 
    });    
  }

  get currentLang()
  {
    return this.localStorage.getLang();
  }

  get getPush()
  {
    return this.localStorage.getPush();
  }


  get currentFont()
  {
    return this.localStorage.getFontSize();
  }

  /*
  get menuHeaderStyle()
  {
    if(this.configSrv.CURRENT_MENU_MODEL.appMenuHeaderBgPath && this.configSrv.CURRENT_MENU_MODEL.appMenuHeaderBgPath.length > 0)
      return {'background-image': 'url(' + this.configSrv.CURRENT_MENU_MODEL.appMenuHeaderBgPath + ')'};
    else
      return {'background-color': 'black'};
  }
*/

  changeLang(lang: string)
  {
    this.menuCtrl.close();
    
    var page = new CheckPointBaseModel();
    page.componentName = ConstantAttributes.COMPONENT_CHANGE_LANG_FORM;
    page.crudMode = '';
    page.entityName = '';
                  
    var additionalParamRegType = new KeyValueBaseModel();
    additionalParamRegType.key = ConstantAttributes.PARAM_LANG;
    additionalParamRegType.value = lang;

    //Get the Current Root Page, After Lang Change it should nav to current root page
    if(this.nav.getViews() && this.nav.getViews()[0])
    {
      var additionalParamNavToCheckPoint = new KeyValueBaseModel();
      additionalParamNavToCheckPoint.key = ConstantAttributes.PARAM_NAV_TO_CHECKPOINT;
      additionalParamNavToCheckPoint.value = this.nav.getViews()[0].data;
    }

    page.additionalParams = [];
    page.additionalParams.push(additionalParamRegType);
    page.additionalParams.push(additionalParamNavToCheckPoint);

    this.nav.setRoot(page.componentName, page);
  }
  
  isLoggedIn() : boolean
  {
    var curUser = this.localStorage.getUser();
    ////console.log('curUser');
    ////console.log(curUser);
    if(curUser)
    {
      if(curUser.token == this.configSrv.GUEST_MODEL.token)
        return false;
      else
        return true;
    }
    else
      return false;
  }

  onLogout()
  {
    this.menuCtrl.close();    
    this.openPage(this.configSrv.LOGOUT_FORM_MODEL);
  }

  onSessionExpired(){
    
    //Set Guest as Current User
   // this.localStorage.setUser(this.configSrv.GUEST_MODEL);

    //Reload the Menu
   // this.reloadMenu();
    
   
   //call load guest token again when session expire (SR-19-120 by phoebe 20190916)
   this.loadingSrv.createLoadingSpinner();
   var paramObj = {};
   paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_LOAD_GUEST_TOKEN;
   paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.ConstantAttributes.ENTITY_APPLICATION;
   this.apiReqService.callAPIRequest<ApiResultModel<boolean>>(paramObj, false)
     .then((data: ApiResultModel<boolean>) => {
       if (data && data.userIdentity) {
         this.configSrv.GUEST_MODEL = data.userIdentity;
       }
       else {
         //Dismiss All Loading Spinner
         this.loadingSrv.dismissAllLoading();
         this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
       }
     }).catch(error => {
       //Do Nothing
     });

   //Set Guest as Current User
   this.localStorage.setUser(this.configSrv.GUEST_MODEL);

   //Reload the Menu
   this.reloadMenu(true, null, true);
  }

  onLogin()
  {    
    this.menuCtrl.close();    
    this.openPage(this.configSrv.LOGIN_FORM_MODEL, true);
  }

  refreshMenuAfterLogin(menuObj: MenuBaseModel)
  {
    this.configSrv.CURRENT_MENU_MODEL = menuObj;
    this.settingMenuOpen = false;
    this.theme = this.configSrv.CURRENT_MENU_MODEL.appTheme;
    ////console.log('refreshMenuAfterLogin');
    ////console.log(this.theme);
    this.events.publish('theme:toggle', () => {this.theme});
    this.navToHomePage();    
  }

  reloadMenu(initByPushNoti?: boolean, navToPage?: CheckPointBaseModel, bln_sessionExpired?: boolean)
  {
    //Manual Create Loading Spinner
    this.loadingSrv.createLoadingSpinner();

    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_LOAD_MENU;
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.ConstantAttributes.ENTITY_MENU;

    this.apiReqService.callAPIRequest<MenuBaseModel>(paramObj, false)
    .then((data: MenuBaseModel) => {

      if(data)
      {
        this.configSrv.CURRENT_MENU_MODEL = data;
        this.settingMenuOpen = false;
        
        //this.theme = 'theme_2';
        this.theme = data.appTheme;
        //this.events.subscribe('theme:toggle', () => {this.theme});
        this.events.publish('theme:toggle', () => {this.theme});
        //('reloadMEnu');
        ////console.log(this.theme);
        if(navToPage)
        {
          this.openPage(navToPage);
        }        
        else
        {
          if(bln_sessionExpired)
          {
            this.menuCtrl.close();    
            this.openPage(this.configSrv.LOGIN_FORM_MODEL);
          }
          else
          {
            this.navToHomePage();
          }

          if(initByPushNoti && this.configSrv.CURRENT_MENU_MODEL.showNotificationShortCut)
          {
            this.pushNotiPage();
          }
        }
      }
      else
      {
        //Dismiss All Loading Spinner
        this.loadingSrv.dismissAllLoading();
        this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
      }
    }).catch(error => { 
      //Do Nothing
    });      
  }

  pushNotiPage()
  {      
    /*if(this.configSrv.CURRENT_MENU_MODEL.pushNotiPage)
      this.openPage(this.configSrv.CURRENT_MENU_MODEL.pushNotiPage);
    else
      this.navToHomePage();*/
    
    this.menuCtrl.close();
    this.openPage(this.configSrv.CURRENT_MENU_MODEL.pushNotiPage, true);
  }

  navToHomePage()
  {
    /*for(let page of this.configSrv.CURRENT_MENU_MODEL.forms)
    {
      if(page.key == this.configSrv.CURRENT_MENU_MODEL.defaultPageKey)
      {
        this.openPage(page);
        return;
      }
    }*/
    this.menuCtrl.close();
    this.openPage(this.configSrv.CURRENT_MENU_MODEL.defaultPage);
  }

  navToRedirectPage(menuObj: MenuBaseModel)
  {

    this.configSrv.CURRENT_MENU_MODEL = menuObj;
    this.settingMenuOpen = false;
    this.menuCtrl.close();
    //this.openPage(this.configSrv.CURRENT_MENU_MODEL.redirectPage);
  }

  menuItemClick(page: CheckPointBaseModel)
  {
    if(page.componentName)
    {
      this.menuCtrl.close();
      this.openPage(page);
    }
    else if(page.subMenu)
    {
      if(page['subMenuShown'])
        page['subMenuShown'] = false;
      else
        page['subMenuShown'] = true;        
    }
  }

  onChangeFont(size: string)
  {
    this.menuCtrl.close();
    switch(size){
      case '1':
      /*
      this.mobileAccessibility.getTextZoom().then(textZoom => {
          this.mobileAccessibility.setTextZoom(140);
          this.navToHomePage();
      });
      */
      var fSize = this.configSrv.CURRENT_MENU_MODEL.appFontSize.split('|')[0];
      this.localStorage.setFontSize(fSize);
      this.mobileAccessibility.setTextZoom(parseInt(fSize,10));
      
      //this.mobileAccessibility.usePreferredTextZoom(false)
      this.navToHomePage();
      return;

      case '2':
        //this.localStorage.setFontSize('100');
        //this.mobileAccessibility.setTextZoom(100);

        var fSize = this.configSrv.CURRENT_MENU_MODEL.appFontSize.split('|')[1];
        this.localStorage.setFontSize(fSize);
        this.mobileAccessibility.setTextZoom(parseInt(fSize,10));
        this.navToHomePage();
      return;

      case '3':
        //this.localStorage.setFontSize('80');
        //this.mobileAccessibility.setTextZoom(80);
        var fSize = this.configSrv.CURRENT_MENU_MODEL.appFontSize.split('|')[2];
        this.localStorage.setFontSize(fSize);
        this.mobileAccessibility.setTextZoom(parseInt(fSize,10));
        this.navToHomePage();
      return;
    }
    

  }

  openPage(page: CheckPointBaseModel, pushPage?: boolean) {        
      if(pushPage)
        this.nav.push(page.componentName, page);
      else
        this.nav.setRoot(page.componentName, page);
  }  

  isActive(page: CheckPointBaseModel) {    
    if (this.nav.getViews() && this.nav.getViews()[0] && this.nav.getViews()[0].data.key === page.key) {
      return 'selected-menu';
    }
    else
      return '';
  }

  onChangePush(recPush:boolean)
  {
    //console.log(recPush);
    if(recPush == true)
    {
      this.localStorage.setPush("true");
      this.oneSignal.disablePush(true);
    }
    else
    {
      this.localStorage.setPush("false");
      this.oneSignal.disablePush(false);
    }
  }

  onChangePassword() {
    this.menuCtrl.close();    
    this.openPage(this.configSrv.CHANGE_PASSWORD_FORM_MODEL);
  }  

  onUserNameSetup() {
    this.menuCtrl.close();    
    this.openPage(this.configSrv.USERNAME_SETUP_FORM_MODEL);
  }


  onPayment() {
    this.menuCtrl.close();    
    this.openPage(this.configSrv.QR_PAYMENT_MODEL);
  }  

  onTenantFeedback() {
    this.menuCtrl.close();    
    this.openPage(this.configSrv.TENANT_FEEDBACK_MODEL);
  }  

  private showUnreadNotificationCnt(p: CheckPointBaseModel)
  {
    if(p.unreadNotificationCnt && Number(p.unreadNotificationCnt) > 0)
      return true;
    else
      return false;
  }
  
  private onDisclaimer(url: string) {
    if (this.deviceSrv.isApp) {
        if (this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_IOS)
          //window.open(this.data.disclaimerPDF, '_system', 'location=yes');
          this.configSrv.openURL(url);
        else
          //window.open(this.data.disclaimerPDF);
          this.configSrv.openURL(url);
      }
      else
        //window.open(this.data.disclaimerPDF, "_system");
        this.configSrv.openURL(url);
 }
  

}
