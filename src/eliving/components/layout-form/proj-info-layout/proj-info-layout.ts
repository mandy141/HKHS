import { Component, Input } from '@angular/core';
import { NavParams, IonicPage, Events } from 'ionic-angular';
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
import { ProjInfoLayoutBaseModel } from '../../../models/layout-form-model/proj-info-layout-base-model';
import { ELivingConstantAttributes } from '../../../attributes/eliving-constant-attributes';
import { registerLocaleData } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@IonicPage()
@Component({
    selector: 'proj-info-layout',
    templateUrl: 'proj-info-layout.html'
})
export class ProjInfoLayout {

    private data: ProjInfoLayoutBaseModel;
    private uniqueIdentifier: string;
    private google_url: any;

    constructor(private navParams: NavParams, private apiReqService : ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService, 
        private navCtrl: NavController, private sanitizer: DomSanitizer) {}

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

                this.uniqueIdentifier = paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER];

                this.apiReqService.callAPIRequest<ProjInfoLayoutBaseModel>(paramObj, true)
                    .then((_data: ProjInfoLayoutBaseModel) => {   
            
                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if(_data) {                               
                        this.data = _data;
                        this.google_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.google_map);  
                        ////console.log(this.office_time);

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

    private onShortcutItemClick(shortcutItem: CheckPointBaseModel)
      {
        this.events.publish(ConstantAttributes.EVENT_APP_NAV_TO_PAGE,shortcutItem);
      }

    /*
    private goToFacBook() {
        this.events.publish(ConstantAttributes.com);
    }
    */
    
}