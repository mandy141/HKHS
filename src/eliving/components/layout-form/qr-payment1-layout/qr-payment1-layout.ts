import { Component, Input, SecurityContext } from '@angular/core';
import { NavParams, IonicPage, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpClient } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';;
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { QrPayment1LayoutBaseModel } from '../../../models/layout-form-model/qr-payment1-layout-base-model';
import { NavController } from 'ionic-angular';
import { DemoAttributes } from '../../../../demo/demo-attributes';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { stringify } from '@angular/compiler/src/util';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '../../../../framework/services/config-service';


@IonicPage()
@Component({
  selector: 'qr-payment1-layout',
  templateUrl: 'qr-payment1-layout.html',
})
export class QrPayment1Layout {

  private data: QrPayment1LayoutBaseModel;
  private uniqueIdentifier: string;
  private converted_image: any;
  openUrl: string;
  public selectedItem = "";

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private navCtrl: NavController, private social: SocialSharing, private deviceSrv: DeviceService, private http: HttpClient,
    private sanitizer: DomSanitizer, private configSrv: ConfigService) { }

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

      this.uniqueIdentifier = paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER];

      this.apiReqService.callAPIRequest<QrPayment1LayoutBaseModel>(paramObj, true)
        .then((_data: QrPayment1LayoutBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          /*
          if(_data) {                               
              this.data = _data;                        
              //this.converted_image = "data:image/jpeg;base64," + this.data.qrImgString;
              //this.converted_image = "data:image/jpeg;base64," + this.sanitizer.bypassSecurityTrustResourceUrl(this.data.qrImgString);
              this.converted_image = this.data.qrImgString;
                //this.converted_image = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.qrImgString);  
          }
          else
          {
              this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
          }
          */
          if (_data) {
            this.data = _data;
            if (this.data != null && this.data != undefined) {
              //console.log(this.data);
              this.selectedItem = this.data.pages[0].pageId;
              //console.log(this.selectedItem);
            }
          }

        }).catch(error => {
          if (error && error.status === 401) {
            //Do Nothing
          }
          else
            this.onBackToHome();
        });
    }
    else
      this.onBackToHome();
  }

  private openImage(openURL: string) {
    this.configSrv.openImgNotShare(openURL);
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }

  private onClose() {
    this.navCtrl.pop().catch(
      error => {
        //Do Nothing
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
      }
    );
  }

  onClick(url: string) {

    this.openUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
    this.configSrv.openUrlWeb(this.openUrl);
  }

  isEnabled(value: string): boolean {
    return this.selectedItem == value;
  }



}
