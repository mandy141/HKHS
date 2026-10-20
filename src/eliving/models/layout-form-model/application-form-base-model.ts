import { UserBaseModel } from '../../../framework/models/user-base-model';
import { ApplicationFormDocModel } from './application-form-doc-model';

export class ApplicationFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;
    documents: ApplicationFormDocModel[];

}