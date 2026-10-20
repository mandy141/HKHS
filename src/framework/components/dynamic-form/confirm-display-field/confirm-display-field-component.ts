import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
import { MyFormCheckList } from '../custom-control/my-form-check-list';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { LocalStorageService } from '../../../services/local-storage-service';

@Component({
    selector: 'confirm-display-field-component',
    templateUrl: 'confirm-display-field-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class ConfirmDisplayFieldComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() form: FormGroup;    
    
    constructor(private qcs: DynamicFormControlService, private localStorageSrv: LocalStorageService) {            
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

    get confirmLabel()
    {
        if(this.inputFieldModel.confirmLabel && this.inputFieldModel.confirmLabel.length > 0)
            return this.inputFieldModel.confirmLabel;
        else
            return this.inputFieldModel.label
    }

    showFieldValue(curInputForm: FormGroup, inputFieldModel: InputFieldBaseModel) : string
    {
        var value = curInputForm.controls[inputFieldModel.key].value;
        if(inputFieldModel.controlType != ConstantAttributes.CONTROL_TYPE_CHECKBOX && !value)
            return '';    
        else {
            switch(inputFieldModel.controlType)
            {
                case ConstantAttributes.CONTROL_TYPE_TEXTBOX: 
                case ConstantAttributes.CONTROL_TYPE_CUSTOM: 
                    return value;

                case ConstantAttributes.CONTROL_TYPE_DATEPICKER:
                var dateObj = eval('moment(value, "YYYY-MM-DDTHH:mm:ss")');
                    return dateObj.format(inputFieldModel.displayFormat);

                case ConstantAttributes.CONTROL_TYPE_TIMEPICKER:
                var dateObj = eval('moment(value, "HH:mm:ss")');
                    return dateObj.format(inputFieldModel.displayFormat);

                case ConstantAttributes.CONTROL_TYPE_DROPDOWN: 
                case ConstantAttributes.CONTROL_TYPE_RADIO: 
                    for (var i=0 ; i < inputFieldModel.options.length; i++) { 
                        if(inputFieldModel.options[i].key == value)
                        return inputFieldModel.options[i].desc;
                    }        
                    return '';

                case ConstantAttributes.CONTROL_TYPE_CHECKBOX: 
                    if(this.localStorageSrv.getLang() == ConstantAttributes.LANG_CHI)
                    {
                        if(value)
                            return '是';
                        else
                            return '否';
                    }
                    else
                    {
                        if(value)
                            return 'YES';
                        else
                            return 'NO';
                    }
                            
                default: 
                    return '';
            }
        }
    }

    showCheckListValues(curInputForm: FormGroup, inputFieldModel: InputFieldBaseModel) : string[]
    {
        var value = curInputForm.controls[inputFieldModel.key].value;
        if(inputFieldModel.controlType == ConstantAttributes.CONTROL_TYPE_CHECKLIST && value)
        {
            var selectedOpts = (curInputForm.controls[inputFieldModel.key] as MyFormCheckList).selectedDescs;          
            var selectedOptDesc = [];

            for(let selectedOpt of selectedOpts)
            {
                selectedOptDesc.push(selectedOpt);
            }

            return selectedOptDesc;
        }
        else 
            return [];          
    }

    //MISC

    toJSONObject(sJSON: string) {
        if(sJSON)
          return JSON.parse(sJSON);
      } 
}