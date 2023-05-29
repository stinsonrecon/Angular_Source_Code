import { FilePathCreateRequest, FileCreateRequest } from './../../models/files/file.model';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '@app/shared/services';

@Injectable({ providedIn: 'root' })
export class FileService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set('Content-Type', 'application/json');
    }

    fileCreate(req: any) {
        return this._http.post(`${this.apiDefault}/file`, req, { headers: {} })
            .pipe(catchError(this.handleError));
    }

    filePathCreate(req: FilePathCreateRequest) {
        return this._http.post(`${this.apiFiles}/Files/filePath`, JSON.stringify(req), { headers: this.sharedHeaders })
            .pipe(catchError(this.handleError));
    }

    fileBytesGetOne(filePath: string) {
        let params = new HttpParams();
        params = params.append('filePath', filePath);

        return this._http.get<any>(`${this.apiFiles}/Files/bytes`, { headers: this.sharedHeaders, params: params })
            .pipe(map((response: any) => {
                return response;
            }), catchError(this.handleError));
    }

    fileBase64GetOne(filePath: string) {
        let params = new HttpParams();
        params = params.append('filePath', filePath);

        return this._http.get<any>(`${this.apiFiles}/Files/base64`, { headers: this.sharedHeaders, params: params })
            .pipe(map((response: any) => {
                return response;
            }), catchError(this.handleError));
    }

    getFileCTGS(id: any, loaiChungTu: any, maHoSo: any) {
        let params = new HttpParams();
        params = params.append('chungTuId', id);
        params = params.append('loaiChungTu', loaiChungTu);
        params = params.append('maHoSo', maHoSo);
        return this._http
            .get(`${this.apiDefault}/ChungTu/GetCTGS`,{
                headers: this.sharedHeaders,
                params: params
            })
            .pipe(catchError(this.handleError));
    }
}
