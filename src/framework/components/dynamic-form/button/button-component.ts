import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { InputFormBaseModel }     from '../../../models/dynamic-form-model/input-form-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { Events } from 'ionic-angular';

@Component({
    selector: 'button-component',
    templateUrl: 'button-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class ButtonComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() form: FormGroup;    
    @Input() mainFormModel: InputFormBaseModel;

    @Output() formSubmitEvent = new EventEmitter<string>();
    @Output() loginEvent = new EventEmitter<string>();
    @Output() logoutEvent = new EventEmitter<string>();
    @Output() closeEvent = new EventEmitter<string>();

    get ConstantAttributes() { return ConstantAttributes; }
    
    get formControl() { return this.form.controls[this.inputFieldModel.key]; }     
    
    /*get mainFormModel() {
      return this.qcs.getMainFormGroup(this.formControl)['formModel'];
    }*/

    get controlClass() {
      return this.inputFieldModel.controlClass;
    }

    get controlStyle() {
      return this.inputFieldModel.controlStyle;
    }        
  
    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef, private events: Events) {            
    }    

    get isButtonDisable() {
      //This Dynamic Input Form only for Form Submit
      if(!this.isFormControlValid() || this.mainFormModel.crudMode == ConstantAttributes.CRUD_MODE_READ)
        return true;
      else
        return false;

      /*if(this.inputFieldModel.clickAction == ConstantAttributes.BUTTON_CLICK_ACTION_FORMSUBMIT ||
        this.inputFieldModel.clickAction == ConstantAttributes.BUTTON_CLICK_ACTION_LOGIN)
      {
        if(!this.isFormControlValid() || this.mainFormModel.crudMode == ConstantAttributes.CRUD_MODE_READ)
            return true;
          else
            return false;
      }
      else
        return false;*/  
    }

    isFormControlValid()
    {      
      if(this.mainFormModel.inputFieldModels)
      {
        var isAllValid = true;

        for (var i=0 ; i < this.mainFormModel.inputFieldModels.length; i++) {           
            if(this.qcs.getMainFormGroup(this.formControl).controls[this.mainFormModel.inputFieldModels[i].key].invalid ||
            this.qcs.getMainFormGroup(this.formControl).controls[this.mainFormModel.inputFieldModels[i].key].pending ||
            (this.mainFormModel.inputFieldModels[i].asyncProcessCnt != null && this.mainFormModel.inputFieldModels[i].asyncProcessCnt > 0))
                isAllValid = false;          
        }

        return isAllValid;
      }
      else
        return false;
    }

    onButtonClick()
    {
      this.formSubmitEvent.emit();

      //This Dynamic Input Form only for Form Submit
      /*switch(this.inputFieldModel.clickAction)
      {
        case ConstantAttributes.BUTTON_CLICK_ACTION_FORMSUBMIT:
          this.formSubmitEvent.emit();
          break;

        case ConstantAttributes.BUTTON_CLICK_ACTION_LOGIN:          
          this.loginEvent.emit();
          break;

        case ConstantAttributes.BUTTON_CLICK_ACTION_LOGOUT:          
          this.logoutEvent.emit();
          break;

        case ConstantAttributes.BUTTON_CLICK_ACTION_CLOSE:
          this.closeEvent.emit();
          break;

        default:
          return;
      }*/
    }

    //MISC

    toJSONObject(sJSON: string) {
      if(sJSON)
        return JSON.parse(sJSON);
    }            

    get debugMode()
    {
      return DynamicFormControlService.debugMode;
    }    
  }