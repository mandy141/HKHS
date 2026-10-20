export namespace ConstantAttributes {

    /*General*/

    export const COOKIE_LANG: string = 'LANG';
    export const COOKIE_USER: string = 'USER';
    export const COOKIE_USERID: string = 'USERID';
    export const COOKIE_USERPW: string = 'USERPW';
    export const COOKIE_PROJ: string = 'PROJ';
    export const COOKIE_PHASE: string = 'PHASE';
    export const COOKIE_FONTSIZE: string = 'FONTSIZE';
    export const COOKIE_ISAGREE: string = 'ISAGREE';
    export const COOKIE_LOADTC: string = 'LOADTC';
    export const COOKIE_PUSH: string = 'PUSH';
    export const COOKIE_THEME: string = 'THEME';
    export const COOKIE_IMAGE: string = 'IMAGE';

    //export const DEFAULT_PROJ: string = 'MC'; //dev
    export const DEFAULT_PROJ: string = 'HS'; //prod
    export const DEFAULT_PHASE: string = 'MYCEMC';
    export const DEFAULT_FONTSIZE: string = '100';
    export const DEFAULT_THEME: string = 'theme_1';



    export const LANG_ENG: string = 'EN';
    export const LANG_CHI: string = 'TC';

    export const DEVICE_DESKTOP: string = 'DESKTOP';
    export const DEVICE_TABLET: string = 'TABLET';
    export const DEVICE_MOBILE: string = 'MOBILE';
    export const DEVICE_IOS: string = 'IOS';
    export const DEVICE_ANDROID: string = 'ANDROID';

    export const API_REQUEST_TYPE_LOAD_APP: string = 'LOAD_APP';
    export const API_REQUEST_TYPE_LOAD_MENU: string = 'LOAD_MENU';
    export const API_REQUEST_TYPE_AUTHENTICATE: string = 'AUTHENTICATE';    
    export const API_REQUEST_TYPE_SEND_PASSCODE_FOR_RESET_PASSWORD: string = 'SEND_PASSCODE_FOR_RESET_PASSWORD';
    export const API_REQUEST_TYPE_SEND_PASSCODE_FOR_REGISTRATION: string = 'SEND_PASSCODE_FOR_REGISTRATION';
    export const API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_EMAIL_SETUP: string = 'SEND_PASSCODE_FOR_USERNAME_EMAIL_SETUP';
    export const API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_MOBILE_SETUP: string = 'SEND_PASSCODE_FOR_USERNAME_MOBILE_SETUP';
    export const API_REQUEST_TYPE_CHECK_PASSCODE_FOR_USERNAME_SETUP: string = 'CHECK_PASSCODE_FOR_USERNAME_SETUP';
    export const API_REQUEST_TYPE_CHECK_PASSCODE: string = 'CHECK_PASSCODE';
    export const API_REQUEST_TYPE_RESET_PASSWORD: string = 'RESET_PASSWORD';
    export const API_REQUEST_TYPE_LOAD_DYNAMIC_INPUT_FORM: string = 'LOAD_DYNAMIC_INPUT_FORM';    
    export const API_REQUEST_TYPE_LOAD_LAYOUT_FORM: string = 'LOAD_LAYOUT_FORM';    
    export const API_REQUEST_TYPE_FORM_SUBMIT: string = 'FORM_SUBMIT';    
    export const API_REQUEST_TYPE_ASYNC_OPTS: string = 'ASYNC_OPTS';
    export const API_REQUEST_TYPE_ASYNC_VALID: string = 'ASYNC_VALID';
    export const API_REQUEST_TYPE_ASYNC_VALUE_CHANGE_CONDITION: string = 'ASYNC_VALUE_CHANGE_CONDITION';
    export const API_REQUEST_TYPE_ASYNC_SET_VALUE: string = 'ASYNC_SET_VALUE';    
    export const API_REQUEST_TYPE_ASYNC_CALLBACK: string = 'ASYNC_CALLBACK';
    export const API_REQUEST_TYPE_LOAD_GUEST_TOKEN: string = 'LOAD_GUEST_TOKEN';
    export const API_REQUEST_TYPE_TENANT_FEEDBACK: string = 'TENANT_FEEDBACK';
    export const API_REQUEST_TYPE_TENANT_UPLOAD: string = 'BUFFER_FILE_UPLOAD';
    

    export const LOGIN_ID_TYPE_NAME: string = 'NAME';
    export const LOGIN_ID_TYPE_MOBILE: string = 'MOBILE';
    export const LOGIN_ID_TYPE_EMAIL: string = 'EMAIL';

    export const ENTITY_APPLICATION: string = 'app';
    export const ENTITY_MENU: string = 'menu';
    export const ENTITY_USER: string = 'user';
    export const ENTITY_USER_REGISTRATION: string = 'user-registration-layout';
    export const ENTITY_FORGOT_PASSWORD: string = 'forget-password-layout';
    export const ENTITY_CHANGE_PASSWORD: string = 'change-password-layout';
    export const ENTITY_LAYOUT_LOGIN: string = 'login-layout';
    export const ENTITY_USERNAME_SETUP: string = 'username-setup-layout';
    export const ENTITY_QR_PAYMENT: string = 'qr-payment1-layout';
    export const ENTITY_TENANT_FEEDBACK: string = 'tenant-feedback-layout';
    export const ENTITY_TENANT_LIST_FEEDBACK: string = 'tenant-feedback-list-layout';

    export const COMPONENT_LOGIN_FORM: string = 'LoginForm';
    export const COMPONENT_INPUT_FORM: string = 'InputFormPage';
    export const COMPONENT_USER_MAINT_FORM: string = 'UserMaintForm';   
    export const COMPONENT_LOGOUT_FORM: string = 'LogoutPage';
    export const COMPONENT_CHANGE_LANG_FORM: string = 'ChangeLangPage';
    export const COMPONENT_MY_BOOKING_FORM: string = 'MyBookingForm';
    export const COMPONENT_USERNAME_SETUP: string = 'UserNameSetupForm';
    export const COMPONENT_QR_PAYMENT_FORM: string = 'QrPayment1Layout';   
    export const COMPONENT_TENANT_FEEDBACK_LAYOUT: string = 'TenantFeedbackLayout'; 
    export const COMPONENT_TENANT_FEEDBACK_LIST_LAYOUT: string = 'TenantFeedbackListLayout';     

    export const EVENT_APP_AFTER_LOGIN: string = 'app:Afterlogin';
    export const EVENT_APP_SESSION_EXPIRED: string = 'app:session-expired';
    export const EVENT_APP_BACK_TO_HOME: string = 'app:backToHome';
    export const EVENT_APP_NAV_TO_PAGE: string = 'app:navToPage';
    export const EVENT_APP_PUSH_TO_PAGE: string = 'app:pushToPage';
    export const EVENT_RELOAD_MENU: string = 'app:reloadMenu';
    export const EVENT_APP_REDIRECT_PAGE: string = 'app:redirectPage';

    export const GENERAL_ERROR_EMPTY_RESULT_JSON_MSG: string = 'Empty Response. Please contact System Admin.';
    export const GENERAL_ERROR_SERVER_MSG_TITLE: string = 'Server Message';
    export const GENERAL_ERROR_NETWORK_OFFLINE: string = 'No Internet Network detected.';

    export const INPUT_FORM_NEXT_ACTION_NAV: string = 'nav';
    export const INPUT_FORM_NEXT_ACTION_POP: string = 'pop';
    export const INPUT_FORM_NEXT_ACTION_POP_TO_ROOT: string = 'pop-to-root';

    export const NAVIGATE_MODE_PUSH: string = 'push';
    export const NAVIGATE_MODE_SET_ROOT: string = 'root';

    /*API Request Param*/

    export const PARAM_APP_CODE: string = 'appCode';
    export const PARAM_REQUEST_PROJ_CODE: string = 'reqProjCode';
    export const PARAM_REQUEST_PHASE_CODE: string = 'reqPhaseCode';
    export const PARAM_LANG: string = 'lang';
    export const PARAM_NAV_TO_CHECKPOINT: string = 'checkPoint';
    export const PARAM_SCREEN_SIZE: string = 'screenSize';
    export const PARAM_PLATFORM: string = 'platform';
    export const PARAM_REQUEST_TYPE: string = 'requestType';
    export const PARAM_ENTITY_NAME: string = 'entityName';
    export const PARAM_PREIVOUS_PAGE_CALLBACK_FN: string = 'prevPageCallbackFn';
    export const PARAM_CRUD_MODE: string = 'crudMode';
    export const PARAM_ADDITIONAL_PARAMS: string = 'additionalParams';    
    export const PARAM_UNIQUE_IDENTIFIER: string = 'uniqueIdentifier';    
    export const PARAM_SUB_UNIQUE_IDENTIFIER: string = 'subIdentifier';   
    export const PARAM_AVAILABLE_UNIQUE_IDENTIFIERS: string = 'availableUniqueIdentifiers';  
    export const PARAM_SUBMIT_VALUES: string = 'submitValues';    
    export const PARAM_PHONE_NO_PREFIX: string = 'phoneNoPrefix';
    export const PARAM_PHONE_NO: string = 'phoneNo';
    export const PARAM_PASSCODE: string = 'passcode';
    export const PARAM_PASSCODE_FOR: string = 'passcodeFor';
    export const PARAM_RESET_PASSWORD_USER_IDENTITY: string = 'resetPasswordUserIdentity';
    export const PARAM_USERNAME: string = 'userName';
    export const PARAM_PASSWORD: string = 'password';
    export const PARAM_NEW_PASSWORD: string = 'newPassword';
    export const PARAM_CONFIRM_PASSWORD: string = 'confirmPassword';
    export const PARAM_OLD_PASSWORD: string = 'oldPassword';
    export const PARAM_NOTIFICATION_PLAYER_ID: string = 'playerID';
    export const PARAM_NAVIGATE_MODE: string = 'navigateMode'; 
    export const PARAM_TENANT_FEEDBACK_LOC: string = 'tenantFeedbackLoc'; 
    export const PARAM_TENANT_FEEDBACK_LOC_CATG: string = 'tenantFeedbackLocCatg'; 
    export const PARAM_TENANT_FEEDBACK_MSG_TYPE: string = 'tenantFeedbackMsgType'; 
    export const PARAM_TENANT_FEEDBACK_CATG: string = 'tenantFeedbackCatg'; 
    export const PARAM_TENANT_FEEDBACK_DETAIL: string = 'tenantFeedbackDetail'; 
    export const PARAM_TENANT_FEEDBACK_IMAGE: string = 'tenantFeedbackImage'; 
    export const PARAM_TENANT_FEEDBACK_TITLE: string = 'tenantFeedbackTitle'; 
    export const PARAM_TENANT_FEEDBACK_TEL: string = 'tenantFeedbackTel'; 
    export const PARAM_TENANT_FEEDBACK_NAME: string = 'tenantFeedbackName'; 
    export const PARAM_TENANT_FEEDBACK_EMAIL: string = 'tenantFeedbackEmail'; 
    export const PARAM_TENANT_FEEDBACK_REPLY: string = 'tenantFeedbackReply'; 
    export const PARAM_TENANT_FEEDBACK_MIMETYPE: string = 'mimetype';
    export const PARAM_TENANT_FEEDBACK_FILENAME: string = 'filename';
    export const PARAM_TENANT_FEEDBACK_CONTENT: string = 'filecontent';

    //Async Request Param
    export const PARAM_OPTION_FIELD_KEY: string = 'optionFieldKey';
    export const PARAM_FIELD_MODEL: string = 'fieldModel';
    export const PARAM_FORM_MODEL: string = 'formModel';
    export const PARAM_VALIDATION_FIELD_KEY: string = 'validationFieldKey';
    export const PARAM_VALUE_CHANGED_FIELD_KEY: string = 'valueChangedFieldKey';
    export const PARAM_CONDITION_RULE: string = 'conditionRule';
    export const PARAM_TARGET_FIELD_KEY: string = 'targetFieldKey';
    export const PARAM_VALUE_GENERATION_RULE: string = 'valueGenerationRule';

    export const PASSCODE_FOR_RESET_PWD: string = 'RESET_PWD';
    export const PASSCODE_FOR_NEW_REG: string = 'NEW_REG';

    /*API Response Attribute */
    export const RESPONSE_USER_IDENTITY: string = 'userIdentity';

    /*Input Form*/

    export const CRUD_MODE_CREATE: string   = 'C';
    export const CRUD_MODE_READ: string     = 'R';
    export const CRUD_MODE_UPDATE: string   = 'U';
    export const CRUD_MODE_DELETE: string   = 'D';    

    export const TABTYPE_INPUT: string = 'input';
    export const TABTYPE_CONFIRMATION: string = 'confirmation';
    
    /*Input Field*/

    export const LABEL_PLACEMENT_FIXED: string      = 'fixed';
    export const LABEL_PLACEMENT_FLOATING: string   = 'floating';
    export const LABEL_PLACEMENT_STACKED: string    = 'stacked';

    export const CONTROL_TYPE_TEXTBOX: string       = 'textbox';
    export const CONTROL_TYPE_DATEPICKER: string    = 'datepicker';
    export const CONTROL_TYPE_TIMEPICKER: string    = 'timepicker';
    export const CONTROL_TYPE_DROPDOWN: string      = 'dropdown';
    export const CONTROL_TYPE_RADIO: string         = 'radio';
    export const CONTROL_TYPE_CHECKBOX: string      = 'checkbox';
    export const CONTROL_TYPE_CHECKLIST: string     = 'checklist';
    export const CONTROL_TYPE_SUBFORMARRAY: string  = 'subformarray';
    export const CONTROL_TYPE_FIELDGROUP: string    = 'fieldgroup';
    export const CONTROL_TYPE_HIDDEN: string        = 'hidden';
    export const CONTROL_TYPE_CUSTOM: string        = 'custom';
    export const CONTROL_TYPE_FILE: string          = 'file';
    export const CONTROL_TYPE_LABEL: string         = 'label';
    export const CONTROL_TYPE_PDF: string           = 'pdf';
    export const CONTROL_TYPE_HTML: string          = 'html';
    export const CONTROL_TYPE_LINK_BUTTON: string   = 'linkbutton';    
    export const CONTROL_TYPE_IMG_BANNER: string   = 'imgBanner';    
    export const CONTROL_TYPE_IMG: string           = 'img';    
    export const CONTROL_TYPE_IFRAME: string         = 'iframe';    

    export const COLWIDTH_FULL: string          = '1';          //col-12
    export const COLWIDTH_ELEVEN_TWELEVETH: string = '11-12';   //col-11
    export const COLWIDTH_FIVE_SIXTH: string    = '5-6';        //col-10
    export const COLWIDTH_THREE_QUARTER: string  = '3-4';       //col-9
    export const COLWIDTH_TWO_THIRD: string     = '2-3';        //col-8
    export const COLWIDTH_SEVEN_TWELEVETH: string = '7-12';     //col-7
    export const COLWIDTH_ONE_HALF: string     = '1-2';         //col-6
    export const COLWIDTH_FIVE_TWELEVETH: string = '5-12';      //col-5
    export const COLWIDTH_ONE_THIRD: string     = '1-3';        //col-4
    export const COLWIDTH_ONE_QUARTER: string   = '1-4';        //col-3
    export const COLWIDTH_ONE_SIXTH: string     = '1-6';        //col-2
    export const COLWIDTH_ONE_TWELEVETH: string = '1-12';       //col-1

    export const VALIDATIONS_TYPE_REQUIRED: string       = 'required';
    export const VALIDATIONS_TYPE_MIN_LENGTH: string    = 'minlength';
    export const VALIDATIONS_TYPE_MAXLENGTH: string     = 'maxlength';
    export const VALIDATIONS_TYPE_NUMMIN: string        = 'min';
    export const VALIDATIONS_TYPE_NUMMAX: string        = 'max';
    export const VALIDATIONS_TYPE_PATTERN: string       = 'pattern';    
    export const VALIDATIONS_TYPE_CUSTOM_FUNC: string   = 'customvalidationfunc';
    export const VALIDATIONS_TYPE_CUSTOM_RULE: string   = 'customvalidationrule';
    export const VALIDATIONS_TYPE_ASYNC: string         = 'async';

    export const VALUECHANGEEVENTS_TYPE_FUNC: string   = 'func';
    export const VALUECHANGEEVENTS_TYPE_RULE: string   = 'rule';
    export const VALUECHANGEEVENTS_TYPE_ASYNC: string  = 'async-rule';
    
    export const VALUECHANGESEVENTS_ACTION_SETVALUE: string             = 'setvalue';
    export const VALUECHANGESEVENTS_ACTION_SETSUBFORMSUMMARY: string    = 'setsubformsummary';
    export const VALUECHANGESEVENTS_ACTION_RESET: string                = 'reset';
    export const VALUECHANGESEVENTS_ACTION_ENABLE: string               = 'enable';
    export const VALUECHANGESEVENTS_ACTION_DISABLE: string              = 'disable';
    export const VALUECHANGESEVENTS_ACTION_HIDE: string                 = 'hide';
    export const VALUECHANGESEVENTS_ACTION_SHOW: string                 = 'show';
    export const VALUECHANGESEVENTS_ACTION_CUSTOM: string               = 'custom';
    export const VALUECHANGESEVENTS_ACTION_ASYNC: string                = 'async-value-generation';
    export const VALUECHANGESEVENTS_ACTION_ASYNC_CALLBACK: string       = 'async-callback';

    export const TEXTINPUT_TYPE_PASSWORD: string = 'password';
    export const TEXTINPUT_TYPE_NUMBER: string = 'number';    
    
    export const IMAGE_MODE_OPEN_IMAGE: string = 'openImage';
    export const IMAGE_MODE_OPEN_SLIDER: string = 'openSlider';

    export const ACTION_CD_OPEN_URL: string = 'openUrl';
    export const ACTION_CD_OPEN_FORM: string = 'openForm';
} 