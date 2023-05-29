import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '..';

@Injectable({
    providedIn: 'root'
})
export class DanhmucgiaytoService extends BaseService {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getListGiayTo(param) {
        return this.http.post(`${this.apiDefault}/giayto/paging`, param);
    }

    createGiayTo(param) {
        return this.http.post(`${this.apiDefault}/giayto`, param);
    }

    updateGiayTo(param, id: string) {
        return this.http.put(`${this.apiDefault}/giayto/${id}`, param);
    }

    deleteGiayTo(id) {
        return this.http.delete(`${this.apiDefault}/giayto/${id}`);
    }
}
