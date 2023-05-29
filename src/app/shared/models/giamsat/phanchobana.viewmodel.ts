export class thongkeNgayHseCreateRequest {
    idDonVi: number;
    idDuAn: string;
    ngay: Date;
    dsThongKe: dsThongKe[];
    userId: string;
}
export class dsThongKe {
    idLoaiTk: number;
    giaTri: number
}
export class cdtKiemtraHseCreateRequest {
    idDonVi: number;
    idDuAn: string;
    ngay: Date;
    khuVuc: string;
    nhaThau: string;
    ghiChu: string;
    idHangMuc: string;
    vpTenFile: string;
    vpFileDinhKem: string;
    vpDateCreated: Date;
    vpDateModified: Date;
    vpDateTaken: Date;
    vpLatitude: number;
    vpLongitude: number;
    kpTenFile: string;
    kpFileDinhKem: string;
    kpDateCreated: Date;
    kpDateModified: Date;
    kpDateTaken: Date;
    kpLatitude: number;
    kpLongitude: number;
    userId: string;
}
export class cdtKiemtraHsePutRequest {
    idKiemTra: string;
    ngay: Date;
    khuVuc: string;
    nhaThau: string;
    ghiChu: string;
    idHangMuc: string;
    vpTenFile: string;
    vpFileDinhKem: string;
    vpDateCreated: Date;
    vpDateModified: Date;
    vpDateTaken: Date;
    vpLatitude: number;
    vpLongitude: number;
    kpTenFile: string;
    kpFileDinhKem: string;
    kpDateCreated: Date;
    kpDateModified: Date;
    kpDateTaken: Date;
    kpLatitude: number;
    kpLongitude: number;
    userId: string;
}