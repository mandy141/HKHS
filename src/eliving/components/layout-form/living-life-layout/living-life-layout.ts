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
import { LivingLifeRecordModel } from '../../../models/layout-form-model/living-life-layout-record-model';
import { ConfigService } from '../../../../framework/services/config-service';

@IonicPage()
@Component({
    selector: 'living-life-layout',
    templateUrl: 'living-life-layout.html'
})
export class LivingLifeLayout implements AfterViewInit {
    private data: LivingLifeRecordModel;
    
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

            this.apiReqService.callAPIRequest<LivingLifeRecordModel>(paramObj, true)
                .then((_data: LivingLifeRecordModel) => {

                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();

                    if (_data) {
                      this.data = _data;
                      this.allItems = this.data.record;
                      if(this.allItems != null && this.allItems != undefined)
                      {
                        this.datalist = JSON.parse(JSON.stringify(this.data.record))
                        const result = [];
                        const map = new Map();
                        for (const item of this.data.record) {
                            if(!map.has(item.typeDesc)){
                                map.set(item.typeDesc, true);    // set any value to Map
                                result.push({
                                    id: item.typeDesc,
                                    typeDesc: item.typeDesc
                                });
                            }
                        }
                        this.datalist = result;
                      }
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
        this.configSrv.openExtUrl(openURL);
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


    onType(typeDesc: string) {
      ////console.log(typeDesc);
      var return_value: boolean = false;
      if(typeDesc == "all")
      {
        this.data.record = this.allItems;
        return_value = true;
      }
      else
      {
      this.isFiltered = true;
      this.data.record = this.allItems;
      this.filterTypeDesc = typeDesc;
      this.data.record = this.data.record.filter(item => {
      
        return_value = item.typeDesc==typeDesc;
        return return_value;
      });
      }
    }

    filterType(typeDesc: string) {
      if (this.filterTypeDesc && this.filterTypeDesc.trim() !== '') {
        this.data.record = this.allItems;
        this.filterTypeDesc = '';
        this.datalist.typeDesc = 'all';
        this.isFiltered = false;
      } else {
        this.isFiltered = true;
        this.filterTypeDesc = typeDesc;
        this.data.record = this.data.record.filter(item => {
          var return_value: boolean = false;
          return_value = item.typeDesc.toLowerCase()==typeDesc.toLowerCase();
          this.datalist.typeDesc = typeDesc;
          return return_value;
          
        });
      }
    }

    ngAfterViewInit() {
        
    }
}
