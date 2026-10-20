import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { InputFormBaseModel }     from '../../../models/dynamic-form-model/input-form-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';

@Component({
    selector: 'label-field-component',
    templateUrl: 'label-field-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class LabelFieldComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() form: FormGroup;    
    @Input() mainFormModel: InputFormBaseModel;

    get ConstantAttributes() { return ConstantAttributes; }
    
    get formControl() { return this.form.controls[this.inputFieldModel.key]; }     
    
    get controlClass() {
      return this.inputFieldModel.controlClass;
    }

    get controlStyle() {
      return this.inputFieldModel.controlStyle;
    }        
  
    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef) {            
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

    get labelValue()
    {      
      //PENDING TO MODIFY
      if(this.formControl.value != null && this.formControl.value != "")
        return this.inputFieldModel.label.replace("{{value}}",this.formControl.value);
      else
        return this.inputFieldModel.label;
    }
  }