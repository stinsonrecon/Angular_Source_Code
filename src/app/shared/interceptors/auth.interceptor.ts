import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { catchError, tap } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService,
        private _router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._authService.user && this._authService.isExpired) {
            this._authService.refershToken();
        }
        const authReq = request.clone({
            setHeaders: {
                Authorization: `${this._authService.authorizationHeaderValue}`
            }
        });
        return next.handle(authReq).pipe(catchError(x => this.handleAuthError(x)));
    }
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this._router.navigate(['/login']);
            return of(err.message);
        }
        return throwError(err);
    }
}
