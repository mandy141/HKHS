import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { ImageGalleryBaseModel } from '../../../models/layout-form-model/image-gallery-base-model';
import { ImageGalleryGroupModel } from '../../../models/layout-form-model/image-gallery-group-model';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';

@IonicPage()
@Component({
  selector: 'image-gallery',
  templateUrl: 'image-gallery.html'
})
export class ImageGallery implements OnChanges {
  private data: ImageGalleryBaseModel;  

  allItems: any;
  isFiltered: boolean = false;
  filterTypeDesc: string;
  datalist: any;

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController) {
    
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

      this.apiReqService.callAPIRequest<ImageGalleryBaseModel>(paramObj, true)
        .then((_data: ImageGalleryBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            this.allItems = this.data.imageGroups;

            const result = [];
            const map = new Map();
            for (const item of this.data.imageGroups) {
                if(!map.has(item.year)){
                    map.set(item.year, true);    // set any value to Map
                    result.push({
                        id: item.year,
                        year: item.year
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


  private onShowDtl(item:  ImageGalleryGroupModel) {
    var page = new CheckPointBaseModel();
    //console.log(page);
    page.componentName = this.data.componentName;
    page.crudMode = this.data.crudMode;
    page.entityName = this.data.entityName;
    page.additionalParams = [];

    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
    additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
    page.additionalParams.push(additionalParamUniqueIdentifier);
    //console.log(page);
    this.navCtrl.push(page.componentName, page);
  }


  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onEvent = (event: string, item, e): void => {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  onYear(typeDesc: string) {
    //console.log(typeDesc);
    var return_value: boolean = false;
    if(typeDesc == "all")
    {
      this.data.imageGroups = this.allItems;
      return_value = true;
    }
    else
    {
    this.isFiltered = true;
    this.data.imageGroups = this.allItems;
    this.filterTypeDesc = typeDesc;
    this.data.imageGroups = this.data.imageGroups.filter(item => {
    
      return_value = item.year==typeDesc;
      return return_value;
    });

    }
  }
}
