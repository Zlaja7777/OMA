import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem('token');
        if (token != null) {
            const clonedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
            return next.handle(clonedReq).pipe(tap(
                succ => {
                }, error => {
                    if (error.status == 401) {
                        localStorage.removeItem('token');
                        this.router.navigate(['/account/login']);
                    }
                }
            ));
        } else {
            return next.handle(req.clone());
        }
    }
}