import { Component, Input } from '@angular/core';
import { NavParams, IonicPage, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpClient } from '@angular/common/http';
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
import { MyBookingRecordBaseModel } from '../../../models/layout-form-model/my-booking-record-base-model';
import { stringify } from '@angular/compiler/src/util';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
    selector: 'my-booking-record-form',
    templateUrl: 'my-booking-record.html'
})
export class MyBookingRecord {

    private data: MyBookingRecordBaseModel;
    private uniqueIdentifier: string;
    private subIdentifier: string;
    private converted_image: any;

    constructor(private navParams: NavParams, private apiReqService : ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService, 
        private navCtrl: NavController, private social: SocialSharing, private deviceSrv: DeviceService, private http: HttpClient) {}

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
                this.subIdentifier = paramObj[ConstantAttributes.PARAM_SUB_UNIQUE_IDENTIFIER];

                this.apiReqService.callAPIRequest<MyBookingRecordBaseModel>(paramObj, true)
                    .then((_data: MyBookingRecordBaseModel) => {   
            
                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if(_data) {                               
                        this.data = _data;                        
                        this.converted_image = "data:image/jpeg;base64," + this.data.bookQrCode;
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

    private onClose(){
        this.navCtrl.pop();
    }

    private isDesktop() {
        if (this.deviceSrv.getPlatform() == ConstantAttributes.DEVICE_DESKTOP)
            return true;
        else
            return false;
    }

    /*
    private onShare()
    { 
        
        this.social.shareViaWhatsApp(this.data.QRMessage, "data:image/jpeg;base64," + this.data.QRImage, null);       
        
        
    }
    */

}