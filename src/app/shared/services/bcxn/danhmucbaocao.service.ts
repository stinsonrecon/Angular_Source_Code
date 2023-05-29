import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class DanhMucBaoCaoService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }
    getLinhVucBaoCao(): any {
        return this._http
            .get<any>(`${this.apiDefault}/linhvucbaocao`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    convertPdfToBase64(pdf) {
        return this._http.get(`${environment.apiUrl}/api/ChitietgiaytoHSTT/DownloadFileFtp?request=${pdf}`, {
            headers: this.sharedHeaders
        })
        .pipe(catchError(this.handleError));
    }

}
