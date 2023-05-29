import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class QuocGiaService extends BaseService {
    private sharedHeaders = new HttpHeaders();

    constructor (private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        )
    }

    getQuocGia(item?: any) : any {
        let params = new HttpParams();

        if (item) {
            if (item.tuKhoa) {
                params = params.append("tenQuocGia", item.tuKhoa);
            }
            params = params.append("trangThai", item.trangThai);
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
        }

        return this._http
                    .get<any>(`${this.apiDefault}/quocGia/getAll`, {
                        headers: this.sharedHeaders,
                        params: params
                    })
                    .pipe(catchError(this.handleError));
    }

    createOrUpdateQuocGia(item: any) {
        return this._http
                    .post<any>(`${this.apiDefault}/quocGia/create`, item , {
                        headers: this.sharedHeaders
                    })
                    .pipe(catchError(this.handleError));
    }

    updateQuocGia(item: any) {
        return this._http
                    .put<any>(`${this.apiDefault}/quocGia/update`, item, {
                        headers: this.sharedHeaders
                    })
                    .pipe(catchError(this.handleError));
    }

    deleteQuocGia(id: any) {
        return this._http
                    .delete<any>(`${this.apiDefault}/quocGia/delete?quocGiaId=${id}`, {
                        headers: this.sharedHeaders
                    })
                    .pipe(catchError(this.handleError));
    }
}