import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResult, LoginRequest, User, UserExtend, Company } from '@app/shared/models';
import { BaseService } from '@app/shared/services';


@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private _authUserSubject: BehaviorSubject<User>;
    public _authUser: Observable<User>;
    private _curCompanySubject: BehaviorSubject<Company>;
    public _curCompany: Observable<Company>;
    private _curMenuSubject: BehaviorSubject<string>;
    public _curMenu: Observable<string>;
    // private _idDvDofficeSubject: BehaviorSubject<string>;
    // public _idDvDoffice: Observable<string>;

    constructor(private _http: HttpClient) {
        super();

        this._authUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this._authUser = this._authUserSubject.asObservable();
        this._curCompanySubject = new BehaviorSubject<Company>(JSON.parse(localStorage.getItem('company')));
        this._curCompany = this._curCompanySubject.asObservable();
        this._curMenuSubject = new BehaviorSubject<string>(localStorage.getItem('menu'));
        this._curMenu = this._curMenuSubject.asObservable();
        // this._idDvDofficeSubject = new BehaviorSubject<string>(localStorage.getItem('idDvDoffice'));
        // this._idDvDoffice = this._idDvDofficeSubject.asObservable();
    }

    login(req: LoginRequest): any {
        return this._http.post<any>(`${this.apiUrl}/api/users/authenticate`, req)
            .pipe(map(result => {
                if (result.data?.token) {
                    const helper = new JwtHelperService();
                    const _decode = helper.decodeToken(result.data.token);
                    localStorage.setItem('accessToken_Ex', _decode.exp);
                    localStorage.setItem('user', JSON.stringify(result.data));
                    // localStorage.setItem('idDvDoffice', '124');
                    this._authUserSubject.next(result.data);
                }
                else {
                    localStorage.removeItem('user');
                    this._authUserSubject.next(null);
                }
                return { statusCode: result.statusCode, message: result.message, resultObj: result.data, success: result.success };
            }));
    }

    loginHRMS(req: any): any {
        return this._http.post<any>(`${this.apiUrl}/api/users/AuthenticateID`, req)
            .pipe(map(result => {
                if (result.data?.token) {
                    const helper = new JwtHelperService();
                    const _decode = helper.decodeToken(result.data.token);
                    localStorage.setItem('accessToken_Ex', _decode.exp);                    
                    localStorage.setItem('user', JSON.stringify(result.data));
                    this._authUserSubject.next(result.data);
                }
                else {
                    localStorage.removeItem('user');
                    this._authUserSubject.next(null);
                }
                return { statusCode: result.statusCode, message: result.message, resultObj: result.data, success: result.success };
            }));
    }

    setMenu(menuid: string): void {
        localStorage.setItem('menu', menuid);
        this._curMenuSubject.next(menuid);
    }

    isAuthenticated(): boolean {
        return this.user != null && this.user.token != null;
    }

    refershToken() {
        return this._http.post<any>(`${this.apiUrl}/api/users/refresh-token`, {}, { withCredentials: true }).pipe(map(result => {
            if (result.data.token) {
                localStorage.setItem('user', JSON.stringify(result.data));
                this._authUserSubject.next(result.data);
            }
            else {
                localStorage.removeItem('user');
                this._authUserSubject.next(null);
            }
        }));;
    }

    get isExpired(): boolean {
        const helper = new JwtHelperService();
        return helper.isTokenExpired(this.user.token);
    }

    get expirationDate(): boolean {
        return this.user.expirationDate > new Date().getTime() ? true : false
    }
    get user(): User {
        return this._authUserSubject.value;
    }

    get company(): Company {
        return this._curCompanySubject.value;
    }

    // get idDvDoffice(): string {
    //     if (this._idDvDofficeSubject.value === null) {
    //         this._idDvDofficeSubject.next("124")
    //     }
    //     return this._idDvDofficeSubject.value;
    // }

    get menu(): string {
        return this._curMenuSubject.value;
    }

    get authorizationHeaderValue(): string {
        if (this.user) {
            // return `${this.user.token_type} ${this.user.access_token}`;
            return `Bearer ${this.user.token}`;
        }
        return null;
    }

    get userName(): string {
        return this.user != null ? this.user.username : '';
    }
    logout(): void {
        // remove user from local storage to log user out
        this._authUserSubject.next(null);
        localStorage.clear();
        this.revokeToken();

        // localStorage.removeItem('user');
        // localStorage.removeItem('userExtend');
        // localStorage.removeItem('company');
    }

    revokeToken(): any {
        console.log(document.cookie);
        return this._http.post<any>(`${this.apiUrl}/api/users/revoke-token`, { token: null }, { withCredentials: true })
            .subscribe();
    }
}

