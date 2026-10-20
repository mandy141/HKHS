import {UserBaseModel} from '../../../framework/models/user-base-model';

import { VisitorRecordFormPageModel } from './visitor-record-form-page-model';

export class VisitorRecordFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    deleteIcon: string;
    
    lblDeleteWarning: string;
    lblDeleteYesAns: string;
    lblDeleteNoAns: string;
    btnNew: string;
    newEntityName: string;
    pages: VisitorRecordFormPageModel[];
}