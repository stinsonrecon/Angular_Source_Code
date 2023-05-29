import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
@Injectable({
    providedIn: 'root'
})
export class HoSoToiTaoService extends BaseService {
    infoHoSo: any;
    private sharedHeaders = new HttpHeaders();
    private messageSource = new BehaviorSubject('');
    private idHSTT = new BehaviorSubject('');
    private dataMaterialSubject = new BehaviorSubject('');
    private dataFileMaterialSubject = new BehaviorSubject([]);
    private listDataFile = new BehaviorSubject<any[]>([]);
    currentMessage = this.messageSource.asObservable();
    idHoSoTT = this.idHSTT.asObservable();
    dataMaterial = this.dataMaterialSubject.asObservable();
    dataFileMaterial = this.dataFileMaterialSubject.asObservable();
    private dataHoSoThamChieuSubject = new BehaviorSubject('');
    private dataHoSoThamChieuCheckedSubject = new BehaviorSubject('');
    dataHoSoThamChieu = this.dataHoSoThamChieuSubject.asObservable();
    dataHoSoThamChieuChecked = this.dataHoSoThamChieuCheckedSubject.asObservable();

    constructor(private _http: HttpClient) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(
            "Content-Type",
            "application/json"
        );
    }

    // downLoad(item) {
    //     let params = new HttpParams();
    //     params = params.append("username", item.username);
    //     params = params.append("ID_DV", item.ID_DV);
    //     params = params.append("ID_LOAI_VB", item.ID_LOAI_VB);
    //     params = params.append("ID_FILE", item.ID_FILE);
    //     return this._http.get(`${this.dofficeUrl}/v2/files/FileVb/open-api/DownloadFileVB`, {
    //         headers: this.sharedHeaders,
    //         params: params,
    //         responseType: 'blob'
    //     }).pipe(catchError(this.handleError));
    // }

    setListDataFile(data) {
        this.listDataFile.next(data);
    }

    getListDataFile() {
        return this.listDataFile.asObservable();
    }

    changeIDHSTT(id: string) {
        this.idHSTT.next(id)
    }

    changeMessage(msg: string) {
        this.messageSource.next(msg);
    }

    destroyMessage() {
        this.messageSource.next('');
    }

    destroyHoSoThamChieu() {
        this.dataHoSoThamChieuSubject.next(null)
    }

    changeDataMaterial(data: any) {
        this.dataMaterialSubject.next(data);
    }

    changeDataHoSoThamChieu(data) {
        this.dataHoSoThamChieuSubject.next(data)
    }
    changeDataHoSoThamChieuChecked(data) {
        this.dataHoSoThamChieuCheckedSubject.next(data)
    }

    changeFileMaterial(data: any) {
        this.dataFileMaterialSubject.next(data)
    }

    getLoaiHs() {
        return this._http.get(`${this.apiDefault}/LoaiHoSo?trangthai=1`).pipe(catchError(this.handleError));
    }

    getDsDonVi() {
        return this._http.get(`${this.apiDefault}/donvi`).pipe(catchError(this.handleError));
    }

    getListHoSo(params) {
        return this._http
            .post<any>(`${this.apiDefault}/HoSoTT/paging`, params)
            .pipe(catchError(this.handleError))
    }

    getDSNganHang(data?: any) {
        return this._http.get(`${this.apiDefault}/NgangHang`).pipe(catchError(this.handleError))
    }

    getDonViYeuCau(id: number) {
        return this._http.get(`${this.apiDefault}/donvi/getBoPhanByIdDv/${id}`).pipe(catchError(this.handleError))
    }

    getALLNganHang(item?: any) {
        let params = new HttpParams();
        if (item) {
            if (item.pageIndex) {
                params = params.append("pageIndex", item.pageIndex);
            }
            if (item.pageSize) {
                params = params.append("pageSize", item.pageSize);
            }
            if (item.TuKhoa) {
                params = params.append("searchString", item.TuKhoa.trim());
            }
        }
        return this._http.get(`${this.apiDefault}/NganHang/GetAll`, {
            headers: this.sharedHeaders,
            params
        }).pipe(catchError(this.handleError))
    }

    getDSTaiKhoanNganHang(data?: any) {
        return this._http.get(`${this.apiDefault}/taiKhoanNganHang/getAll`).pipe(catchError(this.handleError))
    }

    deleteNganHang(id: string) {
        return this._http.delete(`${this.apiDefault}/nganHang/delete?nganHangId=${id}`).pipe(catchError(this.handleError))
    }

    getChiNhanhNganHang(data?: any) {
        return this._http.get(`${this.apiDefault}/chiNhanhNganHang/getAll`).pipe(catchError(this.handleError))
    }

    deleteHoSo(id: string) {
        return this._http.delete(`${this.apiDefault}/HoSoTT/${id}`).pipe(catchError(this.handleError));
    }

    createDonVi(params: any): any {
        return this._http
            .post<any>(`${this.apiDefault}/HoSoTT`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    updateDonVi(params: any): any {
        return this._http
            .put<any>(`${this.apiDefault}/HoSoTT`, params, {
                headers: this.sharedHeaders,
            })
            .pipe(catchError(this.handleError));
    }

    getChitiet(id: string) {
        return this._http
            .get<any>(`${this.apiDefault}/HoSoTT/${id}`)
            .pipe(catchError(this.handleError))
    }

    createChitietgiaytoHSTT(data: any, IDHSTT): any {
        let formData = new FormData()
        formData.append('HoSoThanhToanId', IDHSTT)
        formData.append('TrangThaiGiayTo', '1')
        // formData.append('tenHoSoTT', data.tenHoSo)
        formData.append('GiayToId', data.id)
        if (data?.file?.length > 0) {
            data.file.map(item => {
                formData.append('listFile', item.data)
            })
        } else {
            formData.append('listFile', '')
        }
        return this._http.post<any>(`${this.apiDefault}/ChitietgiaytoHSTT`, formData)
            .pipe(catchError(this.handleError));
    }

    updateChitietgiaytoHSTT(item: any): any {
        let formData: any = new FormData();
        formData.append('ChiTietHoSoId', item.chiTietHoSoId)
        formData.append('NguoiCapNhatId', '1')
        formData.append('HoSoThanhToanId', item.idHoSoTT)
        formData.append('GiayToId', item.idGiayTo)

        if (item.file.length > 0) {
            item.file.map(file => {
                if (file.data.size) {
                    formData.append('listFile', file.data)
                    formData.append('urlFile', '')
                } else {
                    formData.append('urlFile', file.data.name)
                }

            })
        } else {
            formData.append('urlFile', '')
        }
        return this._http.put<any>(`${this.apiDefault}/ChitietgiaytoHSTT`, formData)
            .pipe(catchError(this.handleError));
    }

    deleteHoSTT(id): any {
        return this._http.delete(`${this.apiDefault}/ChitietgiaytoHSTT/${id}`)
            .pipe(catchError(this.handleError))
    }

    getDataChiTietGiayToHSTT({ idHSTT, PageSize, PageIndex }) {
        let params = ''
        params += `idHSTT=${idHSTT}`
        params += `&PageSize=${PageSize}`
        params += `&PageIndex=${PageIndex}`
        return this._http
            .get<any>(`${this.apiDefault}/ChitietgiaytoHSTT/paging?${params}`)
            .pipe(catchError(this.handleError))
    }

    updateStatusHSTT(param) {
        return this._http.put(`${this.apiDefault}/HoSoTT/chuyen-trang-thai`, param);
    }

    xacNhanHSTT(param) {
        return this._http.post(`${this.apiDefault}/TiepNhanHoSo/KyNhay`, param);
    }

    phanCong(param) {
        return this._http.post(`${this.apiDefault}/HoSoTT/PhanCongXuLy`, param);
    }

    getLichSuChiTietHoSo(idHoSo, giayToId) {

        return this._http
            .get<any>(`${this.apiDefault}/lich-chi-tiet-giay-to-su-ho-so-tt?hoSoId=${idHoSo}&giayToId=${giayToId}`)
            .pipe(catchError(this.handleError))
    }

    getNameByIDHoSo(id) {
        return this._http
            .get<any>(`${this.apiDefault}/giayto/getbyloaihoso?id=${id}`)
            .pipe(catchError(this.handleError))
    }

    createChungTu(param) {
        return this._http.post(`${this.apiDefault}/ChungTu/CreateChungTuDayErp`, param);
    }

    getHistoryPheDuyet(id: string) {
        return this._http.get(`${this.apiDefault}/HoSoTT/Pd-Ho-So-TT/${id}`);
    }

    kyVaTrinh(idHSTT: string, file: File, thaoTacBuocPheDuyetId: string, buocPheDuyetId: string) {
        let formData = new FormData()
        formData.append('HoSoId', idHSTT)
        formData.append('FileTaiLieu', file)
        formData.append("ThaoTacBuocPheDuyetId", thaoTacBuocPheDuyetId)
        formData.append("BuocPheDuyetId", buocPheDuyetId)

        return this._http.put(`${this.apiDefault}/HoSoTT/updateFileHoSoTT`, formData)
    }

    getHoSoThamChieu(payload) {
        return this._http.post(`${this.apiDefault}/HoSoTT/HoSoThamChieuPaging`, payload)
    }

    taoPhieuThamTra(payload) {
        return this._http.post(`${this.apiDefault}/ChitietgiaytoHSTT/PhieuThamTra`, payload)
    }

    kyPhieuThamTra(header: string) {
        return this._http.get(`${this.apiDefault}/PhieuThamTra?${header}`)
    }

    kyCap2PhieuThamTra(payload) {
        return this._http.post(`${this.apiDefault}/PhieuThamTra/Sign`, payload)
    }
}
