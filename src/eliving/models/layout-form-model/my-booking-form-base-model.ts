import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { MyBookingFormPageModel } from './my-booking-form-page-model';

export class MyBookingFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    componentName: string;
    formTitle: string;
    deleteIcon: string;
    lblDeleteWarning: string;
    lblDeleteYesAns: string;
    lblDeleteNoAns: string;
    payIcon:string;
    lblMultipleSelect: string;

    pages: MyBookingFormPageModel[];
}