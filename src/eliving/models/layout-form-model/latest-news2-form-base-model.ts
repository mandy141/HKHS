import { LatestNews2FormNoticeModel } from "./latest-news2-form-notice-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class LatestNews2FormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;


    RecordList: LatestNews2FormNoticeModel[];
}