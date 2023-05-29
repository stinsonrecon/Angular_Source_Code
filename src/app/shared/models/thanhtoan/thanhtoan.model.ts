import { PagingRequest } from "..";

export class ThanhToanPagingRequest extends PagingRequest {
    idDonVi: number;
    namKH: number;
    tuNgay: string;
    denNgay: string;
    idHinhThuc: number;
    daGiaiNgan: number;
    idDuAn: string;
    idLoaiCongViec: number;
    idHopDong: string;
    tuKhoa: string;
}

export class ThanhToanViewModel {
    idThanhToan: string
    donViId: number;
    namKh: number;
    idDuAn: string;
    idHopDong: string;
    giaTriHopDong: number;
    soHopDong: string;
    idPhieuGia: string;
    giaTriPhieuGia: number;
    soPhieuGia: string;
    giaTriGiaiNgan: string;
    idLoaiTt: number;
    idHinhThuc: number;
    soVanBan: string;
    ngayVanBan: string;
    idNhaThau: string;
    tenNhaThau: null;
    noiDung: string;
    fileDinhKem: string;
    truocThueVnd: number;
    thueVnd: number;
    daGiaiNgan: boolean;
    loaiForm: number;
    ngayTao: string;
    nguoiTao: string;
    ngaySuaCuoi: string;
    nguoiSuaCuoi: string;
    dsThanhToanGiaTri: any;
}


export class ThanhToanGiaTri {
    idThanhToan: string;
    dienGiai: string;
    laVat: boolean;
    idNguonVon: number;
    idDongTien: number;
    tyGia: number;
    xayLap: number;
    thietBi: number;
    khac: number;
    giaTri: number;
    idLoaiVat: number;
    phanTramVat: number;
}

export class ThanhToanCreateRequest {
    idThanhToan: string;
    idDonVi: number;
    namKh: number;
    idDuAn: string;
    idHopDong: string;
    idPhieuGia: string;
    idLoaiTt: number;
    idHinhThuc: number;
    soVanBan: string;
    ngayVanBan: string;
    idNhaThau: string;
    noiDung: string;
    fileDinhKem: string;
    truocThueVnd: number;
    thueVnd: number;
    daGiaiNgan: boolean;
    loaiForm: number;
    userId: string;
    dsThanhToanGiaTri?: ThanhToanGiaTri[];
}

export class ThanhToanUpdateRequest {
    idThanhToan: string;
    idDonVi: number;
    namKh: number;
    idDuAn: string;
    idHopDong: string;
    idNhaThau: string;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    truocThueVnd: number;
    thueVnd: number;
    daGiaiNgan: boolean;
    userId: string;
    dsThanhToanGiaTri?: ThanhToanGiaTri[];
}

