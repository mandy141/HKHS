import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams,  Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { NoticeLayoutFormBaseModel } from '../../../models/layout-form-model/notice-layout-form-base-model';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { NavController } from 'ionic-angular';
import { NoticeDetailLayoutModel } from '../../../models/layout-form-model/noitce-detail-layout-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'notice-detail-layout',
  templateUrl: 'notice-detail-layout.html',
})
export class NoticeDetail {

  private data: NoticeDetailLayoutModel;
  private converted_image: any;

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService,  private alertCtrl: AlertController,
    private localStorage: LocalStorageService, private sanitizer: DomSanitizer) { }

    ngOnInit() {
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

          this.apiReqService.callAPIRequest<NoticeDetailLayoutModel>(paramObj, true)
              .then((_data: NoticeDetailLayoutModel) => {   
      
              //Dismiss All Loading Spinner
              this.loadingSrv.dismissAllLoading();

              if(_data) {                               
                  this.data = _data;                    
                  this.converted_image = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.image);    
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

    private onLinkClick(openURL: string)
    {
    
        this.configSrv.openURL(openURL);
    }



    private onClose(){
    this.navCtrl.pop();
    }

}
