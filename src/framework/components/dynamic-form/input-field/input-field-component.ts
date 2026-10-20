import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { AsyncOptionsModel }     from '../../../models/dynamic-form-model/async-options-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ApiRequestService }    from '../../../services/api-request-service';
import { ToastController } from 'ionic-angular';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { HttpParams } from '@angular/common/http';
import { InputFormBaseModel } from '../../../models/dynamic-form-model/input-form-base-model';
import { MyFormCheckList } from '../custom-control/my-form-check-list';

@Component({
    selector: 'input-field-component',
    templateUrl: 'input-field-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class InputFieldComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() form: FormGroup;    
    @Input() mainFormModel: InputFormBaseModel;

    //labelHTML: SafeHtml;

    get ConstantAttributes() { return ConstantAttributes; }

    get formControl() { return this.form.controls[this.inputFieldModel.key]; }

    /*get mainFormModel() {
      return this.qcs.getMainFormGroup(this.formControl)['formModel'];
    }*/

    get refFormControl() {
       return this.inputFieldModel.refControlKey? this.qcs.getFormControl(this.inputFieldModel.refControlKey, this.formControl.parent) : null ; 
    } 
    
    get controlClass() {
      return this.inputFieldModel.controlClass;
    }

    get controlStyle() {
      return this.inputFieldModel.controlStyle;
    }

    get inputClass() {
      return this.inputFieldModel.inputClass;
    }

    get inputStyle() {
      return this.inputFieldModel.inputStyle;
    }

    get validationClass() {
      return this.inputFieldModel.validationClass;
    }

    get validationStyle() {
      return this.inputFieldModel.validationStyle;
    }

    get labelDisplayStyle() {
      if(this.inputFieldModel.labelHidden)
          return 'none';
        else
          return 'inline';
    }

    get placeHolder() {
      if(this.inputFieldModel.showPlaceHolder)
          return this.inputFieldModel.placeHolder ? this.inputFieldModel.placeHolder : '';
        else
          return '';  
    }

    get cancelText() {
      return this.inputFieldModel.cancelText ? this.inputFieldModel.cancelText : 'Back';
    }

    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private toastCtrl: ToastController, private apiReqService : ApiRequestService, private cd : ChangeDetectorRef) {            
    }

    ngOnInit() {

      //For Async Options on DropDownList/Radio List/Check List
      if(this.inputFieldModel.isAsyncOptions)
      {
        //Always reload the Options if the Ref Value is changed.
        this.regAsyncOptionsRefValueChangeListener();
        //Reload for the first time.
        //Set Value for Data Retrieve Case
        this.reloadAsyncOptionsModel(this.inputFieldModel.defValue);
      }
    }    

    private regAsyncOptionsRefValueChangeListener()
    {
      if(this.inputFieldModel.isAsyncOptions && this.inputFieldModel.asyncOptValueChangesCtrlKeys.length > 0)
      {
        for(let refControlKey of this.inputFieldModel.asyncOptValueChangesCtrlKeys)                    
        {
          var refControl: FormControl = this.qcs.getFormControl(refControlKey, this.formControl.parent);
          refControl.valueChanges.subscribe(() => {
            this.reloadAsyncOptionsModel();
          });
        }
      }
    }

    private reloadAsyncOptionsModel(dataValue?: string)
    {
      var paramObj = {};
      paramObj[this.inputFieldModel.key] = this.formControl.value;

      //Reset the Field Value
      this.formControl.reset();

      //Clear Current Options
      this.inputFieldModel.asyncOptionsModel = null;

      //If It is Check List
      if(this.inputFieldModel.controlType == ConstantAttributes.CONTROL_TYPE_CHECKLIST)
      {
        (this.formControl as MyFormCheckList).controls.splice(0,(this.formControl as MyFormCheckList).controls.length);
      }

      //Get Ref Control Values
      var controlArray: AbstractControl[] = [];
      paramObj[ConstantAttributes.PARAM_OPTION_FIELD_KEY] = this.inputFieldModel.key;
      controlArray.push(this.formControl);
      
      if(this.inputFieldModel.asyncOptRefCtrlKeys.length > 0)
      {
        for(var i = 0; i < this.inputFieldModel.asyncOptRefCtrlKeys.length; i++)                    
        {
          var refControl: FormControl = this.qcs.getFormControl(this.inputFieldModel.asyncOptRefCtrlKeys[i], this.formControl.parent);
          paramObj[refControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = refControl.value;
          controlArray.push(refControl);
        }
      }

      //Retrieve the Options List
      
      paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = this.mainFormModel.entityName;
      paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_ASYNC_OPTS;
      this.apiReqService.callAPIRequest<AsyncOptionsModel>(paramObj, false, controlArray)
        .then((data: AsyncOptionsModel) => {
          //Store Input Form Object
          this.inputFieldModel.asyncOptionsModel= data;
          //If It is Check List
          if(this.inputFieldModel.controlType == ConstantAttributes.CONTROL_TYPE_CHECKLIST)
          {
            //Create CheckBox Controls
            var controls = this.inputFieldModel.asyncOptionsModel.options.map(c => new FormControl(false));
            for(let control of controls)
            {
              control.setParent((this.formControl as MyFormCheckList));
              (this.formControl as MyFormCheckList).controls.push(control);              
            }

            //Set Default Value
            if(data.selectedKeys)
            {
              for(var i = 0; i < this.inputFieldModel.asyncOptionsModel.options.length; i++)
              {
                if(data.selectedKeys.indexOf(this.inputFieldModel.asyncOptionsModel.options[i].key) >= 0)
                {
                  (this.formControl as MyFormCheckList).controls[i].setValue(true);
                }
              }               
            }
          }
          else
          {
            //Set Value For Retrieve Data Case
            if(dataValue)
            {
              this.formControl.setValue(dataValue);
            }
            else if(data.selectedKey) //Set Default Value from Async Result
            {
              this.formControl.setValue(data.selectedKey);
            }
          }
          this.cd.detectChanges();
        });     
    }

    //MISC

    toJSONObject(sJSON: string) {
      if(sJSON)
        return JSON.parse(sJSON);
    }            

    showMandatoryStar()
    {
      if(this.inputFieldModel.validations)
      {
        if(this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_CHECKBOX
          && this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_CUSTOM
          && this.inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_SUBFORMARRAY)
        {
          for (var i=0 ; i < this.inputFieldModel.validations.length; i++) { 
            if(this.inputFieldModel.validations[i].type == ConstantAttributes.VALIDATIONS_TYPE_REQUIRED)
              return true;
          }
        }
      }

      return false;
    }

    showLoadingIcon()
    {
      if(this.inputFieldModel.asyncProcessCnt != null && this.inputFieldModel.asyncProcessCnt > 0)
        return true;
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

    getValidationErrorMsgs(error: any, defaultValidationMsg: string, defaultValidationMsgs: string[]) : string[]
    {
      if(error && error.validateMsg)
      {
        return error.validateMsg;
      }        
      else if(defaultValidationMsgs && defaultValidationMsgs.length > 0)
        return defaultValidationMsgs;
      else {
        var validMsgs: string[] = [];
        validMsgs.push(defaultValidationMsg);
        return validMsgs;
      }
    }

    get debugMode()
    {
      return DynamicFormControlService.debugMode;
    }

    //Generate HTML

    /*genLabelHTML() {
      if(!this.inputFieldModel.labelHidden) {
        this.labelHTML = this.sanitizer.bypassSecurityTrustHtml(`<ion-label id="@{this.inputFieldModel.key}_label" 
          class="@{this.inputFieldModel.labelClass}" 
          style="@{this.toJSONObject(this.inputFieldModel.labelStyle)}" 
          @{this.inputFieldModel.labelPlacement}>
                @{this.inputFieldModel.label} @{this.showMandatoryStar()}
          </ion-label>`);
      }
    }*/
  }