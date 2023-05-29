import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService, } from '..';

@Injectable({
    providedIn: 'root'
})
export class ChucNangService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getChucNang(): any {
        let params = new HttpParams();
        let nhomQuyen = this.localUser ? this.localUser.nhomQuyenId : "";
        return this._http
            .get<any>(`${this.apiDefault}/chucnang/${nhomQuyen}`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));

    }
    getChucNangAll(idNhomQuyen:any): any {
        let params = new HttpParams();
        // let nhomQuyen = this.localUser.idNhomQuyen;
        return this._http
            .get<any>(`${this.apiUrl}/api/chucnang/${idNhomQuyen}`, {
                headers: this.sharedHeaders,
                params: params, 
            })
            .pipe(catchError(this.handleError));

    }
    getAllChucNang(item?: any): any {
        let params = new HttpParams();
        
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.tuKhoa) {
                params = params.append("tenCN", item.tuKhoa);
            }
            if(item.trangThai != -99) {
                params = params.append("trangThaiCN", item.trangThai);
            }
            if(item.type) {
                params = params.append("type", item.type);
            }
        }
        return this._http
            .get<any>(`${this.apiDefault}/chucnang/getall`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));

    }
    insertChucNang(params: any) {
        return this._http
            .post<any>(`${this.apiDefault}/chucnang/create`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    editChucNang(params: any) {
        return this._http
            .put<any>(`${this.apiDefault}/chucnang/update`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
    deleteChucNang(id: any) {
        return this._http
            .delete<any>(`${this.apiDefault}/chucnang/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
}
