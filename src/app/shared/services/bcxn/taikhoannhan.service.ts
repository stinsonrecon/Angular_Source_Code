import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSChiNhanhNganHangColection, DSNganHangColection, DSTaiKhoanNhanColection, TaiKhoanNhan } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
  providedIn: 'root'
})
export class TaikhoannhanService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super()
  }
  getListTaiKhoan(param): Observable<DSTaiKhoanNhanColection> {
    let params = new HttpParams();
    if(param.ChiNhanhNganHangId !== '0') params = params.append('ChiNhanhNganHangId', param.ChiNhanhNganHangId);
    if(param.NganHangId !== '0') params = params.append('NganHangId', param.NganHangId);
    params = params.append('PageSize', param.pageSize);
    params = params.append('PageIndex', param.pageIndex);
    if(param.trangThai > 0) params = params.append('TrangThai', param.trangThai);
    params = params.append('SearchString', param.SearchString);
    params = params.append('TaiKhoanId', param.TaiKhoanId);

    return this.http.get<DSTaiKhoanNhanColection>(`${this.apiDefault}/taiKhoanNganHang/getAll`, { params: params })
    .pipe(catchError(this.handleError));
  }

  getTaiKhoan(param): Observable<DSTaiKhoanNhanColection> {
    let params = new HttpParams();
    params = params.append('TaiKhoanId', param.TaiKhoanId);

    return this.http.get<DSTaiKhoanNhanColection>(`${this.apiDefault}/taiKhoanNganHang/getAll`, { params: params })
    .pipe(catchError(this.handleError));
  }

  // lấy all danh sách ngân hàng
  getListNganHang(): Observable<DSNganHangColection> {
    return this.http.get<DSNganHangColection>(`${this.apiDefault}/nganHang/getAll`).pipe(catchError(this.handleError));
  }

  // lấy danh sách ngân hàng có lookupType là CITAD
  getListNganHangCITAD(item){
    return this.http.get(`${this.apiDefault}/nganHang/getAll?lookupType=${item}`).pipe(catchError(this.handleError));
  }

  // lấy danh sách chi nhánh theo ngân hàng
  getListChiNhanhNHByNganHang(nganHangId?, loaiTaiKhoan?): Observable<DSChiNhanhNganHangColection> {
    let params = new HttpParams();
    if(nganHangId) params = params.append('NganHangId', nganHangId);
    if(loaiTaiKhoan) params = params.append('LoaiTaiKhoan', loaiTaiKhoan);
    
    return this.http.get<DSChiNhanhNganHangColection>(`${this.apiDefault}/chiNhanhNganHang/getAll`, {params: params}).pipe(catchError(this.handleError));
  }

  createTaiKhoanNhan(param){
    return this.http.post(`${this.apiDefault}/TaiKhoanNganHang/Create`, param).pipe(catchError(this.handleError));
  }

  updateTaiKhoanNhan(param){
    return this.http.put(`${this.apiDefault}/taiKhoanNganHang/update`, param).pipe(catchError(this.handleError));
  }

  deleteTaiKhoanNhan(taiKhoanId){
    return this.http.delete(`${this.apiDefault}/taiKhoanNganHang/delete?taiKhoanNganHangId=${taiKhoanId}`).pipe(catchError(this.handleError));
  }

  getAllQuocGia(): Observable<any> {
    return this.http.get<any>(`${this.apiDefault}/quocGia/getAll`).pipe(catchError(this.handleError));
  }

  getTinhTPByQuocGiaId(quocGiaId): Observable<any> {
    return this.http.get<any>(`${this.apiDefault}/tinhTp/${quocGiaId}`).pipe(catchError(this.handleError));
  }
}
