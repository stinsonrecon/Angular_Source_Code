import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class DanhSachChungTuService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getDSChungTu(item?: any) {
        let params = new HttpParams();
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.capKy) {
                params = params.append("capKy", item.capKy);
            }
            if (item.tuKhoa) {
                params = params.append("tuKhoa", item.tuKhoa.trim());
            }
            if (item.daXoa) {
                params = params.append("daXoa", item.daXoa);
            }
            if (item.NgayYeuCauLapCTStart !== '') {
                params = params.append("NgayYeuCauLapCTStart", item.NgayYeuCauLapCTStart);
            }
            if (item.NgayYeuCauLapCTEnd !== '') {
                params = params.append("NgayYeuCauLapCTEnd", item.NgayYeuCauLapCTEnd);
            }
            if (item.trangThaiCT >= -1) {
                params = params.append("trangThaiCT", item.trangThaiCT);
            }
            if (item.trangThaiKD >= 0) {
                params = params.append("daKy", (item.trangThaiKD === 0 ? false : true).toString());
            }
            params = params.append("LoaiChungTu", item.LoaiChungTu);
        }
        return this._http
            .get<any>(`${this.apiDefault}/KySoChungTu/Get`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }

    updateStatus(param: any) {
        return this._http.post(`${this.apiDefault}/YeuCauChiTien/TiemMat/Create`, param, { headers: this.sharedHeaders });
    }

    getDetailConfirm(id: string): Observable<any> {
        return this._http.get<any>(`${this.apiDefault}/ChungTu/GetByID?chungTuId=${id}`);
    }

    confirmPassword(param) {
        return this._http.post(`${this.apiDefault}/YeuCauChiTien/Confirm`, param, { headers: this.sharedHeaders });
    }

    sendRequest(param) {
        return this._http.post(`${this.apiDefault}/YeuCauChiTien/Create`, param);
    }

    dongChungTu(id, thaoTacBuocPheDuyetId){
        return this._http.post(`${this.apiDefault}/ChungTu/UpdateTT/${id}/${thaoTacBuocPheDuyetId}`,'');
    }

}
