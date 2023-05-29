import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
  providedIn: 'root'
})
export class QuytrinhpheduyetService extends BaseService {

  private sharedHeaders = new HttpHeaders();
  constructor(private _http: HttpClient) {
    super();
    this.sharedHeaders = this.sharedHeaders.set(
      "Content-Type",
      "application/json"
    );
  }
  getDSQuyTrinhPheDuyet(item?: any) {
    let params = new HttpParams();
    if (item) {
      if (item.tuKhoa) {
        params = params.append("tuKhoa", item.tuKhoa.trim());
      }
    }
    return this._http
      .get<any>(`${this.apiDefault}/QuyTrinhPheDuyet/getAll`, {
        headers: this.sharedHeaders,
        params: params
      })
      .pipe(catchError(this.handleError));
  }

  createQuyTrinh(data): Observable<any> {
    return this._http
      .post<any>(`${this.apiDefault}/QuyTrinhPheDuyet/create`, data, {
        headers: this.sharedHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  updateQuyTrinh(data): Observable<any> {
    return this._http
      .put<any>(`${this.apiDefault}/QuyTrinhPheDuyet/update`, data, {
        headers: this.sharedHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  deleteQuyTrinh(id: string): Observable<any> {
    return this._http
      .delete<any>(`${this.apiDefault}/QuyTrinhPheDuyet/${id}`, {
        headers: this.sharedHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  getListBuocTheoQuyTrinh(quyTrinhId: string) {
    let params = new HttpParams();
      if (quyTrinhId) {
        params = params.append("quyTrinhPheDuyetId", quyTrinhId);
      }
    return this._http
      .get<any>(`${this.apiDefault}/CauHinhBuocPheDuyet/get-ds-phe-duyet`, {
        headers: this.sharedHeaders,
        params: params
      })
      .pipe(catchError(this.handleError));
  }

  createBuocThucHhien(data): Observable<any> {
    return this._http
      .post<any>(`${this.apiDefault}/CauHinhBuocPheDuyet/create`, data, {
        headers: this.sharedHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  updateBuocThucHhien(data): Observable<any> {
    return this._http
      .put<any>(`${this.apiDefault}/CauHinhBuocPheDuyet/update`, data, {
        headers: this.sharedHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  getQuyTrinhBuocThaoTacByLoaiHoSoId(loaiHoSoId: string): Observable<any> {
    return this._http.get<any>(`${this.apiDefault}/QuyTrinhPheDuyet/get-by-loai-hs-id/${loaiHoSoId}`, {
      headers: this.sharedHeaders
    })
    .pipe(catchError(this.handleError));
  }

  getBuocById(buocThucHienId: string): Observable<any> {
    return this._http.get<any>(`${this.apiDefault}/CauHinhBuocPheDuyet/get-by-id/${buocThucHienId}`, {
      headers: this.sharedHeaders
    })
    .pipe(catchError(this.handleError));
  }
}
