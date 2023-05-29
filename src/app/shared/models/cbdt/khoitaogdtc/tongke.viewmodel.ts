export class TongKeImportRequest {
    idDonVi: number;
    idDuAn: string;
    idHopDong: string;
    idLoaiDuongDay: number;
    action: number;
    dsCot: DsCot[];
}

export class DsCot {
    idCot: string;
    idPhuongXa: number;
    idKhoangNeo: string;
    idDoanTuyen: string;
    thuTu: number;
    kyHieu: string;
    congDung: string;
    gocLai: string;
    loaiCot: string;
    loaiMong: string;
    tiepDia: string;
    chuoiSu: string;
    dauCapNgam: string;
    kinhDo: number;
    viDo: number;
    cotNeo: boolean;
    dienTichDat: number;
    soHo: number;
    cotHienCo: boolean;
    ngayKc: string;
    ngayHt: string;
    ketThuc: boolean;
    suDung: boolean;
    kneoKhoangNeo: number;
    kcotIdKhoangCot: string;
    kcotKhoangCot: number;
    kcotDienTichDat: number;
    kcotSoHo: number;
    tenPhuongXa: string;
    thuTuDoanTuyen: number;
    tenDoanTuyen: string
}

export class TongKeRemoveRequest {
    idDonVi: number;
    idDuAn: string;
    idHopDong: string;
    idLoaiDuongDay: number;
}