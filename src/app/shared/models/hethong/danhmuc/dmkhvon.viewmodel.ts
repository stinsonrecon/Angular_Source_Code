import { PagingRequest } from "../../common/pagers/paging.request";

export class DmKhVonKeHoach05NamMucDichViewModel {
    idMucDich: number;
    tenMucDich: string;
    thuTu?: number;
}

export class NguonVonPagingRequest extends PagingRequest {
    idDonVi: number;
    keyword: string;
}

export class DmKhVonLoaiHinhDkViewModel {
    idLoaiHinhDk: number;
    tenLoaiHinhDk: string;
    thuTu?: number;
}

export class DmKhVonNguonVonViewModel {
    idNguonVon: number;
    idNguonVonCha: number;
    idLoaiVon: number;
    vonNuocNgoai: boolean;
    tenNguonVon: string;
    tenVietTat: string;
    chiaChiTiet?: boolean;
    vonTuCo?: boolean;
    thuTu?: number;
}

export class DmKhVonNguonVonDonViViewModel {
    idDonVi: number;
    idNguonVon: number;

    thanhToanThue: boolean;
}

export class DmKhVonTinhTrangViewModel {
    idTinhTrang: number;
    tenTinhTrang: string;
    idGiaiDoan?: number;
    thuTu?: number;
}
