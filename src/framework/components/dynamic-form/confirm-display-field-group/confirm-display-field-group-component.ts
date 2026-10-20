import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { InputFormBaseModel } from '../../../models/dynamic-form-model/input-form-base-model';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { ConstantAttributes } from '../../../attributes/constant-attributes';

@Component({
    selector: 'confirm-display-field-group-component',
    templateUrl: 'confirm-display-field-group-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class ConfirmDisplayFieldGroupComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;    
    @Input() form: FormGroup;        

    constructor(private qcs: DynamicFormControlService) {      
      
    }

    get ConstantAttributes() { return ConstantAttributes; }

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

    //MISC

    toJSONObject(sJSON: string) {
        if(sJSON)
          return JSON.parse(sJSON);
      }

    stringToNumber(sValue : string) {
        return parseInt(sValue);
    }
}