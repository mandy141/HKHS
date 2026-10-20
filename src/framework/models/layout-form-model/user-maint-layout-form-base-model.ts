import {UserBaseModel} from '../user-base-model';

export class UserMaintLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    crudMode: string;
    formTitle: string;
    innerTitle: string;

    /*
        'name'
        'mobile'
    */
    loginIDType: string;

    /*
        'name'
        'mobile'
    */
    authMode: string;

    btnNext: string;
    btnFinish: string;
    
    //Step 1
    lblInputMsg: string;
    lblPhoneNo: string;    
    lblCountryCode: string;
    lblUserName: string;    
    lblMandatoryPhoneNoMsg: string;
    lblInvalidPhoneNoMsg: string;
    lblMandatoryUserNameMsg: string;    
    lblInvalidUserNameMsg: string;
    validatePhoneNoPattern: string;
    validateCountryCodePattern: string;
    validateUserNamePattern: string;

    //Step 2
    lblPasscodeSentMsg: string;
    lblInputPasscodeMsg: string;
    lblPasscode: string;
    btnResendPasscode: string;
    lblResendPasscodeMsg: string;
    lblMandatoryPasscodeMsg: string;

    //Step 3
    lblResetPasswordMsg: string;
    lblNewPassword: string;
    lblConfirmNewPassword: string;    
    lblMandatoryPasswordMsg: string;
    lblInvalidPasswordMsg: string;
    validatePasswordPattern: string;
    lblForgetRemarks: string;
    //Step 4
    lblFinishMsg: string;
}