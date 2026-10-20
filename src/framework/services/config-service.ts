import { Injectable }   from '@angular/core';
import { ConstantAttributes } from '../attributes/constant-attributes';
import { AppBaseModel } from '../models/app-base-model';
import { MenuBaseModel } from '../models/menu-base-model';
import { CheckPointBaseModel } from '../models/check-point-base-model';
import { UserBaseModel } from '../models/user-base-model';
import { DeviceService } from './device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Injectable()
export class ConfigService {
    constructor(private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private iab:InAppBrowser, public platform: Platform, private transfer:FileTransfer, private file: File,  private androidPermissions: AndroidPermissions, private fileOpener: FileOpener,
        public loadingCtrl: LoadingController) {         
      }
    
    public GUEST_MODEL: UserBaseModel = {
        // if change to real please comment
        //token:'AN9MGefrPn3OH__TYHS3nQEAAADqThI42DvQYr7AUu1R0GMSNN0nFkyKHCN0NlOsRvZZD8prGQf3cjKO3-6Z_Yjz4zGLQWTB8ySMh72e2amRz5Qax8QosCl-RP8gvqIsXasRvnvnZXRMudhOsCdEY0rtPewQEltQYCEacq1TYCmHs-yeTEBQWhmpBfWS18_tBm22BOY09FVlOLHXwctmChhxUdn4xRj4BTBqnnW3gMU0-b3KbgVjnPTn9mhFY-hNiLHji8rqkN0JPnbSlS1N8ytZdDl9lF-2O9fbf7oW8syXyudf6RecEyYqD_0S-eHrpA0oieh3ui7Xsf_mKXYrN2E6By4TSDEjYfQT-ylNDCKHCW6Se_XELnKuO1Nc85JPjWNkCSu7bV6FjbdNw7fj-uV11l8='
        token:''
    };
    
