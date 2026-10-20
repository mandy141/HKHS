import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams,  Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { ClubhouseNoticeLayoutFormBaseModel } from '../../../models/layout-form-model/clubhouse-notice-layout-form-base-model';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { NavController } from 'ionic-angular';
import { ClubhouseNoticeLayoutFormRecordModel } from '../../../models/layout-form-model/clubhouse-notice-layout-form-record-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { e } from '@angular/core/src/render3';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';


@IonicPage()
@Component({
    selector: 'clubhouse-notice-form',
    templateUrl: 'clubhouse-notice-form.html'
})
  
  
  
export class ClubhouseNoticeForm {
  private data: ClubhouseNoticeLayoutFormBaseModel;

  searchTerm:any="";
  allItems: any;
  isFiltered: boolean = false;
  filterTypeDesc: string;
  datalist: any;
  categories: any;

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService, private alertCtrl: AlertController,
    private localStorage: LocalStorageService) { }
  
  
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

      this.apiReqService.callAPIRequest<ClubhouseNoticeLayoutFormBaseModel>(paramObj, true)
        .then((_data: ClubhouseNoticeLayoutFormBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            this.allItems = this.data.noticeItems;
            if(this.allItems != null && this.allItems != undefined)
            {
              this.datalist = JSON.parse(JSON.stringify(this.data.noticeItems));
              
              const result = [];
              const map = new Map();
              for (const item of this.data.noticeItems) {
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
            else
            {
              ////console.log("no data");
              let msg_ok = "";
              let msg_no_data = "";
              if(this.localStorage.getLang() == ConstantAttributes.LANG_CHI)
              {
                msg_ok = this.configSrv.MSG_OK_TC;
                msg_no_data = this.configSrv.MSG_NO_DATA_TC;
              }
              else{
                msg_ok = this.configSrv.MSG_OK_TC;
                msg_no_data = this.configSrv.MSG_NO_DATA_TC;
              }

              let alertPopup = this.alertCtrl.create({
                title: '',
                subTitle: msg_no_data,
                buttons: [{
                  text: msg_ok,
                  handler: () => {
                    // user has clicked the alert button
                    // begin the alert's dismiss transition
                    let navTransition = alertPopup.dismiss();
                    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
              
                  }

                }]
              });
          
              // Show the alert
              alertPopup.present();
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
  

  
  filterItems(ev: any) {
    let val = ev.target.value;
    
    this.data.noticeItems = this.allItems;
    if (val && val.trim() !== '') {
      this.isFiltered = true;      
      this.data.noticeItems = this.data.noticeItems.filter(item => {
        var return_value: boolean = false;
        if (this.filterTypeDesc && this.filterTypeDesc.trim() !== '') {
          return_value = item.desc.toLowerCase().includes(val.toLowerCase()) && item.typeDesc.toLowerCase()==this.filterTypeDesc.toLowerCase();
        } else
        { 
          return_value = item.desc.toLowerCase().includes(val.toLowerCase());
        }
        return return_value;
      });
      
    } else {
      this.isFiltered = false;      
    }
  }

  filterType(typeDesc: string) {
    if (this.filterTypeDesc && this.filterTypeDesc.trim() !== '') {
      this.data.noticeItems = this.allItems;
      this.filterTypeDesc = '';
      this.datalist.typeDesc = 'all';
      this.isFiltered = false;
    } else {
      this.isFiltered = true;
      this.filterTypeDesc = typeDesc;
      this.data.noticeItems = this.data.noticeItems.filter(item => {
        var return_value: boolean = false;
        return_value = item.typeDesc.toLowerCase()==typeDesc.toLowerCase();
        this.datalist.typeDesc = typeDesc;
        return return_value;
        
      });
    }
  }


/*
  onType(typeDesc: string) {
    //console.log(typeDesc);
    this.isFiltered = true;
    this.data.noticeItems = this.allItems;
    this.filterTypeDesc = typeDesc;
    this.data.noticeItems = this.data.noticeItems.filter(item => {
      var return_value: boolean = false;
      return_value = item.typeDesc==typeDesc;
      return return_value;
    });
  
}
*/
  onType(typeDesc: string) {
    ////console.log(typeDesc);
    var return_value: boolean = false;
    if(typeDesc == "all")
    {
      this.data.noticeItems = this.allItems;
      return_value = true;
    }
    else
    {
    this.isFiltered = true;
    this.data.noticeItems = this.allItems;
    this.filterTypeDesc = typeDesc;
    this.data.noticeItems = this.data.noticeItems.filter(item => {
    
      return_value = item.typeDesc==typeDesc;
      return return_value;
    });

    }
  }

  onItemClick(openURL: string) {
    this.configSrv.openURL(openURL);
  }

  private onShowDtl(item:ClubhouseNoticeLayoutFormRecordModel) {
    //console.log(item);
    var page = new CheckPointBaseModel();
    page.componentName = this.data.componentName;
    page.crudMode = this.data.crudMode;
    page.entityName = this.data.entityName;
    page.additionalParams = [];

    if(item.fileurl && item.fileurl.trim().length > 0)
    {
      this.configSrv.openURL(item.fileurl);
    }
    else
    {
      //console.log(page);

      var additionalParamUniqueIdentifier = new KeyValueBaseModel();
      additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
      additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
      page.additionalParams.push(additionalParamUniqueIdentifier);
      
      this.navCtrl.push(page.componentName, page);
    }
}



}
