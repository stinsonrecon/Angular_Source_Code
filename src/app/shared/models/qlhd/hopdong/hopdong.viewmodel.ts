import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';

export class HopDongViewModel {
    idHopDong: string;
    idDonVi?: number;
    soHopDong: string;
    ngayKy?: Date;

    idDuAn?:string
    tenDuAn: string;

    idGoiThau?: string;
    tenGoiThau?: string;

    idLoThau?: string;
    tenLoThau?: string;

    idLoaiHopDong?: number;
    tenLoaiHopDong?: string;
    tenNhaThau?: string;

    giaTriVnd?: number;
}

export class HopDongGetPagingRequest extends PagingRequest{
    idDonVi: number;
    idPhanLoai: number;
    idLoaiHopDong: number;
    tuNgay: string;
    denNgay: string;
    idDuAn: string;
    tuKhoa: string;
}

export class HopDongCreateRequest{
    idDonVi: number;
    idDuAn: string;
    idGoiThau: string;
    idLoThau?: string;

    soHopDong: string;
    tenHopDong: string;
    idNhaThau: string;
    idHinhThucHopDong: number;
    idLoaiHopDong: number;
    idPhanLoaiDanhGia: number;
    ngayKy: Date;
    ngayHieuLuc: Date;
    thoiGianThuchien: string;
    ngayKhoiCong: string;
    ngayKetThuc: Date;
    nguonVon: string;
    fileDinhKem: string;
    giaTriVnd: string;
    thueVnd: number;

    bltuGiaTri: number;
    bltuThoiHan: Date;
    bltuGhiChu: string;

    bdthhdGiaTri: number;
    bdthhdThoiHan: Date;
    bdthhdGhiChu: string;

    baoHanhGiaTri: Date;
    baoHanhThoiHan: Date;
    baoHanhGhiChu: string;

    soQdGiaoNv: string;
    ngayQdGiaoNv: Date;

    soBbNghiemThuHd: string;
    ngayBbNghiemThuHd: Date;
    giaTriNghiemThuHd: number;
    fileNghiemThuHd: string;

    idGoiThauTapTrung: string;
    idLoaiCongViec: number;
    idPhanLoai: number;

    userId: string;

    dsHopDongGiaTri: [];
}

export class HopDongUpdateRequest{
    idDonVi: number;
    idDuAn: string;
    idGoiThau: string;
    idLoThau: string;

    soHopDong: string;
    tenHopDong: string;
    idNhaThau: string;
    idHinhThucHopDong: number;
    idLoaiHopDong: number;
    idPhanLoaiDanhGia: number;
    ngayKy: Date;
    ngayHieuLuc: Date;
    thoiGianThuchien: string;
    ngayKhoiCong: string;
    ngayKetThuc: Date;
    nguonVon: string;
    fileDinhKem: string;
    giaTriVnd: string;
    thueVnd: number;

    bltuGiaTri: number;
    bltuThoiHan: Date;
    bltuGhiChu: string;

    bdthhdGiaTri: number;
    bdthhdThoiHan: Date;
    bdthhdGhiChu: string;

    baoHanhGiaTri: Date;
    baoHanhThoiHan: Date;
    baoHanhGhiChu: string;

    soQdGiaoNv: string;
    ngayQdGiaoNv: Date;

    soBbNghiemThuHd: string;
    ngayBbNghiemThuHd: Date;
    giaTriNghiemThuHd: number;
    fileNghiemThuHd: string;

    idGoiThauTapTrung: string;
    idLoaiCongViec: number;
    idPhanLoai: number;

    userId: string;

    dsHopDongGiaTri: [];
}

export class PhuLucBoSungGetPagingRequest extends PagingRequest {
    idHopDong: string;
    tuKhoa: string;
}

export class PhuLucBoSungViewModel {
    idPhuLucBoSung: string;
    soPhuLuc: string;
    tenPhuLuc: string;
    ngayKy: string;
    noiDung: string;
    thoiGianThucHienHc: string;
    giaTriVnd: number;
    fileDinhKem: string;
}

