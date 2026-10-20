import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { ShopDirectoryFormRecordModel } from './shop-directory-form-record-model';

export class ShopDirectoryRecordGroupModel {
    
        backgroundImage: string;
        title: string;
        button: string;
        records: ShopDirectoryFormRecordModel[];    
        show: boolean = false;

}