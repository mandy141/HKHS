import { Component, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { IonicPage, Content, FabButton, ItemSliding } from 'ionic-angular';
import { NavParams, Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { NavController } from 'ionic-angular';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { FloorPlanFormBaseModel } from '../../../models/layout-form-model/floor-plan-form-base-model';
import { FloorPlanFormGroupModel } from '../../../models/layout-form-model/floor-plan-form-group-model';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';

@IonicPage()
@Component({
    selector: 'floor-plan-layout',
    templateUrl: 'floor-plan-layout.html'
})
export class FloorPlanForm implements OnChanges, AfterViewInit {
    private data: FloorPlanFormBaseModel;    

    animateItems = [];
    animateClass: any;

    constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
        private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService, private localStorage: LocalStorageService) { 
        
        this.animateClass = { 'fade-in-left-item': true }
    }


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

            this.apiReqService.callAPIRequest<FloorPlanFormBaseModel>(paramObj, true)
                .then((_data: FloorPlanFormBaseModel) => {

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

    


    ngAfterViewInit() {
        /*this.content.ionScroll.subscribe((d) => {
            this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
        });*/
    }

    private onBackToHome() {
        this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        let that = this;
        that.data = changes['data'].currentValue;
        if (that.data && that.data.floorPlanGroups) {
            for (let i = 0; i < that.data.floorPlanGroups.length; i++) {
                setTimeout(function () {
                    that.animateItems.push(that.data.floorPlanGroups[i]);
                }, 200 * i);
            }
        }
    }

    /*
    private onShowDtl(item:FloorPlanFormGroupModel) {
        var page = new CheckPointBaseModel();
        page.componentName = item.componentName
        page.crudMode = this.data.crudMode;
        page.entityName = item.entityName;
        page.additionalParams = [];

        var additionalParamUniqueIdentifier = new KeyValueBaseModel();
        additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
        additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
        page.additionalParams.push(additionalParamUniqueIdentifier);

        this.navCtrl.push(page.componentName, page);
    }
    */
   private onShowDtl(item:FloorPlanFormGroupModel) {
    var page = new CheckPointBaseModel();
    //console.log(page);
    page.componentName = item.componentName
    page.crudMode = this.data.crudMode;
    page.entityName = item.entityName;
    page.additionalParams = [];

    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
    additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
    page.additionalParams.push(additionalParamUniqueIdentifier);
    //console.log(page);
    this.navCtrl.push(page.componentName, page);
}

    isLoggedIn() : boolean
    {
        var curUser = this.localStorage.getUser();
        ////console.log('curUser');
        ////console.log(curUser);
        if(curUser)
        {
        if(curUser.token == this.configSrv.GUEST_MODEL.token)
            return false;
        else
            return true;
        }
        else
        return false;
    }
}
