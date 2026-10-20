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
import { NotificationFormBaseModel } from '../../../models/layout-form-model/notification-form-base-model';
import { ConfigService } from '../../../../framework/services/config-service';

@IonicPage()
@Component({
    selector: 'notification-layout',
    templateUrl: 'notification-layout.html'
})
export class NotificationForm implements AfterViewInit {
    private data: NotificationFormBaseModel;

    slider = {};
    constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
        private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private configSrv: ConfigService) { }



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

            this.apiReqService.callAPIRequest<NotificationFormBaseModel>(paramObj, true)
                .then((_data: NotificationFormBaseModel) => {

                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if (_data) {
                        this.data = _data;
                        //console.log(this.data);

                        //Clear Menu Unread Notification Count
                        //this.configSrv.reCalMenuNotificationCount(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME));
                        //Clear Mean Header Notification Count
                        this.configSrv.CURRENT_MENU_MODEL.unreadNotificationCnt = "0";
                    }                    
                    else
                        this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
                });
        }
        else {
            this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
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
