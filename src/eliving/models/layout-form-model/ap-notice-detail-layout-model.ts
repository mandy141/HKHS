import {UserBaseModel} from '../../../framework/models/user-base-model';

export class APNoticeDetailLayoutModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    uniqueIdentifier: string;
    lblRefNo: string;
    lblDesc: string;
    lblLinkTitle: string;
    linkbutton: string;
    image: string;
    lblNoticeDate: string;
    btnExit: string;
}