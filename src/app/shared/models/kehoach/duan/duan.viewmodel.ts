import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
export class DuAnModel {
    idDuAn: string;
    idDonVi: number;
    tenDuAn: string;
    maDuAn: string;
    tenDonVi: string;
    idChuDauTu: number;
    tenChuDauTu: string;
    idDonViVanHanh: string;
    donViVanHanh: string;
    donViQuanLyDuAn: string;
    idLoaiHinh: number;
    tenLoaiHinhDa: string;
    idCapDuAn: number;
    capDuAn: string;
    idLoaiDuAn: number;
    loaiDuAn: string;
    idNhomDuAn: number;
    nhomDuAn: string;
    tinhTrangHienTai: string;
    ngayTao: string;
    ngaySuaCuoi: string;
    nguoiTao: string;
    nguoiSuaCuoi: string;
    thutuNam: number;
    maDuAnCu: string;
    idVungDuAn: number;
    idBuocThietKe: number;
    idHinhThucQLDA: number;
    idLoaiTrongDiem: number;
    nhienLieu: number;
    tinhChat: number;
    ngamHoa: number;
    chongQuaTai: number;
    idCapPheDuyet: number;
    diaDiemXayDung: string;
    idTinhThanh: number;
    chieuDai: string;
    congSuat: string;
    quyMoKhac: string;
    nangLucThietKe: string;
    thongSoKyThuat: string;
    namKhoiTao: number;
    soVbGiaoNv: string;
    ngayGiaoNV: string;
    giaTriGiaoNV: number;
    idGiaiDoan: number;
    idTinhTrang: number;
    traNoTraLai: number;
    dauTuNgoaiNganh: number;
    laDuAnGop: number;
    idNguonVon: number;
    nguonVonSungDung: string;
    mucTieuDuAn: string;
    btGPMB: string;
    suDunGDat: string;
    phuongAnXayDung: string;
}

export interface DuAnSelectedModel {
    idDuAn: string;
    maDuAn: string;
    tenDuAn: string;
    tenDonVi: string;
}

export class DuAnPagingRequest extends PagingRequest {
    idDonVi: number;
    tuKhoa: string;
    theoNam: number;
    namKh: number;
    idChuDauTu: number;
    idLoaiTrongDiem: number;

    idTinhTrangDa: number;
    idNguonVon: number;
    chongQuaTai: boolean;
    idTinhThanh: number;
    idLoaiHinh: number;
    idNhomDuAn: number;

}

export class BuocThietKeModel {
    idBuocThietKe: number;
    tenBuocThietKe: string;
}

export class CapDuAnModel {
    idCapDuAn: number;
    tenCapDuAn: string;
}

export class LoaiHinhModel {
    idLoaiHinh: number;
    tenLoaiHinh: string;
    nhomLoaiHinh: number;
    thuTu: number;
}

export class LoaiDuAnModel {
    idLoaiDuAn: number;
    tenLoadiDuAn: string;
    idLoaiHinh: 1;
}

export class NhomDuAnModel {
    idNhomDuAn: number;
    tenNhomDuAn: string;
    soNgayQuyetToan: number;
    thuTu: number;
}

export class DuAnCreateRequest {
    tenDuAn: string;
    idChuDauTu: number;
    idDonVi: number;
    idLoaiHinh: number;
    idLoaiDuAn: number;
    idCapDuAn: number;
    idNhomDuAn: number;
    tinhChat: string;
    nhienLieu: number;
    idTinhTrang: number;
    idNguonVon: number;
    idCapPheDuyet: number;
    namKhoiTao: number;
    diaDiemXayDung: string;
    chieuDai: string;
    congSuat: string;
    quyMoKhac: string;
    idLoaiHinhDk: number;
    idTinhTrangKh: number;
    idDonViLamViec: number;
    namKh: number;
    idDuAnGop: string;
    idBuocThietKe: number;
    userId: string;
}

