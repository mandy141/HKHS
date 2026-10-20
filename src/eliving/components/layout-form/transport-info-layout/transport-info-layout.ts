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
import { TransportInfoFormBaseModel } from '../../../models/layout-form-model/transport-info-form-base-model';
import { ConfigService } from '../../../../framework/services/config-service';

@IonicPage()
@Component({
    selector: 'transport-info-layout',
    templateUrl: 'transport-info-layout.html'
})
export class TransportInfoForm implements AfterViewInit {
    private data: TransportInfoFormBaseModel;
    
    datalist: any;
    allItems: any;
    isFiltered: boolean = false;
    filterTypeDesc: string;
    filterDistrictDesc: string;

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

            this.apiReqService.callAPIRequest<TransportInfoFormBaseModel>(paramObj, true)
                .then((_data: TransportInfoFormBaseModel) => {

                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if (_data) {
                        this.data = _data;
                        this.datalist = JSON.parse(JSON.stringify(this.data.routes));
                        this.allItems = this.data.routes;

                        const result = [];
                        const map = new Map();
                        for (const item of this.data.routes) {
                            if (!map.has(item.district)) {
                                map.set(item.district, true);    // set any value to Map
                                result.push({
                                    id: item.district,
                                    type: item.district
                                });
                            }
                        }
                        this.datalist = result;
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

    onDistrict(districtDesc: string) {
        ////console.log(typeDesc);
        var return_value: boolean = false;
        if (districtDesc == "all") {
            this.data.routes = this.allItems;
            this.filterDistrictDesc = '';
            return_value = true;
            if (this.filterTypeDesc!='') {
                this.filterType(this.filterTypeDesc);
            }
        }
        else {
            this.isFiltered = true;
            this.data.routes = this.allItems;
            this.filterDistrictDesc = districtDesc;
            this.data.routes = this.data.routes.filter(item => {

                return_value = item.district == districtDesc;
                return return_value;
            });

        }
    }  

    filterType(typeDesc: string) {
        if (this.filterTypeDesc && this.filterTypeDesc.trim() !== '') {
            this.data.routes = this.allItems;
            this.filterTypeDesc = '';
            this.isFiltered = false;
            if (this.filterDistrictDesc && this.filterDistrictDesc.trim()!='')
            { 
                this.onDistrict(this.filterDistrictDesc);
            }            
        } else {
            this.isFiltered = true;
            this.filterTypeDesc = typeDesc;
            this.data.routes = this.data.routes.filter(item => {
                var return_value: boolean = false;
                return_value = item.type.toLowerCase() == typeDesc.toLowerCase();
                return return_value;
            });
        }
    }

    ngAfterViewInit() {
        
    }
}
