import { UserBaseModel } from '../../../framework/models/user-base-model';
import { QrPayment1LayoutPageModel } from './qr-payment1-layout-page-models';

export class QrPayment1LayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    paymentUrl: string;
    pages: QrPayment1LayoutPageModel[];
}