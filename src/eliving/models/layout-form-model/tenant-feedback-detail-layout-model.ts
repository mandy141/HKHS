import { TenantFeedbackImageModel} from '../layout-form-model/tenant-feedback-image-model'
import {UserBaseModel} from '../../../framework/models/user-base-model';

export class TenantFeedbackDetail {
    userIdentity: UserBaseModel;
    uniqueIdentifier: string;
    entityName: string;
    crudMode: string;
    formTitle: string;
    headerImage: string;
    locationText: string;
    locationValue: string;
    catgText: string;
    catgValue: string;
    detailText: string;
    detailValue: string;
    nameText: string;
    nameValue: string;
    telText: string;
    telValue: string;
    emailText: string;
    emailValue: string;
    refNoText:string;
    refNoValue:string;
    requestForReplyText: string;
    requestForReplyValue: string;
    submitTimeText:string;
    submitTimeValue:string;
    recStatusText:string;
    recStatusValue:string;
    msg_no_data: string;
    msg_ok: string;
    imageValue: TenantFeedbackImageModel;
}