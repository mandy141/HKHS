import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { NavParams, Events, AlertController } from 'ionic-angular';
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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyBookingFormBookingModel } from '../../../models/layout-form-model/my-booking-form-booking-model';
import { ApiResultModel } from '../../../../framework/models/dynamic-form-model/api-result-model';
import { MyBookingFormBaseModel } from '../../../models/layout-form-model/my-booking-form-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { MyBookingFormPageModel } from '../../../models/layout-form-model/my-booking-form-page-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';
import { templateSourceUrl } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'my-booking-layout',
  templateUrl: 'my-booking-layout.html'
})

export class MyBookingForm  {
  private data: MyBookingFormBaseModel;    

  public selectedItem = "";

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController,  private alertCtrl: AlertController, private iab:InAppBrowser,
    private configSrv: ConfigService, private localStorage: LocalStorageService) { }


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

      this.apiReqService.callAPIRequest<MyBookingFormBaseModel>(paramObj, true)
        .then((_data: MyBookingFormBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          //console.log(_data);
          if (_data) {
            this.data = _data;
            if(this.data != null && this.data != undefined)
            {
              this.selectedItem = this.data.pages[0].pageId;
              //console.log(this.selectedItem);
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
         
        });
    }
    else {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
  }

  
  isEnabled(value: string): boolean {
    return this.selectedItem == value;
  }

  private onMarkDelete(record: MyBookingFormBookingModel, pageIndex: number, recordIndex: number) {
    let alertPopup = this.alertCtrl.create({
      message: this.data.lblDeleteWarning,
      buttons: [{
        text: this.data.lblDeleteYesAns,
        handler: () => {
          alertPopup.dismiss().then(() => {
            this.coreMarkDelete(record, pageIndex, recordIndex);
          });
          return false;
        }
      },
      {
        text: this.data.lblDeleteNoAns,
        handler: () => {
          // need to do something if the user stays?
        }
      }]
    });

    // Show the alert
    alertPopup.present();
  } 

  private coreMarkDelete(record: MyBookingFormBookingModel, pageIndex: number, recordIndex: number) {
    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = ConstantAttributes.API_REQUEST_TYPE_FORM_SUBMIT;
    paramObj[ConstantAttributes.PARAM_CRUD_MODE] = ConstantAttributes.CRUD_MODE_DELETE;
    paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] = record.uniqueIdentifier;

    this.apiReqService.callAPIRequest<ApiResultModel<MyBookingFormBookingModel[]>>(paramObj, true)
      .then((data: ApiResultModel<MyBookingFormBookingModel[]>) => {
        if (data && data.result) {
          //Replace the item detail with updated status
          var temp = this.data.pages[pageIndex].bookings[recordIndex];
          temp.allowPay = false;
          temp.allowDelete = false;
          //this.data.pages[pageIndex + 2].bookings.push(this.data.pages[pageIndex].bookings[recordIndex]);
          this.data.pages[pageIndex + 2].bookings.push(temp);
          this.data.pages[pageIndex].bookings.splice(recordIndex, 1);
        }
        else {
          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();
          this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }
      }).catch(error => {
        //Do Nothing 
      });
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }

  
  
  private popInAppBrowser(uniqueIdentifier: string, url:string)
  {     
    var options = "location=yes;fullscreen=yes";   
    
    const browser = this.iab.create(url, '_blank', options);   
    browser.on('exit').subscribe(event => {
      alert(event);
    });

  }

  private onItemClick(booking: MyBookingFormBookingModel)
  {
    if(booking.allowShowDtl)
    {
      this.onShowDtl(booking.uniqueIdentifier, booking.subIdentifier);
    }    
  }
   
  private onShowDtl(uniqueIdentifier: string, subIdentifier:number) {
    
      //console.log(uniqueIdentifier);
      //console.log(subIdentifier);
      var page = new CheckPointBaseModel();
      page.componentName = this.data.componentName;
      page.crudMode = this.data.crudMode;
      page.entityName = this.data.entityName;
      page.additionalParams = [];

      ////console.log(page);

      var additionalParamUniqueIdentifier = new KeyValueBaseModel();
      additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
      additionalParamUniqueIdentifier.value = uniqueIdentifier;
      page.additionalParams.push(additionalParamUniqueIdentifier);


      var additionalParamSubUniqueIdentifier = new KeyValueBaseModel();;
      additionalParamSubUniqueIdentifier.key = ConstantAttributes.PARAM_SUB_UNIQUE_IDENTIFIER;
      additionalParamSubUniqueIdentifier.value = subIdentifier;
      page.additionalParams.push(additionalParamSubUniqueIdentifier);
      //console.log(page.additionalParams);
      this.navCtrl.push(page.componentName, page);
    
  }


  private onPay(uniqueIdentifier: string, payURL:string)
  { 
    this.popInAppBrowser(uniqueIdentifier,payURL);    
  }
  
  private onItemLongPress(page: MyBookingFormPageModel, booking: MyBookingFormBookingModel)
  {
    if(booking.allowPay)
    {
      page.multipleSelect = true;
      booking.selected = true;
    }
  }

  private onSelectUnSelectAllAllowPay(page: MyBookingFormPageModel, value: boolean)
  {
    if(page.multipleSelect)
    {
      for(let booking of page.bookings)
      {
        if(booking.allowPay)
          booking.selected = value;
      }
    }
  }

  private isAllAllowPayBookingSelected(page: MyBookingFormPageModel)
  {
    if(page.multipleSelect)
    {
      var isAllSelected = true;

      for(let booking of page.bookings)
      {
        if(page.multipleSelect && booking.allowPay && !booking.selected)
        {
          isAllSelected = false;
          break;
        }
      }

      return isAllSelected;
    }
    else
      return false;
  }

  private getSelectedBookingCount(page: MyBookingFormPageModel): number
  {
    if(page.multipleSelect)
    {
      var count: number = 0;

      for(let booking of page.bookings)
      {
        if(booking.selected)
          count++;
      }

      return count;
    }
    else
      return 0;
  }
}
