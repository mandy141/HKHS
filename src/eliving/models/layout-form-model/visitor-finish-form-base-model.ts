import {UserBaseModel} from '../../../framework/models/user-base-model';

export class VisitorFinishBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    innerTitle: string;
    QRImage: string;
    btnShare: string;
    btnExit: string;
    uniqueIdentifier: number;
    QRMessage: string;
}