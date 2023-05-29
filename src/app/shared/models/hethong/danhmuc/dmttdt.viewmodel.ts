export class DmTtdtLoaiThuTucDauTuViewModel {
    idLoaiThuTuc: number;
    tenLoaiThuTuc: string;
    thuTu?: number;
}

export class DmTtdtNguonVonViewModel {
    idNguonVon: number;
    tenNguonVon: string;
    tenVietTat: string;
    thuTu?: number;
}

export class DmTtdtQuyTrinhVanBanViewModel {
    idQuyTrinh: number;
    tenQuyTrinh: string;
    idLoaiVanBan?: number;
    thuTu?: number;
}

export class DmTtdtThucHienHangMucViewModel {
    idHangMuc: number;
    idLoaiCongViec: number;
    maHangMuc: string;
    tenHangMuc: string;
    coChiTiet?: boolean;
    thuTu?: number;
}

export class DmTtdtThucHienHangMucLoaiCongViecViewModel {
    idLoaiCongViec: number;
    tenLoaiCongViec: string;
    loaiThuTuc?: number;
    thuTu?: number;
}
