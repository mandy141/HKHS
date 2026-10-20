import {UserBaseModel} from '../user-base-model';

export class LoginLayoutBaseModel {
    userIdentity: UserBaseModel;
    entityName: string;
    /*
        'name'
        'mobile'
    */
    loginIDType: string;
    showNewReg: boolean;
    crudMode: string;
    formTitle: string;
    innerTitle: string;
    lblCountryCode: string;
    lblUserName: string;
    lblPhoneNo: string;
    lblPassword: string;
    btnUserRegistration: string;
    btnForgetPW: string;
    btnLogin: string; 
    btnDisclaimer: string; 
    imglogo: string;
    lblUserNameMandatoryMsg: string;
    lblPhoneNoMandatoryMsg: string;
    lblCountryCodeMandatoryMsg: string;
    lblPwMandatoryMsg: string;    
    lblCopyRightMsg: string;
    lblBrowserMsg: string;
    lblRememberLoginPw: string;
    lblAgree: string;
    lblTAndCMessage: string;
    lblForPWRemark: string;
    showBtnDisclaimer: boolean;
    disclaimerPDF: string;

}