import { NotificationFormNoticeModel } from "./notification-form-notice-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";
import { FloorPlanFormGroupModel } from "./floor-plan-form-group-model";

export class FloorPlanFormBaseModel {
    userIdentity: UserBaseModel;    
    crudMode: string;
    formTitle: string;

    floorPlanGroups: FloorPlanFormGroupModel[];
}