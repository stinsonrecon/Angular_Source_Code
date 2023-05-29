export class ChucVuViewModel {
    idChucVu: number;
    tenChucVu: string;
    maLoaiChucVu: string;
}

export class ChucVuCreateRequest {
    idDonVi: number;
    tenChucVu: string;
    maLoaiChucVu: string;
    thuTu?: any;
    suDung: boolean;
}

export class ChucVuUpdateRequest {
    idChucVu: number;
    tenChucVu: string;
    maLoaiChucVu: string;
    thuTu?: any;
    suDung: boolean;
}


