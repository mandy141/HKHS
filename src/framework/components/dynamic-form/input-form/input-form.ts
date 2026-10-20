import { Component, OnInit, DoCheck, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, Content, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { InputFormBaseModel }  from '../../../models/dynamic-form-model/input-form-base-model';
import { InputFieldBaseModel } from '../../../models/dynamic-form-model/input-field-base-model';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ApiRequestService }    from '../../../services/api-request-service';
import { ToastController } from 'ionic-angular';
import moment from '../../../../assets/js/moment.min.js';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { Events } from 'ionic-angular';
import { LoadingSpinnerService } from '../../../services/loading-spinner-service';
import { HttpParams } from '@angular/common/http';
import { CheckPointBaseModel } from '../../../models/check-point-base-model';
import { ApiResultModel } from '../../../models/dynamic-form-model/api-result-model';
import { KeyValueBaseModel } from '../../../models/key-value-base-model';
import { LocalStorageService } from '../../../services/local-storage-service';
import { ConfigService } from '../../../services/config-service';
import { DeviceService } from '../../../services/device-service';
import { SavedResultBaseModel } from '../../../models/saved-result-base-model';

@IonicPage()
@Component({
  selector: 'page-input-form',
  templateUrl: 'input-form.html',
  providers: [ DynamicFormControlService, ApiRequestService ]
})
export class InputFormPage {

  @ViewChild('inputPageElement') inputPageElement: Content;
   
