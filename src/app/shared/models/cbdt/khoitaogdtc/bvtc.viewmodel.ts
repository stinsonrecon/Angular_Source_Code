export class BvtcImportRequest {
    idDonVi: number;
    idDuAn: string;
    idLoaiHstk: number;
    idTram: string;
    action: number;
    dsHstkChung: HstkChung[];
}

export class HstkChung {
    idHstk: string;
    thuTu: number;
    stt: number;
    tenBv: string;
    maBv: string;
    soLuong: string;
}

export class BvtcDeleteRequest {
    idDonVi: number;
    idDuAn: string;
    idTram: string;
    idLoaiHstk: number;
    isLock: boolean
}

export class BvtcCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idTram: string;
    idLoaiHstk: number;
    stt: string;
    tenBv: string;
    maBv: string;
    soLuong: string;
    idHstkTruoc: string
}

export class BvtcUpdateRequest {
    idHstk: number;
    stt: string;
    tenBv: string;
    maBv: string;
    soLuong: string;
}