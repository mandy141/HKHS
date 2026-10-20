import { Component, Input, ViewChild, NgZone } from '@angular/core';
import { IonicPage, Content, FabButton, NavController } from 'ionic-angular';
import { NavParams, Events, Platform  } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { TermsConditionsLayoutBaseModel } from '../../../models/layout-form-model/terms-conditions-layout-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { MenuController } from 'ionic-angular';
import { CookieService } from 'ngx-cookie-service';
import { Storage } from '@ionic/storage';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';




@IonicPage()

@Component({
  selector: 'terms-conditions-layout',
  templateUrl: 'terms-conditions-layout.html',
})
export class TermsConditionsLayout{
  @ViewChild(Content) content: Content;    
  bottomReached = false;
  private data: TermsConditionsLayoutBaseModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private configSrv: ConfigService, private platform: Platform, 
    private menu: MenuController, private cookieService: CookieService, private storage: Storage, private localStorage: LocalStorageService) {}

  ngOnInit() {
    if (this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME)) {
        var paramObj = {};
        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
        paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_LOAD_LAYOUT_FORM;
        paramObj[ConstantAttributes.PARAM_CRUD_MODE] = this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE);
        if (this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS)) {
            var additionalParams: { key: string, value: string }[] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
            for (let additionalParam of additionalParams) {
                paramObj[additionalParam.key] = additionalParam.value;
            }
        }

        this.apiReqService.callAPIRequest<TermsConditionsLayoutBaseModel>(paramObj, true)
            .then((_data: TermsConditionsLayoutBaseModel) => {

                //Dismiss All Loading Spinner
                this.loadingSrv.dismissAllLoading();

                if (_data) {
                    this.data = _data;
                }                    
                else
                    this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            });
    }
    else {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
}

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
  
  private onBackToHome() {
    this.localStorage.setTAndC("true");
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
}



  detectBottom(){
    if(this.content.scrollTop == this.content.scrollHeight - this.content.contentHeight){
      this.zone.run(()=>{
        this.bottomReached = true;
      });
    }else{
      this.zone.run(()=>{
        this.bottomReached = false;
      });
    }
    //console.log(this.bottomReached);
  }

}
