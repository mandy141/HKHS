import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { TenantFeedbackRecord} from '../layout-form-model/tenant-feedback-list-layout-record-model'

export class TenantFeedbackListBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    componentName: string;
    headerImage: string;
    alertTitle: string;
    alertMsg: string;
    btnCancelText:string;
    inputRefNoText:string;
    btnOKText:string;
    errTelValue: string;
    validatePhoneNoPattern: string;
    lblInvalidPhoneNoMsg: string;
    tenantItems: TenantFeedbackRecord[];

}