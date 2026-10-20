import { TransportInfoFormModel } from "./transport-info-form-route-model";
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class TransportInfoFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    cancelText: string;
    selectAll: string;
    transportType: string;
    headerImage: string;

    routes: TransportInfoFormModel[];
}