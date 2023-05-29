
export class DmDuAnBuocThietKeViewModel {
    idBuocThietKe: number;
    tenBuocThietKe: string;
}

export class DmDuAnCapDuAnViewModel {
    idCapDuAn: number;
    tenCapDuAn: string;
}

export class DmDuAnGiaiDoanViewModel {
    idGiaiDoan: number;
    tenGiaiDoan: string;
    thuTu?: number;
}

export class DmDuAnHinhThucQldaViewModel {
    idHinhThucQlda: number;
    tenHinhThucQlda: string;
    thuTu?: number;
}

export class DmDuAnLoaiDuAnViewModel {
    idLoaiDuAn: number;

    tenLoaiDuAn: string;

    idLoaiHinh: number;
}

export class DmDuAnLoaiHinhViewModel {
    idLoaiHinh: number;
    tenLoaiHinh: string;
    nhomLoaiHinh?: number;
    thuTu?: number;
}

export class DmDuAnLoaiTrongDiemViewModel {
    idLoaiTrongDiem: number;
    tenLoaiTrongDiem: string;
}

export class DmDuAnLoaiViTriViewModel {
    idLoaiViTri: number;
    tenLoaiViTri: string;
}

export class DmDuAnNhomDuAnViewModel {
    idNhomDuAn: number;
    tenNhomDuAn: string;
    SoNgayQuyetToan?: number;
    thuTu?: number;
}

export class DmDuAnTinhTrangViewModel {
    idTinhTrang: number;
    tenTinhTrang: string;
    idGiaiDoan: number;
    thuTu?: number;
}

export class DmDuAnVungDuAnViewModel {
    idVungDuAn: string;
    tenVungDuAn: string;
    thuTu?: string;
}