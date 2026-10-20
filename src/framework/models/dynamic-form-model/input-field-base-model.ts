import {InputFormBaseModel} from './input-form-base-model';
import { AsyncOptionsModel } from './async-options-model';

export class InputFieldBaseModel {
    //Common Attribute
    defValue: any;                   //Default Value
    key: string;    
    hidden: boolean;
    //CRUD Mode Specific. Optional. Will skip if value is null.
    /*
    C/R/U/D
    */
    hiddenInCRUDMode: string;

    label: string;
    labelStyle: string;
    labelClass: string;
    
    /* (Ionic Attributes on Label Placement)
      'fixed'
      'floating'
      'stacked'
      '' 
    */
    labelPlacement: string;
    labelHidden: boolean;
    
    /*
      'textbox',
      'datepicker',
      'timepicker',
      'dropdown',
      'radio',
      'checkbox',
      'subformarray',
      'fieldgroup',
      'hidden',
      'checklist',
      'file',
      'label',
      'linkbutton',
      'imgBanner',
      'img',
      'iframe'  
    */
    controlType: string;  
    controlStyle: string;
    controlClass: string;

    ionItemStyle: string; //Override the style of ion-item

    inputStyle: string;
    inputClass: string;
    placeHolder: string;
    showPlaceHolder: boolean;
    disable: boolean;
    uiDisable: boolean; //Only disable in outlook, the validation is still proceed.
    cancelText: string;
    locateAfterConfirmation: boolean; //When the field is located at Confirmation Page, set if it should show after the confirmation fields.    

    //CRUD Mode Specific. Optional. Will skip if value is null.
    /*
    C/R/U/D
    */
    disableInCRUDMode: string;
    readonly: boolean;

    /*
      '1' - Full Width
      '5/6' - Five Sixth Width 
      '3/4' - Three Quarter Width
      '2/3' - Two Third Width
      '1/2' - Half Width
      '1/3' - One Third Width
      '1/4' - One Quarter Width
      '1/6' - One Sixth Width
    */
    colWidth: string; 
    
    validations: {
      /*
        'required'
        'minlength'
        'maxlength'
        'min'
        'max'        
        'pattern'                
        'customvalidationrule'
        'async'
      */
      type: string, 

      //For type = 'async', param stores the related field names that required in the validation.
      param: string[], 
      messages: string[], 

      //OBSOLETE
      //For type='customvalidationfunc', fill in JS Function Name which pre-defined in dynamic-form-cust-func.ts
      //custValidationFunc: string,

      //For type='customvalidationrule', fill in the JS Boolean Expression. E.g. "@{firstname} != '' && @{username} != '' && @{username} == @{firstname}"
      custValidationRules: { 
        validationRule: string,
        message: string,
        //CRUD Mode Specific. Optional. Will Always Apply this rule if null.
        /*
        C/R/U/D
        */
        applyInCRUDMode: string
      }[],
      
      //CRUD Mode Specific. Optional. Will Always Apply this rule if null.
      /*
      C/R/U/D
      */
     applyInCRUDMode: string
    } [] = [];

    validationStyle: string;
    validationClass: string;   
    
    valueChangeEvents: {
      /*        
        'rule',
        'async-rule'
      */
      type: string, 
      /*        
        For type='rule', fill in the JS Boolean Expression. E.g. "@{firstname} != '' && @{username} != '' && @{username} == @{firstname}"
        For type='async-rule', fill in the condition rule name stored in Server
      */
      param: string, 
      additionalListenFields: string[], 
      trueActions: {
        /*
          'setvalue'
          'reset'
          'enable'
          'disable'
          'hide'
          'show'
          'custom'
          'async-value-generation'
          'async-callback'
        */
        actionType: string, 
        targetFields: string[], 

        //For actionType='setvalue' or 'custom', fill in the value in JS Expression. E.g. "'Testing 123 ' + @{firstname}"
        //For actionType='async-value-generation', fill in the value generation rule name stored in Server.
        /*
          For actionType='async-callback', 1st element is the callback rule name stored in Server, 2nd element is the JS Expression to execute after callback.
          After the program finish the API call, the result return from Server will store in variable "_callBack". 
          The JS Expression can then get the values in _callBack can assign them different fields.
        */
        param: string[],

        //CRUD Mode Specific. Optional. Will Always Apply this rule if null.
        /*
        C/R/U/D
        */
       applyInCRUDMode: string
      }[],
      falseActions: {
        /*
          'setvalue'
          'reset'
          'enable'
          'disable'
          'hide'
          'show'
          'custom'
          'async-value-generation'
        */
        actionType: string, 
        targetFields: string[], 

        //For actionType='setvalue' or 'custom', fill in the value in JS Expression. E.g. "'Testing 123 ' + @{firstname}"
        //For actionType='async-value-generation', fill in the value generation rule name stored in Server.
        param: string[],

        //CRUD Mode Specific. Optional. Will Always Apply this rule if null.
        /*
        C/R/U/D
        */
       applyInCRUDMode: string
      }[],

      //CRUD Mode Specific. Optional. Will Always Apply this rule if null.
      /*
      C/R/U/D
      */
     applyInCRUDMode: string
    }[] = [];

