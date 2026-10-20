import { KeyValueBaseModel } from "./key-value-base-model";

export class CheckPointBaseModel {    
    key: string;
    title: string;
    icon: string;
    componentName: string;
    entityName: string;
    /*
    C/R/U/D for Input Form
    */
    crudMode: string;
    /*
    Additional Params
    */
    additionalParams: KeyValueBaseModel [];
    subMenu: CheckPointBaseModel[];
    unreadNotificationCnt: string;
}