export class PhuLucBoSungCreateRequest{
    idHopDong: string;
    idDuAn: string;
    idDonVi: number;
    soPhuLuc: string;
    tenPhuLuc: string;
    ngayKy: Date ;
    noiDung: string;
    thoiGianThucHienHc: number;
    giaTri: number;
    idDongTien: number;
    tyGia: number;
    giaTriVnd: number;
    fileDinhKem: string;
    userId: string;
    dsHopDongPhuLucBoSungGiaTri: [];
}

export class PhuLucBoSungUpdateRequest{

}

export class PhatHopDongPagingRequest extends PagingRequest {
    idHopDong: string;
    tuKhoa: string;
}

export class PhatHopDongViewModel {
    idPhatHopDong: string;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    giaTriVnd: number;
    fileDinhKem: string;
}

export class PhatHopDongCreateRequest{
    idHopDong: string;
    idDuAn: string;
    idDonVi: number;
    soVanBan: string;
    ngayVanBan: Date;
    noiDung: string;
    giaTri: number;
    idDongTien: number;
    tyGia: number;
    giaTriVnd: number;
    fileDinhKem: string;
    userId: string;
    dsHopDongPhatHopDongGiaTri: [];
}

export class PhatHopDongUpdateRequest{

}

export class CvKhacViewModel {
    idHopDong: string;
    idDonVi?: number;
    soHopDong: string;
    ngayKy?: Date;

    idDuAn?:string
    tenDuAn: string;

    idGoiThau?: string;
    tenGoiThau?: string;

    idLoThau?: string;
    tenLoThau?: string;

    idLoaiHopDong?: number;
    tenLoaiHopDong?: string;
    idLoaiCongViec?: number;
    tenLoaiCongViec?: string;
    tenNhaThau?: string;

    giaTriVnd?: number;
}
export class CongViecKhacGetPagingRequest extends PagingRequest{
    idDonVi: number;
    idPhanLoai: number;
    idLoaiCongViec: number;
    tuNgay: string;
    denNgay: string;
    idDuAn: string;
    tuKhoa: string;
}

export interface DsCvKhacGiaTri {
    id: string;
    giaTri: number;
    idDongTien: number;
    tyGia: number;
    giaTriVnd: number;
    thueVnd: number;
}

export interface CvKhacCreateRequest {
    idDonVi?: number;
    idDuAn: string;
    idGoiThau: string;
    idLoThau: string;
    soHopDong: string;
    tenHopDong: string;
    idNhaThau: string;
    idHinhThucHopDong: number;
    idLoaiHopDong: number;
    idPhanLoaiDanhGia: number;
    ngayKy: Date;
    ngayHieuLuc: Date;
    thoiGianThuchien: string;
    ngayKhoiCong: Date;
    ngayKetThuc: Date;
    nguonVon: string;
    fileDinhKem: string;
    giaTriVnd: number;
    thueVnd: number;
    soQdGiaoNv: string;
    ngayQdGiaoNv: Date;
    idGoiThauTapTrung: string;
    idLoaiCongViec: number;
    idPhanLoai: number;
    userId?: string;
    dsCvKhacGiaTri: DsCvKhacGiaTri[];
}

export interface CvKhacUpdateRequest {
    idDuAn: string;
    idGoiThau: string;
    idLoThau: string;
    soHopDong: string;
    tenHopDong: string;
    idNhaThau: string;
    idHinhThucHopDong: number;
    idLoaiHopDong: number;
    idPhanLoaiDanhGia: number;
    ngayKy: Date;
    ngayHieuLuc: Date;
    thoiGianThuchien: string;
    ngayKhoiCong: Date;
    ngayKetThuc: Date;
    nguonVon: string;
    fileDinhKem: string;
    giaTriVnd: number;
    thueVnd: number;
    soQdGiaoNv: string;
    ngayQdGiaoNv: Date;
    idGoiThauTapTrung: string;
    idLoaiCongViec: number;
    idPhanLoai: number;
    userId: string;
    dsCvKhacGiaTri: DsCvKhacGiaTri[];
}



