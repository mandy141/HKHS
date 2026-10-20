import { NotificationFormNoticeModel } from "./notification-form-notice-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class NotificationFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;

    notifications: NotificationFormNoticeModel[];
}