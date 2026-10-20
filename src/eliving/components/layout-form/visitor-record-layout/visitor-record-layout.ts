import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams, Events, AlertController} from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { NavController } from 'ionic-angular';
import { VisitorRecordFormBaseModel } from '../../../models/layout-form-model/visitor-record-form-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { VisitorRecordFormRecordModel } from '../../../models/layout-form-model/visitor-record-form-record-model';
import { ApiResultModel } from '../../../../framework/models/dynamic-form-model/api-result-model';

@IonicPage()
@Component({
  selector: 'visitor-record-layout',
  templateUrl: 'visitor-record-layout.html'
})

export class VisitorRecordForm  {
  private data: VisitorRecordFormBaseModel;  

  public selectedItem = "";

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private alertCtrl: AlertController) { }


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

      this.apiReqService.callAPIRequest<VisitorRecordFormBaseModel>(paramObj, true)
        .then((_data: VisitorRecordFormBaseModel) => {

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

 

  isEnabled(value: string): boolean {
    return this.selectedItem == value;
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }


  private onShowDtl(pageIndex: number, uniqueIdentifier:number) {
    if(pageIndex == 0)
    {
      var page = new CheckPointBaseModel();
      page.componentName = this.data.componentName;
      page.crudMode = this.data.crudMode;
      page.entityName = this.data.entityName;
      page.additionalParams = [];

      var additionalParamUniqueIdentifier = new KeyValueBaseModel();
      additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
      additionalParamUniqueIdentifier.value = uniqueIdentifier;
      page.additionalParams.push(additionalParamUniqueIdentifier);

      this.navCtrl.push(page.componentName, page);
    }
  }

  private onMarkDelete(record: VisitorRecordFormRecordModel, pageIndex:number, recordIndex: number) {
    let alertPopup = this.alertCtrl.create({
      message: this.data.lblDeleteWarning,
      buttons: [{
        text: this.data.lblDeleteYesAns,
        handler: () => {
          alertPopup.dismiss().then(() => {
            this.coreMarkDelete(record, pageIndex, recordIndex);
          });
          return false;
        }
      },
      {
        text: this.data.lblDeleteNoAns,
        handler: () => {
          // need to do something if the user stays?
        }
      }]
    });

    // Show the alert
    alertPopup.present();
  } 


  private coreMarkDelete(record: VisitorRecordFormRecordModel, pageIndex: number, recordIndex: number) {
    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_FORM_SUBMIT;
    paramObj[ConstantAttributes.PARAM_CRUD_MODE] = ConstantAttributes.CRUD_MODE_DELETE;
    paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] = record.uniqueIdentifier;

    this.apiReqService.callAPIRequest<ApiResultModel<VisitorRecordFormRecordModel[]>>(paramObj, true)
      .then((data: ApiResultModel<VisitorRecordFormRecordModel[]>) => {
        if (data && data.result) {
          //Replace the item detail with updated status
          this.data.pages[pageIndex + 1].records.push(this.data.pages[pageIndex].records[recordIndex]);
          this.data.pages[pageIndex].records.splice(recordIndex, 1);          
        }
        else {
          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();
          this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }
      }).catch(error => {
        //Do Nothing 
      });
  }


  private onNew() {
    var page = new CheckPointBaseModel();
    page.componentName = ConstantAttributes.COMPONENT_INPUT_FORM;
    page.crudMode = ConstantAttributes.CRUD_MODE_CREATE;
    page.entityName = this.data.newEntityName;

    page.additionalParams = [];

   
    this.navCtrl.push(page.componentName, page);
  }

}
