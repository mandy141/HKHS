import {InputFieldBaseModel} from './input-field-base-model';
import {UserBaseModel} from '../user-base-model';

export class InputFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    inputFormTitle: string = "";
    inputFormInnerTitle: string = "";
    inputFormClass: string = "";
    inputFormStyle: string = "";
    inputFormShowTabBar: boolean;   
    inputFormSubmitButtonLabel: string = "";
    inputFormSubmitButtonRemark: string = "";
    inputFormNextButtonLabel: string = "";
    inputFormPrevButtonLabel: string = "";
    inputFormCloseButtonLabel: string = "";
    inputFormCloseButtonHidden: boolean;
    //inputFormType: string = "";
    /*
    C/R/U/D
    */
    crudMode: string;

    inputFormTabs: {
        tabIndex: string,
        tabTitle: string, 
        tabTitleClass: string, 
        tabTitleStyle: string, 
        showTabTitle: boolean,

        /*
            'input'
            'confirmation'
        */
        tabType: string
    } [] = [];

    /*
        Preload Data for Update/Read/Delete Mode
    */
   inputFieldValues: {};

   /*
       Fields in this Form
   */
   inputFieldModels: InputFieldBaseModel[] = [];

   /*
       JS Action execute after Form Created
   */
   actionAfterFormCreated: string;

   /*
     No need define in JSON. For SubForm
   */
   parentFieldModel: InputFieldBaseModel;        
   btnCurrentSubFormRemoveHidden: boolean;
   btnCurrentSubFormRemoveDisable: boolean;
}