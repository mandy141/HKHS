import {UserBaseModel} from '../../../framework/models/user-base-model';
import { CheckPointBaseModel } from '../../../framework/models/check-point-base-model';
import { FacilityBookFormFacilityModel } from './facility-book-form-facility-model';

export class FacilityBookFormFacilityGroupModel {
    
        backgroundImage: string;
        title: string;
        button: string;
        club_name: string;
        facilities: FacilityBookFormFacilityModel[];    
        show: boolean = false;

}