import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { yeuCauBaoGiaCreateRequest } from '@app/shared/models/csdlgia/csdlgia.model';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    
    getUser(): any {
        let params = new HttpParams();
        return this._http
            .get<any>(`${this.apiDefault}/user/getAll`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }
    userCreate(params:any){
        const req = params;
        let id = params.id ? params.id : -1
        return this._http.post<any>(`${this.apiDefault}/user/create/${id}`, req, { headers: this.sharedHeaders })
            .pipe(catchError(this.handleError));
    }

    userChangePassword(params:any){
        return this._http.get<any>(`${this.apiDefault}/user/changepassword`, { headers: this.sharedHeaders, params:params })
            .pipe(catchError(this.handleError));
    }

    checkPasswordExist(params:any){
        return this._http.get<any>(`${this.apiDefault}/user/checkpassword`, { headers: this.sharedHeaders, params:params })
            .pipe(catchError(this.handleError));
    }

    deleteUser(id:any){
        return this._http.delete<any>(`${this.apiDefault}/user/delete/${id}`, { headers: this.sharedHeaders })
        .pipe(catchError(this.handleError));
    }
}
