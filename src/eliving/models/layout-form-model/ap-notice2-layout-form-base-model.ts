import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { APNotice2LayoutFormRecordModel} from '../layout-form-model/ap-notice2-layout-form-record-model'

export class APNotice2LayoutFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    noiticeType: string;
    noticeItems: APNotice2LayoutFormRecordModel[];

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