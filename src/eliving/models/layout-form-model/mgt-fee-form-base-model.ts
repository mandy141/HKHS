import { UserBaseModel } from '../../../framework/models/user-base-model';
import { MgtFeeFormDocModel } from './mgt-fee-form-doc-model';

export class MgtFeeFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;

    lblTermsAndCondition: string;
    termsAndConditionURL: string;
    fileIcon: string;
    documents: MgtFeeFormDocModel[];

}