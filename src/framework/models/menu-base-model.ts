import {CheckPointBaseModel} from './check-point-base-model';
import {UserBaseModel} from './user-base-model';

export class MenuBaseModel{
    userIdentity: UserBaseModel;
    defaultPage: CheckPointBaseModel;
    pushNotiPage: CheckPointBaseModel;
    appProjName: string;
    reqProjCode: string;      
    reqPhaseCode: string;          
    appMenuHeaderImgPath: string;
    appMenuHeaderBgPath: string;
    btnLogin: string;
    btnLogout: string;
    btnChangePassword: string;
    btnSetting: string;
    lblExitWarning: string;
    lblExitYesAns: string;
    lblExitNoAns: string;
    appMenuFont: string;
    appFontSize: string;
    appFontSizeLarge: string;
    appFontSizeMedium: string;
    appFontSizeSmall: string;
    appTheme: string;
    forms: CheckPointBaseModel[] = [];  
    welcomeMessage: string;  
    showNotificationShortCut: boolean;
    unreadNotificationCnt: string;
    disclaimerPDF: string;
    disclaimerText: string;
    qrPaymentText: string;
    pushMessageText: string;
    tenantFeedBackText:string;
}