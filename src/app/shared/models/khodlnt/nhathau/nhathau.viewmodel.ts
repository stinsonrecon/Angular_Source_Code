import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';

export class NhaThauViewModel {
    idNhaThau: string;
    // userName: string;
    // firstName: string;
    // lastName: string;
    // email: string;
    // phoneNumber: string;
}

export class NhaThauPagingRequest extends PagingRequest {
    idDonVi: number;
    idPhongBan?: number;
    idChucVu?: number;
    tuKhoa: string;
    donViSuDung: boolean;
    nhaThauLienDanh: boolean;
    nhaThauNuocNgoai: boolean;
    loaiNhaThau: number;
}

export class NhaThauCreateRequest {
    tenNhaThau: string;
    tenTiengAnh: string;
    tenTat: string;
    diaChi: string;
    dienThoai: string;
    fax: string;
    webSite: string;
    vanPhongDaiDien: string;
    soDkkd: string;
    ngayDkkd: string;
    maSoThue: string;
    maSoDoanhNghiep: string;
    idQuocGia: number;
    idTinhThanh: number;
    nangLucKinhNghiem: string;
    soNhanVien: number;
    vonDieuLe: number;
    idDongTien: number;
    linhVucKinhDoanh: string;
    idLoaiDoanhNghiep: number;
    nhaThauNuocNgoai: boolean;
    idTinhTrang: number;
}

export class NhaThauUpdateRequest {
    idNhaThau: string;
    tenNhaThau: string;
    tenTiengAnh: string;
    tenTat: string;
    diaChi: string;
    dienThoai: string;
    fax: string;
    webSite: string;
    vanPhongDaiDien: string;
    maSoThue: string;
    maSoDoanhNghiep: string;
    idQuocGia: number;
    idTinhThanh: number;
    nangLucKinhNghiem: string;
    soNhanVien: number;
    vonDieuLe: number;
    idDongTien: number;
    linhVucKinhDoanh: string;
    idLoaiDoanhNghiep: number;
    idTinhTrang: number;
}

export class NhaThauUpdateDonViSuDungRequest {
    idDonVi: number;
    isSelect: boolean;
}

export class NhaThauUpdateThongTinPhapLyRequest {
    tenNhaThau: string;
    maSoDoanhNghiep: string;
    maSoThue: string;
    soDkkd: string;
    ngayDkkd: Date;
}


export class HoSoNhaThauViewModel {
    id: string;
    idNhaThau: string;
    ngayHoSo?: Date;
    noiDung: string;
    fileDinhKem: string;
    idLoaiHoSo: number;
    tenLoaiHoSo: string;
    ngayTao: string;
}

export class HoSoNhaThauCreateRequest {
    idNhaThau: string;
    ngayHoSo?: Date;
    noiDung: string;
    fileDinhKem: string;
    idLoaiHoSo: number;
}

export class NhaThauCreateLienDanhRequest {
    tenNhaThau: string;
    nhaThauNuocNgoai: boolean;
    idTinhTrang: number;
    userId: string;
    dsIdNhaThau: string[];
}

export class NhaThauUpdateLienDanhRequest {
    idNhaThau: string;
    tenNhaThau: string;
    nhaThauNuocNgoai: boolean;
    idTinhTrang: number;
    userId: string;
    dsIdNhaThau: DsNhaThauLienDanh[];
}

export class DsNhaThauLienDanh {
    idNhaThau: string;
  }
