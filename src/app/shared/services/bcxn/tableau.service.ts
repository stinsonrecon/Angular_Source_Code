import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@app/shared/constants/util';
import { yeuCauBaoGiaCreateRequest } from '@app/shared/models/csdlgia/csdlgia.model';
import { catchError } from 'rxjs/operators';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class TableauService extends BaseService {

    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    getToken(sitename: any): any {
        let params = new HttpParams();
        if(sitename){
            params = params.append('sitename', sitename);
        }
        return this._http
            .get<any>(`${this.apiDefault}/Tableau/GetToken`, {
                headers: this.sharedHeaders,
                params
            })
            .pipe(catchError(this.handleError));
    }

    // getTicket(sitename: any): any {
    //     let params = new HttpParams();
    //     if(sitename){
    //         params = params.append('sitename', sitename);
    //     }
    //     return this._http
    //         .get<any>(`${this.apiDefault}/Tableau/GetTicket`, {
    //             headers: this.sharedHeaders,
    //             params
    //         })
    //         .pipe(catchError(this.handleError));
    // }

    getTicket(sitename: any): any {

        return this._http
            //.get<any>("http://10.1.117.143:8083/api/Tableau/GetTicket", {
            .get<any>(`${this.apiDefault}/Tableau/GetTicket`, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    

    getView(siteId: any, viewname: any, token: any): any {
        let params = new HttpParams();
        return this._http
            .get<any>(`${this.apiDefault}/Tableau/GetView/${siteId}/${viewname}/${token}`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }

    getFileTableau(siteId: any, viewId: any, token: any): any {
        let params = new HttpParams();
        return this._http
            .get<any>(`${this.apiDefault}/Tableau/Download/${siteId}/${viewId}/${token}`, {
                headers: this.sharedHeaders,
                params: params,
            })
            .pipe(catchError(this.handleError));
    }

    getFileMerge(param: any): any {
        let params = new HttpParams();
        return this._http
            .post<any>(`${this.apiDefault}/Tableau/MergeSlideByID`,param, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }
}
