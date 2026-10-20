import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ShopDirectoryRecordGroupModel} from '../layout-form-model/shop_directory-record-group-model'

export class ShopDirectoryFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    componentName: string;
    formTitle: string;
    recordGroup: ShopDirectoryRecordGroupModel[];    

}