import { UserBaseModel } from '../../../framework/models/user-base-model';
import { APMenuItemModel } from './ap-menu-item-model';

export class APMenuLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    headerImage: string;
    menuItem: APMenuItemModel[];

}