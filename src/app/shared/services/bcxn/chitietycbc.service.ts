import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class ChiTietYcbcService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getThongKeBC(id: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/baocao/thongke/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getBcxnById(donViId: any, ycbcId: any, trangThai: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/baocao/bcxn/${donViId}/${ycbcId}/${trangThai}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getYcbcById(donViId: any, ycbcId: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/yeucaubaocao/${donViId}/${ycbcId}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getLichSuXnById(ycbcId: any, bcId: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/lichsuxacnhan/${ycbcId}/${bcId}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getFileXNBC(siteId: any, viewname: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/file/${siteId}/${viewname}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    putBcxn(param: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/baocao/bcxn/sapxep`, param, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    xacNhanBaoCao(bcxnId: any, params: any) {
        return this._http
            .put<any>(`${this.apiDefault}/yeucaubaocao/xacnhan/${bcxnId}`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    CapnhatBC(bcxnId: any, params: any) {
        return this._http
            .put<any>(`${this.apiDefault}/yeucaubaocao/CapnhatBC/${bcxnId}`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    uploadCompletedFileMerge(item: any, ycbcId: any) {
        return this._http
            .post(`${this.apiDefault}/yeucaubaocao/uploadFileBaoCaoHieuChinh/${ycbcId}`, item, {
                headers: {}
            })
            .pipe(catchError(this.handleError));
    }

    getCompletedFileMerge(ycbcId: any) {
        return this._http
            .get(`${this.apiDefault}/yeucaubaocao/getFileBaoCaoHieuChinh/${ycbcId}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
}
