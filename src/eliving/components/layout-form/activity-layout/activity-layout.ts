import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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
import { ActivityFormBaseModel } from '../../../models/layout-form-model/activity-form-base-model';
import { DemoAttributes } from '../../../../demo/demo-attributes';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { ActivityFormPageModel } from '../../../models/layout-form-model/activity-form-page-model';
import { ActivityFormRecordModel } from '../../../models/layout-form-model/activity-form-record-model';
import { ELivingConstantAttributes } from '../../../attributes/eliving-constant-attributes';


@IonicPage()
@Component({
    selector: 'activity-layout',
    templateUrl: 'activity-layout.html'
})
export class ActivityForm  {
    private data: ActivityFormBaseModel;    

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

            this.apiReqService.callAPIRequest<ActivityFormBaseModel>(paramObj, true)
                .then((_data: ActivityFormBaseModel) => {

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



    isEnabled(value:string): boolean {
       return this.selectedItem == value;
    }


    private onShowDtl(item:ActivityFormRecordModel) {
        var page = new CheckPointBaseModel();
        page.componentName = this.data.componentName;
        page.crudMode = this.data.crudMode;
        page.entityName = this.data.entityName;
        page.additionalParams = [];
        //console.log(page);
        var additionalParamUniqueIdentifier = new KeyValueBaseModel();
        additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
        additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
        page.additionalParams.push(additionalParamUniqueIdentifier);
        
        this.navCtrl.push(page.componentName, page);
    }

    private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
}
