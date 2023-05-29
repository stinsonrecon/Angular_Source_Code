import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService, BaseService } from '..';

@Injectable({
    providedIn: 'root'
})

export class DofficeSerice extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient, private _authService: AuthService) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    callApiDoffice(param) {
        let params
        if(typeof param === 'string'){
            params = {
                url: [param],
                idDonvi: this._authService.user.donViId,
            }
        } else {
            params = {
                url: param,
                idDonvi: this._authService.user.donViId,
            }
        }
        return this._http.post(`${this.apiDefault}/GetTokenDoffice`, params, {
            headers: this.sharedHeaders,
        }).pipe(catchError(this.handleError));
    }

    downloadDoffice(param){
        let params = {
            url: [param],
            idDonvi: this._authService.user.donViId,
        }
        return this._http.post(`${this.apiDefault}/DownloadTaiLieunDoffice`, params, {
            headers: this.sharedHeaders,
        }).pipe(catchError(this.handleError));
    }

    convertWordToPDF(param){
        let formData = new FormData()
        formData.append('fileWord', param)
        return this._http.post(`${this.apiDefault}/HoSoTT/convertWordToPDF`, formData, {
            headers: this.sharedHeaders,
        }).pipe(catchError(this.handleError));
    }

    // getListVanBan(param) {
    //     let params = new HttpParams();
    //     params = params.append('pageSize', param.pageSize);
    //     params = params.append('pageNumber', param.pageNumber);
    //     params = params.append('Username', param.Username);
    //     params = params.append('ID_DV', param.ID_DV);
    //     if (param.MainKeyWord !== '') params = params.append('MainKeyWord', param.MainKeyWord);
    //     if (param.DateFrom !== '') params = params.append('DateFrom', param.DateFrom);
    //     if (param.DateTo !== '') params = params.append('DateTo', param.DateTo);
    //     if (param.NoiGui !== '') params = params.append('NoiGui', param.NoiGui);
    //     params = params.append('LoaiVB', param.LoaiVB);
    //     if (param.NguoiKyVB !== '') params = params.append('NguoiKyVB', param.NguoiKyVB);
    //     return this._http
    //         .get(`${this.dofficeUrl}/v1/congviec/Searching/open-api/advancedSearch`, {
    //             headers: this.sharedHeaders,
    //             params: params
    //         })
    //         .pipe(catchError(this.handleError));
    // }

    // getHoSoTaiLieu(param) {
    //     let params = new HttpParams();
    //     params = params.append('currentPage', param.currentPage);
    //     params = params.append('perPage', param.perPage);
    //     params = params.append('USERNAME', param.USERNAME);
    //     params = params.append('ID_DV', param.ID_DV);
    //     if (param.NAM_HS !== '') params = params.append('NAM_HS', param.NAM_HS);
    //     if (param.SEARCH !== '') params = params.append('SEARCH', param.SEARCH);
    //     if (param.TU_NGAY_LAP !== '') params = params.append('TU_NGAY_LAP', param.TU_NGAY_LAP);
    //     if (param.DEN_NGAY_LAP !== '') params = params.append('DEN_NGAY_LAP', param.DEN_NGAY_LAP);
    //     return this._http
    //         .get(`${this.dofficeUrl}/v1/hstl/hstl`, {
    //             headers: this.sharedHeaders,
    //             params: params
    //         })
    //         .pipe(catchError(this.handleError));
    // }

    // getTaiLieuById(param) {
    //     let params = new HttpParams();
    //     params = params.append('currentPage', param.currentPage);
    //     params = params.append('perPage', param.perPage);
    //     params = params.append('ID_HS', param.ID_HS);
    //     return this._http
    //         .get(`${this.dofficeUrl}/v1/hstl/hstl_tai_lieu`, {
    //             headers: this.sharedHeaders,
    //             params: params
    //         })
    //         .pipe(catchError(this.handleError));
    // }

    // getFileVanBan(idVb) {
    //     return this._http
    //         .get(`${this.dofficeUrl}/v1/vanban/VBDE/ListFileVB?ID_VB=${idVb}`, {
    //             headers: this.sharedHeaders,
    //         })
    //         .pipe(catchError(this.handleError));
    // }
}