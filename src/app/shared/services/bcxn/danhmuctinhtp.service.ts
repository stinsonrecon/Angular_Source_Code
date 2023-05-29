import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class TinhTPService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getTinhTP(item?: any): any {
        let params = new HttpParams();
        
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.tuKhoa) {
                params = params.append("tenTinhTP", item.tuKhoa);
            }
            if(item.trangThai != -99) {
                params = params.append("trangThai", item.trangThai);
            }
        }
        return this._http
            .get<any>(`${this.apiDefault}/tinhthanhpho/getall`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));

    }

    getQuocGia() {
        return this._http
            .get<any>(`${this.apiDefault}/quocGia/getAll`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    createTinhTP(item: any) {
        return this._http
            .post<any>(`${this.apiDefault}/tinhthanhpho`, item, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    updateTinhTP(item:any) {
        return this._http
            .put<any>(`${this.apiDefault}/tinhthanhpho/update`, item, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
   
    deleteTinhTP(id:any) {
        return this._http
            .delete<any>(`${this.apiDefault}/tinhthanhpho/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
}