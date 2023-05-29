import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { yeuCauBaoGiaCreateRequest } from '@app/shared/models/csdlgia/csdlgia.model';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class YeuCauBaoGiaService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    
    getDonVi(loaiDonVi: any): any {
        let params = new HttpParams();
        // if (item.loaiDonVi == 0) {
            params = params.append("loaiDonVi", loaiDonVi);
        // }
        // else
        // if (item && item.loaiDonVi && item.loaiDonVi !=-99) {
        //     params = params.append("loaiDonVi", item.loaiDonVi);
        // }
        // if (item && item.pageIndex) {
        //     params = params.append("pageIndex", item.pageIndex);
        // }
        // if (item && item.pageSize) {
        //     params = params.append("pageSize", item.pageSize);
        // }
        return this._http
            .get<any>(`${this.apiDefault}/donvi`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }

    getRole(): any {
        let params = new HttpParams();
        return this._http
            .get<any>(`${this.apiDefault}/role/getAll`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }
    sendMail(params: any) {
        return this._http.post<any>(`${this.apiDefault}/sendmail`, params, { headers: this.sharedHeaders })
            .pipe(catchError(this.handleError));
    }
    sendSms(params: any) {
        return this._http.post<any>(`${this.apiDefault}/sms`, params, { headers: this.sharedHeaders })
            .pipe(catchError(this.handleError));
    }

}
