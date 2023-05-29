export class DmGpmbCapDauMucViewModel {
    idCapDauMuc: number;
    tenCapDauMuc: string;
    thuTu?: number;
}

export class DmGpmbDauMucHoSoViewModel {
    idDauMuc: number;
    tenDauMuc: string;
    thuTu?: number;
    capDauMuc: string;
    hienThi: boolean;
}

export class DmGpmbThucHienHangMucViewModel {
    idHangMuc: number;
    tenHangMuc: string;
    idPhanLoai: string;
    thuTu?: number;
}

export class DmGpmbThucHienPhanLoaiViewModel {
    idPhanLoai: number;
    tenPhanLoai: string;
}
