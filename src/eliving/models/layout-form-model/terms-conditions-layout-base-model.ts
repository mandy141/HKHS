
import { UserBaseModel } from "../../../framework/models/user-base-model";

export class TermsConditionsLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    closeText: string;
    tcText: string;
    tcText1: string;
}