import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams,  Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../../framework/services/loading-spinner-service';
import { ApiRequestService } from '../../../../framework/services/api-request-service';
import { HttpParams } from '@angular/common/http';
import { ConstantAttributes } from '../../../../framework/attributes/constant-attributes';
import { TenantFeedbackListBaseModel } from '../../../models/layout-form-model/tenant-feedback-list-layout-base-model';
import { DeviceService } from '../../../../framework/services/device-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CheckPointBaseModel } from '../../../../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../../../../framework/models/key-value-base-model';
import { NavController } from 'ionic-angular';
import { TenantFeedbackDetail } from '../../../models/layout-form-model/tenant-feedback-detail-layout-model';
import { ConfigService } from '../../../../framework/services/config-service';
import { AlertController } from 'ionic-angular';
import { LocalStorageService } from '../../../../framework/services/local-storage-service';
import { of } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { e } from '@angular/core/src/render3';

/**
 * Generated class for the TenantFeedbackListLayoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'tenant-feedback-list-layout',
  templateUrl: 'tenant-feedback-list-layout.html',
})
export class TenantFeedbackListLayout {

  private data: TenantFeedbackListBaseModel;
  

  constructor(private navParams: NavParams, private apiReqService: ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService,
    private deviceSrv: DeviceService, private photoViewer: PhotoViewer, private navCtrl: NavController, private configSrv: ConfigService,  private alertCtrl: AlertController,
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

      this.apiReqService.callAPIRequest<TenantFeedbackListBaseModel>(paramObj, true)
        .then((_data: TenantFeedbackListBaseModel) => {

          //Dismiss All Loading Spinner
          this.loadingSrv.dismissAllLoading();

          if (_data) {
            this.data = _data;
            //console.log(this.data);
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
        });
    }
    else {
      this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
    }
  }
  

  private onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
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
  


  private onShowDtl(item:TenantFeedbackDetail) {
    ////console.log(item);

    ////console.log(item.telValue);  
    let alert = this.alertCtrl.create({
      title: this.data.alertTitle,
      message: item.refNoText+item.refNoValue,
      inputs: [
        {
          name: 'inputRefNo',
          type: 'number',
          placeholder: this.data.inputRefNoText
        }
      ],
      buttons: [
        {
          text: this.data.btnCancelText,
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: this.data.btnOKText,
          handler: data => {
            if(data.inputRefNo != "")
            {
              var rePhone = new RegExp(this.data.validatePhoneNoPattern);
              if(!rePhone.test(data.inputRefNo.trim())) {                
                
                let alertPopup = this.alertCtrl.create({
                  title: '',
                  subTitle: this.data.lblInvalidPhoneNoMsg,
                  buttons: [{
                    text: this.data.btnOKText,
                    handler: () => {
                      // user has clicked the alert button
                      // begin the alert's dismiss transition
                      let navTransition = alertPopup.dismiss();
                      //this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
                
                    }
  
                  }]
                });
  
                              // Show the alert
                              alertPopup.present();
              }
              else
              {
              var page = new CheckPointBaseModel();
              page.componentName = this.data.componentName;
              page.crudMode = this.data.crudMode;
              page.entityName = this.data.entityName;
              page.additionalParams = [];


                ////console.log(page);

                var additionalParamUniqueIdentifier = new KeyValueBaseModel();
                additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
                additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
                page.additionalParams.push(additionalParamUniqueIdentifier);

                var additionalParamSubUniqueIdentifier = new KeyValueBaseModel();;
                    additionalParamSubUniqueIdentifier.key = ConstantAttributes.PARAM_SUB_UNIQUE_IDENTIFIER;
                    additionalParamSubUniqueIdentifier.value = data.inputRefNo;
                    page.additionalParams.push(additionalParamSubUniqueIdentifier);

                ////console.log(page.componentName);
                this.navCtrl.push(page.componentName, page);
              }
            }
            else
            {
              //console.log("no data");

              let alertPopup = this.alertCtrl.create({
                title: '',
                subTitle: this.data.errTelValue,
                buttons: [{
                  text: this.data.btnOKText,
                  handler: () => {
                    // user has clicked the alert button
                    // begin the alert's dismiss transition
                    let navTransition = alertPopup.dismiss();
                    //this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
              
                  }

                }]
              });

                            // Show the alert
                            alertPopup.present();
            }
            ////console.log(data.inputRefNo);
            /*
            if(data.inputRefNo == item.telValue)
            {
            var page = new CheckPointBaseModel();
              page.componentName = this.data.componentName;
              page.crudMode = this.data.crudMode;
              page.entityName = this.data.entityName;
              page.additionalParams = [];


                ////console.log(page);

                var additionalParamUniqueIdentifier = new KeyValueBaseModel();
                additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
                additionalParamUniqueIdentifier.value = item.uniqueIdentifier;
                page.additionalParams.push(additionalParamUniqueIdentifier);
                //console.log(page.componentName);
                this.navCtrl.push(page.componentName, page);
            }
            else
            {
              //console.log("no data");

              let alertPopup = this.alertCtrl.create({
                title: '',
                subTitle: this.data.errTelValue,
                buttons: [{
                  text: this.data.btnOKText,
                  handler: () => {
                    // user has clicked the alert button
                    // begin the alert's dismiss transition
                    let navTransition = alertPopup.dismiss();
                    //this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
              
                  }

                }]
              });

                            // Show the alert
                            alertPopup.present();
            }
            */
          }
        }
      ]
    });
    alert.present();

    
    
  }




}
