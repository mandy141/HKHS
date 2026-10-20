import { UserBaseModel } from '../../../framework/models/user-base-model';
import { InformationFormPageModel } from './information-form-page-models';

export class InformationFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;


    pages: InformationFormPageModel[];
}