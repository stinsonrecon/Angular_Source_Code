import { PagingRequest } from "@app/shared/models/common/pagers/paging.request";

export class SoTuyenHsstViewModel {
    idGoiThau: string;
    ngayTrinhHsst: string;
    soVbTrinhHsst?: string;
    fileTrinhHsst: string;
    ngayThamDinhHsst: string;
    soVbThamDinhHsst?: string;
    fileThamDinhHsst: string;
    ngayDuyetHsst: string;
    soVbDuyetHsst: string;
    fileDuyetHsst: string;
    dsNhaThau: DsNhaThau[];
}

export interface UpdateSoTuyenHsst {
    idGoiThau: string;
    ngayTrinhHsst: Date;
    soVbTrinhHsst: string;
    fileTrinhHsst: string;
    ngayThamDinhHsst: Date;
    soVbThamDinhHsst: string;
    fileThamDinhHsst: string;
    ngayDuyetHsst: Date;
    soVbDuyetHsst: string;
    fileDuyetHsst: string;
    userId: string;
    dsNhaThauHsst: DsNhaThau[];
}

export interface UpdateSoTuyenTbst {
    idGoiThau: string;
    thoiGianPhatHanhTu: Date;
    thoiGianPhatHanhDen: Date;
    diaDiemPhatHanh: string;
    giaBan: number;
    diaDiemNhan: string;
    damBaoDuThau: number;
    hinhThucBaoDam: string;
    dongThau: Date;
    moThau: Date;
    fileDinhKem: string;
    userId: string;
}

export interface UpdateSoTuyenKqst {
    idGoiThau: string;
    ngayMoSoTuyen?: Date;
    ngayTrinhKqst: Date;
    soVbTrinhKqst: string;
    fileTrinhKqst: string;
    ngayThamDinhKqst: Date;
    soVbThamDinhKqst: string;
    fileThamDinhKqst: string;
    ngayDuyetKqst: Date;
    soVbDuyetKqst: string;
    fileDuyetKqst: string;
    userId: string;
    dsNhaThauKqst: DsNhaThau[];
}


export interface UpdateLcnthsmt {
    idGoiThau: string;
    ngayTrinhHsmtLan1: Date;
    soVbTrinhHsmtLan1: string;
    fileTrinhHsmtLan1: string;
    ngayThamDinhHsmtLan1: Date;
    soVbThamDinhHsmtLan1: string;
    fileThamDinhHsmtLan1: string;
    ngayDuyetHsmtLan1: Date;
    soVbDuyetHsmtLan1: string;
    fileDuyetHsmtLan1: string;
    ngayTrinhHsmt: Date;
    soVbTrinhHsmt: string;
    fileTrinhHsmt: string;
    ngayThamDinhHsmt: Date;
    soVbThamDinhHsmt: string;
    fileThamDinhHsmt: string;
    ngayDuyetHsmt: Date;
    soVbDuyetHsmt: string;
    fileDuyetHsmt: string;
    ngayTrinhDuToan: Date;
    soVbTrinhDuToan: string;
    fileTrinhDuToan: string;
    ngayDuyetDuToan: Date;
    soVbDuyetDuToan: string;
    fileDuyetDuToan: string;
    giaDuToan: number;
    ngayKhBatDauKyHopDong: Date;
    ngayKhKetThucKyHopDong: Date;
    userId: string;
    dsNhaThauHsmt: DsNhaThau[];
}

export interface UpdateLcnttbmt {
    idGoiThau: string;
    thoiGianPhatHanhTu: Date;
    thoiGianPhatHanhDen: Date;
    diaDiemPhatHanh: string;
    giaBan: number;
    diaDiemNhan: string;
    dongThau: Date;
    moThau: Date;
    damBaoDuThau: number;
    hinhThucBaoDam: string;
    fileDinhKem: string;
    userId: string;
}


export interface DsGiaTrungThau {
    giaTrungThau: number;
    idDongTien: number;
    tyGia: number;
}

export interface DsNhaThauKqdt {
    idTrungThau?: string;
    idGoiThau?: string;
    idLoThau?: string;
    idNhaThau?: string;
    tenNhaThau?: string;
    maSoThue?: string;
    diaChi?: string;
    thoiGianThucHien?: string;
    dsGiaTrungThau?: DsGiaTrungThau[];
}

export interface UpdateLcntkqdt {
    idGoiThau: string;
    ngayMoThau: Date;
    ngayTrinhNtDukt: Date;
    soVbTrinhNtDukt: string;
    fileTrinhNtDukt: string;
    ngayThamDinhNtDukt: Date;
    soVbThamDinhNtDukt: string;
    fileThamDinhNtDukt: string;
    ngayDuyetNtDukt: Date;
    soVbDuyetNtDukt: string;
    fileDuyetNtDukt: string;
    dsNhaThauDukt: DsNhaThau[];
    ngayMoDanhGiaTaiChinh: Date;
    ngayTrinhXhnt: Date;
    soVbTrinhXhnt: string;
    fileTrinhXhnt: string;
    ngayDuyetXhnt: Date;
    soVbDuyetXhnt: string;
    fileDuyetXhnt: string;
    ngayTrinhKqlcnt: Date;
    soVbTrinhKqlcnt: string;
    fileTrinhKqlcnt: string;
    ngayThamDinhKqlcnt: Date;
    soVbThamDinhKqlcnt: string;
    fileThamDinhKqlcnt: string;
    ngayDuyetKqlcnt: Date;
    soVbDuyetKqlcnt: string;
    fileDuyetKqlcnt: string;
    ngayBienBanTthd: Date;
    soBienBanTthd: string;
    ngayTrinhPdhd: Date;
    soVbTrinhPdhd: string;
    ngayPdhd: Date;
    soVbPdhd: string;
    lyDoChamKyHopDong: string;
    userId: string;
    dsNhaThauKqdt: DsNhaThauKqdt[];
}

export interface DsNhaThau {
    idDuThau: string;
    idGoiThau: string;
    idNhaThau: string;
    tenNhaThau: string;
    maSoThue: string;
    diaChi: string;
    duocChon: boolean;
}