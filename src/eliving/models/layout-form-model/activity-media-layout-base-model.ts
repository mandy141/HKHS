import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ActivityMediaLayoutPageModel } from './activity-media-layout-page-model';

export class ActivityMediaLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    cancelText: string;
    selectAll: string;
    formType: string;
    headerImage: string;
    selectedPageIndex: string;
    pages: ActivityMediaLayoutPageModel[];

}