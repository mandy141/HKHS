import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ActivityFormPageModel } from './activity-form-page-model';

export class ActivityFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    cancelText: string;
    selectAll: string;
    formType: string;
    headerImage: string;
    pages: ActivityFormPageModel[];

}