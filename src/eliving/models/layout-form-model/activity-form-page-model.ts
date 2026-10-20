import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ActivityFormRecordModel } from './activity-form-record-model';

export class ActivityFormPageModel {
   
    pageId: string;
    pageName: string;
    pageIndex: number;
    pageBackgroundImage: string;
    records: ActivityFormRecordModel[];   

}