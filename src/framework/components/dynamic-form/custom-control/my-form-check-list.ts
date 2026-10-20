import { FormArray } from "@angular/forms";
import { InputFieldBaseModel } from '../../../models/dynamic-form-model/input-field-base-model';

export class MyFormCheckList extends FormArray {
    
  get selectedKeys(): string[]
  {
    if(this['fieldModel'].isAsyncOptions)
    {
      var selectedOpt = this.value
            .map((v, i) => v ? this['fieldModel'].asyncOptionsModel.options[i].key : null)
            .filter(v => v !== null);

      return selectedOpt;
    }
    else
    {
      var selectedOpt = this.value
            .map((v, i) => v ? this['fieldModel'].options[i].key : null)
            .filter(v => v !== null);

      return selectedOpt;
    }
  }

  get selectedDescs(): string[]
  {
    if(this['fieldModel'].isAsyncOptions)
    {
      var selectedOpt = this.value
            .map((v, i) => v ? this['fieldModel'].asyncOptionsModel.options[i].desc : null)
            .filter(v => v !== null);

      return selectedOpt;
    }
    else
    {
      var selectedOpt = this.value
            .map((v, i) => v ? this['fieldModel'].options[i].desc : null)
            .filter(v => v !== null);

      return selectedOpt;
    }
  }
}