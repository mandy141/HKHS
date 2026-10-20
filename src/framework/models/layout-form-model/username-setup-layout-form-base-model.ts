import {UserBaseModel} from '../user-base-model';

export class UserNameSetupLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    innerTitle: string;

    lblSelect: string;    
    lblEmail: string;
    lblMobile: string;
    btnSubmitUsername: string;
    lblPasscodeSentMsg: string;
    
    lblPasscode: string;
    btnSubmitPasscode: string;    
    lblVerifiedUsernames: string;

    validateEmailPattern: string;
    validatePhoneNoPattern: string;
    lblInvalidPhoneNoMsg: string;
    lblInvalidEmailMsg: string;
}