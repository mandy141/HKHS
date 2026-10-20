import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { HSNotice2LayoutFormRecordModel} from '../layout-form-model/hs-notice2-layout-form-record-model'

export class HSNotice2LayoutFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    selectAll: string;
    cancelText: string;
    noiticeType: string;
    noticeItems: HSNotice2LayoutFormRecordModel[];

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