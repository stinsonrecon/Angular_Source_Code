import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class DanhSachYeuCauBaoCaoService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getDsYcbc(param: any): any {

        let params = new HttpParams();

        if (param && param.trangThai != -99) {
            params = params.append("TrangThai", param.trangThai);
        }
        if (param && param.donViId) {
            params = params.append("DonViId", param.donViId);
        }
        if (param && param.nam != -99) {
            params = params.append("Nam", param.nam);
        }
        if (param && param.loaiBaoCao != -99) {
            params = params.append("LoaiBaoCao", param.loaiBaoCao);
        }

        if (param && param.pageIndex) {
            params = params.append("pageIndex", param.pageIndex);
        }
        if (param && param.pageSize) {
            params = params.append("pageSize", param.pageSize);
        }
        return this._http
            .get<any>(`${this.apiDefault}/yeucaubaocao`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }
    getDsBc(param: any): any {
        let params = new HttpParams();

        if (param && param.trangThai != -99) {
            params = params.append("TrangThai", param.trangThai);
        }
        if (param && param.loaiBaoCao != -99) {
            params = params.append("LoaiBaoCao", param.loaiBaoCao);
        }

        if (param && param.pageIndex) {
            params = params.append("pageIndex", param.pageIndex);
        }
        if (param && param.pageSize) {
            params = params.append("pageSize", param.pageSize);
        }
        return this._http
            .get<any>(`${this.apiDefault}/yeucaubaocao`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }
    getBcLinhVuc(): any {
        return this._http
            .get<any>(`${this.apiDefault}/baocao/linhvuc`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    createYcbc(params: any): any {
        return this._http
            .post<any>(`${this.apiDefault}/yeucaubaocao`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    updateYcbc(params: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/yeucaubaocao/${params.id}`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    updateTrangThaiYcbc(ycbcId: any, trangThai: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/yeucaubaocao/trangthai/${ycbcId}/${trangThai}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getBcByYcbc(id: any, type: any): any {
        return this._http
            .get<any>(`${this.apiDefault}/baocao/${id}/${type}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    getDsDonVi(): any {
        return this._http
            .get<any>(`${this.apiDefault}/donVi`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    deleteYcbc(id: any): any {
        return this._http
            .delete<any>(`${this.apiDefault}/yeucaubaocao/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
}
