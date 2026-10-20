import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ActivingMediaRecordModel } from './activity-media-layout-record-model';

export class ActivityMediaLayoutPageModel {
    pageId: string;
    pageName: string;
    pageIndex: string;
    pageBackgroundImage: string;
    records: ActivingMediaRecordModel[];
    
}