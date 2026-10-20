import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, Content, FabButton, ItemSliding } from 'ionic-angular';
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
import { HouseRulesFormBaseModel } from '../../../models/layout-form-model/house-rules-form-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { HscMenuLayoutBaseModel } from '../../../models/layout-form-model/hsc-menu-layout-base-mode';

@IonicPage()
@Component({
    selector: 'hsc-menu-layout',
    templateUrl: 'hsc-menu-layout.html'
})
export class HscMenuLayout implements AfterViewInit {
    private data: HscMenuLayoutBaseModel;    

    filterType: string;
    allItems: any;
    datalist: any;

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

            this.apiReqService.callAPIRequest<HscMenuLayoutBaseModel>(paramObj, true)
                .then((_data: HscMenuLayoutBaseModel) => {

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

    onEvent(event: string, item: any, e: any) {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    undo = (slidingItem: ItemSliding) => {
        slidingItem.close();
    }


    ngAfterViewInit() {
        /*this.content.ionScroll.subscribe((d) => {
            this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
        });*/
    }

    private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }

    private onItemClick(MeniItem: CheckPointBaseModel)
    {
      //console.log(MeniItem);
        this.events.publish(ConstantAttributes.EVENT_APP_PUSH_TO_PAGE,MeniItem);
        //this.events.publish(ConstantAttributes.EVENT_APP_NAV_TO_PAGE,MeniItem);

        //if(pushPage)
        //this.nav.push(page.componentName, page);
      //else
       // this.nav.setRoot(page.componentName, page);
    }

}
