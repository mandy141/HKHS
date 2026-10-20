import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../services/config-service';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {

    constructor(private configSrv: ConfigService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return of(null).pipe(mergeMap(() => {           

            //Print Debug Message when localhost
            if(window.location.hostname == 'localhost')
            {
                console.log("Debug Request : " + JSON.stringify(request));     
            }

            return next.handle(request).pipe(tap((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    if(window.location.hostname == 'localhost')
                    {
                        console.log('Debug response', ev);
                    }
                }
            }));
        }));
    }
}

export let debugProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: DebugInterceptor,
    multi: true
};