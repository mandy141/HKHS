import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { MyBookingFormBookingModel } from './my-booking-form-booking-model';

export class MyBookingFormPageModel {
    pageId: string;
    pageName: string;
    pageIndex: string;
    pageBackgroundImage: string;
    multipleSelect: boolean;
    bookings: MyBookingFormBookingModel[];
    
}