import { QrPayment1LayoutRecordModel } from './qr-payment1-layout-record-model';

export class QrPayment1LayoutPageModel {
    pageId: string;
    pageName: string;
    pageIndex: number;
    pageBackgroundImage: string;
    records: QrPayment1LayoutRecordModel;
    
}