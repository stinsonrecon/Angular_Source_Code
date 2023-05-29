import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CauHinhNganHangCollection } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class CauHinhNganHangService extends BaseService {
    private sharedHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getListCauHinhNganHang(param) : Observable<CauHinhNganHangCollection> {
        let params = new HttpParams();
        params = params.append('PageSize', param.pageSize);
        params = params.append('PageIndex', param.pageIndex);
        params = params.append('SearchString', param.SearchString);

        if(param.NganHangId !== "0") params = params.append('NganHangId', param.NganHangId);

        return this.http.get<CauHinhNganHangCollection>(`${this.apiDefault}/cau_hinh_ngan_hang/GetAll`, { 
            headers: this.sharedHeaders,
            params: params 
        })
        .pipe(catchError(this.handleError));
    }

    createCauHinhNganHang(param : any){
        return this.http.post(`${this.apiDefault}/cau_hinh_ngan_hang/Create`, param, {
            headers: this.sharedHeaders
        }).pipe(catchError(this.handleError));
    }
    
    updateCauHinhNganHang(param : any){
        return this.http.put(`${this.apiDefault}/cau_hinh_ngan_hang/Update`, param, {
            headers: this.sharedHeaders
        }).pipe(catchError(this.handleError));
    }

    deleteCauHinhNganHang(cauHinhId : any): any {
        return this.http.delete<any>(`${this.apiDefault}/cau_hinh_ngan_hang/${cauHinhId}`, {
            headers: this.sharedHeaders
        }).pipe(catchError(this.handleError));
    }
}