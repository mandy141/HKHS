import { Injectable, Input, ChangeDetectorRef }   from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { InputFormBaseModel } from '../models/dynamic-form-model/input-form-base-model';
import { InputFieldBaseModel } from '../models/dynamic-form-model/input-field-base-model';
import { MyFormCheckList } from '../components/dynamic-form/custom-control/my-form-check-list';
import { ApiRequestService } from './api-request-service';
import { AsyncValidationMsgsModel } from '../models/dynamic-form-model/async-validation-msg';
import { ApiResultModel } from '../models/dynamic-form-model/api-result-model';
import { ConstantAttributes } from '../attributes/constant-attributes';
import { HttpParams } from '@angular/common/http';
import { ConfigService } from './config-service';
import { switchMap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

@Injectable()
export class DynamicFormControlService {
  
  public static debugMode: boolean = false;

  constructor(private api: ApiRequestService, private configSrv: ConfigService, private cd: ChangeDetectorRef) {     
  }

  get ConstantAttributes() { return ConstantAttributes; }

  //Add Custom Style & Functions

  addCustomStyles(cssText) {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = cssText;

    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  addCustomJS(jsArray: string[]) {             
    var jsElement = document.createElement('script');
    jsElement.setAttribute('type', 'text/javascript');

    var jsText = "";
    for(let _js of jsArray)
    {
      jsText = jsText + " " + _js;
    }
    jsElement.innerHTML = jsText;
    
    document.getElementsByTagName('head')[0].appendChild(jsElement);
  }

  //Create Angular FormGroup Object
   
  initFormGroup(inputFormModel: InputFormBaseModel, formGroup: FormGroup, mainFormCRUDMode: string) {
    
    formGroup = this.createFormGroup(inputFormModel.inputFieldModels, formGroup, mainFormCRUDMode, inputFormModel.inputFieldValues);    
    formGroup[ConstantAttributes.PARAM_FORM_MODEL] = inputFormModel;
    return formGroup;

  }

  private createFormGroup(inputFieldModels: InputFieldBaseModel[], formGroup: FormGroup, mainFormCRUDMode: string, inputFieldValues: {}): FormGroup{    

    if(!formGroup)
      formGroup = new FormGroup({}, { updateOn: 'blur' });

    //Create Form Control Objects
    inputFieldModels.forEach(inputFieldModel => {
      switch(inputFieldModel.controlType) {
        case ConstantAttributes.CONTROL_TYPE_SUBFORMARRAY:     
        
          //Pass Field Value if Exists
          if(inputFieldValues && inputFieldValues[inputFieldModel.key])
          {
            inputFieldModel.subInputFormValues = inputFieldValues[inputFieldModel.key];
          }

          formGroup.addControl(inputFieldModel.key, new FormArray([]));

          //Set Disable/Enable
          if(inputFieldModel.disable || (inputFieldModel.disableInCRUDMode != null && this.isMatchCRUDMode(inputFieldModel.disableInCRUDMode, mainFormCRUDMode)))
            formGroup.controls[inputFieldModel.key].disable();

          //Set Model
          formGroup.controls[inputFieldModel.key][ConstantAttributes.PARAM_FIELD_MODEL] = inputFieldModel;

          break;

        case ConstantAttributes.CONTROL_TYPE_FIELDGROUP:   

          //Pass Field Value if Exists
          if(inputFieldValues && inputFieldValues[inputFieldModel.key])
          {
            inputFieldModel.fieldgroupFormModel.inputFieldValues = inputFieldValues[inputFieldModel.key];
          }

          formGroup.addControl(inputFieldModel.key, new FormGroup({}));

          //Set Disable/Enable
          if(inputFieldModel.disable || (inputFieldModel.disableInCRUDMode != null && this.isMatchCRUDMode(inputFieldModel.disableInCRUDMode, mainFormCRUDMode)))
            formGroup.controls[inputFieldModel.key].disable();
          
          //Set Model
          formGroup.controls[inputFieldModel.key][ConstantAttributes.PARAM_FIELD_MODEL] = inputFieldModel;

          break;

        case ConstantAttributes.CONTROL_TYPE_CHECKLIST:

           //PENDING: Not Yet Implement Load Def Value / Data Value

          if(!inputFieldModel.isAsyncOptions)
          {
            var controls = inputFieldModel.options.map(c => new FormControl(false));
            formGroup.addControl(inputFieldModel.key, new MyFormCheckList(controls));
          }
          else
          {
            var controls = [].map(c => new FormControl(false));
            formGroup.addControl(inputFieldModel.key, new MyFormCheckList(controls));
          }
          
          //Set Disable/Enable
          if(inputFieldModel.disable || (inputFieldModel.disableInCRUDMode != null && this.isMatchCRUDMode(inputFieldModel.disableInCRUDMode, mainFormCRUDMode)))
            formGroup.controls[inputFieldModel.key].disable();

          //Set Model
          formGroup.controls[inputFieldModel.key][ConstantAttributes.PARAM_FIELD_MODEL] = inputFieldModel;

          break;
          
        case ConstantAttributes.CONTROL_TYPE_CHECKBOX:

          //Override Field Value if Exists
          if(inputFieldValues && inputFieldValues[inputFieldModel.key])
            inputFieldModel.defValue = inputFieldValues[inputFieldModel.key];

          //Set Disable/Enable
          if(inputFieldModel.disable || (inputFieldModel.disableInCRUDMode != null && this.isMatchCRUDMode(inputFieldModel.disableInCRUDMode, mainFormCRUDMode)))
            formGroup.addControl(inputFieldModel.key, new FormControl({value: JSON.parse(inputFieldModel.defValue) || false, disabled: true}));
          else
            formGroup.addControl(inputFieldModel.key, new FormControl(JSON.parse(inputFieldModel.defValue) || false));     
            
          //Set Model
          formGroup.controls[inputFieldModel.key][ConstantAttributes.PARAM_FIELD_MODEL] = inputFieldModel;

          break;

        default:

          //Set Disable/Enable
          if(inputFieldModel.disable || (inputFieldModel.disableInCRUDMode != null && this.isMatchCRUDMode(inputFieldModel.disableInCRUDMode, mainFormCRUDMode)))
            formGroup.addControl(inputFieldModel.key, new FormControl({value: '', disabled: true}));
          else
            formGroup.addControl(inputFieldModel.key, new FormControl(''));

          //Override Field Value if Exists
          if(inputFieldValues && inputFieldValues[inputFieldModel.key])
            inputFieldModel.defValue = inputFieldValues[inputFieldModel.key];

          //Set Default Value
          if(inputFieldModel.defValue)
          {
            if(inputFieldModel.textInputUpperCase)
              formGroup.controls[inputFieldModel.key].setValue(inputFieldModel.defValue.toUpperCase());
            else
              formGroup.controls[inputFieldModel.key].setValue(inputFieldModel.defValue);
          }
          
          //Set Model
          formGroup.controls[inputFieldModel.key][ConstantAttributes.PARAM_FIELD_MODEL] = inputFieldModel;

          break;
      }
    });

    return formGroup;
  }

 

  //Set Validators And Value Changes Listeners
  setValidatorsAndListeners(inputFieldModels: InputFieldBaseModel[], currentFormGroup: FormGroup){

    var mainInputFormModel = this.getMainFormGroup(currentFormGroup)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;

    inputFieldModels.forEach(inputFieldModel => {

      var crossFieldListeners : string[] = [];
      var selfControl : FormControl = currentFormGroup.controls[inputFieldModel.key] as FormControl;

      if(!this.configSrv.BYPASS_CLIENT_VALIDATION && inputFieldModel.validations) {

        var validators: ValidatorFn[] = [];        
        var asyncValidators: AsyncValidatorFn[] = [];

        //Create Validators      
        inputFieldModel.validations.forEach(validation => {
                
          //Check CRUD Mode
          if(this.isMatchCRUDMode(validation.applyInCRUDMode, mainInputFormModel.crudMode)) {
            switch(validation.type) {
              
              case ConstantAttributes.VALIDATIONS_TYPE_REQUIRED:
                validators.push(Validators.required);
                break;
              case ConstantAttributes.VALIDATIONS_TYPE_MIN_LENGTH:
                validators.push(Validators.minLength(Number(validation.param[0])));
                break;
              case ConstantAttributes.VALIDATIONS_TYPE_MAXLENGTH:
                validators.push(Validators.maxLength(Number(validation.param[0])));
                break;
              case ConstantAttributes.VALIDATIONS_TYPE_NUMMIN:
                validators.push(Validators.min(Number(validation.param[0])));
                break;
              case ConstantAttributes.VALIDATIONS_TYPE_NUMMAX:
                validators.push(Validators.max(Number(validation.param[0])));
                break;
              case ConstantAttributes.VALIDATIONS_TYPE_PATTERN:
                validators.push(Validators.pattern(validation.param[0]));
                break;            
              
              //OBSOLETE
              /*case ConstantAttributes.VALIDATIONS_TYPE_CUSTOM_FUNC:
                validation.param.forEach(value => {     
                                  
                  if(crossFieldListeners.indexOf(value) < 0)                
                    crossFieldListeners.push(value);
                });
                              
                validators.push(this.customValidationFunc(validation.custValidationFunc, validation.messages, this.getMainFormGroup(currentFormGroup)));

                break;*/

              case ConstantAttributes.VALIDATIONS_TYPE_CUSTOM_RULE:
                if(validation.param)
                  {
                  validation.param.forEach(value => {
                              
                    
                    if(crossFieldListeners.indexOf(value) < 0)                
                      crossFieldListeners.push(value);
                    
                  });
              }

                validators.push(this.customValidationRules(validation.custValidationRules));

                break;
              
              case ConstantAttributes.VALIDATIONS_TYPE_ASYNC:        
                validation.param.forEach(value => {
                                    
                  if(crossFieldListeners.indexOf(value) < 0)                
                    crossFieldListeners.push(value);
                });      
                
                asyncValidators.push(this.execAsyncValidation(validation.param));

              break;

              /*case 'email':
                validators.push(Validators.email);
                break;*/

              /*case 'validatehkid':
              validators.push(this.validateHKID());
              break;

              case 'validateequal':
              case 'validatediff':
              case 'valdategreaterthan':
              case 'validategreaterthanorequal':
              case 'validatesmallerthan':
              case 'validatesmallerthanorequal':
              case 'validatedatebefore':
              case 'validatedatebeforeorequal':
              case 'validatedateafter':
              case 'validatedateafterorequal':
              
                var targetControls : AbstractControl[] = [];
                validation.param.forEach(value => {     
                    
                  var targetControlName = this.parseFormControlName(value, inputFieldModel.parentSubFormModel);

                  if(crossFieldListeners.indexOf(targetControlName) < 0)
                    crossFieldListeners.push(targetControlName);     
                  
                  var targetControl = this.getFormControl(targetControlName, currentFormGroup, mainFormGroup);
                  targetControls.push(targetControl);                
                });

                validators.push(this.crossFieldValidate(validation.type, targetControls, validation.messages));              

                break;*/

              /*case 'validateunique':
                //Only for Sub Form Fields
                if(inputFieldModel.parentSubFormModel)
                  validators.push(this.validateUniqueForSubFormItems(inputFieldModel, inputFieldModel.templateKey, inputFieldModel.parentSubFormModel.parentInputFieldBaseModel, validation.messages[0]));

                break;*/

              default:
                break;
            }
          }
        });       
        
        //Set Validators
        (currentFormGroup.controls[inputFieldModel.key] as FormControl).setValidators(validators);  
        (currentFormGroup.controls[inputFieldModel.key] as FormControl).setAsyncValidators(asyncValidators);              
      }
      
      //Subscribe Listener for Cascade Update
      if(inputFieldModel.refControlKey && inputFieldModel.refControlKey.length > 0) 
      {
        var refControl = this.getFormControl(inputFieldModel.refControlKey, selfControl.parent as FormGroup);
        
        if(selfControl && refControl)
        {
          refControl.valueChanges.subscribe(() => {
            selfControl.reset();
          });
        } 
      }
      //Reload in inputFieldModel.ts
      /*else if (inputFieldModel.isAsyncOptions && inputFieldModel.asyncOptRefCtrlKeys.length > 0)
      {
        for(let refControlKey of inputFieldModel.asyncOptRefCtrlKeys)
        {
          var refControl = this.getFormControl(refControlKey, selfControl.parent as FormGroup);
          
          if(selfControl && refControl)
          {
            refControl.valueChanges.subscribe(() => {
              selfControl.reset();
            });
          } 
        }
      }*/

      //Add Listener for Value Change Events
      //Change to UpperCase if needed
      if((inputFieldModel.valueChangeEvents && inputFieldModel.valueChangeEvents.length > 0) || inputFieldModel.textInputUpperCase)
      {      
        //Subscribe current field Event Changes Listener
        selfControl.valueChanges.subscribe(()=>{
          this.executeValueChangeEvents(inputFieldModel, currentFormGroup.controls[inputFieldModel.key]);          
        });

        //Subscribe additional fields Event Changes Listener, if any
        if(inputFieldModel.valueChangeEvents)
        {
          for(let valueChangeEvent of inputFieldModel.valueChangeEvents)
          {
            if(valueChangeEvent.additionalListenFields)
            {
              for(let listenerField of valueChangeEvent.additionalListenFields)
              {             
                if(crossFieldListeners.indexOf(listenerField) < 0)                
                  crossFieldListeners.push(listenerField);
              }
            }
          }
        }
      }
      
      //Subscribe Cross Field Listener    
      crossFieldListeners.forEach( listenFieldName => {        
        var listenControl = this.getFormControl(listenFieldName, selfControl.parent as FormGroup);

        if(selfControl && listenControl)
        {
          listenControl.valueChanges.subscribe(() => {
            selfControl.updateValueAndValidity();                          
          });
        }        
      });
    });
  }

  //Default No Set CRUDMode, always return true
  isMatchCRUDMode(currentCRUDMode: string, formCRUDMode: string)
  {
    if (currentCRUDMode != null && formCRUDMode != null 
      && currentCRUDMode.length != 0 && formCRUDMode.length != 0 && currentCRUDMode.indexOf(formCRUDMode) < 0)
      return false;
    else
      return true;
  }
     
  //Validation Functions   
  
  /*private testJS()
  {

    var rawJS = `
      var hasDuplicate = false; 
      var phones = []; 
      for(let member of @{parent.familymember}.controls) 
      { 
        if(phones.indexOf(member.get('phone').value) < 0) 
        { 
          phones.push(member.get('phone').value); 
        } 
        else
        {
          hasDuplicate = true;
        }
      }

      hasDuplicate;
    `    
  }*/

  //OBSOLETE
  /*private customValidationFunc(custValidationFunc: string, messages: string[], mainForm: FormGroup): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => { 
      var bResult = this.dynamicFormCustFuncSrv[custValidationFunc](mainForm.controls, mainForm[ConstantAttributes.PARAM_FORM_MODEL]);    
      if(bResult >= 0)
      {
        var validationMsg = [];
        validationMsg.push(messages[0]);
        return {'customvalidationfunc': validationMsg};
      }
      else
        return null;
    };
  }*/

  private customValidationRules(custValidationRules: {validationRule: string, message: string, applyInCRUDMode: string}[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => { 

      var validateMsgs = [];
      var mainFormModel = this.getMainFormGroup(control)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;

      //Loop Each Rule
      for(let validationRuleObj of custValidationRules)
      { 
        //Check CRUD Mode
        if(this.isMatchCRUDMode(validationRuleObj.applyInCRUDMode, mainFormModel.crudMode))
        {
          if(this.executeJS(validationRuleObj.validationRule, control.parent as FormGroup))
            validateMsgs.push(validationRuleObj.message);
        }
      }

      if(validateMsgs.length > 0)
        return {'customvalidationrule': {'validateMsg':validateMsgs}}; 
      return null;
    };
  }

  private execAsyncValidation(refFields: string[]): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {

      let debounceTime = 500; //milliseconds

      return timer(debounceTime).pipe(switchMap(()=> {
          var paramObj = {};
          var controlArray: AbstractControl[] = [];

          paramObj[ConstantAttributes.PARAM_VALIDATION_FIELD_KEY] = control[ConstantAttributes.PARAM_FIELD_MODEL].key;
          paramObj[control[ConstantAttributes.PARAM_FIELD_MODEL].key] = control.value;

          controlArray.push(control);
          
          for(let refField of refFields)
          {
            var refControl = this.getFormControl(refField, control.parent as FormGroup); 
            paramObj[refControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = refControl.value;

            controlArray.push(refControl);
          }

          var mainFormModel = this.getMainFormGroup(control)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
          paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = mainFormModel.entityName;
          paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_ASYNC_VALID;
          return this.api.callAPIRequest<AsyncValidationMsgsModel>(paramObj, false, controlArray).then((result: AsyncValidationMsgsModel) => {
              return (result && result.asyncValidMsgs.length > 0 ) ? {'async': result.asyncValidMsgs } : null;
          });
        })
      );
    };
  }

  //Value Change Functions  

  private executeValueChangeEvents(inputFieldModel: InputFieldBaseModel, formControl: AbstractControl)
  {
    //UpperCase
    if(inputFieldModel.textInputUpperCase && formControl.value)
    {
      (formControl as FormControl).setValue((formControl.value as string).toUpperCase(), {emitEvent: false}); 
    }

    //Dynamic Change Events
    if(inputFieldModel.valueChangeEvents)
    {
      var mainFormModel = this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;      
      for(let valueChangeEvent of inputFieldModel.valueChangeEvents)
      {
        if(this.isMatchCRUDMode(valueChangeEvent.applyInCRUDMode, mainFormModel.crudMode))
        {
          switch(valueChangeEvent.type)
          {
			//OBSOLETE
            /*case ConstantAttributes.VALUECHANGEEVENTS_TYPE_FUNC:
              var funcName = valueChangeEvent.param;          
              var mainForm = this.getMainFormGroup(formControl);
              this.dynamicFormCustFuncSrv[funcName](mainForm.controls, mainForm[ConstantAttributes.PARAM_FORM_MODEL]); 
              break;*/
            
            case ConstantAttributes.VALUECHANGEEVENTS_TYPE_RULE:            
            case ConstantAttributes.VALUECHANGEEVENTS_TYPE_ASYNC:    
              var conditionRule = valueChangeEvent.param;
              var trueActions = valueChangeEvent.trueActions;
              var falseActions = valueChangeEvent.falseActions;
              var additionalListenFields = valueChangeEvent.additionalListenFields;
              this.execValueChangesRule(valueChangeEvent.type, conditionRule, trueActions, falseActions, formControl, additionalListenFields);                
              break;

            default:
            break;
          }
        }
      }
    }
  }

  private execValueChangesRule(type: string, conditionRule: string, 
    trueActions: {actionType: string, targetFields: string[], param: string[], applyInCRUDMode: string}[], 
    falseActions: {actionType: string, targetFields: string[], param: string[], applyInCRUDMode: string}[],
    formControl: AbstractControl, additionalListenFields: string[])
  {
      var bMatchCondition: boolean;
      //Execute the Local Rule
      if(type == ConstantAttributes.VALUECHANGEEVENTS_TYPE_RULE)
      {
        bMatchCondition = this.executeJS(conditionRule, formControl.parent as FormGroup);

        if(bMatchCondition && trueActions)
        {
          this.execValueChangesAction(trueActions, formControl, additionalListenFields);
        }
        else if(falseActions)
        {
          this.execValueChangesAction(falseActions, formControl, additionalListenFields);
        }
      }
      //Execute the Aync Rule
      else if(type == ConstantAttributes.VALUECHANGEEVENTS_TYPE_ASYNC)     
      {
        var controlArray: AbstractControl[] = [];
        var paramObj = {};
        paramObj[ConstantAttributes.PARAM_VALUE_CHANGED_FIELD_KEY] = formControl[ConstantAttributes.PARAM_FIELD_MODEL].key;
        paramObj[ConstantAttributes.PARAM_CONDITION_RULE] = conditionRule;
        paramObj[formControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = formControl.value;

        controlArray.push(formControl);
        
        for(let additionalListenField of additionalListenFields)
        {
          var addControl = this.getFormControl(additionalListenField, formControl.parent);
          paramObj[addControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = addControl.value;
          controlArray.push(addControl);
        }

        //PENDING
        var mainFormModel = this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
        paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = mainFormModel.entityName;
        paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_ASYNC_VALUE_CHANGE_CONDITION;
        this.api.callAPIRequest<ApiResultModel<boolean>>(paramObj, false, controlArray).then((result: ApiResultModel<boolean>) => {        
          bMatchCondition = result.result;

          if(bMatchCondition && trueActions)
          {
            this.execValueChangesAction(trueActions, formControl, additionalListenFields);
          }
          else if (falseActions)
          {
            this.execValueChangesAction(falseActions, formControl, additionalListenFields);
          }
        });
      } 
  }

  private execValueChangesAction(actions: {actionType: string, targetFields: string[], param: string[], applyInCRUDMode: string}[], formControl: AbstractControl, additionalListenFields: string[])
  {
    var mainFormModel = this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;   
    for(let action of actions)
    {        
      if(this.isMatchCRUDMode(action.applyInCRUDMode, mainFormModel.crudMode)) 
      {
        switch(action.actionType)
        {
          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_SETSUBFORMSUMMARY:

            formControl[ConstantAttributes.PARAM_FIELD_MODEL].subFormSummaries = [];

            for(let i=0; i<action.targetFields.length; i++)
            {
              var summaryMsg = action.targetFields[i];                
              var sValue = this.executeJS(action.param[i], formControl.parent as FormGroup);                                
              formControl[ConstantAttributes.PARAM_FIELD_MODEL].subFormSummaries.push(summaryMsg.replace("{{value}}", sValue));
            }            
            break;

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_SETVALUE:
            for(let i=0; i<action.targetFields.length; i++)
            {
              var targetControlName = action.targetFields[i];
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);                

              var sValue = this.executeJS(action.param[i], formControl.parent as FormGroup);
              targetFormControl.setValue(sValue);                
            }            
            break;

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_ASYNC:
            for(let i=0; i<action.targetFields.length; i++)
            {
              this.execValueChangesAsyncValueGeneration(action.targetFields[i], action.param[i], formControl, additionalListenFields);
            }            
            break;

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_ASYNC_CALLBACK:
              this.execValueChangesAsyncCallBack(action.param[0], formControl, additionalListenFields, action.param[1]);    
              break;   

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_RESET:
            for(let field of action.targetFields)
            {                
              var targetControlName = field;
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);              
              this.recursiveSetDefValue(targetFormControl);
            }
            break;

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_ENABLE:
            for(let field of action.targetFields)
            {
              var targetControlName = field;
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);    
              this.enableControl(targetFormControl);
            }
            break;
            
          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_DISABLE:
            for(let field of action.targetFields)
            {
              var targetControlName = field;
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);         
              this.disableControl(targetFormControl);
            }
            break;            

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_HIDE:
            for(let field of action.targetFields)
            {
              var targetControlName = field;
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);
              this.hideControl(targetFormControl);
            }
            break;

          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_SHOW:
            for(let field of action.targetFields)
            {
              var targetControlName = field;
              var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);
              this.showControl(targetFormControl);
            }
            break;
          
          case ConstantAttributes.VALUECHANGESEVENTS_ACTION_CUSTOM:
            for(let customAction of action.param)
            {
              this.executeJS(customAction, formControl.parent as FormGroup);
            }
            break;

          default:
            break;
        }   
      }     
    } 
  }

  private execValueChangesAsyncValueGeneration(targetControlName: string, setValueRule: string, formControl: AbstractControl, additionalListenFields: string[])
  {
    var targetFormControl = this.getFormControl(targetControlName, formControl.parent as FormGroup);                
    
    var controlArray: AbstractControl[] = [];
    var paramObj = {};
    paramObj[ConstantAttributes.PARAM_TARGET_FIELD_KEY] = targetFormControl[ConstantAttributes.PARAM_FIELD_MODEL].key;
    paramObj[ConstantAttributes.PARAM_VALUE_GENERATION_RULE] = setValueRule;
    paramObj[formControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = formControl.value;
    controlArray.push(targetFormControl);
    
    for(let additionalListenField of additionalListenFields)
    {
      var addControl = this.getFormControl(additionalListenField, formControl.parent);
      paramObj[addControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = addControl.value;
      controlArray.push(addControl);
    }

    var mainFormModel = this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = mainFormModel.entityName;
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_ASYNC_SET_VALUE;
    this.api.callAPIRequest<ApiResultModel<string>>(paramObj, false, controlArray).then((result: ApiResultModel<string>) => {       
      targetFormControl.setValue(result.result);  
    });
  }

  private execValueChangesAsyncCallBack(asyncRule: string, formControl: AbstractControl, additionalListenFields: string[], callBackJS: string)
  {                
    var controlArray: AbstractControl[] = [];
    var paramObj = {};    
    paramObj[ConstantAttributes.PARAM_VALUE_GENERATION_RULE] = asyncRule;
    paramObj[formControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = formControl.value;
    
    for(let additionalListenField of additionalListenFields)
    {
      var addControl = this.getFormControl(additionalListenField, formControl.parent);
      paramObj[addControl[ConstantAttributes.PARAM_FIELD_MODEL].key] = addControl.value;
      controlArray.push(addControl);
    }

    var mainFormModel = this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
    paramObj[ConstantAttributes.PARAM_ENTITY_NAME] = mainFormModel.entityName;
    paramObj[ConstantAttributes.PARAM_REQUEST_TYPE] = this.ConstantAttributes.API_REQUEST_TYPE_ASYNC_CALLBACK;
    this.api.callAPIRequest<ApiResultModel<any>>(paramObj, false, controlArray).then((result: ApiResultModel<any>) => {       
      this.executeJS(callBackJS, formControl.parent as FormGroup, result.result);
    });
  }
  
  private recursiveSetDefValue(formControl: AbstractControl)
  {
    if(formControl instanceof FormControl)
    {
      var inputFieldModel = (formControl[ConstantAttributes.PARAM_FIELD_MODEL] as InputFieldBaseModel);
      if(inputFieldModel && inputFieldModel.defValue && inputFieldModel.defValue.length > 0)
        formControl.setValue(inputFieldModel.defValue);
      else
        formControl.reset();
    }
    else if(formControl instanceof FormGroup)
    {
      for(let field in (formControl as FormGroup).controls)
      {
        var control = formControl.controls[field];
        this.recursiveSetDefValue(control);
      }
    }
    else if(formControl instanceof FormArray)
    {
      for(let control of (formControl as FormArray).controls)
      {        
        this.recursiveSetDefValue(control);
      }
    }
  }

  private disableControls(formControls: AbstractControl[])
  {
    for(let i=0; i<formControls.length; i++)
    {
      this.disableControl(formControls[i]);
    }
  }

  private enableControls(formControls: AbstractControl[])
  {
    for(let i=0; i<formControls.length; i++)
    {
      this.enableControl(formControls[i]);
    }
  }

  private hideControls(formControls: AbstractControl[])
  {
    for(let i=0; i<formControls.length; i++)
    {
      this.hideControl(formControls[i]);
    }
  }

  private showControls(formControls: AbstractControl[])
  {
    for(let i=0; i<formControls.length; i++)
    {
      this.showControl(formControls[i]);
    }
  }

  private disableControl(formControl: AbstractControl)
  {            
    this.recursiveEnableDisableControl(formControl, true);
    var inputFieldModel = formControl[ConstantAttributes.PARAM_FIELD_MODEL] as InputFieldBaseModel;
    var inputFormModel = formControl[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
    if(inputFieldModel)
      this.recursiveEnableDisableModel(inputFieldModel, true);
    else if(inputFormModel)
    {
      for(let inputField of inputFormModel.inputFieldModels)
      {
        this.recursiveEnableDisableModel(inputField, true);
      }
    }
    this.cd.detectChanges();
  }

  private enableControl(formControl: AbstractControl)
  {
    this.recursiveEnableDisableControl(formControl, false);
    var inputFieldModel = formControl[ConstantAttributes.PARAM_FIELD_MODEL] as InputFieldBaseModel;
    var inputFormModel = formControl[ConstantAttributes.PARAM_FORM_MODEL] as InputFormBaseModel;
    if(inputFieldModel)
      this.recursiveEnableDisableModel(inputFieldModel, false);
    else if(inputFormModel)
    {
      for(let inputField of inputFormModel.inputFieldModels)
      {
        this.recursiveEnableDisableModel(inputField, false);
      }
    }
    this.cd.detectChanges();
  }

  private hideControl(formControl: AbstractControl)
  {
    var targetInputFieldModel = formControl[ConstantAttributes.PARAM_FIELD_MODEL] as InputFieldBaseModel;
    targetInputFieldModel.hidden = true;
  }

  private showControl(formControl: AbstractControl)
  {
    var targetInputFieldModel = formControl[ConstantAttributes.PARAM_FIELD_MODEL] as InputFieldBaseModel;
    targetInputFieldModel.hidden = false;
  }

  private recursiveEnableDisableModel(targetInputFieldModel: InputFieldBaseModel, isDisable: boolean)
  {
    targetInputFieldModel.disable = isDisable;
    
    //Field Group Case
    if(targetInputFieldModel.fieldgroupFormModel && targetInputFieldModel.fieldgroupFormModel.inputFieldModels)
    {
      for(let inputField of targetInputFieldModel.fieldgroupFormModel.inputFieldModels)
      {
        this.recursiveEnableDisableModel(inputField, isDisable);
      }
    }

    //Sub Form Case
    if(targetInputFieldModel.inputFormModels)
    {
      for(let subForm of targetInputFieldModel.inputFormModels)
      {
        for(let inputField of subForm.inputFieldModels)
        {
          this.recursiveEnableDisableModel(inputField, isDisable);
        }
      }
    }
  }

  private recursiveEnableDisableControl(formControl: AbstractControl, isDisable: boolean)
  {
    if(isDisable)
      formControl.disable({onlySelf: true, emitEvent: false});
    else
      formControl.enable({onlySelf: true, emitEvent: false});
    
    if(formControl instanceof FormGroup)
    {
      for(let _control in (formControl as FormGroup).controls)
      {
        this.recursiveEnableDisableControl(formControl.controls[_control], isDisable);
      }
    }   
    
    if(formControl instanceof FormArray)
    {
      for(let _control of (formControl as FormArray).controls)
      {
        this.recursiveEnableDisableControl(_control, isDisable);
      }
    }
  }

  //SubForm Function

  countSubForm(subFormArray: FormArray, criteriaRule: string)
  {
    var iCount = 0;

    for(let subForm of subFormArray.controls)
    {
      if(this.executeJS(criteriaRule, subForm as FormGroup)) 
      { 
        iCount += 1; 
      }            
    }    

    return iCount
  }

  sumSubForm(subFormArray: FormArray, criteriaRule: string, sumFieldName: string)
  {
    var sum = 0.00;

    for(let subForm of subFormArray.controls)
    {
      if(this.executeJS(criteriaRule, subForm as FormGroup)) 
      { 
        if(!isNaN((subForm as FormGroup).controls[sumFieldName].value))
         sum += parseFloat((subForm as FormGroup).controls[sumFieldName].value);
      }            
    }    

    return sum
  }

  checkSubFormDuplicate(subFormArray: FormArray, uniqueFields: string[])
  {
    var uniqueValues = []; 

    for(let subForm of subFormArray.controls)
    {
      var uniqueValue = "";
      for(let field of uniqueFields)
      {
        if(uniqueValue.length > 0)
          uniqueValue += "-";
        
        uniqueValue += (subForm as FormGroup).controls[field].value;
      }

      if(uniqueValue.length > 0)
      {
        if(uniqueValues.indexOf(uniqueValue) < 0)
          uniqueValues.push(uniqueValue);
        else
          return true;
      }
    }

    return false;    
  }

  executeActionFormCreated(actionJS: string, formGroup: FormGroup)
  {
    if(actionJS && actionJS.length > 0)
    {
      this.executeJS(actionJS, formGroup);
    }
  }

  executeActionFormRemoved(actionJS: string, formArray: FormArray)
  {
    if(actionJS && actionJS.length > 0)
    {
      this.executeJS(actionJS, formArray);
    }
  }

  //MISC  

  executeJS(expressionRule: string, _currentFormGroup: FormGroup | FormArray, _callBack?: any) : any {  
    let expressionJS = this.replaceControlPlaceHolders(expressionRule);        
    return eval(expressionJS);
  }

  private replaceControlPlaceHolders(expressionRule: string) : string
  {
    var fieldPlaceHolders = expressionRule.match(/\@\{((?!\@\{).)*\}/gi);

    if(fieldPlaceHolders)
    {
      for(let fieldPlaceHolder of fieldPlaceHolders)
      {
        var refField = fieldPlaceHolder.replace("@{","this.getFormControl('").replace("}","', _currentFormGroup)");

        expressionRule = expressionRule.replace(fieldPlaceHolder, refField);
      }
    }

    return expressionRule;
  }
  
  getFormControl(controlName: string, currentFormGroup: FormGroup | FormArray)
  {
    if(currentFormGroup)
    {
      if(controlName.startsWith("main."))
      {
        var nextControlName = controlName.replace("main.","");
        return this.getMainFormGroup(currentFormGroup).controls[nextControlName];
      }
      else if(controlName.startsWith("parent."))
      {
        var nextControlName = controlName.replace("parent.","");

        //Handle Subform Case
        if(currentFormGroup.parent instanceof FormArray)
          return this.getFormControl(nextControlName, currentFormGroup.parent.parent as FormGroup);
        else
          return this.getFormControl(nextControlName, currentFormGroup.parent);
      }    
      else if(controlName.indexOf('.') >= 0)
      {
          var childControlName = controlName.slice(0, controlName.indexOf('.'));
          var nextControlName = controlName.replace(childControlName + ".","");

          return this.getFormControl(nextControlName, currentFormGroup.controls[childControlName]);
      }
      else
        return currentFormGroup.controls[controlName]; 
    }
    else
      return null;
  }  

  getMainFormGroup(currentControl: AbstractControl) : FormGroup
  {
      if(currentControl.parent)
        return this.getMainFormGroup(currentControl.parent);
      else
        return currentControl as FormGroup;
  }

  getInputFormValuePayLoadObj(formGroup: FormGroup, inputFieldModels: InputFieldBaseModel[])
  {
    var payLoadObj = {'controls':{}};
    for(let inputFieldBaseModel of inputFieldModels)
    {
      switch (inputFieldBaseModel.controlType)
      {
        case ConstantAttributes.CONTROL_TYPE_SUBFORMARRAY:
          var subFormArray = formGroup.controls[inputFieldBaseModel.key] as FormArray;
          var subFormModelArray = inputFieldBaseModel.inputFormModels;
          var subFormPayLoadObj = [];

          for(var i=0; i < subFormModelArray.length; i++)
          {
            subFormPayLoadObj.push(this.getInputFormValuePayLoadObj(subFormArray.controls[i] as FormGroup, subFormModelArray[i].inputFieldModels));
          }

          payLoadObj.controls[inputFieldBaseModel.key] = {'controls':subFormPayLoadObj};
          
          break;

        case ConstantAttributes.CONTROL_TYPE_FIELDGROUP:
          var fieldGroup = formGroup.controls[inputFieldBaseModel.key] as FormGroup;

          payLoadObj.controls[inputFieldBaseModel.key] = this.getInputFormValuePayLoadObj(fieldGroup, inputFieldBaseModel.fieldgroupFormModel.inputFieldModels);
          
          break;

        case ConstantAttributes.CONTROL_TYPE_CHECKLIST:
          var selectedOpt = (formGroup.controls[inputFieldBaseModel.key] as MyFormCheckList).selectedKeys;
          payLoadObj.controls[inputFieldBaseModel.key] = {'value':selectedOpt};
          break;

        case ConstantAttributes.CONTROL_TYPE_LABEL:
        case ConstantAttributes.CONTROL_TYPE_HTML:
        case ConstantAttributes.CONTROL_TYPE_LINK_BUTTON:
        case ConstantAttributes.CONTROL_TYPE_PDF:      
          break;
        
        case ConstantAttributes.CONTROL_TYPE_FILE:
          var fileValue = formGroup.controls[inputFieldBaseModel.key].value;
          fileValue = fileValue.replace('data:image/jpeg;base64,','').slice(0,20) + '...';
          payLoadObj.controls[inputFieldBaseModel.key] = {'value':fileValue};          
          break;
                
        default:
          payLoadObj.controls[inputFieldBaseModel.key] = {'value':formGroup.controls[inputFieldBaseModel.key].value};          
          break;
      }
    }

    return payLoadObj;
  }  

  getSimplifiedInputFormValuePayLoadObj(formGroup: FormGroup, inputFieldModels: InputFieldBaseModel[])
  {
    var payLoadObj = {};
    for(let inputFieldBaseModel of inputFieldModels)
    {
      switch (inputFieldBaseModel.controlType)
      {
        case ConstantAttributes.CONTROL_TYPE_SUBFORMARRAY:
          var subFormArray = formGroup.controls[inputFieldBaseModel.key] as FormArray;
          var subFormModelArray = inputFieldBaseModel.inputFormModels;
          var subFormPayLoadObj = [];

          for(var i=0; i < subFormModelArray.length; i++)
          {
            subFormPayLoadObj.push(this.getSimplifiedInputFormValuePayLoadObj(subFormArray.controls[i] as FormGroup, subFormModelArray[i].inputFieldModels));
          }

          payLoadObj[inputFieldBaseModel.key] = subFormPayLoadObj;
          
          break;

        case ConstantAttributes.CONTROL_TYPE_FIELDGROUP:
          var fieldGroup = formGroup.controls[inputFieldBaseModel.key] as FormGroup;

          payLoadObj[inputFieldBaseModel.key] = this.getSimplifiedInputFormValuePayLoadObj(fieldGroup, inputFieldBaseModel.fieldgroupFormModel.inputFieldModels);
          
          break;

        case ConstantAttributes.CONTROL_TYPE_CHECKLIST:
          var selectedOpt = (formGroup.controls[inputFieldBaseModel.key] as MyFormCheckList).selectedKeys;
          payLoadObj[inputFieldBaseModel.key] = selectedOpt;
          break;

        case ConstantAttributes.CONTROL_TYPE_LABEL:
        case ConstantAttributes.CONTROL_TYPE_HTML:
        case ConstantAttributes.CONTROL_TYPE_LINK_BUTTON:
        case ConstantAttributes.CONTROL_TYPE_PDF:        
          break;
        
        case ConstantAttributes.CONTROL_TYPE_FILE:
          var fileValue = formGroup.controls[inputFieldBaseModel.key].value;
          fileValue = fileValue.replace('data:image/jpeg;base64,','').slice(0,20) + '...';
          payLoadObj[inputFieldBaseModel.key] = fileValue;          
          break;
                
        default:
          payLoadObj[inputFieldBaseModel.key] = formGroup.controls[inputFieldBaseModel.key].value;          
          break;
      }
    }

    return payLoadObj;
  }  

  //Move Here for real time regenerate

  regenSubFormModelsAndControls(formControl: FormControl, _subInputFormValues?: {}[])
  {
    if(formControl)
    {
      //Pass the subForm Input Values
      if(_subInputFormValues)
      {
        formControl[ConstantAttributes.PARAM_FIELD_MODEL].subInputFormValues = _subInputFormValues;
      }
      this.initSubFormModelsAndControls(formControl[ConstantAttributes.PARAM_FIELD_MODEL], formControl.parent as FormGroup, this.getMainFormGroup(formControl)[ConstantAttributes.PARAM_FORM_MODEL], true);
    }
  }
  
  initSubFormModelsAndControls(inputFieldModel: InputFieldBaseModel, form: FormGroup, mainFormModel: InputFormBaseModel, reInit?: boolean) 
  {
    if(reInit || !inputFieldModel.fieldComponentFirstLoaded)
    {          
        //this.inputFieldModel.subFormNextFormSerial = 1;
        //Get Template
        var templateinputFieldModels = inputFieldModel.templateinputFieldModels; //this.getTemplateInputFieldModels(this.inputFieldModel.key);
        inputFieldModel.inputFormModels = new Array<InputFormBaseModel>();
        while ((form.controls[inputFieldModel.key] as FormArray).length !== 0) {
          (form.controls[inputFieldModel.key] as FormArray).removeAt(0);
        }          

        //Check if there are any subform objects need to pre-load.
        var defaultSubFormArrayCount = parseInt(inputFieldModel.defaultSubFormArrayCnt);
        if(inputFieldModel.subInputFormValues && inputFieldModel.subInputFormValues.length > parseInt(inputFieldModel.defaultSubFormArrayCnt))
        {
          defaultSubFormArrayCount = inputFieldModel.subInputFormValues.length;
        }

        for (var i=0; i < defaultSubFormArrayCount; i++) {
          //Init Models
          var inputSubFormBaseModel = this.createInputFieldModelsFromTemplate(inputFieldModel.key, templateinputFieldModels);
          inputSubFormBaseModel.parentFieldModel = inputFieldModel;

          //Pass the InputFieldValues of each subForm
          if(inputFieldModel.subInputFormValues && inputFieldModel.subInputFormValues[i])
            inputSubFormBaseModel.inputFieldValues = inputFieldModel.subInputFormValues[i];

          inputFieldModel.inputFormModels.push(inputSubFormBaseModel);

          //Init Controls            
          (form.controls[inputFieldModel.key] as FormArray).push(this.initFormGroup(inputSubFormBaseModel, null, mainFormModel.crudMode));

          this.setValidatorsAndListeners(inputSubFormBaseModel.inputFieldModels, (form.controls[inputFieldModel.key] as FormArray).at(i) as FormGroup);
          
          //Execute any action after Add SubForm
          this.executeActionFormCreated(inputFieldModel.actionAfterSubFormAdded, (form.controls[inputFieldModel.key] as FormArray).at(inputFieldModel.inputFormModels.length - 1) as FormGroup);
        }
        
        //Assign the PreLoad Value (Change to use another Design)
        /*if(inputFieldModel.preLoadSubInputFormModelValues && inputFieldModel.preLoadSubInputFormModelValues.length > 0)
        {
          for (var i=0; i < inputFieldModel.preLoadSubInputFormModelValues.length ; i++) 
          {
            let inputFieldValues = inputFieldModel.preLoadSubInputFormModelValues[i].inputFieldModelValues;
            var subForm: FormGroup = (form.controls[inputFieldModel.key] as FormArray).at(i) as FormGroup;
            for(let field of inputFieldValues)      
            {
              if(subForm.controls[field.key])
                subForm.controls[field.key].setValue(field.value);
            }        
          }
        }*/

        inputFieldModel.fieldComponentFirstLoaded = true;

        //Clear the subForm Input Values as they has been passed to each sub Form.
        inputFieldModel.subInputFormValues = null;

        this.cd.detectChanges();
    }
  }

  createInputFieldModelsFromTemplate(templateKey: string, templateinputFieldModels: InputFieldBaseModel[]): InputFormBaseModel
  {
      var inputSubFormBaseModel = new InputFormBaseModel();
      
      //inputSubFormBaseModel.templateKey = templateKey;
      //inputSubFormBaseModel.serial = String('00000'+(serial)).slice(-3);
      //inputSubFormBaseModel.key = inputSubFormBaseModel.templateKey ; //+ '_' + inputSubFormBaseModel.serial;

      templateinputFieldModels.forEach(templateinputFieldModel => {
        var inputFieldModel : InputFieldBaseModel = JSON.parse(JSON.stringify(templateinputFieldModel));
        /*inputFieldModel.key = templateinputFieldModel.templateKey;         
        if(templateinputFieldModel.templateParentControlKey)
          inputFieldModel.parentControlKey = inputSubFormBaseModel.key + '_' + templateinputFieldModel.templateParentControlKey;  */  

        inputFieldModel.parentFormModel = inputSubFormBaseModel;
        inputSubFormBaseModel.inputFieldModels.push(inputFieldModel);        
      });

      return inputSubFormBaseModel;
  }

  /*
  private crossFieldValidate(validationType: string, targetControls: AbstractControl[], messages: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {    
      
      var validateMsgs = [];
  
      for(var i=0; i<targetControls.length; i++)
      {
        var targetControl = targetControls[i];
        
        switch(validationType) {            
          case 'validateequal':
            if(control.value && targetControl.value && control.value != targetControl.value)
            validateMsgs.push(messages[i]);
            break;
          case 'validatediff':
            if(control.value && targetControl.value && control.value == targetControl.value)
            validateMsgs.push(messages[i]);
            break;
          case 'valdategreaterthan':
            if(control.value && targetControl.value && !(control.value > targetControl.value))
            validateMsgs.push(messages[i]);
            break;
          case 'validategreaterthanorequal':
            if(control.value && targetControl.value && !(control.value >= targetControl.value))
            validateMsgs.push(messages[i]);
            break;
          case 'validatesmallerthan':
            if(control.value && targetControl.value && !(control.value < targetControl.value))
            validateMsgs.push(messages[i]);
            break;          
          case 'validatesmallerthanorequal':
            if(control.value && targetControl.value && !(control.value <= targetControl.value))
            validateMsgs.push(messages[i]);
            break;
          case 'validatedatebefore':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "YYYY-MM-DDTHH:mm:ss");
              var dateTarget = moment(targetControl.value, "YYYY-MM-DDTHH:mm:ss");
  
              if(!(dateSelf < dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatedatebeforeorequal':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "YYYY-MM-DDTHH:mm:ss");
              var dateTarget = moment(targetControl.value, "YYYY-MM-DDTHH:mm:ss");
  
              if(!(dateSelf <= dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatedateafter':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "YYYY-MM-DDTHH:mm:ss");
              var dateTarget = moment(targetControl.value, "YYYY-MM-DDTHH:mm:ss");
  
              if(!(dateSelf > dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatedateafterorequal':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "YYYY-MM-DDTHH:mm:ss");
              var dateTarget = moment(targetControl.value, "YYYY-MM-DDTHH:mm:ss");
  
              if(!(dateSelf >= dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
            case 'validatetimebefore':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "HH:mm:ss");
              var dateTarget = moment(targetControl.value, "HH:mm:ss");
  
              if(!(dateSelf < dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatetimebeforeorequal':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "HH:mm:ss");
              var dateTarget = moment(targetControl.value, "HH:mm:ss");
  
              if(!(dateSelf <= dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatetimeafter':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "HH:mm:ss");
              var dateTarget = moment(targetControl.value, "HH:mm:ss");
  
              if(!(dateSelf > dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          case 'validatetimeafterorequal':
            if(control.value && targetControl.value)
            {
              var dateSelf = moment(control.value, "HH:mm:ss");
              var dateTarget = moment(targetControl.value, "HH:mm:ss");
  
              if(!(dateSelf >= dateTarget))
              validateMsgs.push(messages[i]);
            }         
            break;
          default:
            break;
        }      
      }
  
      if(validateMsgs.length > 0)
      {
        switch(validationType){
          case 'validateequal':
            return {'validateequal': {'validateMsg':validateMsgs}};
          case 'validatediff':
            return {'validatediff': {'validateMsg':validateMsgs}};
          case 'valdategreaterthan':
            return {'valdategreaterthan': {'validateMsg':validateMsgs}};
          case 'validategreaterthanorequal':
            return {'validategreaterthanorequal': {'validateMsg':validateMsgs}};
          case 'validatesmallerthan':
            return {'validatesmallerthan': {'validateMsg':validateMsgs}};
          case 'validatesmallerthanorequal':
            return {'validatesmallerthanorequal': {'validateMsg':validateMsgs}};
          case 'validatedatebefore':
            return {'validatedatebefore': {'validateMsg':validateMsgs}};
          case 'validatedatebeforeorequal':
            return {'validatedatebeforeorequal': {'validateMsg':validateMsgs}};
          case 'validatedateafter':
            return {'validatedateafter': {'validateMsg':validateMsgs}};
          case 'validatedateafterorequal':
            return {'validatedateafterorequal': {'validateMsg':validateMsgs}};
          default:
            return null;
        }
      }      
      else
        return null;    
    };
  }*/

   /*private replaceControlValues(expressionRule: string) : string
  {
    var fieldPrefix = "formGroup.get('";

    var fields = expressionRule.match(/\@\{((?!\@\{).)*\}/gi);
    for(let field of fields)
    {
      var replaceField = "";
      if((field as string).startsWith("@{parent."))
      {
        replaceField = (field as string).replace("parent.","");
        replaceField = replaceField.replace("@{","mainFormGroup.get('").replace("}","').value");
      }
      else
        replaceField = field.replace("@{",fieldPrefix).replace("}","').value");

      expressionRule = expressionRule.replace(field, replaceField);      
    }
    
    return expressionRule;
  }*/

  /*private validateHKID(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {    
      var isValid = validid.hkid(control.value);
      return isValid ? null : {'validatehkid': true} ;
    };
  }*/

  /*
  private validateUniqueAcrossSubForm(controlName: string, message: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      
      var formArray = control.parent.parent as FormArray;
      var validateMsgs = [message];
          
      if(this.checkDuplicate(formArray, controlName))      
        return {'validateunique': {'validateMsg':validateMsgs}};        
      else
        return null;
    };
  }
  
  private checkDuplicate(formArray: FormArray, controlName: string) : boolean
  {
    var values = []; 
    for(let form of formArray.controls) 
    { 
      if(values.indexOf(form.get(controlName).value) < 0) 
      { 
        values.push(form.get(controlName).value); 
      } 
      else
      {
        return true;
      }
    }
    
    return false;
  }*/
}