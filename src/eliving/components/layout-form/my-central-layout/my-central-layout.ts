import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, Content, FabButton } from 'ionic-angular';
import { NavParams, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { NoticeLayoutFormBaseModel } from '../../../models/layout-form-model/notice-layout-form-base-model';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { FacilityBookFormBaseModel } from '../../../models/layout-form-model/facility-book-form-base-model';
import { NavController } from 'ionic-angular';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';

import { MeetingFormDocModel } from '../../../models/layout-form-model/meeting-form-doc-model';
import { MyCentralFormGroupModel } from '../../../models/layout-form-model/my-central-form-group-model';
import { MyCentralFormBaseModel } from '../../../models/layout-form-model/my-central-form-base-model';
import { ConfigService } from '../../../../framework/services/config-service';

@IonicPage()
@Component({
  selector: 'my-central-layout',
  templateUrl: 'my-central-layout.html'
})
export class MyCentralForm implements AfterViewInit {
  private data: MyCentralFormBaseModel;  

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService) { }


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

      this.apiReqService.callAPIRequest<MyCentralFormBaseModel>(paramObj, true)
        .then((_data: MyCentralFormBaseModel) => {

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


  toggleGroup(group: any) {
    group.show = !group.show;
  }

  isGroupShown(group: any) {
    return group.show;
  }

  /*
  getGroupHeight(group: MyCentralFormGroupModel) {       
    if(group.show)
      return group.documents.length * 54;
    else
      return 0;    
  }
  */
 getGroupHeight(group: MyCentralFormGroupModel) {  

   if(group.show)
   {
    
   var itemHeight = 0;
   
   for (var index = 0; index < group.documents.length; index++) {
    var element =  group.documents[index];
    itemHeight +=  Number(element.height);
    ////console.log(itemHeight);
    }
    return itemHeight; 
  }
  else
  {
    return itemHeight; 
  }
    
    

}

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }


  onItemClick(openURL: string) {
    this.configSrv.openURL(openURL);
  }

  ngAfterViewInit() {
    
  }
}
