import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavParams, IonicPage, Events  } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService }    from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { DashboardLayoutBaseModel } from '../../../models/layout-form-model/dashboard-layout-form-base-model';
import { DeviceService }    from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';

import {DemoAttributes} from '../../../../demo/demo-attributes';
import { DashboardLayoutDashboardItemModel } from '../../../models/layout-form-model/dashboard-layout-form-dashboard-item-model';
import { DashboardLayoutShortcutItemModel } from '../../../models/layout-form-model/dashboard-layout-form-shortcut-item-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { MobileAccessibility } from "@ionic-native/mobile-accessibility";
import { CookieService } from 'ngx-cookie-service';
import { Storage } from '@ionic/storage';
import { E } from '@angular/core/src/render3';

@IonicPage()
@Component({
    selector: 'dashboard-form',
    templateUrl: 'dashboard-form.html'
})
export class DashBoardForm {

    data: DashboardLayoutBaseModel;
    bannerSlidesInitialized: boolean = false;
    @ViewChild('banner') bannerSlides: Slides;    
    @ViewChild('headerSlides') headerSlides: Slides;

    font: string;
    tAndC: string;

    constructor(private navParams: NavParams, private apiReqService : ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
        private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private configSrv: ConfigService, private localStorage: LocalStorageService,
        public mobileAccessibility: MobileAccessibility, private storage: Storage, private cookieService: CookieService) { }

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

            this.apiReqService.callAPIRequest<DashboardLayoutBaseModel>(paramObj, true)
            .then((_data: DashboardLayoutBaseModel) => {   
        
                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();

                this.events.publish('theme:toggle');
        
                if(_data)
                {
                    this.data = _data;
                    this.font = this.localStorage.getFontSize();
                    this.tAndC = this.localStorage.getTAndC();
                    ////console.log(this.font);
                    this.mobileAccessibility.setTextZoom(parseInt(this.font,10));
                    //console.log(this.tAndC);
                    if(this.tAndC == "false" || this.tAndC == undefined)
                    {
                      //console.log("load");
                      if(this.data.tcPage != null)
                      {
                        //this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,this.data.tcPage);
                        this.events.publish(ConstantAttributes.EVENT_APP_NAV_TO_PAGE,this.data.tcPage);
                      }
                    }
                    else
                    {
                      //console.log(this.loadTC);
                    }
                }
                else
                    this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }); 
        }
        else
        {
            this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
        }    
      }

      ngAfterViewChecked() {        
          //LockSwipes on Desktop
          if(!this.bannerSlidesInitialized && this.bannerSlides)
          {            
            if(this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_DESKTOP)
                this.bannerSlides.lockSwipes(true);
            
            this.bannerSlidesInitialized = true;
          }
      }

      private isDesktop() {
        if(this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_DESKTOP)
          return true;
        else
          return false;
      }
    
      private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
      }

      private clickLife(shortcutItem: CheckPointBaseModel) {
        this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,shortcutItem);
      }

      private clickMgt(shortcutItem: CheckPointBaseModel) {
        this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,shortcutItem);
      }

      /*private onNewsItemClick(openURL: string) {
        this.configSrv.openURL(openURL);
      }

      private onBannerItemClick(openURL: string)
      {
        this.configSrv.openURL(openURL);
      }*/

      private onDashboardItemClick(shortcutItem: CheckPointBaseModel){
      this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,shortcutItem);
      }

      private onShortcutItemClick(shortcutItem: DashboardLayoutShortcutItemModel)
      {
        console.log(shortcutItem.action_cd);
        console.log(shortcutItem.openUrl);
        if(shortcutItem.action_cd == ConstantAttributes.ACTION_CD_OPEN_URL)
        {
          this.configSrv.openUrlWeb(shortcutItem.openUrl);
        }
        else
        {
          this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,shortcutItem.openForm);
        }
      }

      private onDashboardRecordClick(record: any)
      {
        if(record.fileURL && record.fileURL.length > 0)
        {
          this.configSrv.openURL(record.fileURL);
        }
        else if (record.openDtlForm)      
        {
          this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE, record.openDtlForm);
        }
      }

      private bannerPrev()
      {
        this.bannerSlides.lockSwipes(false);
        if(this.bannerSlides.getActiveIndex() <= 0)
            this.bannerSlides.slideTo(this.bannerSlides.length() - 1);
        else
            this.bannerSlides.slidePrev();
        this.bannerSlides.lockSwipes(true);
      }
      
      private bannerNext()
      {
        this.bannerSlides.lockSwipes(false);
        if(this.bannerSlides.getActiveIndex() >= this.bannerSlides.length() - 1)
            this.bannerSlides.slideTo(0);
        else
            this.bannerSlides.slideNext();
        this.bannerSlides.lockSwipes(true);
      }

      private getGroupHeight(dashboardItem: DashboardLayoutDashboardItemModel) {       
         var itemHeight = 0;
         
         for (var index = 0; index < dashboardItem.records.length; index++) {
            var element =  dashboardItem.records[index];
            itemHeight +=  Number(element.height);
          }
          //return itemHeight+37; 
          return itemHeight+10; 
      }

      private showHeaderPager(headerItems: any[]) {
        if(headerItems.length > 1)
        {
            if(this.headerSlides)
                this.headerSlides.lockSwipes(false);
                
            return true;
        }
        else 
        {
            if(this.headerSlides)
                this.headerSlides.lockSwipes(true);

            return false;
        }
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

  private async loadTC()
  {
    if (this.deviceSrv.isApp) {
      await this.storage.get(ConstantAttributes.COOKIE_LOADTC).then((sTC: string) => {
        if(sTC)
        {
          return sTC;
        }
        else
        {
          return "false";
        }
         });  
        }
        else
        {
          if(this.cookieService.check(ConstantAttributes.COOKIE_LOADTC))
            {
                return this.cookieService.get(ConstantAttributes.COOKIE_LOADTC);
                
          }
            else
                return "false";

      }
  }
}
