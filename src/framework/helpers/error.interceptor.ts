import { Injectable} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Events } from 'ionic-angular';
import { ConstantAttributes } from '../attributes/constant-attributes';

//import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private events: Events) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            console.log("Error Caught: ", err);
            
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.events.publish(ConstantAttributes.EVENT_APP_SESSION_EXPIRED);

                //Continue to Throw to ApiRequestService
                return throwError(err);
            }
            else if(err.status === 200) {
                return throwError(ConstantAttributes.GENERAL_ERROR_EMPTY_RESULT_JSON_MSG);
            }
            else
            {            
                //const error = err.statusText || err.message || err.error.message;

                let error: string | string[];
                if(err.error && err.error.messages)
                    error = err.error.messages;
                else if(err.error && err.error.message && typeof err.error.message === 'string')
                    error = err.error.message;
                else if(err.message && typeof err.message === 'string')
                    error = err.message;
                else if(err.error && typeof err.error === 'string')
                    error = err.error;
                else if(err.statusText && typeof err.statusText === 'string')
                    error = err.statusText;

                return throwError(error);
            }
        }))
    }
}

export let errorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};