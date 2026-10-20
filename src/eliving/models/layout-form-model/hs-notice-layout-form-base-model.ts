import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { HSNoticeLayoutFormRecordModel} from '../layout-form-model/hs-notice-layout-form-record-model'

export class HSNoticeLayoutFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    noiticeType: string;
    noticeItems: HSNoticeLayoutFormRecordModel[];

    /*
    noticeItems: {
        uniqueIdentifier: string;
        typeColor: string;
        typeDesc: string;
        desc: string;
        openURL: string;
    }[];
    */

}