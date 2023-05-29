import { MatTableDataSource } from '@angular/material/table';
import { PagingRequest } from './../common/pagers/paging.request';
export class HSTLRequest {
    idDonVi: number;
    idDuAn: string;
    dongHoSo?: string;
    tuKhoa?: string;
}

export class HSTLPagingRequest extends PagingRequest {
    idDonVi: number;
    idDuAn: string;
    dongHoSo: boolean;
    tuKhoa: string;
}

export class HSTLKhacModel {
    idHoSo: string;
    idHoSoCha: string;
    tenHoSo: string;
    thuTu: number;
    dongHoSo: boolean;
    soLuongVb: number;
    soKyHieu: string;
    ngayVanBan: string;
}

export class HSTLMauModel {
    idHoSo: string;
    idHoSoCha: string;
    tenHoSo: string;
    thuTu: number;
    dongHoSo: boolean;
    soLuongVb: number;
    soKyHieu: string;
    ngayVanBan: string;
}

export class HSTLViewModel {
    idHoSo?: string;
    idHoSoCha?: string;
    tenHoSo?: string;
    thuTu: number;
    dongHoSo?: boolean;
    soLuongVb?: number;
    soKyHieu?: string;
    ngayVanBan?: string;
    idVanBan?: string;
    soVanBan?: number;
    trichYeu?: string;
    fileDinhKem?: string;
    STT?: string;
    isHoSo: boolean;
}

export interface HSTLHoSoKc {
    STT?: string;
    level?: number;
    idHoSo?: string;
    idHoSoCha?: string;
    tenHoSo?: string;
    thuTu: number;
    soLuongVb?: number;
    expanded?: boolean;
    isHoSo?: boolean;
    idVanBan?: string;
    soVanBan?: string;
    ngayVanBan?: string;
    trichYeu?: string;
    fileDinhKem?: string;
}

export interface HSTLHoSo {
    STT?: number;
    level?: number;
    idHoSoDuAn?: number;
    tenHoSo?: string;
    thuTu: number;
    soLuongVb?: number;
    expanded?: boolean;
    isHoSo?: boolean;
    idVanBan?: string;
    soVanBan?: string;
    ngayVanBan?: string;
    trichYeu?: string;
    fileDinhKem?: string;
}

export interface HSTLVanBan {
    idVanBan?: string;
    soVanBan?: number;
    ngayVanBan?: string;
    trichYeu?: string;
    fileDinhKem?: string;
}

export class HoSoCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idHoSoCha: string;
    tenHoSo: string;
    thuTu: number;
    dongHoSo: boolean;
    userId: string;
}

export class HoSoUpdateRequest {
    idHoSo: string;
    idDonVi: number;
    idDuAn: string;
    idHoSoCha: string;
    tenHoSo: string;
    thuTu: number;
    dongHoSo: boolean;
    userId: string;
}

export class HoSoVanBanUpdateRequest {
    dsIdVanBan: string[];
}