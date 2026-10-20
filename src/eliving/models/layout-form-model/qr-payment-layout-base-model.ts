import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { Title } from '@angular/platform-browser';

export class QrPaymentLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    lblAddress: string;
    address: string;
    lblAccountNoTitle: string;
    accountNo: string;
    lblIssueDateTitle: string;
    issueDate: string;
    lblPayFeeTitle: string;
    payFee: string;
    lblDueDateTitle: string;
    dueDate: string;
    lblQrCodeTitle: string;
    qrImgString: string;
    qrCodeCheckSumSting: string;
    btnExit: string;
    paymentUrl: string;
}