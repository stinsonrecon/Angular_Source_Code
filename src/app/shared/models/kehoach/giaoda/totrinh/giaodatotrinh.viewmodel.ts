import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
export class GiaoDaToTrinhPagingRequest extends PagingRequest {
    idDonVi: number;
    nam: number;
    tuKhoa: string;
    tuNgay: string;
    denNgay: string;
    tinhTrang: number;
}

export class GiaoDaToTrinhViewModel {
    idToTrinh: string;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    tinhTrang: number;
    tenTinhTrang: string;
}

export class GiaoDaDuAnToTrinh {
    idDuAn: string;
    idDonVi: number;
    tenDuAn: string;
    idChuDauTu: number;
    idLoaiHinh: number;
    idLoaiDuAn: number;
    idNhomDuAn: number;
    tinhChat: string;
    nhienLieu: number;
    diaDiemXayDung: string;
    chieuDai: string;
    congSuat: string;
    quyMoKhac: string;
    idNguonVon: number;
    nguonVonSuDung: string;
    idTinhThanh: number;
    giaTriGiaoNv: number;
    ngayKhoiCong: string;
    tienDoThucHien: string;
    action: number
}

export class GiaoDaToTrinhCreateRequest {
    idDonVi: number;
    nam: number;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    ngayTao: string;
    dsDuAn: GiaoDaDuAnToTrinh[];
}

export class GiaoDaToTrinhUpdateRequest {
    idToTrinh: string;
    idDonVi: number;
    nam: number;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    ngaySuaCuoi: string;
    dsDuAn: GiaoDaDuAnToTrinh[];
}

export class DmDaTrinhPagingRequest extends PagingRequest {
    idDonVi: number;
    nam: number;
    tuKhoa: string;
    tuNgay: string;
    denNgay: string;
    idNhomDuAn: number;
    idLoaiHinh: number;
    p: number;
}

export class GiaoDaDuAnTrinhViewModel {
    
}
