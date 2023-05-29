import { PagingRequest } from "../common/pagers/paging.request";

export interface VanBanBean {
    idVanBan: string;
    idDonVi: number;
    idDuAn: string;
    idHoSoDuAn: number;
    soVanBan: string;
    ngayVanBan: Date;
    trichYeu: string;
    fileDinhKem: string;
    vanBanDenDi: number;
    ngayNhan: Date;
    noiGui: string;
    soTo: string;
    userId: string;
}

export class BeanUpdateVanbanHoSo extends PagingRequest{
    dsIdHoSo: string[];
}

export interface VanBanById {
    idVanBan: string;
    idHoSoDuAn: number;
    idLoaiVanBan: number;
    soVanBan: string;
    ngayVanBan: Date;
    trichYeu: string;
    fileDinhKem: string;
    vanBanDenDi?: any;
    ngayNhan: Date;
    noiGui: string;
    soTo: string;
}

export interface HoSoTaiLieuDuAnBean {
    idHoSoDuAn: number;
    tenHoSo: string;
}
export class VanBanRequest extends PagingRequest {
    idDonVi: number;
    tungay?: string;
    denngay?: string;
    IdHoSoDuAn?: number;
    idDuAn: string;
    tukhoa?: string;
    pageIndex: number;
    pageSize: number;
}