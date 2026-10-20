import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { Title } from '@angular/platform-browser';

export class ProjInfoLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    innerTitle: string;
    title: string;
    imgBannerbgImgURL: string;
    office_hours_title: string;
    office_hours: string;
    tel_text: string;
    tel: string;
    email_text: string;
    email: string;
    fax_text: string;
    fax: string;
    google_map: string;
}