  //inputFieldModels: InputFieldBaseModel[] = [];
  inputFormModel: InputFormBaseModel = new InputFormBaseModel();
  inputForm: FormGroup = new FormGroup({});
  private curTabIndex : string;
  private isEditing: boolean;
  private sSubmitFailedMsgs: string[];
  private prevPageCallBackFn: any;
  private currentEntityUniqueIdentifier: string;
  private availableEntityUniqueIdentifiers: string[];

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, private navParams: NavParams, private fb: FormBuilder, private qcs: DynamicFormControlService, private toastCtrl: ToastController, private cd: ChangeDetectorRef,
    private apiReqService : ApiRequestService, private events: Events, private loadingSrv: LoadingSpinnerService, private alertCtrl: AlertController, private localStorage: LocalStorageService, private deviceSrv: DeviceService, private configSrv: ConfigService) {    
    this.curTabIndex = '0';   
    this.isEditing = false; 
  }
  
  get useSmallFont() {
    if(this.deviceSrv.getScreenSize() == ConstantAttributes.DEVICE_MOBILE)
    {
      return true;
    }
    else
      return false;
  }

  get ConstantAttributes() { return ConstantAttributes; }

  ngOnInit() {            
    if(this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME))
    {
      //Set the Callback Function if exists
      this.prevPageCallBackFn = this.navParams.get(ConstantAttributes.PARAM_PREIVOUS_PAGE_CALLBACK_FN);

      this.reloadInputForm(true);
    }
    else
      this.onBackToHome();      
  }

  private switchToPrevEntity()
  {
    this.currentEntityUniqueIdentifier = this.getPrevUniqueIdentifier();
    this.reloadInputForm(false);
  }

  private switchToNextEntity()
  {
    this.currentEntityUniqueIdentifier = this.getNextUniqueIdentifier();
    this.reloadInputForm(false);
  }

  private getPrevUniqueIdentifier()
  {
    var _index = this.availableEntityUniqueIdentifiers.indexOf(this.currentEntityUniqueIdentifier);
    _index = _index - 1;

    if(_index < 0)
      return this.availableEntityUniqueIdentifiers[this.availableEntityUniqueIdentifiers.length - 1];
    else
      return this.availableEntityUniqueIdentifiers[_index];
  }

  private getNextUniqueIdentifier()
  {
    var _index = this.availableEntityUniqueIdentifiers.indexOf(this.currentEntityUniqueIdentifier);
    _index = _index + 1;

    if(_index >= this.availableEntityUniqueIdentifiers.length)
      return this.availableEntityUniqueIdentifiers[0];
    else
      return this.availableEntityUniqueIdentifiers[_index];
  }

  private reloadInputForm(_firstLoad: boolean)
  {
    //Set API Call Param
    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_LOAD_DYNAMIC_INPUT_FORM;
    paramObj[ConstantAttributes.PARAM_CRUD_MODE] = this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE);
    if(this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS))
    {
      var additionalParams : { key: string, value: string} [] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
      for(let additionalParam of additionalParams)
      {
        paramObj[additionalParam.key] = additionalParam.value;
      }
    }
    
    if(_firstLoad)
    {
      //Store Unique Identifiers
      if(paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER])
        this.currentEntityUniqueIdentifier = paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER];
      if(paramObj[ConstantAttributes.PARAM_AVAILABLE_UNIQUE_IDENTIFIERS])
        this.availableEntityUniqueIdentifiers = paramObj[ConstantAttributes.PARAM_AVAILABLE_UNIQUE_IDENTIFIERS];
    }
    else if(this.currentEntityUniqueIdentifier)
    {
      //Override UniqueIdentifier in case of switched
      paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] = this.currentEntityUniqueIdentifier;
    }

    //Reset Form
    this.resetForm();

    this.apiReqService.callAPIRequest<InputFormBaseModel>(paramObj, true)
      .then((data: InputFormBaseModel) => {

        //Dismiss All Loading Spinner
        this.loadingSrv.dismissAllLoading();
        //console.log(data);
        if(data)
        {
          //Store Input Form Object
          this.inputFormModel= data;

          //Mark Relation
          for(let inputFieldModel of this.inputFormModel.inputFieldModels)
          {
            inputFieldModel.parentFormModel = this.inputFormModel;
          }

          //Generate HTML Control
          this.inputForm = this.qcs.initFormGroup(this.inputFormModel, null, this.inputFormModel.crudMode);

          this.qcs.setValidatorsAndListeners(this.inputFormModel.inputFieldModels, this.inputForm);
          
          //Execute any action after Main Form Created
          this.qcs.executeActionFormCreated(this.inputFormModel.actionAfterFormCreated, this.inputForm);
        }
        else
        {
          this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }
      }).catch(error => {   
        if(error && error.status === 401)     
        {
          //Do Nothing
        }
        else
        {
          //console.log(error);
          this.onBackToHome();    
        }
      }); 
  }

  private resetForm()
  {
    this.inputFormModel = new InputFormBaseModel();
    this.inputForm = new FormGroup({});
    this.curTabIndex = '0';   
    this.isEditing = false; 
  }

  ionViewDidEnter() {
    //Set Editing Status when Page become Active
    if(this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE) != ConstantAttributes.CRUD_MODE_READ)
    this.isEditing = true;
  }

  /*
    Prompt Message When Editing and JWT didn't Expired to Guest Token
  */
  async  ionViewCanLeave() {
    if(this.isEditing && this.localStorage.getUser().token != this.configSrv.GUEST_MODEL.token)
    {
      const shouldLeave = await this.confirmLeave();
      return shouldLeave;
    }
    else
    {
      return true;
    }
  }

  confirmLeave(): Promise<Boolean> {
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    const alert = this.alertCtrl.create({
      message: this.configSrv.CURRENT_MENU_MODEL.lblExitWarning,
      buttons: [        
        {
          text: this.configSrv.CURRENT_MENU_MODEL.lblExitYesAns,
          handler: () => resolveLeaving(true)
        },
        {
          text: this.configSrv.CURRENT_MENU_MODEL.lblExitNoAns,
          role: 'cancel',
          handler: () => resolveLeaving(false)
        }
      ]
    });
    alert.present();
    return canLeave
  }

  ngDoCheck() {
        
  }  

  inputFormShowTitle(curTabIndex: number) {
      return this.inputFormModel.inputFormTabs[curTabIndex].showTabTitle;
  }

  tabTitleClass(curTabIndex: number) {
    if(this.inputFormModel.inputFormTabs[curTabIndex])
    {
      return this.inputFormModel.inputFormTabs[curTabIndex].tabTitleClass;
    }    
  }

  tabTitleStyle(curTabIndex: number) {
    ////console.log(curTabIndex);
    if(this.inputFormModel.inputFormTabs[curTabIndex])
    {
      return this.inputFormModel.inputFormTabs[curTabIndex].tabTitleStyle;
    }    
  }

  confirmLabelStyle(inputFieldModel: InputFieldBaseModel)
  {
    if(inputFieldModel)
    {
      return inputFieldModel.confirmLabelStyle;
    }
    else
      return "";
  }

  confirmLabelClass(inputFieldModel: InputFieldBaseModel)
  {
    if(inputFieldModel)
    {
      return inputFieldModel.confirmLabelClass;
    }
    else
      return "";
  }

  confirmValueStyle(inputFieldModel: InputFieldBaseModel)
  {
    if(inputFieldModel)
    {
      return inputFieldModel.confirmValueStyle;
    }
    else
      return "";
  }

  confirmValueClass(inputFieldModel: InputFieldBaseModel)
  {
    if(inputFieldModel)
    {
      return inputFieldModel.confirmValueClass;
    }
    else
      return "";
  }  

  toJSONObject(sJSON: string) {
    if(sJSON)
      return JSON.parse(sJSON);
  } 
  
  showFormValue() {
    //console.log(this.inputForm);
  }

  onFormSubmit() {
    this.sSubmitFailedMsgs = null;

    var payLoadObj = this.qcs.getSimplifiedInputFormValuePayLoadObj(this.inputForm, this.inputFormModel.inputFieldModels);
    
    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.navParams.get(ConstantAttributes.PARAM_ENTITY_NAME);
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_FORM_SUBMIT;
    paramObj[ConstantAttributes.PARAM_CRUD_MODE] = this.navParams.get(ConstantAttributes.PARAM_CRUD_MODE);
    if(this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS))
    {
      var additionalParams : { key: string, value: string} [] = this.navParams.get(ConstantAttributes.PARAM_ADDITIONAL_PARAMS);
      for(let additionalParam of additionalParams)
      {
        paramObj[additionalParam.key] = additionalParam.value;
      }
    }

    //Override UniqueIdentifier in case switched.
    if(this.currentEntityUniqueIdentifier)
      paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] = this.currentEntityUniqueIdentifier;

    paramObj[ConstantAttributes.PARAM_SUBMIT_VALUES] = payLoadObj;

    this.showFormGroupDetailsForDebug();

    this.apiReqService.callAPIRequest<ApiResultModel<SavedResultBaseModel>>(paramObj, true, null, true)
    .then((data: ApiResultModel<SavedResultBaseModel>) => {    
        if(data && data.result) 
        {
          //Set Editing Status to false when submit success and ready to navigate to result page.
          this.isEditing = false;    

          //Callback if required
          if(data.result.inputFormPerformCallback && this.prevPageCallBackFn)
          {
            this.prevPageCallBackFn(data.result.savedRecords);
          }

          if(data.result.inputFormNextAction == ConstantAttributes.INPUT_FORM_NEXT_ACTION_NAV)
          {
            //Navigate to next page
            var navigateMode;
            for(let additionalParam of data.result.inputFormNextForm.additionalParams)
            {
              if(additionalParam.key == ConstantAttributes.PARAM_NAVIGATE_MODE)
              {
                navigateMode = additionalParam.value;
              }
            }
            
            if(navigateMode && navigateMode == ConstantAttributes.NAVIGATE_MODE_PUSH)
            {
              //Pass the callback fn if exists
              if(this.prevPageCallBackFn)
                data.result.inputFormNextForm[ConstantAttributes.PARAM_PREIVOUS_PAGE_CALLBACK_FN] = this.prevPageCallBackFn;

              this.navCtrl.push(data.result.inputFormNextForm.componentName, data.result.inputFormNextForm);
            }
            else
            {            
              this.navCtrl.setRoot(data.result.inputFormNextForm.componentName, data.result.inputFormNextForm);
            }
          }
          else if(data.result.inputFormNextAction == ConstantAttributes.INPUT_FORM_NEXT_ACTION_POP)
          {
            this.navCtrl.pop();
          }
          else if(data.result.inputFormNextAction == ConstantAttributes.INPUT_FORM_NEXT_ACTION_POP_TO_ROOT)
          {
            this.navCtrl.popToRoot();
          }          
        }
        else
        {
            //Dismiss All Loading Spinner
            this.loadingSrv.dismissAllLoading();
            this.apiReqService.handleError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
        }           
    }).catch(error => { 
        if(error && error.status === 401)
        {
          //Do Nothing
        }
        else if(Array.isArray(error))
          this.sSubmitFailedMsgs = error;
        else
        {
          this.sSubmitFailedMsgs = [];
          this.sSubmitFailedMsgs.push(error);
        }
    });    
  }  

  onClose() {
    this.viewCtrl.dismiss();
  }

  onBackToHome() {
    this.events.publish(ConstantAttributes.EVENT_APP_BACK_TO_HOME);
  }

  showFormGroupDetailsForDebug() {
    //console.log(this.inputForm);
    //console.log(this.inputFormModel);
    var payLoadObj = this.qcs.getInputFormValuePayLoadObj(this.inputForm, this.inputFormModel.inputFieldModels);
    //console.log(payLoadObj);
  }

  isFormControlValid(localCurTabIndex: string)
  {
    if(this.inputFormModel.inputFieldModels)
    {
      var isAllValid = true;

      for (var i=0 ; i < this.inputFormModel.inputFieldModels.length; i++) { 
        if(localCurTabIndex == null || (localCurTabIndex != null && this.inputFormModel.inputFieldModels[i].locateAtTabIndex == localCurTabIndex))
        {
          if(this.inputForm.controls[this.inputFormModel.inputFieldModels[i].key].invalid ||
          this.inputForm.controls[this.inputFormModel.inputFieldModels[i].key].pending ||
          (this.inputFormModel.inputFieldModels[i].asyncProcessCnt != null && this.inputFormModel.inputFieldModels[i].asyncProcessCnt > 0))
              isAllValid = false;
        }
      }

      return isAllValid;
    }
    else
      return false;
  }

  isMatchCRUDModeForDisableHidden(applyInCRUDMode: string, mainFormCRUDMode: string)
  {
    if(applyInCRUDMode!= null && applyInCRUDMode.length > 0)
      return this.qcs.isMatchCRUDMode(applyInCRUDMode, mainFormCRUDMode);
    else
      return false;
  }

  isShowBackButton() : boolean {
    if(this.curTabIndex == '0')
      return false;
    else
      return true;
  }
  
  isShowNextButton() : boolean {
    if(this.inputFormModel.inputFormTabs && Number(this.curTabIndex) < this.inputFormModel.inputFormTabs.length-1)
      return true;
    else
      return false;
  }

  goNextTab()
  {
    this.sSubmitFailedMsgs = null;

    if(this.inputFormModel.inputFormTabs && Number(this.curTabIndex) < this.inputFormModel.inputFormTabs.length)
    {
      this.curTabIndex = (Number(this.curTabIndex) + 1).toString();

      this.inputPageElement.scrollToTop();
    }
  }

  goPreTab()
  {
    this.sSubmitFailedMsgs = null;

    if(Number(this.curTabIndex) > 0)
    {
      this.curTabIndex = (Number(this.curTabIndex) - 1).toString();

      this.inputPageElement.scrollToTop();
    }
  }

  isLastTab()
  {
    return (this.inputFormModel.inputFormTabs.length == Number(this.curTabIndex) + 1);
  }

  hasFieldsLocateAfterConfirmation()
  {
    var result: boolean = false;

    for(let inputFieldModel of this.inputFormModel.inputFieldModels)
    {
      if(inputFieldModel.locateAfterConfirmation)
      {
        result = true;
        break;
      }
    }

    return result;
  }

  toggleDebugMode()
  {
    DynamicFormControlService.debugMode = !DynamicFormControlService.debugMode;    
  }

  get debugMode()
  {
    return DynamicFormControlService.debugMode;
  }

  isLoggedIn() : boolean
  {
    var curUser = this.localStorage.getUser();
    ////console.log('curUser');
    ////console.log(curUser);
    if(curUser)
    {
      if(curUser.token == this.configSrv.GUEST_MODEL.token)
        return false;
      else
        return true;
    }
    else
      return false;
  }
}