export class DuAnUpdateRequest {
    idDuAn: string;
    tenDuAn: string;
    idChuDauTu: number;
    idLoaiHinh: number;
    idLoaiDuAn: number;
    idNhomDuAn: number;
    tinhChat: string;
    nhienLieu: number;
    idTinhTrang: number;
    idNguonVon: number;
    idCapPheDuyet: number;
    idCapDuAn: number;
    namKhoiTao: number;
    idBuocThietKe: number;
    diaDiemXayDung: string;
    chieuDai: string;
    congSuat: string;
    quyMoKhac: string;
    idLoaiHinhDk: number;
    idTinhTrangKh: number;
    idDonViLamViec: number;
    namKh: number;
    idDuAnGop: string;
    userId: string;
}
export class TienDoUpdateRequest {
    idDuAn: string;
    idDonVi: number;
    idTinhTrang: number;
    kcSoVb: string;
    kcNgayVb: string;
    kcFileDinhKem: string;
    htSoVb: string;
    htNgayVb: string;
    htFileDinhKem: string;
    ntSoVb: string;
    ntNgayVb: string;
    ntFileDinhKem: string;
}
export class QuyetToanUpdateRequest {
    idDuAn: string;
    idDonVi: number;
    idTinhTrang: number;
    qtSoVbBc: string;
    qtNgayBc: string;
    qtFileDinhKemBc: string;
    qtSoVbHtkt: string;
    qtNgayHtkt: string;
    qtFileDinhKemHtkt: string;
    qtSoVbTrPd: string;
    qtNgayTrPd: string;
    qtFileDinhKemTrPd: string;
    qtXayLapBc: number;
    qtThietBiBc: number;
    qtBtGpmbBc: number;
    qtQldaBc: number;
    qtTuVanBc: number;
    qtKhacBc: number;
    qtThueBc: number;
    qtTongGiaTriBc: number;
    qtSoVbTtqt: string;
    qtNgayTtqt: string;
    qtFileDinhKemTtqt: string;
    qtSoQd: string;
    qtNgayQd: string;
    qtFileDinhKem: string;
    qtXayLap: number;
    qtThietBi: number;
    qtBtGpmb: number;
    qtQlda: number;
    qtTuVan: number;
    qtKhac: number;
    qtThue: number;
    qtTongGiaTri: number;
}
export class DuAnUpdateBoSungRequest {
    tenDuAn: string;
    idDonViVanHanh: number;
    idCapDuAn: number;
    idNhomDuAn: number;
    idVungDuAn: number;
    idBuocThietKe: number;
    idHinhThucQlda: number;
    idLoaiTrongDiem: number;
    nhienLieu: number;
    ngamHoa: boolean;
    chongQuaTai: boolean;
    idCapPheDuyet: number;
    diaDiemXayDung: string;
    idTinhThanh: number;
    chieuDai: string;
    congSuat: string;
    quyMoKhac: string;
    nangLucThietKe: string;
    thongSoKyThuat: string;
    namKhoiTao: number;
    idTinhTrang: number;
    nguonVonSuDung: string;
    mucTieuDuAn: string;
    btGpmb: string;
    suDungDat: string;
    phuongAnXayDung: string;
}

export class DuAnUpdateBoSungGNVRequest {
    idDuAn: string;
    idDonVi: number;
    giaoNvSoVb: string;
    giaoNvNgayVb: string;
    giaoNvFileDinhKem: string;
    giaoNvGiaTri: number;
}
export class QuyMoQuyetToanUpdateRequest {
    idDuAn: string;
    idDonVi: number;
    nguonCongSuatLapMay: number;

    nguonDienLuongTbNam: number;

    nguonSoGioSd: number;

    nguonDungTichHoToanBo: number;

    nguonDungTichHoHuuIch: number;

    nguonLuuLuongLuTk: number;

    nguonLuuLuongTkQuaNm: number;

    nguonCotNuocTinhToan: number;

    nguonChieuCaoDap: number;

    luoi500Xdm: number;

    luoi500SoMach: number;

    luoi500SoTba: number;

    luoi500TdlTba: number;

    luoi220Xdm: number;

    luoi220SoMach: number;

    luoi220SoTba: number;

    luoi220TdlTba: number;

    luoi110Xdm: number;

    luoi110Ct: number;

    luoi110SoTba: number;

    luoi110TdlTba: number;

    luoi110CapQuang: number;

    luoi110SoMach: number;

    luoiTaXdm: number;

    luoiTaCt: number;

    luoiTaCapNgam: number;

    luoiHaXdm: number;

    luoiHaCt: number;

    luoiPpSoTba1Pha: number;

    luoiPpTdlTba1Pha: number;

    luoiPpSoTbaB400Xdm: number;

    luoiPpTdlTbaB400Xdm: number;

    luoiPpSoTbaL400Xdm: number;

    luoiPpTdlTbaL400Xdm: number;

    luoiPpSoTbaB400Ct: number;

    luoiPpTdlTbaB400Ct: number;

    luoiPpSoTbaL400Ct: number;

    luoiPpTdlTbaL400Ct: number;

    luoiPpSoTramTuBu: number;

    luoiPpTdlTuBu: number;

    luoiCongTo: number;

    luoiCongToLm: number;

    luoiCongToDd: number;

    luoiRecloser: number;

    luoiLbs: number;

    soHo: number;

    datTongDienTichSan: number;

    datDienTichSuDung: number;

    datVinhVien: number;

    datCongCong: number;

    datTamThoi: number;

    datLua: number;

    datRung: number;

    datKhac: number;

    khacQuyMoKhac: string;


}
