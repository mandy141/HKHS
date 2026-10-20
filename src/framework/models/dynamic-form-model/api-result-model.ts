import {UserBaseModel} from '../user-base-model';

export class ApiResultModel<T> {
    userIdentity: UserBaseModel;
    result: T;
}