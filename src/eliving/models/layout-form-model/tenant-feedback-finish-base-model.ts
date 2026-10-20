import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';

export class TenantFeedbackFinishBaseModel {
    userIdentity: UserBaseModel;
    formTitle: string;
    btnText: string;
    lblRefNo: string;
    lblSubmitMsg: string;

    shortcutItems: {
        backgroundImg: string;
        title: string;
        openForm: CheckPointBaseModel;
    }[];
}