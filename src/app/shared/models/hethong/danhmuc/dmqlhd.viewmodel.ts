export class DmQlhdLoaiCongViecViewModel {
    idLoaiCongViec: number;
    tenCongViec: string;
    ghiChu: string;
    thuTu?: number;
}

export class DmQlhdThucHienDanhGiaViewModel {
    idDanhGia: number;
    tenDanhGia: string;
    thuTu?: number;
}

export class DmQlhdThucHienHangMucCongViecViewModel {
    idHangMuc: number;
    idHangMucCha: number;
    idLoaiCongViec: string;
    MaHangMuc: string;
    tenHangMuc: string;
    thuTu?: number;
    chieuCao?: number;
    coChiTiet?: number;
}

export class DmQlhdThucHienHangMucCongViecLoaiViewModel {
    idLoaiCongViec: number;
    idLoaiHopDong: number;
    tenLoaiCongViec: string;
    thuTu?: number;
}

export class DmQlhdThucHienHangMucDongDienViewModel {
    idHangMuc: number;
    idNhom: number;
    maHangMuc: string;
    tenHangMuc: string;
    idDonViTinh?: number;
    thuTu?: number;
    suDung: boolean;
}

export class DmQlhdThucHienHangMucDongDienNhomViewModel {
    idNhom: number;
    tenNhom: string;
    thuTu?: number;
}

export class DmQlhdThucHienHangMucThiCongViewModel {
    idHangMuc: number;
    idNhom: number;
    maHangMuc: string;
    tenHangMuc: string;
    idDonViTinh?: number;
    thuTu?: number;
    suDung: boolean;
}

export class DmQlhdThucHienHangMucThiCongNhomViewModel {
    idNhom: number;
    tenNhom: string;
    thuTu?: number;
}
