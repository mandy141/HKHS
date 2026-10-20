import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';

export class BookFinishBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    innerTitle: string;
    lblBookRefNo: string;
    lblBookDetails: string;

    shortcutItems: {
        backgroundImg: string;
        title: string;
        openForm: CheckPointBaseModel;
    }[];
}