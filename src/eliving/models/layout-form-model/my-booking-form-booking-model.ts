import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';

export class MyBookingFormBookingModel {
    icon: string;
    uniqueIdentifier: string;
    subIdentifier: number;
    facName: string;
    BookDateTime: string;
    price: string;
    allowShowDtl: boolean;
    allowPay: boolean;
    payURL: string;
    allowDelete:boolean;
    selected: boolean;
}