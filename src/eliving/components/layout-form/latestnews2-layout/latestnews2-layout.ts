import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, Content, FabButton } from 'ionic-angular';
import { NavParams, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { LatestNews2FormBaseModel } from '../../../models/layout-form-model/latest-news2-form-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'latestnews2-layout',
  templateUrl: 'latestnews2-layout.html'
})
export class LatestNews2Form implements AfterViewInit {
  private data: LatestNews2FormBaseModel;

  slider = {};
  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private configSrv: ConfigService, private localStorage: LocalStorageService,
    private navCtrl: NavController, private alertCtrl: AlertController) { }



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

      this.apiReqService.callAPIRequest<LatestNews2FormBaseModel>(paramObj, true)
        .then((_data: LatestNews2FormBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            if (_data.RecordList != null && _data.RecordList != undefined) {
              this.data = _data;
              //console.log(this.data);
            }
            else {
              ////console.log("no data");
              let msg_ok = "";
              let msg_no_data = "";
              if (this.localStorage.getLang() == ConstantAttributes.LANG_CHI) {
                msg_ok = this.configSrv.MSG_OK_TC;
                msg_no_data = this.configSrv.MSG_NO_DATA_TC;
              }
              else {
                msg_ok = this.configSrv.MSG_OK_TC;
                msg_no_data = this.configSrv.MSG_NO_DATA_TC;
              }

              let alertPopup = this.alertCtrl.create({
                title: '',
                subTitle: msg_no_data,
                buttons: [{
                  text: msg_ok,
                  handler: () => {
                    // user has clicked the alert button
                    // begin the alert's dismiss transition
                    let navTransition = alertPopup.dismiss();
                    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);

                  }

                }]
              });

              // Show the alert
              alertPopup.present();
            }
          }
          else
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        });
    }
    else {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
      //this.events.publish(ConstantAttributes.EVENT_APP_NAV_TO_PAGE,'{"entityName":"latestnews-layout","requestType":"LOAD_LAYOUT_FORM","crudMode":"R"}');
    }
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }


  onItemClick(openURL: string) {
    this.configSrv.openURL(openURL);
  }


  onClickEvent(index): void {
    if (this.slider[index]) {
      this.slider[index].slidePrev(300);
    }
  }

  onEvent(event: string, item: any, e: any) {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  ngAfterViewInit() {
    /*this.content.ionScroll.subscribe((d) => {
        this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
    });*/
  }

  isLoggedIn(): boolean {
    var curUser = this.localStorage.getUser();
    ////console.log('curUser');
    ////console.log(curUser);
    if (curUser) {
      if (curUser.token == this.configSrv.GUEST_MODEL.token)
        return false;
      else
        return true;
    }
    else
      return false;
  }

  private openImage(url: string, mimetype: string, videoEntityName: string, uniqueIdentifier: number) {
    if (url.length > 0 && mimetype == "image") {
      this.openImageViewer(url);
    }
    if (url.length > 0 && mimetype == "video") {
      this.onShowDtl(videoEntityName, uniqueIdentifier);
    }
    if (url.length > 0 && mimetype == "pdf") {
      this.openUrl(url);
    }
    if (url.length > 0 && mimetype == "url") {
      this.openUrl(url);
    }

  }


  openImageViewer(openURL: string) {
    this.configSrv.openImgNotShare(openURL);
  }

  openExturl(openURL: string) {
    this.configSrv.openExtUrl(openURL);
  }

  openUrl(openURL: string) {
    this.configSrv.openURL(openURL);
  }

  onShowDtl(videoEntityName: string, videoId: number) {
    var page = new CheckPointBaseModel();
    //console.log(page);
    page.componentName = "HSCImageSubGallery";
    page.crudMode = "R";
    page.entityName = videoEntityName;//"hsc-image-sub-gallery";
    page.additionalParams = [];

    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
    additionalParamUniqueIdentifier.value = videoId;//"1743";
    page.additionalParams.push(additionalParamUniqueIdentifier);
    //console.log(page);
    this.navCtrl.push(page.componentName, page);
  }


}
