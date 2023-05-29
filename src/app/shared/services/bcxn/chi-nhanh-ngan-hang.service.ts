import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSChiNhanhNganHangColection } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ChiNhanhNganHangService extends BaseService {

  constructor(
    private http: HttpClient
  ) { 
    super()
  }

  getListChiNhanhNH(param): Observable<DSChiNhanhNganHangColection> {
    let params = new HttpParams();
    params = params.append('PageSize', param.pageSize);
    params = params.append('PageIndex', param.pageIndex);
    params = params.append('SearchString', param.SearchString);
    if(param.trangThai > 0) params = params.append('TrangThai', param.trangThai);
    if(param.NganHangId !== "0") params = params.append('NganHangId', param.NganHangId);

    return this.http.get<DSChiNhanhNganHangColection>(`${this.apiDefault}/chiNhanhNganHang/getAll`, { params: params })
    .pipe(catchError(this.handleError));
  }

  createChiNhanh(param){
    return this.http.post(`${this.apiDefault}/ChiNhanhNganHang/Create`, param).pipe(catchError(this.handleError));
  }

  updateChiNhanh(param){
    return this.http.put(`${this.apiDefault}/ChiNhanhNganHang/update`, param).pipe(catchError(this.handleError));
  }

  deleteChiNhanh(chiNhanhId){
    return this.http.delete(`${this.apiDefault}/ChiNhanhNganHang/delete?chiNhanhNganHangId=${chiNhanhId}`).pipe(catchError(this.handleError));
  }
}
