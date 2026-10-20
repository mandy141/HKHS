import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { FacilityBookFormFacilityGroupModel} from '../layout-form-model/facility-book-form-facility-group-model'

export class FacilityBookFormBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    componentName: string;
    formTitle: string;
    selectAll: string;
    cancelText: string;
    clubType: string;
    facilityGroup: FacilityBookFormFacilityGroupModel[];    

}