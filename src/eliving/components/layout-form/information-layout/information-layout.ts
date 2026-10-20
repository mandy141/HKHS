import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { InformationFormBaseModel } from '../../../models/layout-form-model/information-form-base-model';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { FacilityBookFormBaseModel } from '../../../models/layout-form-model/facility-book-form-base-model';
import { NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'information-layout',
  templateUrl: 'information-layout.html'
})

export class InformationForm  {
  private data: InformationFormBaseModel;

  public selectedItem = "";

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController) { }


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

      this.apiReqService.callAPIRequest<InformationFormBaseModel>(paramObj, true)
        .then((_data: InformationFormBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          //console.log(_data);
          if (_data) {
            this.data = _data;
            this.selectedItem = this.data.pages[0].pageId;
            //console.log(this.selectedItem);
          }
          else
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        });
    }
    else {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
  }

  // ngOnChanges(changes: { [propKey: string]: any }) {
  //   this.data = changes['data'].currentValue;
  // }

  onEvent = (event: string, item: any, e: any): void => {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  isEnabled(value: string): boolean {
    return this.selectedItem == value;
  }

  callphone(phone){
    window.location.href = "tel:" + phone;
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }
}
