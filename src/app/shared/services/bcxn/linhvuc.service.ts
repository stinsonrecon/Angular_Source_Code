import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
  providedIn: 'root'
})
export class LinhVucService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getLinhVuc(item?: any): any {
        let params = new HttpParams();
        
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.tuKhoa) {
                params = params.append("tenLV", item.tuKhoa);
            }
            if(item.trangThai != -99) {
                params = params.append("trangThai", item.trangThai);
            }
        }
        return this._http
            .get<any>(`${this.apiDefault}/linhvucbaocao/getall`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }
    insertLinhVuc(params: any) {
        return this._http
            .post<any>(`${this.apiDefault}/linhvucbaocao`, params, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    editLinhVuc(params: any) {
        return this._http
            .put<any>(`${this.apiDefault}/linhvucbaocao/update`, params, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
    deleteLinhVuc(id: any) {
        return this._http
            .delete<any>(`${this.apiDefault}/linhvucbaocao/${id}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
}
