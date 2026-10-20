import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray }        from '@angular/forms';
import { InputFieldBaseModel }     from '../../../models/dynamic-form-model/input-field-base-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InputFormBaseModel } from '../../../models/dynamic-form-model/input-form-base-model';
import { DynamicFormControlService }    from '../../../services/dynamic-form-control-service';
//import { InputSubFormBaseModel } from '../../models/input-sub-form-base-model-temp';
import { ConstantAttributes } from '../../../attributes/constant-attributes';
import { AlertController } from 'ionic-angular';
import { ConfigService } from '../../../services/config-service';

@Component({
    selector: 'sub-input-form-component',
    templateUrl: 'sub-input-form-component.html',
    providers: [ DynamicFormControlService ]
  })
  export class SubInputFormComponent  {
    @Input() inputFieldModel: InputFieldBaseModel;
    @Input() inputFormModel: InputFormBaseModel;
    @Input() form: FormGroup;        
    @Input() mainFormModel: InputFormBaseModel;

    constructor(private sanitizer: DomSanitizer, private qcs: DynamicFormControlService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private configSrv: ConfigService) {      
      
    }

    get ConstantAttributes() { return ConstantAttributes; }

    get maxSubFormArrayCnt() { return parseInt(this.inputFieldModel.maxSubFormArrayCnt);}
    get minSubFormArrayCnt() { return parseInt(this.inputFieldModel.minSubFormArrayCnt);}

    get formControl() { return this.form.controls[this.inputFieldModel.key]; }

    /*get mainFormModel() {
      return this.qcs.getMainFormGroup(this.formControl)['formModel'];
    }*/

    ngOnInit() {
      this.qcs.initSubFormModelsAndControls(this.inputFieldModel, this.form, this.mainFormModel);      
    }    

    /*get subFormArrayLabelClass() {
      return this.inputFieldModel.subFormArrayLabelClass;
    }

    get subFormArrayLabelStyle() {
      return this.inputFieldModel.subFormArrayLabelStyle;
    }*/
    


    /*getTemplateInputFieldModels(targetTemplateKey: string) : InputFieldBaseModel[]
    {
      var inputFieldBaseModel;

      this.inputFormModel.inputSubFormTemplates.forEach(element => {
        if(element.templateKey == targetTemplateKey)
        {
          inputFieldBaseModel =  element.templateinputFieldModels;
        }
      });

      return inputFieldBaseModel;
    }*/

    addSubForm()
    {
      if(this.inputFieldModel.inputFormModels.length < this.maxSubFormArrayCnt)
      {
        //Get Template
        var templateinputFieldModels = this.inputFieldModel.templateinputFieldModels; //this.getTemplateInputFieldModels(this.inputFieldModel.key);        
        
         //Init Models
        var inputSubFormBaseModel = this.qcs.createInputFieldModelsFromTemplate(this.inputFieldModel.key, templateinputFieldModels);      
       // this.inputFieldModel.subFormNextFormSerial = this.inputFieldModel.subFormNextFormSerial + 1;
        inputSubFormBaseModel.parentFieldModel = this.inputFieldModel;
        this.inputFieldModel.inputFormModels.push(inputSubFormBaseModel);

        //Init Controls        
        (this.form.controls[this.inputFieldModel.key] as FormArray).push(this.qcs.initFormGroup(inputSubFormBaseModel, null, this.mainFormModel.crudMode));

        this.qcs.setValidatorsAndListeners(inputSubFormBaseModel.inputFieldModels, (this.form.controls[this.inputFieldModel.key] as FormArray).at(this.inputFieldModel.inputFormModels.length - 1) as FormGroup);

        this.cd.detectChanges();

        //Execute any action after Add SubForm
        this.qcs.executeActionFormCreated(this.inputFieldModel.actionAfterSubFormAdded, (this.form.controls[this.inputFieldModel.key] as FormArray).at(this.inputFieldModel.inputFormModels.length - 1) as FormGroup);
        
        this.cd.detectChanges();       

        //Trigger any Listeners
        this.triggerListeners();
      }
    }

    removeSubform(index?: number) {
      if(this.inputFieldModel.inputFormModels.length > this.minSubFormArrayCnt)
      {        
        //var lastIndex = this.inputFieldModel.inputFormModels.length - 1;

        let alertPopup = this.alertCtrl.create({        
          message: this.inputFieldModel.btnSubFormRemove + " " + this.inputFieldModel.subFormArrayLabel + (index + 1) +  " ?",
          buttons: [{
                  text: this.configSrv.CURRENT_MENU_MODEL.lblExitYesAns,
                  handler: () => {
                      alertPopup.dismiss().then(() => {
                          this.inputFieldModel.inputFormModels.splice(index, 1);
                          (this.form.controls[this.inputFieldModel.key] as FormArray).removeAt(index);

                          //Execute any action after Remove SubForm
                          this.qcs.executeActionFormRemoved(this.inputFieldModel.actionAfterSubFormRemoved, (this.form.controls[this.inputFieldModel.key] as FormArray));

                          this.cd.detectChanges();

                          //Trigger any Listeners
                          this.triggerListeners();
                      });         
                      return false;  
                  }
              },
              {
                  text: this.configSrv.CURRENT_MENU_MODEL.lblExitNoAns,
                  handler: () => {
                      // need to do something if the user stays?
                  }
              }]
          });
  
        // Show the alert
        alertPopup.present();        
      }
    }

    //Trigger Any Field Listeners for SubForm Items Add and Remove
    triggerListeners()
    {
      if(this.inputFieldModel.subFormArrayCntChangeListenFields)
        {
          for(let listenField of this.inputFieldModel.subFormArrayCntChangeListenFields)
          {
            for(let subForm of (this.form.controls[this.inputFieldModel.key] as FormArray).controls)
            {
              var listenControl = this.qcs.getFormControl(listenField, subForm as FormGroup);
              if(listenControl)
              {
                listenControl.updateValueAndValidity();
              }
            }            
          }
        }
    }

    //Check if Any Async in progress in subform
    isAsyncInProgress()
    {
      for(let oinputFormModels of this.inputFieldModel.inputFormModels)
      {
        for(let fieldModel of oinputFormModels.inputFieldModels)
        {
          if(fieldModel.asyncProcessCnt != null && fieldModel.asyncProcessCnt > 0)
              return true;
        }
      }

      return false;
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