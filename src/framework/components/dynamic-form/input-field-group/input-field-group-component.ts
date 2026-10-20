import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InputFormBaseModel } from '../../../models/dynamic-form-model/input-form-base-model';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
//import { InputSubFormBaseModel } from '../../models/input-sub-form-base-model-temp';
import { ConstantAttributes } from '../../../attributes/constant-attributes';

@Component({
    selector: 'input-field-group-component',
    templateUrl: 'input-field-group-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class InputFieldGroupComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() inputFormModel: InputFormBaseModel;
    @Input() form: FormGroup;        
    @Input() mainFormModel: InputFormBaseModel;

    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef) {      
      
    }

    get ConstantAttributes() { return ConstantAttributes; }

    get formControl() { return this.form.controls[this.inputFieldModel.key]; }

    /*get mainFormModel() {
      return this.qcs.getMainFormGroup(this.formControl)['formModel'];
    }*/

    ngOnInit() {
      this.initFieldGroupModelsAndControls();      
    }        
    
    initFieldGroupModelsAndControls() 
    {
      if(!this.inputFieldModel.fieldComponentFirstLoaded)
      {       
          //Assign Relationship   
          this.inputFieldModel.fieldgroupFormModel.parentFieldModel = this.inputFieldModel;
          for(let inputFieldModel of this.inputFieldModel.fieldgroupFormModel.inputFieldModels)                
          {
            inputFieldModel.parentFormModel = this.inputFieldModel.fieldgroupFormModel;
          }

          //Init Controls            
          //this.form.setControl(this.inputFieldModel.key, this.qcs.initFormGroup(this.inputFieldModel.fieldgroupFormModel));          
          
          this.form.controls[this.inputFieldModel.key] = this.qcs.initFormGroup(this.inputFieldModel.fieldgroupFormModel, this.form.controls[this.inputFieldModel.key] as FormGroup, this.mainFormModel.crudMode);

          this.qcs.setValidatorsAndListeners(this.inputFieldModel.fieldgroupFormModel.inputFieldModels, this.form.controls[this.inputFieldModel.key] as FormGroup);
          
          //Execute any action after Field Group Created
          this.qcs.executeActionFormCreated(this.inputFieldModel.fieldgroupFormModel.actionAfterFormCreated, this.form.controls[this.inputFieldModel.key] as FormGroup);

          this.inputFieldModel.fieldComponentFirstLoaded = true;

          //Clear the field group input values as they has been passed to each fields
          this.inputFieldModel.fieldgroupFormModel.inputFieldValues = null;

          this.cd.detectChanges();
      }
    }      

    isMatchCRUDModeForDisableHidden(applyInCRUDMode: string, mainFormCRUDMode: string)
    {
      if(applyInCRUDMode!= null && applyInCRUDMode.length > 0)
        return this.qcs.isMatchCRUDMode(applyInCRUDMode, mainFormCRUDMode);
      else
        return false;
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