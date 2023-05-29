import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';

export class GoiThauViewModel {
    idGoiThau?: string;
    idDonVi?: number;
    idDuAn?: string;
    idKeHoachLcnt?: string;
    soKyHieu?: string;
    tenGoiThau?: string;

    dauThauQuocTe?: boolean;
    dauThauQuaMang?: boolean;
    tuVanLapDuAn?: boolean;
    tinhChiDinhThau?: boolean;
    khongPhaiDauThauQuaMang?: boolean;
    giaGoiThau?: number;
    nguonVonSuDung?: number;

    tenHinhThucLuaChonNhaThau?: string;
    tenPhuongThucDauThau?: string;
    tenHinhThucHopDong?: string;
    tenLoaiGoiThau?: string;
    dsLoThau?: [];
}

export class GoiThauGetPagingRequest extends PagingRequest {
    idDonVi: number;
    idDuAn: string;
    tuNgay: string ;
    denNgay: string ;
    idPhuongThucDauThau?: string;
    idHinhThucLuaChonNhaThau?: string;
    idTinhTrangGoiThau?: string;
    dauThauQuaMang?: boolean;
    tuKhoa: string;
}

export class GoiThauCreateRequest {
    idDonVi?: number;
    idDuAn?: string;
    idKeHoachLcnt: string;
    soKyHieu: string;
    tenGoiThau: string;
    idHinhThucLuaChonNhaThau?: number;
    idPhuongThucDauThau?: number;
    idHinhThucHopDong?: number;
    idLoaiGoiThau?: number;
    dauThauQuocTe?: boolean;
    dauThauQuaMang?: boolean;
    tuVanLapDuAn?: boolean;
    tinhChiDinhThau?: boolean;
    khongPhaiDauThauQuaMang?: boolean;
    giaGoiThau?: number;
    nguonVonSuDung?: number;

    thoiGianBatDauLcnt?: Date;
    thoiGianKetThucLcnt?: Date;
    thoiGianThucHienHopDong?: string;

    phaiSoTuyen?: boolean;
    idTinhTrangGoiThau?: number;
    phanChiaLo?: boolean;
    idGoiThauTapTrung?: string;
    dauThauGop?: boolean;
    idPhanLoai?: number;
    action: number;
    userId?: string;
    dsLoThau: [];
}

export class GoiThauUpdateRequest {
    idGoiThau: string;

    idKeHoachLcnt: string;
    soKyHieu: string;
    tenGoiThau: string;
    idHinhThucLuaChonNhaThau: number;
    idPhuongThucDauThau: number;
    idHinhThucHopDong: number;
    idLoaiGoiThau: number;
    dauThauQuocTe: boolean;
    dauThauQuaMang: boolean;
    tuVanLapDuAn: boolean;
    tinhChiDinhThau: boolean;
    khongPhaiDauThauQuaMang: boolean;
    giaGoiThau: number;
    nguonVonSuDung: string;

    thoiGianBatDauLcnt: Date;
    thoiGianKetThucLcnt: Date;
    thoiGianThucHienHopDong: string;

    phaiSoTuyen: boolean;
    idTinhTrangGoiThau: number;
    phanChiaLo: boolean;
    idGoiThauTapTrung: string;
    dauThauGop: boolean;

    action: number;
    userId: string;
    dsLoThau: [];

}