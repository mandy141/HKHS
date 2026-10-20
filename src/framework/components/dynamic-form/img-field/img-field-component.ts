import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { InputFormBaseModel }     from '../../../models/dynamic-form-model/input-form-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { ConfigService } from '../../../services/config-service';

@Component({
    selector: 'img-field-component',
    templateUrl: 'img-field-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class ImgFieldComponent  {
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
  
    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef, private configSrv: ConfigService) {            
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

    private onLinkClick()
    {
      if(this.inputFieldModel.linkClickAction && this.inputFieldModel.linkClickAction.length > 0)
      {
        this.qcs.executeJS(this.inputFieldModel.linkClickAction.replace('{{HOST}}',this.configSrv.API_HOST), this.formControl.parent as FormGroup);
      }
    }
  }