import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { NoticeLayoutFormRecordModel} from '../layout-form-model/notice-layout-form-record-model'

export class NoticeLayoutFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    noiticeType: string;
    noticeItems: NoticeLayoutFormRecordModel[];

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