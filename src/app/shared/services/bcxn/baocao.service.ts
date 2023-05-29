import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class BaoCaoService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getBaoCao(item?: any): any {
        let params = new HttpParams();
        
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.tuKhoa) {
                params = params.append("tenBC", item.tuKhoa);
            }
            if (item.trangThai != -99) {
                params = params.append("trangThai", item.trangThai);
            }
            if (item.loaiBaoCao != -99) {
                params = params.append("loaiBaoCao", item.loaiBaoCao);
            }
            if (item.linhVucId != -99) {
                params = params.append("linhVucId", item.linhVucId);
            }
            if (item.donViId != -99) {
                params = params.append("donViId", item.donViId);
            }
            if (item.typeId != -99) {
                params = params.append("typeId", item.typeId);
            }
        }
        return this._http
            .get<any>(`${this.apiDefault}/baocao`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }
    getLinhVuc() {
        return this._http
            .get<any>(`${this.apiDefault}/linhvucbaocao/getall`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    getPhongBan() {
        return this._http
            .get<any>(`${this.apiDefault}/donvi/getall`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    getSiteId(siteName: any) {
        let params = new HttpParams();
        params = params.append("sitename", siteName);
        return this._http
            .get<any>(`${this.apiDefault}/tableau/gettoken`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }
    getViewId(token: any, viewName: any, siteId: any) {
        return this._http
            .get<any>(`${this.apiDefault}/tableau/getview/` + siteId + "/" + viewName + "/" + token, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    insertBaoCao(params: any) {
        // params.nguoiTaoId = JSON.parse(localStorage.getItem('user')).id;
        params.nguoiTaoId = "1";
        return this._http
            .post<any>(`${this.apiDefault}/baocao`, params, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    editBaoCao(params: any) {
        return this._http
            .put<any>(`${this.apiDefault}/baocao/${params.id}`, params, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    deleteBaoCao(id: any) {
        return this._http
            .delete<any>(`${this.apiDefault}/baocao/${id}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    sapxep(item: any) {
        return this._http
            .put<any>(`${this.apiDefault}/baocao/sapxep`, item, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
}
