import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';

export class ThuTucDauTuViewModel {
    idThuTucDauTu: string;
    idDuAn: string;
    idDonVi: number;
    idLoaiThuTuc: number;

    soVanBan: string;
    ngayVanBan: Date
    fileDinhKem: string;

    noiDung: string;
    nguoiDuyet: string;
    coQuanDuyet: string;
    idCapPheDuyet?: number

    giaTri?: number;
}

export class ThuTucDauTuGetPagingRequest extends PagingRequest {
    idDonVi: number;
    idDuAn?: string;
    tuNgay?: string;
    denNgay?: string;
    idLoaiThuTuc: number;
    tuKhoa: string;
}

export class ThuTucDauTuCreateRequest {

    idDuAn: string;
    idDonVi: number;
    idLoaiThuTuc: number;
    soVanBan: string;
    ngayVanBan: Date;
    fileDinhKem: string;

    noiDung: string;
    nguoiDuyet: string;
    coQuanDuyet: string;
    idCapPheDuyet?: string;

    giaTri?: number;

    vonNganSach?: number;
    vonKhauHao?: number;
    vonVay?: number;
    vonKhac?: number;

    cpXayLap?: number;
    cpThietBi?: number;
    cpBtGpmb?: number;
    cpQlda?: number;
    cpTuVan?: number;
    cpKhac?: number;
    cpDuPhong?: number;
    cpThue?: number;

    lanHieuChinh: number;
    hieuLuc: boolean;

    userId: string;
}

export class ThuTucDauTuUpdateRequest {

    idThuTucDauTu: string;
    idLoaiThuTuc: number;
    soVanBan: string;
    ngayVanBan: Date;
    fileDinhKem: string;

    noiDung: string;
    nguoiDuyet: string;
    coQuanDuyet: string;
    idCapPheDuyet?: string;

    giaTri?: number;

    vonNganSach?: number;
    vonKhauHao?: number;
    vonVay?: number;
    vonKhac?: number;

    cpXayLap?: number;
    cpThietBi?: number;
    cpBtGpmb?: number;
    cpQlda?: number;
    cpTuVan?: number;
    cpKhac?: number;
    cpDuPhong?: number;
    cpThue?: number;

    lanHieuChinh: number;
    hieuLuc: boolean;

    userId: string;
}

export class ThuTucDauTuQuyetToanUpdateRequest {
    idDuAn	: string;
    idThuTucDauTu	: string;
    idDonVi	: number;
    nguonCongSuatLapMay	: number;
    
    nguonDienLuongTbNam	: number;
    
    nguonSoGioSd	: number;
    
    nguonDungTichHoToanBo	: number;
    
    nguonDungTichHoHuuIch	: number;
    
    nguonLuuLuongLuTk	: number;
    
    nguonLuuLuongTkQuaNm	: number;
    
    nguonCotNuocTinhToan	: number;
    
    nguonChieuCaoDap	: number;
    
    luoi500Xdm	: number;
    
    luoi500SoMach	: number;
    
    luoi500SoTba	: number;
    
    luoi500TdlTba	: number;
    
    luoi220Xdm	: number;
    
    luoi220SoMach	: number;
    
    luoi220SoTba	: number;
    
    luoi220TdlTba	: number;
    
    luoi110Xdm	: number;
    
    luoi110Ct	: number;
    
    luoi110SoTba	: number;
    
    luoi110TdlTba	: number;
    
    luoi110CapQuang	: number;
    
    luoi110SoMach	: number;
    
    luoiTaXdm	: number;
    
    luoiTaCt	: number;
    
    luoiTaCapNgam	: number;
    
    luoiHaXdm	: number;
    
    luoiHaCt	: number;
    
    luoiPpSoTba1Pha	: number;
    
    luoiPpTdlTba1Pha	: number;
    
    luoiPpSoTbaB400Xdm	: number;
    
    luoiPpTdlTbaB400Xdm	: number;
    
    luoiPpSoTbaL400Xdm	: number;
    
    luoiPpTdlTbaL400Xdm	: number;
    
    luoiPpSoTbaB400Ct	: number;
    
    luoiPpTdlTbaB400Ct	: number;
    
    luoiPpSoTbaL400Ct	: number;
    
    luoiPpTdlTbaL400Ct	: number;
    
    luoiPpSoTramTuBu	: number;
    
    luoiPpTdlTuBu	: number;
    
    luoiCongTo	: number;
    
    luoiCongToLm	: number;
    
    luoiCongToDd	: number;
    
    luoiRecloser	: number;
    
    luoiLbs	: number;
    
    soHo	: number;
    
    datTongDienTichSan	: number;
    
    datDienTichSuDung	: number;
    
    datVinhVien	: number;
    
    datCongCong	: number;
    
    datTamThoi	: number;
    
    datLua	: number;
    
    datRung	: number;
    
    datKhac	: number;
    
    khacQuyMoKhac	:string;
    

}