    public LOGIN_FORM_MODEL: CheckPointBaseModel = {
        key:'login-form',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_LOGIN_FORM,
        entityName: ConstantAttributes.ENTITY_LAYOUT_LOGIN,
        crudMode:ConstantAttributes.CRUD_MODE_READ,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public CHANGE_PASSWORD_FORM_MODEL: CheckPointBaseModel = {
        key:'change-password',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_USER_MAINT_FORM,
        entityName: ConstantAttributes.ENTITY_CHANGE_PASSWORD,
        crudMode:ConstantAttributes.CRUD_MODE_UPDATE,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public FORGOT_PASSWORD_FORM_MODEL: CheckPointBaseModel = {
        key:'forget-password',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_USER_MAINT_FORM,
        entityName: ConstantAttributes.ENTITY_FORGOT_PASSWORD,
        crudMode:ConstantAttributes.CRUD_MODE_UPDATE,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public USER_REGISTRATION_FORM_MODEL: CheckPointBaseModel = {
        key:'user-registration',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_USER_MAINT_FORM,
        entityName: ConstantAttributes.ENTITY_USER_REGISTRATION,
        crudMode:ConstantAttributes.CRUD_MODE_CREATE,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };
    
    public LOGOUT_FORM_MODEL: CheckPointBaseModel = {
        key:'logout',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_LOGOUT_FORM,
        entityName: '',
        crudMode:'',
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };   

    public USERNAME_SETUP_FORM_MODEL: CheckPointBaseModel = {
        key:'username-setup',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_USERNAME_SETUP,
        entityName: ConstantAttributes.ENTITY_USERNAME_SETUP,
        crudMode:ConstantAttributes.CRUD_MODE_UPDATE,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public QR_PAYMENT_MODEL: CheckPointBaseModel = {
        key:'qr-payment1-layout',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_QR_PAYMENT_FORM,
        entityName: ConstantAttributes.ENTITY_QR_PAYMENT,
        crudMode:ConstantAttributes.CRUD_MODE_READ,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public TENANT_FEEDBACK_MODEL: CheckPointBaseModel = {
        key:'tenant-feedback-layout',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_TENANT_FEEDBACK_LAYOUT,
        entityName: ConstantAttributes.ENTITY_TENANT_FEEDBACK,
        crudMode:ConstantAttributes.CRUD_MODE_READ,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };
    
    public TENANT_FEEDBACK_LIST_MODEL: CheckPointBaseModel = {
        key:'tenant-feedback-list-layout',
        title:'',
        icon:'',
        componentName: ConstantAttributes.COMPONENT_TENANT_FEEDBACK_LIST_LAYOUT,
        entityName: ConstantAttributes.ENTITY_TENANT_LIST_FEEDBACK,
        crudMode:ConstantAttributes.CRUD_MODE_READ,
        additionalParams: [],
        subMenu: [],
        unreadNotificationCnt: ''
    };

    public setDataDrivenBackgroundImage() {

        if((this.CURRENT_APP_MODEL.appToolBarBg && this.CURRENT_APP_MODEL.appToolBarBg.length > 0) ||
            (this.CURRENT_APP_MODEL.appContentBg && this.CURRENT_APP_MODEL.appContentBg.length > 0))
        {
            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');        

            //if(this.CURRENT_APP_MODEL.appToolBarBg && this.CURRENT_APP_MODEL.appToolBarBg.length > 0)
            //{
            //    styleElement.innerHTML += `.toolbar .toolbar-background
            //    {
            //        background-image: url(${this.CURRENT_APP_MODEL.appToolBarBg});
            //    } `
            //}
            
            if(this.CURRENT_APP_MODEL.appContentBg && this.CURRENT_APP_MODEL.appContentBg.length > 0)
            {
                /*
                styleElement.innerHTML += `.item-md 
                {
                    background-color: transparent; 
                } 
                
                .content-md, 
                page-input-form ion-content
                {
                    background-image: url(${this.CURRENT_APP_MODEL.appContentBg}); 
                }`;
                */
               styleElement.innerHTML += `.item-md 
                {
                    background-color: transparent; 
                } 
                `;
            }

            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    }

    public reCalMenuNotificationCount(clear_noti_entity_name: string) {
        for(let item of this.CURRENT_MENU_MODEL.forms)
        {
            if(item.subMenu)
            {
                for(let sub_item of item.subMenu)
                {
                    if(sub_item.subMenu)
                    {
                        for(let sub_sub_item of sub_item.subMenu)
                        {
                            if(sub_sub_item.entityName == clear_noti_entity_name)
                            {
                                item.unreadNotificationCnt = String(Number(item.unreadNotificationCnt) - Number(sub_sub_item.unreadNotificationCnt));
                                sub_item.unreadNotificationCnt = String(Number(sub_item.unreadNotificationCnt) - Number(sub_sub_item.unreadNotificationCnt));
                                sub_sub_item.unreadNotificationCnt = "0";                                
                            }
                        }
                    }
                    else if(sub_item.entityName == clear_noti_entity_name)
                    {
                        item.unreadNotificationCnt = String(Number(item.unreadNotificationCnt) - Number(sub_item.unreadNotificationCnt));
                        sub_item.unreadNotificationCnt = "0";       
                    }
                }
            }
            else if(item.entityName == clear_noti_entity_name)
            {                
                item.unreadNotificationCnt = "0";       
            }
        }
    }

    public openImg(openURL: string)
    {

                if (this.deviceSrv.isApp)
                {
                    var options = {
                        share: true, // default is false
                        closeButton: true, // default is true
                        copyToReference: false, // default is false
                        headers: '',  // If this is not provided, an exception will be triggered
                        piccasoOptions: { } // If this is not provided, an exception will be triggered
                    };

                    if(openURL.toUpperCase().startsWith("HTTP"))
                    {
                        this.photoViewer.show(openURL,'',options);
                    }
                    else
                    {
                        ////console.log(this.file.applicationDirectory);
                        //this.photoViewer.show(this.file.applicationDirectory + 'www/' + openURL);
                        //this.photoViewer.show('file:///android_asset/www/' + openURL, 'TESTING', {share: true});                        
                        this.photoViewer.show('file:///android_asset/www/' + openURL, '',options);                        
                    }
                }
                else
                   window.open(openURL, "_system", 'location=no');
                   //var options = "location=yes;fullscreen=yes";   
    
                    //const browser = this.iab.create(openURL, '_blank', options);   
                    //browser.on('exit').subscribe(event => {
                    //alert(event);
                    //});

            
            
        
    }

    public openImgNotShare(openURL: string)
    {

                if (this.deviceSrv.isApp)
                {
                    var options = {
                        share: false, // default is false
                        closeButton: true, // default is true
                        copyToReference: false, // default is false
                        headers: '',  // If this is not provided, an exception will be triggered
                        piccasoOptions: { } // If this is not provided, an exception will be triggered
                    };

                    if(openURL.toUpperCase().startsWith("HTTP"))
                    {
                        this.photoViewer.show(openURL,'',options);
                    }
                    else
                    {
                        ////console.log(this.file.applicationDirectory);
                        //this.photoViewer.show(this.file.applicationDirectory + 'www/' + openURL);
                        //this.photoViewer.show('file:///android_asset/www/' + openURL, 'TESTING', {share: true});                        
                        this.photoViewer.show('file:///android_asset/www/' + openURL, '',options);                        
                    }
                }
                else
                   window.open(openURL, "_system", 'location=no');
                   //var options = "location=yes;fullscreen=yes";   
    
                    //const browser = this.iab.create(openURL, '_blank', options);   
                    //browser.on('exit').subscribe(event => {
                    //alert(event);
                    //});

            
            
        
    }

    public openExtUrl(openURL: string)
    {
        if (this.platform.is('ios'))
        {
            var options = "toolbar=yes,location=no,hideurlbar=yes,fullscreen=yes,usewkwebview=yes,closebuttoncaption=x";   
        }
        else
        {
            var options = "";//"toolbar=no;location=no;hideurlbar=yes;fullscreen=yes";   
        }
        const browser = this.iab.create(openURL, '_blank', options);   
    }
    public openURL(openURL: string)
    {
        if (openURL && openURL.length > 0) {
           /* if (openURL.toUpperCase().endsWith(".JPG") ||
                openURL.toUpperCase().endsWith(".JPEG") ||
                openURL.toUpperCase().endsWith(".PNG") ||
                openURL.toUpperCase().endsWith(".GIF")) {
             if (openURL.indexOf('attrib_cd=add_notice_photo') >= 0 ||
                    openURL.indexOf('attrib_cd=banner') >= 0 ||
                    openURL.indexOf('attrib_cd=image') >= 0 ||
                    openURL.indexOf('attrib_cd=notice_photo') >= 0 ||
                    openURL.indexOf('attrib_cd=photo') >= 0 ||
                    openURL.indexOf('attrib_cd=album_preview' ) >= 0||
                    openURL.indexOf('attrib_cd=photo_preview') >= 0)
                {
                if (this.deviceSrv.isApp)
                {
                    if(openURL.toUpperCase().startsWith("HTTP"))
                    {
                        this.photoViewer.show(openURL);
                    }
                    else
                    {
                        ////console.log(this.file.applicationDirectory);
                        //this.photoViewer.show(this.file.applicationDirectory + 'www/' + openURL);
                        //this.photoViewer.show('file:///android_asset/www/' + openURL, 'TESTING', {share: true});                        
                        this.photoViewer.show('file:///android_asset/www/' + openURL);                        
                    }
                }
                else
                   //window.open(openURL, "_system", 'location=no');
                   var options = "location=yes;fullscreen=yes";   
    
                    const browser = this.iab.create(openURL, '_blank', options);   
                    //browser.on('exit').subscribe(event => {
                    //alert(event);
                    //});

            }
            else {
                //window.open(openURL, '_system', 'location=no');
                var options = "location=yes;fullscreen=yes";   
                const browser = this.iab.create(openURL, '_blank', options);   
                //browser.on('exit').subscribe(event => {
                //alert(event);
                //});
            }*/
            if (this.deviceSrv.isApp)
                {
                   //window.open(openURL, "_system", 'location=no');
                   if (this.platform.is('ios'))
                   {
                       var options = "toolbar=yes,location=no,hideurlbar=yes,fullscreen=yes,usewkwebview=yes,closebuttoncaption=x";   
                   }
                   else
                   {
                    var options = "toolbar=yes,location=yes,hideurlbar=yes,fullscreen=yes,closebuttoncaption=x";     
                   }
                   var pdfViewer = this.API_HOST+'/'+this.PDF_VIEWER+'?file=';
                   ////console.log(pfgViewer);
                   ////console.log(encodeURIComponent(openURL));
                   const browser = this.iab.create(pdfViewer+encodeURIComponent(openURL), '_blank', options);   
                   //browser.on('exit').subscribe(event => {
                   //alert(event);
                   //});

                }
                else
                {
                   //window.open(openURL, "_system", 'location=no');
                   if (this.platform.is('ios'))
                   {
                       var options = "toolbar=yes,location=no,hideurlbar=yes,fullscreen=yes,usewkwebview=yes,closebuttoncaption=X";   
                   }
                   else
                   {
                        var options = "toolbar=yes,location=yes,hideurlbar=yes,fullscreen=yes,closebuttoncaption=X";   
                   }  
                   var pdfViewer = this.API_HOST+'/'+this.PDF_VIEWER+'?file=';
                   ////console.log(pfgViewer);
                   ////console.log(encodeURIComponent(openURL));
                   const browser = this.iab.create(pdfViewer+encodeURIComponent(openURL), '_blank', options);   
                   //browser.on('exit').subscribe(event => {
                   //alert(event);
                   //});
                }
        }
    }

    public openUrlWeb(openURL: string)
    {
        //console.log('openUrl='+openURL);
        window.open(openURL, "_system");
    }

    public downloadFile(dlURL: string, title: string)
    {
        if (this.deviceSrv.isApp)
        {
            const fileTransfer: FileTransferObject = this.transfer.create();
            /*
            if(isEng)
            {
            var load = this.loadingCtrl.create({
                content: this.MSG_PLEASE_WAIT_ENG,
                spinner: 'ios',
              });
            }
            else
            {
                var load = this.loadingCtrl.create({
                    content: this.MSG_PLEASE_WAIT_CHI,
                    spinner: 'ios',
                  });
            }
            */
           var load = this.loadingCtrl.create({
            content: '',
            spinner: 'ios'
          });
            if (this.platform.is('ios')) 
            {
                //this.loadingSrv.createLoadingSpinner();
                var dlFilePath = this.file.cacheDirectory;
                //var dlFileName = new Date().toISOString()+'.pdf';
                var dlDateTime = new Date().getFullYear().toString()+new Date().getMonth().toString()+new Date().getDay().toString()+ 
                                new Date().getHours().toString()+new Date().getMinutes().toString()+ new Date().getSeconds().toString();
                //var dlFileName = title+ new Date().toISOString().substring(0, 10)+'.pdf';
                dlFileName = title+ dlDateTime+'.pdf';
                ////console.log('dlFilePath: ' + dlFilePath);
                load.present();
                    fileTransfer.download(encodeURI(dlURL), dlFilePath + dlFileName).then((entry) => {
                        ////console.log('download complete: ' + entry.toURL());
                        load.dismiss();
                        this.fileOpener.open(dlFilePath + dlFileName, 'application/pdf')
                        .then(() => {
                            ////console.log('open success');
                            load.dismiss();
                        })
                        .catch(() => {
                            ////console.log('open fail');
                            load.dismiss();
                        });
                    }, (error) => {
                        // handle error
                        ////console.log('download error: ' +error);
                        load.dismiss();
                    }); 
                                
            }
                else
                {

                        /*
                        var permissionList = [
                            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                            this.androidPermissions.PERMISSION.WRITED_EXTERNAL_STORAGE
                        ];
                        permissionList.forEach(element => {
                            this.androidPermissions.checkPermission(element) .then(
                                result => {
                              if (!result.hasPermission)
                              {
                                this.androidPermissions.requestPermissions(permissionList);
                              }
                            }
                            )});
                        */
                            


                                var dlFilePath = this.file.cacheDirectory  + "/Download/";
                                //var dlFileName = new Date().toISOString()+'.pdf';
                                var dlDateTime = new Date().getFullYear().toString()+new Date().getMonth().toString()+new Date().getDay().toString()+ 
                                new Date().getHours().toString()+new Date().getMinutes().toString()+ new Date().getSeconds().toString();
                                var dlFileName = title+ dlDateTime+'.pdf';
                                  
                                //console.log('dlFilePath: ' + dlFilePath);
                                //this.loadingSrv.createLoadingSpinner();
                                   load.present();
                                fileTransfer.download(dlURL, dlFilePath + dlFileName).then((entry) => {
                                    ////console.log('download complete: ' + entry.toURL());
                                    load.dismiss();
                                    //this.loadingSrv.dismissAllLoading();
                                    this.fileOpener.open(dlFilePath + dlFileName , 'application/pdf')
                                    .then(() => {
                                        ////console.log('open success');
                                    })
                                    .catch(() => {
                                       // //console.log('open fail');
                                       load.dismiss();
                                    });
                                    
                                }, (error) => {
                                    // handle error
                                    ////console.log('download error: ' +error);
                                    load.dismiss();
                                }); 
                                
                            
                      
                }
        }
        else
        {
            this.openURL(dlURL);
        }
        
        
    }

    /*
    Read From config.json
    */
   public API_HOST: string = null;
   public API_NAME: string = null;
   public PDF_VIEWER: string = null;
   public UPLOAD_FILE: string = null;
   public APP_CODE: string = null;
   public REQ_PROJ_CODE: string = null;  
   public REQ_PHASE_CODE: string = null;  
   public APP_VERSION: string = null;
   public BYPASS_CLIENT_VALIDATION: boolean = false;

   public DEFAULT_COUNTRY_CODE: string = '852';

   public CURRENT_APP_MODEL: AppBaseModel = new AppBaseModel();    
   public CURRENT_MENU_MODEL: MenuBaseModel = new MenuBaseModel();

   public MSG_PLEASE_WAIT_ENG: string = "Please wait";
   public MSG_PLEASE_WAIT_CHI: string = "請稍候";
   public MSG_NO_DATA_TC: string = "沒有資料";
   public MSG_NO_DATA_EN: string = "No Data";
   public MSG_OK_TC: string = "確定";
   public MSG_OK_EN: string = "OK";
}