import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSYeuCauChi, DSYeuCauChiColection } from '@app/shared/models/hosothanhtoan/ds-yeu-cau-chi.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../base/base.service';

@Injectable({
    providedIn: 'root'
})
export class YeuCauChiService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getDsYeuCauChi(data): Observable<DSYeuCauChiColection> {
        return this._http
            .post<DSYeuCauChiColection>(`${this.apiDefault}/YeuCauChiTien/Get`, data, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getPdfUNC(id: any) {
        return this._http
            .get(`${this.apiDefault}/generateUyNhiemChi?chungTuId=${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getPdfPC(id: any) {
        return this._http
            .get(`${this.apiDefault}/generatePhieuChi?chungTuId=${id}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    // getPdf(id: any) {
    //     return this._http
    //         .get(`${this.apiDefault}/mergePCUNC?chungTuId=${id}`, {
    //             headers: this.sharedHeaders,
    //         })
    //         .pipe(catchError(this.handleError));
    // }

    getPdfPCUNC(id: any, maHoSo: any) { 
        let params = new HttpParams();
        params = params.append('chungTuId', id);
        params = params.append('maHoSo', maHoSo);
        return this._http
            .get(`${this.apiDefault}/ChungTu/GetPCUNC`,{
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }
}
