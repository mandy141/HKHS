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

import { MeetingFormDocModel } from '../../../models/layout-form-model/meeting-form-doc-model';
import { MyCentralFormGroupModel } from '../../../models/layout-form-model/my-central-form-group-model';
import { MyCentralFormBaseModel } from '../../../models/layout-form-model/my-central-form-base-model';
import { ApplicationFormBaseModel } from '../../../models/layout-form-model/application-form-base-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';

@IonicPage()
@Component({
    selector: 'application-form-layout',
    templateUrl: 'application-form-layout.html'
})
export class ApplicationForm implements AfterViewInit {
    private data: ApplicationFormBaseModel;   

    filterType: string;
    allItems: any;
    datalist: any;

    constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
        private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService,
        private localStorage: LocalStorageService) { }


    ngOnInit() {
        ////console.log('entity = '+this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME));
        ////console.log('requestForm = '+ConstantAttributes.API_REQUEST_TYPE_LOAD_LAYOUT_FORM);
        ////console.log('crud = '+this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE));
        ////console.log('addit = '+this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS));
        if (this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME)) {
            ////console.log('crud = '+this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE));
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
            ////console.log(paramObj);
            this.apiReqService.callAPIRequest<ApplicationFormBaseModel>(paramObj, true)
                .then((_data: ApplicationFormBaseModel) => {

                    //Dismiss All Loading Spinner
                    this.loadingSrv.dismissAllLoading();
                    if (_data) {
                        this.data = _data;
                        this.allItems = this.data.documents;
                        this.datalist = JSON.parse(JSON.stringify(this.data.documents));

                        const result = [];
                        const map = new Map();
                        for (const item of this.data.documents) {
                            if(!map.has(item.title)){
                                map.set(item.title, true);    // set any value to Map
                                result.push({
                                    id: item.title,
                                    title: item.title
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

    delete = (item: any): void => {
        let index = this.data.documents.indexOf(item);
        if (index > -1) {
            this.data.documents.splice(index, 1);
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

    onItemClick(openURL: string, fileName: string) {
        //this.configSrv.openURL(openURL);
        if(this.localStorage.getLang() == ConstantAttributes.LANG_CHI)
        {
            this.configSrv.downloadFile(openURL, fileName);
        }
        else
        {
            this.configSrv.downloadFile(openURL, fileName);
        }
    }

    onType(title: string) {
        ////console.log(title);
        var return_value: boolean = false;
        if(title == "all")
        {
          this.data.documents = this.allItems;
          return_value = true;
        }
        else
        {
        this.data.documents = this.allItems;
        this.filterType = title;
        this.data.documents = this.data.documents.filter(item => {
        
          return_value = item.title==title;
          return return_value;
        });
    
        }
      }
}
