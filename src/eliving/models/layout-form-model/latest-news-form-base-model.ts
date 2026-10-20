import { LatestNewsFormNoticeModel } from "./latest-news-form-notice-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class LatestNewsFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;


    news: LatestNewsFormNoticeModel[];
}