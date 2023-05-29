import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class PheDuyetChungTuService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getBanTheHien(id: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/BanTheHien/Get?chungTuId=${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    kyDuyet(params: any): any {
        return this._http
            .post<any>(`${this.apiDefault}/ChungTu/Sign`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    
    khongDuyet(params: any): any {
        return this._http
            .post<any>(`${this.apiDefault}/ChungTu/Cancel`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

}