export class TramCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idLoaiTram: number;
    tenTram: string;
    thuTu: number;
}

export class TramUpdateRequest {
    idTram: string;
    idDonVi: number;
    idDuAn: string;
    idLoaiTram: number;
    tenTram: string;
    thuTu: number;
}

export class TramViewModel {
    idDonVi: number;
    idDuAn: string;
    idLoaiTram: number;
    idTram: string;
    maDuAn: string;
    tenDuAn: string;
    tenLoaiTram: string;
    tenTram: string;
    thuTu: number;
}