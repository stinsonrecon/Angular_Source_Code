import { FilePathCreateRequest, FileCreateRequest } from './../../models/files/file.model';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '@app/shared/services';

@Injectable({ providedIn: 'root' })
export class PortalSerice extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set('Content-Type', 'application/json');
    }

    getListPhieuDangKy(item: any) {
        let params = ''
        if (item) {
            if (item.ban === -99) {
                params += `ban=`
            } else {
                params += `ban=${item.ban}`
            }
            if (item.tungay) {
                params += `&tungay=${item.tungay}`
            }
            if (item.denngay) {
                params += `&denngay=${item.denngay}`
            }
        }
        return this._http
            .get<any>(`${this.apiPortal}/EVNApi/api_DanhSachPhieuDaTaoVPP?${params}`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getListPhieuTongHop(item: any) {
        let params = new HttpParams();
        if (item) {
            if (item.tungay) {
                params = params.append("tungay", item.tungay);
            }
            if (item.denngay) {
                params = params.append("denngay", item.denngay);
            }
        }
        return this._http
            .get<any>(`${this.apiPortal}/EVNApi/api_DanhSachPhieuTongHopVPP`, {
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }

    getChiTietPhieuVPP(id: any) {
        return this._http
            .get<any>(`${this.apiPortal}/EVNApi/api_ChiTietPhieuVPP?id=${id}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }

    downloadFileNoiDung(url: any) {
        return this._http
            .get<any>(`${this.apiPortal}/EVNApi/api_FileNoiDungVPP?file=${url}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }

    getChiTietPhieuTH(id: any) {
        return this._http
            .get<any>(`${this.apiPortal}/EVNApi/api_ChiTietPhieuTongHopVPP?id=${id}`, {
                headers: this.sharedHeaders
            })
            .pipe(catchError(this.handleError));
    }
}