    // '0','1','2'....
    locateAtTabIndex: string;
    requireConfirm: boolean;
    confirmLabel: string;
    confirmLabelStyle : string;
    confirmLabelClass : string;
    confirmValueStyle : string;
    confirmValueClass : string;    
    confirmValueIsLink : boolean; //Display the Value as HTML Link

    /*
      '1' - Full Width
      '5/6' - Five Sixth Width 
      '3/4' - Three Quarter Width
      '2/3' - Two Third Width
      '1/2' - Half Width
      '1/3' - One Third Width
      '1/4' - One Quarter Width
      '1/6' - One Sixth Width
    */
    confirmColWidth : {width: string, labelWidth: string, valueWidth: string}; 

    /*
      For controlType = 'textbox'. 
      'password'
      'number'
    */
    textInputType: string;  
    textInputUpperCase: boolean;
    
    /*
      For controlType = 'dropdown' or 'radio' or 'checklist'
    */
    isAsyncOptions : boolean;
    asyncOptRefCtrlKeys: string[];       //Ref Another Control Values for Async Cascade Update, if any    
    asyncOptValueChangesCtrlKeys: string[]; //Trigger Cascade Update by these controls value changes.
    asyncOptionsModel: AsyncOptionsModel;

    options: {
      key: string, 
      desc: string, 
      refControlValue: string
    }[] = [];
    multipleValue: boolean
    refControlKey: string;             //Ref Another Control Value for Cascade Update    

    /*
      For controlType = 'datepicker' or 'timepicker'
    */
    displayFormat: string;
    pickerFormat: string;
    minDate: string;
    maxDate: string;

    /*
      For controlType = 'linkbutton'
      linkClickAction - JS Script
      linkIcon - Icon Name from the template
    */    
    linkClickAction: string;
    linkIcon: string;

    /*
      For controlType = 'subformarray'
    */
    subFormArrayBorderHidden: boolean;
    subFormArrayLabel: string;
    //subFormArrayLabelStyle: string;
    //subFormArrayLabelClass: string;    
    subFormIonGridStyle: string;
    subFormFieldIonColStyle: string;
    // '0','1'....
    defaultSubFormArrayCnt: string;
    // '0','1'....
    minSubFormArrayCnt: string;
    // '0','1'....
    maxSubFormArrayCnt: string;
    // Template InputFields in each SubForm
    templateinputFieldModels: InputFieldBaseModel[];
    // PreLoad the Values on SubForm (For Retrieve Existing Data)
    subInputFormValues: {}[];

    // Comment to use another design
    /*preLoadSubInputFormModelValues: { 
      inputFieldModelValues: { 
        key: string, 
        value: string
      }[] 
    }[];*/

    // Listeners on Sub Form Item Count Changes
    subFormArrayCntChangeListenFields: string[];
    // JS Action execute after Sub Form Added
    actionAfterSubFormAdded: string;
    // JS Action execute after Sub Form Removed
    actionAfterSubFormRemoved: string;
    // All SubForm Buttons Attributes
    btnSubFormAdd: string;
    btnSubFormRemove: string;
	/*
      '1' - Full Width
      '5/6' - Five Sixth Width 
      '3/4' - Three Quarter Width
      '2/3' - Two Third Width
      '1/2' - Half Width
      '1/3' - One Third Width
      '1/4' - One Quarter Width
      '1/6' - One Sixth Width
    */
    btnSubFormRemoveColWidth: string;
    btnSubFormAddHidden: boolean;
    btnSubFormRemoveHidden: boolean;
    
    /*
      For controlType = 'fieldgroup'
    */
    fieldgroupFormModel: InputFormBaseModel;  

    /*
      For controlType = 'imgBanner'
    */
    imgBannerbgImgURL: string;
    imgBannerTitle: string;
    imgBannerSubTitle: string;
    imgBannerHeight: string;

    /*
      For controlType = 'img'      
    */
    imgURL: string;
    
    /*
      For controlType = 'label'
    */
    innerHTML: boolean;
    
    /*
      For controlType = 'button'      
    */
    /*
      'formsubmit'
      'login'
      'logout'
      'navigate'
      'popover'
      'close'
      'link'
      */
    //clickAction: string;

    /*
      No need define in JSON
    */
    inputFormModels: InputFormBaseModel[] = []; //SubForm Elements
    fieldComponentFirstLoaded: boolean;    
    parentFormModel: InputFormBaseModel; //For Field in Sub Form / Form Group   
    subFormSummaries: string[] = [];    
    asyncProcessCnt: number;
    MIMETYPE: string;
  }