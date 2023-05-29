import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class NhomQuyenService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient,) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    createOrUpdateDonVi(params: any): any {
        return this._http
            .post<any>(`${this.apiUrl}/api/role/${params.id || '0'}`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    
}
