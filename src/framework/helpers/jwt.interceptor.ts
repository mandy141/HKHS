import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService} from '../services/local-storage-service'
import { UserBaseModel } from '../models/user-base-model';
import { ConstantAttributes } from '../attributes/constant-attributes';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private localStorageSrv: LocalStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available, or perform reset Password
        let requestUser;
        if(request.body && request.body[ConstantAttributes.PARAM_RESET_PASSWORD_USER_IDENTITY])
        {
            requestUser = request.body[ConstantAttributes.PARAM_RESET_PASSWORD_USER_IDENTITY] as UserBaseModel;            
        }
        else
            requestUser = this.localStorageSrv.getUser();
        ////console.log('requestUser');
        ////console.log(requestUser);
        if (requestUser && requestUser.token) {
            request = request.clone({
                setHeaders: { 
                    'Accept': `application/json`,
                    'Content-Type': `application/json`,
                    'Cache-control': 'no-cache, no-store, must-revalidate', 
                    'pragma': 'no-cache',
                    'Expires': '0',
                    'TOKEN': `Bearer ${requestUser.token}`,
                    //'TOKEN': `Bearer AN9MGefrPn3OH__TYHS3nQEAAAAXv6t6XtiEPvwyXXHGYmOZAE58ps2IW2utnHNCZiujWVfY2V8Lo_YrRY43cNQEJMmzMvC1KZgjih-5tIsniItYjE9hES8jt7FKf2F1vOrjyuj0vUAr2l-htWTAFnnnJcJlViQwpoWf4YHpemgdZa4bTALT2-q8fQQqKRv-V_LK4HWdQcD16jo8QL1MQix5P-G2ghrlb2TZCT82JHRdRE4Oy29r-o1ogxiIWCCnZWf9YG4Z7_DrQdKh8rKRm873N3Xshz75tliXCChgzKy1ZQKJQqs-d3s9_PyDPqKgsKzYXgu1sUHLDDEUFyZeYk1K37RwEr-0wTmzwmCEdau9vQFLZMEMKVbaESjKAdyOxUazwg==';                    `,
                    'Access-Control-Allow-Origin': 'http://localhost:8000',
                    'playerID':'',
                    'userName':'',
                    'password':'',
                    'Authorization': 'Basic ZGVtbzp2aXBjS2g3ag=='
                }
            });
        }

        return next.handle(request);
    }
}

export let jwtProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};