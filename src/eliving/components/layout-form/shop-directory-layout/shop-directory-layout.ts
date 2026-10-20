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
import { ShopDirectoryFormBaseModel } from '../../../models/layout-form-model/shop-directory-form-base.model';
import { NavController } from 'ionic-angular';
import { ShopDirectoryRecordGroupModel } from '../../../models/layout-form-model/shop_directory-record-group-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { ShopDirectoryFormRecordModel } from '../../../models/layout-form-model/shop-directory-form-record-model';

@IonicPage()
@Component({
  selector: 'shop-directory-layout',
  templateUrl: 'shop-directory-layout.html'
})
export class ShopDirectoryForm implements AfterViewInit {
  private data: ShopDirectoryFormBaseModel;  

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController) { }
  
  
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

      this.apiReqService.callAPIRequest<ShopDirectoryFormBaseModel>(paramObj, true)
        .then((_data: ShopDirectoryFormBaseModel) => {

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

  toggleGroup(group: ShopDirectoryRecordGroupModel) {
    group.show = !group.show;    
  }

  isGroupShown(group: ShopDirectoryRecordGroupModel) {
    return group.show;
  }

  ngAfterViewInit() {
    // this.content.ionScroll.subscribe((d) => {
    //   this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
    // });
  }

  getGroupHeight(group: ShopDirectoryRecordGroupModel) {  
    /*     
      if(group.show)
        return group.records.length * 60;
      else
        return 0;    
      */
     if(group.show)
     {
      
     var itemHeight = 0;
     
     for (var index = 0; index < group.records.length; index++) {
      var element =  group.records[index];
      itemHeight +=  Number(element.height);
      ////console.log(itemHeight);
      }
      return itemHeight+37; 
    }
    else
    {
      return itemHeight; 
    }
      
      

  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }

/*
  private onFacBook(item:ShopDirectoryFormRecordModel) {
    var page = new CheckPointBaseModel();
    page.componentName = this.data.componentName;
    page.crudMode = this.data.crudMode;
    page.entityName = item.shopID;
    
    page.additionalParams = [];

    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
    //additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
    page.additionalParams.push(additionalParamUniqueIdentifier);


    this.navCtrl.push(page.componentName, page);
  }
*/
}
