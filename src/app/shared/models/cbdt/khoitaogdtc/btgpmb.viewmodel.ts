export class BtgpmbCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idPhuongXa: number;
    idQuanHuyen: number;
    idTinhThanh: number;
    phanMong: number;
    hanhLang: number;
    phanTram: number;
    nhaMay: number;
    ngamHoa: number;
}

export class BtgpmbUpdateRequest {
    idDonVi: number;
    idDuAn: string;
    idPhuongXa: number;
    phanMong: number;
    hanhLang: number;
    phanTram: number;
    nhaMay: number;
    ngamHoa: number;
}

export class BtgpmbViewModel {
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