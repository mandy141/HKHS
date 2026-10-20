import { UserBaseModel } from '../../../framework/models/user-base-model';
import { HouseRulesFormDocModel } from './house-rules-form-doc-model';

export class HouseRulesFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;
    cancelText: string;
    selectAll: string;
    houseRulesType: string;
    headerImage: string;
    documents: HouseRulesFormDocModel[];

}