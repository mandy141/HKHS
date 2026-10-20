import { UserBaseModel } from '../../../framework/models/user-base-model';
import { HscMenuItemModel } from './hsc-menu-item-model';

export class HscMenuLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    headerImage: string;
    menuItem: HscMenuItemModel[];

}