import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { APNoticeLayoutFormRecordModel} from '../layout-form-model/ap-notice-layout-form-record-model'

export class APNoticeLayoutFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    noiticeType: string;
    noticeItems: APNoticeLayoutFormRecordModel[];

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