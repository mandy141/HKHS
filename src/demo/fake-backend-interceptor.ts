import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, tap } from 'rxjs/operators';
import { ConstantAttributes } from '../framework/attributes/constant-attributes';
import { DemoAttributes } from './demo-attributes';
import { UserBaseModel } from '../framework/models/user-base-model';
import { ApiResultModel } from '../framework/models/dynamic-form-model/api-result-model';
import moment from '../assets/js/moment.min.js';
import { MenuBaseModel } from '../framework/models/menu-base-model';
import { CheckPointBaseModel } from '../framework/models/check-point-base-model';
import { KeyValueBaseModel } from '../framework/models/key-value-base-model';
import { ConfigService } from '../framework/services/config-service';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { ELivingConstantAttributes } from '../eliving/attributes/eliving-constant-attributes';
import { SavedResultBaseModel } from '../framework/models/saved-result-base-model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private demoUserToken: string = 'XYZ12345';
    //private demoUserToken: string = 'AN9MGefrPn3OH__TYHS3nQEAAAAXv6t6XtiEPvwyXXHGYmOZAE58ps2IW2utnHNCZiujWVfY2V8Lo_YrRY43cNQEJMmzMvC1KZgjih-5tIsniItYjE9hES8jt7FKf2F1vOrjyuj0vUAr2l-htWTAFnnnJcJlViQwpoWf4YHpemgdZa4bTALT2-q8fQQqKRv-V_LK4HWdQcD16jo8QL1MQix5P-G2ghrlb2TZCT82JHRdRE4Oy29r-o1ogxiIWCCnZWf9YG4Z7_DrQdKh8rKRm873N3Xshz75tliXCChgzKy1ZQKJQqs-d3s9_PyDPqKgsKzYXgu1sUHLDDEUFyZeYk1K37RwEr-0wTmzwmCEdau9vQFLZMEMKVbaESjKAdyOxUazwg==';
    //private demoUserToken: string = '';
    constructor(private configSrv: ConfigService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {               
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {            

            //App Content
            if(request.url.startsWith("http") && request.method === 'POST') {                
                if (request.headers.get('TOKEN')) {
                    var _body = null;

                    var paramObj = request.body;
                    var requestToken;

                    if(request.headers.get('TOKEN').endsWith(this.configSrv.GUEST_MODEL.token))
                    {
                        requestToken = this.configSrv.GUEST_MODEL.token;
                    }
                    
                    else
                    {
                        requestToken = this.demoUserToken;
                    }
                    
                    

                    switch (paramObj[ConstantAttributes.PARAM_REQUEST_TYPE]) {
                        case ConstantAttributes.API_REQUEST_TYPE_AUTHENTICATE:     
                            _body = JSON.parse(JSON.stringify(DemoAttributes.USER_MENU_JSON));
                            _body.userIdentity = new UserBaseModel();
                            _body.userIdentity.token = this.demoUserToken;
                            break;
                            //return this.passToRealServer(request, next);  

                        case ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_RESET_PASSWORD:
                            _body = {};
                            _body.result = "11:00:00";
                            break;

                        case ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_REGISTRATION:
                            _body = {};
                            _body.result = "11:00:00";
                            break;

                        case ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_EMAIL_SETUP:
                        case ConstantAttributes.API_REQUEST_TYPE_SEND_PASSCODE_FOR_USERNAME_MOBILE_SETUP:

                            var userName = paramObj[ConstantAttributes.PARAM_USERNAME]
                            _body = {};
                            _body.result = "驗證碼已發出到 " + userName + " (11:00:00)";
                            _body.userIdentity = new UserBaseModel();
                            _body.userIdentity.token = this.demoUserToken;
                            break;
                        
                        case ConstantAttributes.API_REQUEST_TYPE_CHECK_PASSCODE_FOR_USERNAME_SETUP:
                            _body = {};
                            _body.result = "<h3>你已成功確認的登入名稱:</h3><h3>whi*******.com</h3><h3>****2038</h3>";
                            _body.userIdentity = new UserBaseModel();
                            _body.userIdentity.token = this.demoUserToken;
                            break;                            

                        case ConstantAttributes.API_REQUEST_TYPE_CHECK_PASSCODE:       
                            _body = {};
                            _body.result = true;
                            _body.userIdentity = new UserBaseModel();
                            _body.userIdentity.token = this.demoUserToken;
                            break;     

                        case ConstantAttributes.API_REQUEST_TYPE_RESET_PASSWORD:
                            _body = {};
                            _body.result = true;
                            _body.userIdentity = new UserBaseModel();
                            _body.userIdentity.token = this.demoUserToken;
                            break;
                            //return this.passToRealServer(request, next);    
                            
                         case ConstantAttributes.API_REQUEST_TYPE_LOAD_GUEST_TOKEN:
                            _body = JSON.parse(JSON.stringify(DemoAttributes.APP_JSON));                            
                            break;
                            //return this.passToRealServer(request, next);   


                        case ConstantAttributes.API_REQUEST_TYPE_LOAD_APP:
                            _body = JSON.parse(JSON.stringify(DemoAttributes.APP_JSON));                            
                            break;
                            //return this.passToRealServer(request, next);                     

                        case ConstantAttributes.API_REQUEST_TYPE_LOAD_MENU:
                            
                            if(request.headers.get('TOKEN').endsWith(this.configSrv.GUEST_MODEL.token))
                            {
                               _body = JSON.parse(JSON.stringify(DemoAttributes.GUEST_MENU_JSON));
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.configSrv.GUEST_MODEL.token;
                                //return this.passToRealServer(request, next); 

                            }
                            else
                            {
                                _body = JSON.parse(JSON.stringify(DemoAttributes.USER_MENU_JSON));
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;
                                //return this.passToRealServer(request, next); 
                            }

                            break;
                            
                            //return this.passToRealServer(request, next);                                
                            
                        case ConstantAttributes.API_REQUEST_TYPE_FORM_SUBMIT:
                            switch (paramObj[ConstantAttributes.PARAM_ENTITY_NAME]) {
                                
                                case DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK:
                                    /*
                                    _body = {};
                                    _body.result = new SavedResultBaseModel();
                                    _body.result.inputFormNextAction = ConstantAttributes.INPUT_FORM_NEXT_ACTION_NAV;
                                    _body.result.inputFormNextForm = new CheckPointBaseModel();
                                    _body.result.inputFormNextForm.key = "facility-book-confirm-input-form";
                                    _body.result.inputFormNextForm.componentName = "InputFormPage";
                                    _body.result.inputFormNextForm.crudMode = "C";
                                    _body.result.inputFormNextForm.entityName = "facility-book-confirm-input-form";
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;

                                    _body.result.inputFormNextForm.additionalParams = [];

                                    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
                                    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
                                    additionalParamUniqueIdentifier.value = "9";
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamUniqueIdentifier);

                                    var additionalParamNavigateMode = new KeyValueBaseModel();
                                    additionalParamNavigateMode.key = ConstantAttributes.PARAM_NAVIGATE_MODE;
                                    additionalParamNavigateMode.value = ConstantAttributes.NAVIGATE_MODE_PUSH;
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamNavigateMode);

                                    break;
                                    */
                                   return this.passToRealServer(request, next); 
                                   
                                
                                case DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK_CONFIRM:
                                 /*   
                                    _body = {};
                                    _body.result = new SavedResultBaseModel();
                                    _body.result.inputFormNextAction = ConstantAttributes.INPUT_FORM_NEXT_ACTION_NAV;
                                    _body.result.inputFormNextForm = new CheckPointBaseModel();
                                    _body.result.inputFormNextForm.key = "book-finish-layout";
                                    _body.result.inputFormNextForm.componentName = "BookFinishForm";
                                    _body.result.inputFormNextForm.crudMode = "R";
                                    _body.result.inputFormNextForm.entityName = "book-finish-layout";
                                    _body.userIdentity = new UserBa[LOAD_FACILITY_BOOK_FINISH_REMARK].demoUserToken;

                                    _body.result.inputFormNextForm.additionalParams = [];

                                    var additionalParamUniqueIdentifier = new KeyValueBaseModel();
                                    additionalParamUniqueIdentifier = new KeyValueBaseModel();
                                    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
                                    additionalParamUniqueIdentifier.value = "9";
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamUniqueIdentifier);

                                    var additionalParamNavigateMode = new KeyValueBaseModel();
                                    additionalParamNavigateMode.key = ConstantAttributes.PARAM_NAVIGATE_MODE;
                                    additionalParamNavigateMode.value = ConstantAttributes.NAVIGATE_MODE_SET_ROOT;
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamNavigateMode);

                                    break;
                                    */
                                   return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_VISITOR_RECORD:
                                    _body = {};
                                    _body.result = true;
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;                             

                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_MY_BOOKING:
                                    //_body = {};
                                    //_body.result = true;
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = this.demoUserToken;

                                    //break;
                                    return this.passToRealServer(request, next); 
                                /*
                                case DemoAttributes.ENTITY_INPUT_FORM_VISITOR_REG:
                                    _body = {};
                                    _body.result = new SavedResultBaseModel();
                                    _body.result.inputFormNextAction = ConstantAttributes.INPUT_FORM_NEXT_ACTION_NAV;
                                    _body.result.inputFormNextForm = new CheckPointBaseModel();
                                    _body.result.inputFormNextForm.key = "visitor-finish-layout";
                                    _body.result.inputFormNextForm.componentName = "VisitorFinishForm";
                                    _body.result.inputFormNextForm.crudMode = "R";
                                    _body.result.inputFormNextForm.entityName = "visitor-finish-layout";
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;

                                    _body.result.inputFormNextForm.additionalParams = [];

                                    additionalParamUniqueIdentifier = new KeyValueBaseModel();
                                    additionalParamUniqueIdentifier.key = ConstantAttributes.PARAM_UNIQUE_IDENTIFIER;
                                    additionalParamUniqueIdentifier.value = "9";
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamUniqueIdentifier);

                                    var additionalParamNavigateMode = new KeyValueBaseModel();
                                    additionalParamNavigateMode.key = ConstantAttributes.PARAM_NAVIGATE_MODE;
                                    additionalParamNavigateMode.value = ConstantAttributes.NAVIGATE_MODE_SET_ROOT;
                                    _body.result.inputFormNextForm.additionalParams.push(additionalParamNavigateMode);

                                    break;     
                                    */                                                       
                            }
                            break;

                        case ConstantAttributes.API_REQUEST_TYPE_LOAD_LAYOUT_FORM:
                        case ConstantAttributes.API_REQUEST_TYPE_LOAD_DYNAMIC_INPUT_FORM:

                            switch(paramObj[ConstantAttributes.PARAM_ENTITY_NAME])
                            {
                                case ConstantAttributes.ENTITY_LAYOUT_LOGIN:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.LOGIN_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.configSrv.GUEST_MODEL.token;
                                    break;
                                    //return this.passToRealServer(request, next); 

                                case ConstantAttributes.ENTITY_USER_REGISTRATION:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.USER_REGISTRATION_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.configSrv.GUEST_MODEL.token;
                                    break;

                                case ConstantAttributes.ENTITY_FORGOT_PASSWORD:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.FORGOT_PASSWORD_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.configSrv.GUEST_MODEL.token;
                                    break;                                

                                case ConstantAttributes.ENTITY_CHANGE_PASSWORD:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.CHANGE_PASSWORD_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;
                                    break;
                                    //return this.passToRealServer(request, next);

                                case ConstantAttributes.ENTITY_USERNAME_SETUP:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.USERNAME_SETUP_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;
                                    break;                                    

                                case DemoAttributes.ENTITY_LAYOUT_DASHBOARD:
                                    
                                    if(request.headers.get('TOKEN').endsWith(this.configSrv.GUEST_MODEL.token))
                                    {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.GUEST_DASHBOARD_LAYOUT_JSON));
                                        _body.userIdentity = new UserBaseModel();
                                        _body.userIdentity.token = this.configSrv.GUEST_MODEL.token;
                                        
                                    }
                                    else
                                    {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.USER_DASHBOARD_LAYOUT_JSON));
                                        _body.userIdentity = new UserBaseModel();
                                        _body.userIdentity.token = this.demoUserToken;
                                        
                                    }
                                    break;
                                    
                                   //return this.passToRealServer(request, next);
                                    
                                case DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_01:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_SBS_PERSONAL_DESKTOP_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;

                                case DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_02:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_ASYNC_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_NOTICE:                                    
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.NOTICE_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;                                    
                                    break;
                                    //return this.passToRealServer(request, next);

                                
                                case DemoAttributes.ENTITY_LAYOUT_CLUBHOUSE_NOTICE:                                    
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.CLUBHOUSE_NOTICE_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;                                    
                                    break; 
                                    //return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_FAC_BOOK:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.FAC_BOOK_LAYOUT_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break; 
                                    return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_FAC_BOOK_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break;
                                    return this.passToRealServer(request, next); 
                                
                                case DemoAttributes.ENTITY_LAYOUT_MY_BOOKING:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.MY_BOOKING_LAYOUT_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break;
                                    return this.passToRealServer(request, next);
                            
                                case DemoAttributes.ENTITY_LAYOUT_ACTIVITY:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.ACTIVITY_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;                                

                                case DemoAttributes.ENTITY_INPUT_FORM_ACTIVITY_DTL:
                                    if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 1) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_ACTIVITY_DETAIL1_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 2) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_ACTIVITY_DETAIL2_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 3) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_ACTIVITY_DETAIL3_JSON));
                                    } else {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_ACTIVITY_DETAIL4_JSON));
                                    } 
                                    
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_MEETING:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.MEETING_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_BOOK_FINISH:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.BOOK_FINISH_LAYOUT_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break;
                                    return this.passToRealServer(request, next); 

                                
                                case DemoAttributes.ENTITY_LAYOUT_MGT_FEE:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.MGT_FEE_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_NOTIFICATION:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.NOTIFICATION_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    //return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_INPUT_FORM_PROJ_INFO:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_PROJ_INFO_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    //return this.passToRealServer(request, next);

                                
                                case DemoAttributes.ENTITY_LAYOUT_FLOOR_PLAN:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    //return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_FLOOR_PLAN_GALLERY:
                                       // //console.log('floorPlan', DemoAttributes.ENTITY_LAYOUT_FLOOR_PLAN_GALLERY);
                                    
                                    if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 1) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_GALLERY1_LAYOUT_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 2) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_GALLERY2_LAYOUT_JSON));
                                    } else {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_GALLERY3_LAYOUT_JSON));
                                    } 
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    
                                   //return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_FLOOR_PLAN_SUB_GALLERY:
                                    /*
                                    if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 1) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_SUB_GALLERY1_LAYOUT_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 2) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_SUB_GALLERY2_LAYOUT_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 3) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_SUB_GALLERY3_LAYOUT_JSON));
                                    } else { 
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.FLOOR_PLAN_SUB_GALLERY4_LAYOUT_JSON));
                                    }
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    */
                                   return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_PHOTOBOOK_GALLERY:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.PHOTOBOOK_GALLERY_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    //return this.passToRealServer(request, next);

                                case DemoAttributes.ENTITY_LAYOUT_PHOTOBOOK_SUB_GALLERY:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.PHOTOBOOK_SUB_GALLERY_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                   break;
                                   //return this.passToRealServer(request, next);
                                
                                case DemoAttributes.ENTITY_LAYOUT_TRANSPORT_INFO:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.TRANSPORT_INFO_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_LATESTNEWS:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.LATESTNEWS_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    //return this.passToRealServer(request, next);      

                                case DemoAttributes.ENTITY_LAYOUT_APP_FORM:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.APPLICATION_FORM_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    ////console.log('case = '+DemoAttributes.ENTITY_LAYOUT_APP_FORM);
                                    //return this.passToRealServer(request, next);

                                case DemoAttributes.ENTITY_LAYOUT_HOUSERULES:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.HOUSE_RULES_LAYOUT_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break;
                                    return this.passToRealServer(request, next);

                                
                                case DemoAttributes.ENTITY_LAYOUT_INFORMATION:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INFORMATION_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_SHOPDIRECTORY:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.SHOPDIRECTORY_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;

                                case DemoAttributes.ENTITY_INPUT_FORM_VISITOR_REG:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_VISITOR_REGISTRATION_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_VISITOR_FINISH:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.VISITOR_FINISH_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_LAYOUT_VISITOR_RECORD:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.VISITOR_RECORD_LAYOUT_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                
                                case DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK_CONFIRM:
                                    /*
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_FAC_BOOK_CONFIRM_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    break;
                                    */
                                   return this.passToRealServer(request, next);
                                case DemoAttributes.ENTITY_INPUT_FORM_NOTICE_RECORD:
                                    
                                    if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 1)
                                    { 
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_NOTICE_RECORD1_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 3) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_NOTICE_RECORD3_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 5) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_NOTICE_RECORD4_JSON));
                                    } else if (paramObj[ConstantAttributes.PARAM_UNIQUE_IDENTIFIER] == 6) {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_NOTICE_RECORD5_JSON));
                                    } else {
                                        _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_NOTICE_RECORD2_JSON));
                                    }
                                    
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = requestToken;
                                    
                                    break;
                                    
                                  // return this.passToRealServer(request, next);

                                    case DemoAttributes.ENTITY_INPUT_FORM_CLUBHOUSE_NOTICE_RECORD:
                                    _body = JSON.parse(JSON.stringify(DemoAttributes.INPUTFORM_CLUBHOUSE_NOTICE_RECORD_JSON));
                                    _body.userIdentity = new UserBaseModel();
                                    _body.userIdentity.token = this.demoUserToken;
                                    break;
                                    //return this.passToRealServer(request, next);

                                case DemoAttributes.ENTITY_LAYOUT_MY_BOOKNG_RECORD_DETAIL:
                                    //_body = JSON.parse(JSON.stringify(DemoAttributes.MY_BOOKING_RECORD_JSON));
                                    //_body.userIdentity = new UserBaseModel();
                                    //_body.userIdentity.token = requestToken;
                                    //break;
                                    return this.passToRealServer(request, next);
                                

                                case DemoAttributes.ENTITY_LAYOUT_MY_CENTRAL:                                    
                                    return this.passToRealServer(request, next);
                                default:
                                    return throwError({ status: 400, error: { message: 'Unknown Entity Name:' + paramObj[ConstantAttributes.PARAM_ENTITY_NAME] }});                                    
                            }     

                            break;
                        
                        case ConstantAttributes.API_REQUEST_TYPE_ASYNC_OPTS:
                           /*    
                            if(paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_02 &&
                                paramObj[ConstantAttributes.PARAM_OPTION_FIELD_KEY] == 'option01')
                            {
                                _body = {};
                                _body.options = [];
                                var unitCnt = parseInt(paramObj['unitCnt']);                                
                                for (var i = 0; i < unitCnt; i++) { 
                                    _body.options.push({});
                                    _body.options[i].key = (100 + i + 1).toString().slice(1,3);                                    
                                    _body.options[i].contents = [];
                                    _body.options[i].contents.push({});
                                    _body.options[i].contents.push({});
                                    _body.options[i].contents.push({});

                                    _body.options[i].contents[0].desc = (100 + i + 1).toString().slice(1,3);                                    
                                    _body.options[i].contents[1].desc = "07:30 - 08:25";
                                    _body.options[i].contents[2].desc = "$80";
                                    
                                    if(i & 1)
                                    {
                                        _body.options[i].contents[0].style = "{\"opacity \":\"1\",\"max-width\":\"10rem\",\"color\": \"red\"}";
                                        _body.options[i].contents[1].style = "{\"opacity \":\"1\",\"max-width\":\"15rem\",\"color\": \"red\"}";
                                        _body.options[i].contents[2].style = "{\"opacity \":\"1\",\"max-width\":\"15rem\",\"text-align\":\"right\",\"color\": \"red\"}";
                                        _body.options[i].disable = true;
                                    }
                                    else
                                    {
                                        _body.options[i].contents[0].style = "{\"max-width\":\"10rem\",\"color\": \"blue\"}";
                                        _body.options[i].contents[1].style = "{\"max-width\":\"15rem\",\"color\": \"blue\"}";
                                        _body.options[i].contents[2].style = "{\"max-width\":\"15rem\",\"text-align\":\"right\",\"color\": \"blue\"}";
                                        _body.options[i].disable = false;
                                    }
                                }       
                                
                                _body.selectedKey = "03";
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;
                            }


                            if (paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK &&
                                paramObj[ConstantAttributes.PARAM_OPTION_FIELD_KEY] == 'bookTimePeriodId') {
                                _body = {};
                                _body.options = [];
                                
                                var facId = parseInt(paramObj['facId']);
                                let unitCnt:number = 0;

                                if(facId)
                                {
                                    
                                    //if (facId == 1) {
                                     //   unitCnt = 3;
                                    //} else
                                    //{ 
                                    //    unitCnt = 4;
                                    //}
                                    
                                   unitCnt = 14;

                                    for (let i:number = 0; i < unitCnt; i++) {
                                        _body.options.push({});
                                        _body.options[i].key = (100 + i + 1).toString().slice(1, 3);
                                        _body.options[i].contents = [];
                                        _body.options[i].contents.push({});
                                        _body.options[i].contents.push({});
                                        _body.options[i].contents.push({});

                                        _body.options[i].contents[0].desc = (100 + i + 1).toString().slice(1, 3);

                                        

                                        if (i & 1) {
                                            _body.options[i].contents[0].style = "{\"opacity \":\"1\",\"max-width\":\"10rem\",\"color\": \"red\"}";
                                            _body.options[i].contents[1].style = "{\"opacity \":\"1\",\"max-width\":\"15rem\",\"color\": \"red\"}";
                                            _body.options[i].contents[2].style = "{\"opacity \":\"1\",\"max-width\":\"15rem\",\"text-align\":\"right\",\"color\": \"red\"}";
                                            _body.options[i].disable = true;
                                        }
                                        else {
                                            _body.options[i].contents[0].style = "{\"max-width\":\"10rem\",\"color\": \"green\"}";
                                            _body.options[i].contents[1].style = "{\"max-width\":\"15rem\",\"color\": \"green\"}";
                                            _body.options[i].contents[2].style = "{\"max-width\":\"15rem\",\"text-align\":\"right\",\"color\": \"green\"}";
                                            _body.options[i].disable = false;
                                        }
                                    }
                                    _body.options[0].contents[1].desc = "07:30 - 08:25";
                                    _body.options[0].contents[2].desc = "$80";
                                    _body.options[1].contents[1].desc = "08:30 - 09:25";
                                    _body.options[1].contents[2].desc = "$80";
                                    _body.options[2].contents[1].desc = "09:30 - 10:25";
                                    _body.options[2].contents[2].desc = "$80";
                                    _body.options[3].contents[1].desc = "10:30 - 11:25";
                                    _body.options[3].contents[2].desc = "$80";
                                    _body.options[4].contents[1].desc = "11:30 - 12:25";
                                    _body.options[4].contents[2].desc = "$80";
                                    _body.options[5].contents[1].desc = "12:30 - 13:25";
                                    _body.options[5].contents[2].desc = "$80";
                                    _body.options[6].contents[1].desc = "13:30 - 14:25";
                                    _body.options[6].contents[2].desc = "$80";
                                    _body.options[7].contents[1].desc = "14:30 - 15:25";
                                    _body.options[7].contents[2].desc = "$80";
                                    _body.options[8].contents[1].desc = "15:30 - 16:25";
                                    _body.options[8].contents[2].desc = "$80";
                                    _body.options[9].contents[1].desc = "16:30 - 17:25";
                                    _body.options[9].contents[2].desc = "$80";
                                    _body.options[10].contents[1].desc = "17:30 - 18:25";
                                    _body.options[10].contents[2].desc = "$120";
                                    _body.options[11].contents[1].desc = "18:30 - 19:25";
                                    _body.options[11].contents[2].desc = "$120";
                                    _body.options[12].contents[1].desc = "19:30 - 20:25";
                                    _body.options[12].contents[2].desc = "$120";
                                    _body.options[13].contents[1].desc = "20:30 - 21:25";
                                    _body.options[13].contents[2].desc = "$120";
                                }

                                //_body.selectedKeys = ["03"];
                                //_body.selectedKey = "03";
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;
                            }

                            

                            if (paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_INPUT_FORM_FAC_BOOK &&
                                paramObj[ConstantAttributes.PARAM_OPTION_FIELD_KEY] == 'facId') {
                                
                                _body = {};
                                _body.options = [];
                                var bookDate = paramObj['bookDate'];  
                                //if (bookDate == '25/04/2019')
                                //{
                                //    _body.options.push({});
                                //    _body.options[0].key = 1;
                                //    _body.options[0].desc = '健康舞室 (全房) 星期一至五';

                                //    _body.options.push({});
                                //    _body.options[1].key = 2;
                                //    _body.options[1].desc = '健康舞室 (全房) 六、日及公眾假期';
                                //}
                                //else
                                //{
                                    _body.options.push({});
                                    _body.options[0].key = 1;
                                    _body.options[0].desc = '健康舞室 (全房) 星期一至五';
                                    _body.options.push({});
                                    _body.options[1].key = 2;
                                    _body.options[1].desc = '健康舞室 (全房) 六、日及公眾假期';
                                //}
                                
                                _body.selectedKey = "1";
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;
                                
                            }
                            break;
                            */
                            return this.passToRealServer(request, next);
                        
                        case ConstantAttributes.API_REQUEST_TYPE_ASYNC_VALID:
                            if(paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_02 &&
                                paramObj[ConstantAttributes.PARAM_VALIDATION_FIELD_KEY] == 'username')
                            {
                                userName = paramObj['username'];
                                var firstName = paramObj['firstname'];

                                _body = {};
                                _body.asyncValidMsgs = [];
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;

                                if(userName != '' && firstName != '' && userName == firstName)
                                {
                                    _body.asyncValidMsgs.push('User Name should not equal first name');
                                }
                            }
                            
                            break;

                        case ConstantAttributes.API_REQUEST_TYPE_ASYNC_VALUE_CHANGE_CONDITION:
                            if(paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_02)
                            {
                                _body = {};
                                if(paramObj[ConstantAttributes.PARAM_CONDITION_RULE] == 'middlename-async-condition-01')
                                {                                  
                                    var middleName = paramObj['middlename'];
                                    var lastName = paramObj['lastname'];  
                                    if(middleName == 'alan' && lastName == 'tin')
                                        _body.result = true;
                                }
                                else if (paramObj[ConstantAttributes.PARAM_CONDITION_RULE] == 'middlename-async-condition-02')
                                {
                                    middleName = paramObj['middlename'];
                                    lastName = paramObj['lastname'];
                                    if(!(middleName == 'alan' && lastName == 'tin'))
                                        _body.result = true;
                                }
                                else
                                {
                                    _body.result = false;                                   
                                }

                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;

                                /*if(request.params.get('middlename') == 'alan')
                                    _body = { result: true };
                                else
                                    _body = { result: false };*/
                            }
                            break;

                        case ConstantAttributes.API_REQUEST_TYPE_ASYNC_SET_VALUE:
                            if(paramObj[ConstantAttributes.PARAM_ENTITY_NAME] == DemoAttributes.ENTITY_SAMPLE_INPUT_FORM_02 &&
                                paramObj[ConstantAttributes.PARAM_VALUE_GENERATION_RULE] == "addr03-async-value-generation-01")
                            {
                                _body = {};
                                _body.userIdentity = new UserBaseModel();
                                _body.userIdentity.token = this.demoUserToken;
                                
                                middleName = paramObj['middlename'];
                                lastName = paramObj['lastname'];
                                _body.result = 'Async ' + middleName + ':' + lastName;                                
                            }
                            break;

                        default:
                            return throwError({ status: 400, error: { message: 'Unknown Request Type:' + paramObj[ConstantAttributes.PARAM_REQUEST_TYPE]}});
                    }

                    return of(new HttpResponse({ status: 200,  body: _body}));
                } 
                else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Session Expired.' } });
                } 
            }            

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
    
    private passToRealServer(request: HttpRequest<any>, next: HttpHandler)
    {
        //console.log('request response', request);
        return next.handle(request).pipe(tap((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
            //console.log('Processing response', ev);
            }
        }));
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};