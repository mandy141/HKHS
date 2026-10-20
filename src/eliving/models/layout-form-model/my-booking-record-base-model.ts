import {UserBaseModel} from '../../../framework/models/user-base-model';

export class MyBookingRecordBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    uniqueIdentifier: string;
    subIdentifier: number;
    facName: string;
    bookDateTitle: string;
    bookDate: string;
    bookTimeTitle: string;
    bookTime: string;
    bookReceiptTitle: string;
    bookReceipt: string;
    bookAmtTitle: string;
    bookQrCode: string;
    btnExit: string;
}