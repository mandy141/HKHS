import {UserBaseModel} from '../../../framework/models/user-base-model';

import { MeetingFormDocModel } from './meeting-form-doc-model';

export class MeetingFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    fileIcon: string;

    documents: MeetingFormDocModel[];

}