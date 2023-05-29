import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class DanhMucLoaiHoSoService extends BaseService {

    dataLuongPheDuyet = new BehaviorSubject<any[]>([]);
    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getDanhMucLoaiHoSo(item?: any): any {
        let params = new HttpParams();
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.TuKhoa) {
                params = params.append("TuKhoa", item.TuKhoa.trim());
            }
            if (item.trangThai >= 0) {
                params = params.append("trangThai", item.trangThai);
            }
        }
        return this._http
            .get<any>(`${this.apiDefault}/LoaiHoSo/paging`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }

    deleteLoaiHoSoById(id: any): any {
        return this._http
            .delete<any>(`${this.apiDefault}/LoaiHoSo/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    createLoaiHoSo(item?: any): any {
        return this._http
            .post<any>(`${this.apiDefault}/LoaiHoSo`, item, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    updateLoaiHoSo(item?: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/LoaiHoSo`, item, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    updateTrangThai(idx?: any) {
        return this._http
            .put<any>(`${this.apiDefault}/LoaiHoSo/update-trang-thai/${idx}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getGiayTo(): any {
        return this._http
            .get<any>(`${this.apiDefault}/giayto/all`,{
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getTrangThaiHoSo() {
        return this._http
            .get<any>(`${this.apiDefault}/trang-thai-ho-so`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getNodePheDuyet() {
        return this._http
            .get<any>(`${this.apiDefault}/role/getAll`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getLoaiHoSo(id: any) {
        return this._http
            .get<any>(`${this.apiDefault}/LoaiHoSo/${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    setDataLuongPheDuyet(data) {
        this.dataLuongPheDuyet.next(data);
    }

    getDataLuongPheDuyet() {
        return this.dataLuongPheDuyet.asObservable();
    }

    createNganHang(item: any) {
        return this._http.post(`${this.apiDefault}/NganHang/Create`, item, {
            headers: this.sharedHeaders
        }).pipe(catchError(this.handleError));
    }

    updateNganHang(item: any) {
        return this._http.put(`${this.apiDefault}/NganHang/update`, item, {
            headers: this.sharedHeaders
        }).pipe(catchError(this.handleError));
    }
    getAllLoaiHoSo(trangThai: number) {
        return this._http.get(`${this.apiDefault}/LoaiHoSo?trangThai=${trangThai}`)
        .pipe(catchError(this.handleError));
    }

}
