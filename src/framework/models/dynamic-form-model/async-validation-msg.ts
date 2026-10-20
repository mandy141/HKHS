import {UserBaseModel} from '../user-base-model';

export class AsyncValidationMsgsModel {
    userIdentity: UserBaseModel;
    asyncValidMsgs: string[] = [];
}