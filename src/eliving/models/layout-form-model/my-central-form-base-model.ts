import {UserBaseModel} from '../../../framework/models/user-base-model';
import { MyCentralFormGroupModel } from './my-central-form-group-model';

export class MyCentralFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;

    headerImage: string;
    title: string;

    groups: MyCentralFormGroupModel[];

}