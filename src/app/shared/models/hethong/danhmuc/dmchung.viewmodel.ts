
export class DmChungCapPheDuyetViewModel {
    idCapPheDuyet: number;
    tenCapPheDuyet: string;
}

export class DmChungDanhGiaViewModel {
    idDanhGia: number;
    tenDanhGia: string;
}

export class DmChungDongTienViewModel {
    idDongTien: number;
    tenDongTien: string;
    tenVietTat: string;
    thuTu?: number;
}

export class DmChungDonViTinhViewModel {
    idDonViTinh: number;
    tenDonViTinh: string;
    nhom?: number;
}

export class DmChungLoaiThoiGianViewModel {
    idLoaiThoiGian: number;
    tenLoaiThoiGian: string;
    thuTu?: number;
}

export class DmChungLoaiVanBanViewModel {
    idLoaiVanBan: number;
    tenLoaiVanBan: string;
    nhom?: number;
    thuTu?: number;
}

export class DmChungNgonNguViewModel {
    id: string;
    ten: string;
}

export class DmChungPhuongXaViewModel {
    idPhuongXa: number;
    idQuanHuyen: number;
    maPhuongXa: string;
    tenPhuongXa: string;
    thuTu?: number;
}

export class DmChungQuanHuyenViewModel {
    idQuanHuyen: number;
    idTinhThanh: number;
    maQuanHuyen: string;
    tenQuanHuyen: string;
    thuTu?: number;
}

export class DmChungTinhThanhViewModel {
    idTinhThanh: number;
    idQuocGia: number;
    maTinhThanh: string;
    tenTinhThanh: string;
    thuTu?: number;
}

export class DmChungQuocGiaViewModel {
    idQuocGia: number;
    maQuocGia: string;
    tenQuocGia: string;
    thuTu?: number;
}
