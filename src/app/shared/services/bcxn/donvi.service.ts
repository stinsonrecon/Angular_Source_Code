import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class DonViService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient,) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getDonVi(item?: any) {
        let params = new HttpParams();
        if(item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.tuKhoa) {
                params = params.append("tenDV", item.tuKhoa.trim());
            }
            if (item.trangThai >= 0) {
                params = params.append("trangThai", item.trangThai);
            }
            // if ((item.loaiDonVi >= 0)) {
            //     params = params.append("loaiDonVi", item.loaiDonVi);
            // }
        }
        return this._http
            .get<any>(`${this.apiDefault}/donvi/getall`, {
                headers: this.sharedHeaders,
                params: params
            });
    }
    createDonVi(params: any): any {
        // params.nguoiTaoId = JSON.parse(localStorage.getItem('user')).id;
        params.nguoiTaoId = "1";
        return this._http
            .post<any>(`${this.apiDefault}/donvi`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    updateDonVi(params: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/donvi/update`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    deleteDonVi(id: any): any {
        return this._http
            .delete<any>(`${this.apiDefault}/donvi/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
}
