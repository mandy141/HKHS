import { LivingLifeBaseModel } from "./living-life-layout-base-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class LivingLifeRecordModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    cancelText: string;
    selectAll: string;
    infoType: string;
    headerImage: string;
    record: LivingLifeBaseModel[];
}