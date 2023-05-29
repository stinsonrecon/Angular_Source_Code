export class PhongBanViewModel {
    idPhongBan: number;
    tenPhongBan: string;
    maLoaiPhongBan: string;
}

export class PhongBanCreateRequest {
    idDonVi: number;
    tenPhongBan: string;
    maLoaiPhongBan: string;
    thuTu?: any;
    suDung: boolean;
}

export class PhongBanUpdateRequest {
    idPhongBan: number;
    tenPhongBan: string;
    maLoaiPhongBan: string;
    thuTu?: any;
    suDung: boolean;
}

