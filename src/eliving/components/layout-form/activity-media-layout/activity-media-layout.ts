import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { ActivityMediaLayoutBaseModel } from '../../../models/layout-form-model/activity-media-layout-base-model';
import { ActivingMediaRecordModel } from '../../../models/layout-form-model/activity-media-layout-record-model';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { ActivityFormPageModel } from '../../../models/layout-form-model/activity-form-page-model';


@IonicPage()
@Component({
  selector: 'activity-media-layout',
  templateUrl: 'activity-media-layout.html',
})
export class ActivityMediaLayout implements OnChanges {
  private data: ActivityMediaLayoutBaseModel;  

  public selectedItem = "";
  allItems: any;
  isFiltered: boolean = false;
  filterTypeDesc: string;
  datalist: any;
  page0Datalist: any;
  page1Datalist: any;

  page0DataItemlist: any;
  page1DataItemlist: any;

  pageTitle:string;

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

      this.apiReqService.callAPIRequest<ActivityMediaLayoutBaseModel>(paramObj, true)
        .then((_data: ActivityMediaLayoutBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            if(this.data != null && this.data != undefined)
            {
              this.selectedItem = this.data.selectedPageIndex;
              //console.log(this.data);
              //console.log("selectedItem");
              //console.log(this.selectedItem);

              this.allItems = this.data;
              
              const result0 = [];
              const map0 = new Map();
              for (const item of this.data.pages[0].records) {
                  if(!map0.has(item.groupName)){
                    map0.set(item.groupName, true);    // set any value to Map
                      result0.push({
                          id: item.uniqueIdentifier,
                          groupName: item.groupName,
                          uniqueIdentifier: item.uniqueIdentifier,
                          title: item.title,
                          image: item.image,
                          noOfImage: item.noOfImage
                      });
                  }
              }
              this.page0Datalist = result0;

              const result1 = [];
              const map1 = new Map();
              for (const item of this.data.pages[1].records) {
                  if(!map1.has(item.groupName)){
                    map1.set(item.groupName, true);    // set any value to Map
                      result1.push({
                          id: item.uniqueIdentifier,
                          groupName: item.groupName,
                          uniqueIdentifier: item.uniqueIdentifier,
                          title: item.title,
                          image: item.image,
                          noOfImage: item.noOfImage
                      });
                  }
              }
              this.page1Datalist = result1;
              
              this.pageTitle = this.data.formTitle;

              this.page0DataItemlist = this.data.pages[0].records;
              this.page1DataItemlist = this.data.pages[1].records;
              
              
              //console.log("page0Datalist");
              //console.log(this.page0Datalist);
              }
            else
            {

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


  private onShowDtl(item:  ActivingMediaRecordModel) {
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

  onYear(pageIndex: number, typeDesc: string) {//(selectedItem :string, typeDesc: string) {
    ////console.log(typeDesc);
    ////console.log(pageIndex);
    var return_value: boolean = false;

    //this.allItems = this.data.pages[pageIndex].records;
    //return_value = true;

    if(typeDesc == "all")
    {
      //this.data.pages[pageIndex].records = this.allItems.pages[pageIndex].records;
      if(pageIndex == 0)
      {
        this.page0DataItemlist = this.allItems.pages[pageIndex].records;
        return_value = true;
      }
      else
      {
        this.page1DataItemlist = this.allItems.pages[pageIndex].records;
        return_value = true;
      }
     
    }
    else
    {
      if(pageIndex == 0)
      {
        this.isFiltered = true;
        this.page0DataItemlist = this.allItems.pages[pageIndex].records;;
        this.filterTypeDesc = typeDesc;
        this.page0DataItemlist = this.data.pages[pageIndex].records.filter(item => {
        
          return_value = item.groupName==typeDesc;

          return return_value;
        });
      }
      else
      {
        this.isFiltered = true;
        this.page1DataItemlist = this.allItems.pages[pageIndex].records;;
        this.filterTypeDesc = typeDesc;
        this.page1DataItemlist = this.data.pages[pageIndex].records.filter(item => {
        
          return_value = item.groupName==typeDesc;
          return return_value;
        });
      }
      
    }

    /*
    var return_value: boolean = false;
    if(typeDesc == "all")
    {
      this.data.pages[selectedItem].records = this.allItems;
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

    }*/

  }

  isEnabled(value: string): boolean {
    return this.selectedItem == value;
  }

  segmentChanged(ev: any) {
    if(ev == "0")
    {
      this.pageTitle = this.data.pages[0].pageName;
    }
    else
    {
      this.pageTitle = this.data.pages[1].pageName;
    }
  }
}
