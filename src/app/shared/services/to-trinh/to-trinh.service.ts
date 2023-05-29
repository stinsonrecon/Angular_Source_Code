import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToTringCollection } from '@app/shared/models/hosothanhtoan/ds-to-trinh.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})

export class ToTrinhService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getToTrinhById(id) {
        return this._http.get(`${this.apiDefault}/ToTrinh/GetById/${id}`, {
            headers: this.sharedHeaders,
        })
    }

    kyDuyetToTrinh(param) {
        return this._http.post(`${this.apiDefault}/ToTrinh/Sign`, param, {
            headers: this.sharedHeaders,
        })
    }
    
    huyDuyetToTrinh(param) {
        return this._http.post(`${this.apiDefault}/ToTrinh/Cancel`, param, {
            headers: this.sharedHeaders,
        })
    }

    getToTrinhPaging(param): Observable<ToTringCollection> {
        return this._http.post<ToTringCollection>(`${this.apiDefault}/ToTrinh/GetPaging`, param)
            .pipe(catchError(this.handleError));
    }
}
