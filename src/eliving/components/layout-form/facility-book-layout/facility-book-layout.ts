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
import { FacilityBookFormBaseModel } from '../../../models/layout-form-model/facility-book-form-base-model';
import { NavController } from 'ionic-angular';
import { FacilityBookFormFacilityGroupModel } from '../../../models/layout-form-model/facility-book-form-facility-group-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { FacilityBookFormFacilityModel } from '../../../models/layout-form-model/facility-book-form-facility-model';
import { Pipe, PipeTransform } from '@angular/core';

@IonicPage()
@Component({
  selector: 'facility-book-layout',
  templateUrl: 'facility-book-layout.html'
})
export class FacilityBookForm  {
  private data: FacilityBookFormBaseModel;
  isFiltered: boolean = false;
  filterTypeDesc: string;
  allItems: any;
  datalist: any;



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

      this.apiReqService.callAPIRequest<FacilityBookFormBaseModel>(paramObj, true)
        .then((_data: FacilityBookFormBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            this.allItems = this.data.facilityGroup;
            this.datalist = JSON.parse(JSON.stringify(this.data.facilityGroup));
            
           const result = [];
            const map = new Map();
            for (const item of this.data.facilityGroup) {
                if(!map.has(item.club_name)){
                    map.set(item.club_name, true);    // set any value to Map
                    result.push({
                        id: item.club_name,
                        clubName: item.club_name
                    });
                }
            }
            this.datalist = result;
            ////console.log(this.datalist)

          }
          else
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        });
    }
    else {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
  }

 
  toggleGroup(group: FacilityBookFormFacilityGroupModel) {
    if(group.facilities.length == 1)
      this.onFacBook(group.facilities[0]);
    else
      group.show = !group.show;    
  }

  isGroupShown(group: FacilityBookFormFacilityGroupModel) {
    return group.show;
  }

 
  getGroupHeight(group: FacilityBookFormFacilityGroupModel) {       
      if(group.show)
        return group.facilities.length * 57;
      else
        return 0;    
  }

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }

  onClub(typeDesc: string) {
    if(typeDesc == "all")
    {
      this.data.facilityGroup = this.allItems;
      return true;
    }
    else
    {
      this.isFiltered = true;
      this.data.facilityGroup = this.allItems;
      this.filterTypeDesc = typeDesc;
      this.data.facilityGroup = this.data.facilityGroup.filter(item => {
        var return_value: boolean = false;
        return_value = item.club_name==typeDesc;
        return return_value;
      });
    }
    
  }



  private onFacBook(item:FacilityBookFormFacilityModel) {
    var page = new CheckPointBaseModel();
    page.componentName = this.data.componentName;
    page.crudMode = this.data.crudMode;
    page.entityName = item.entityName;
    
    page.additionalParams = [];

    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
    additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
    page.additionalParams.push(additionalParamUniqueIdentifier);


    this.navCtrl.push(page.componentName, page);
  }
  
}
