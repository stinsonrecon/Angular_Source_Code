import { PagingRequest } from '..';

export class ToTrinhCapVonPagingRequest extends PagingRequest {
    idDonVi: number;
    namKh: number;
    tuNgay: string;
    denNgay: string;
    tinhTrang: number;
    tuKhoa: string;
}

export class ToTrinhCapVonViewModel {
    idCapVon: string;
    idDonVi: number;
    namKh: number;
    soVbTrinh: string;
    ngayTrinh: string;
    fileTrinh: string;
    noiDung: string;
    tinhTrang: number;
    tenTinhTrang: string;
    soQdCap: string;
    ngayQdCap: string;
    fileQdCap: string;
}

export class ToTrinhCapVonCreateRequest {
    idDonVi: number;
    namKh: number;
    soVbTrinh: string;
    ngayTrinh: string;
    fileTrinh: string;
    noiDung: string;
    userId: string;
    dsIdThanhToan: string[];
}

export class ToTrinhCapVonUpdateRequest {
    idCapVon: string;
    idDonVi: number;
    namKh: number;
    soVbTrinh: string;
    ngayTrinh: string;
    fileTrinh: string;
    noiDung: string;
    userId: string;
    dsIdThanhToan: string[];
}

export class ThanhToanTrinhCapVonRequest {
    idThanhToan: string;
    idDonVi: number;
    namKh: number;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    truocThue: number;
    thueVnd: number;
    idHopDong: string;
    soHopDong: string;
    idDuAn: string;
    maDuAn: string;
    tenDuAn: string;
    action: number;
}

export class ToTrinhCapVonViewOneModel {
    message: string;
    resultObj: {
        idCapVon: string;
        idDonVi: number;
        namKh: number;
        soVbTrinh: string;
        ngayTrinh: string;
        fileTrinh: string;
        noiDung: string;
        dsThanhToan: ThanhToanTrinhCapVonRequest[];
    };
    statusCode: string;
}

export class CapVonPhatGiaTri {
    idCapVonGiaTri: string;
    idCapVon: string;
    idDuAn: string;
    tenDuAn: string;
    idThanhToan: string;
    idThanhToanGiaTri: string;
    noiDung: string;
    laVat: boolean;
    idNguonVon: number;
    idDongTien: number;
    tyGia: number;
    xayLap: number;
    thietBi: number;
    khac: number;
    giaTri: number;
    xayLapVnd: number;
    thietBiVnd: number;
    khacVnd: number;
    giaTriVnd: number;
    capIdNguonVon: number;
    capIdDongTien: number;
    capTyGia: number;
    capXayLap: number;
    capThietBi: number;
    capKhac: number;
    capGiaTri: number;
    capXayLapVnd: number;
    capThietBiVnd: number;
    capKhacVnd: number;
    capGiaTriVnd: number;
}

export class DuyetCapVonOneViewModel {
    idCapVon: string;
    idDonVi: number;
    namKh: number;
    soVbTrinh: string;
    ngayTrinh: string;
    fileTrinh: string;
    noiDung: string;
    soQdCap: string;
    ngayQdCap: string;
    fileQdCap: string;
    nguoiQdCap: string;
    ngayCap: string;
    ghiChuCap: string;
    soThongBao: string;
    ngayThongBao: string;
    fileThongBao: string;
    dsCapVonPhatGiaTri: CapVonPhatGiaTri[];
}

export class DuyetCapVonResponse {
    resultObj: DuyetCapVonOneViewModel;
}


export class DuyetCapVonToTrinhRequest {
    idCapVon: string;
    soQdCap: string;
    ngayQdCap: string;
    fileQdCap: string;
    nguoiQdCap: string;
    ngayCap: string;
    ghiChuCap: string;
    soThongBao: string;
    ngayThongBao: string;
    fileThongBao: string;
    userId: string;
    dsCapVonPhatGiaTri: CapVonPhatGiaTri[];
}


export class DuyetCapVonDonViRequest {
    idDonVi: number;
    namKh: number;
    idCapVon: string;
    soQdCap: string;
    ngayQdCap: string;
    fileQdCap: string;
    nguoiQdCap: string;
    ngayCap: string;
    ghiChuCap: string;
    soThongBao: string;
    ngayThongBao: string;
    fileThongBao: string;
    userId: string;
    dsCapVonPhatGiaTri: CapVonPhatGiaTri[];
}
