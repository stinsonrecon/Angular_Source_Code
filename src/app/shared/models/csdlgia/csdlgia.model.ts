export class yeuCauBaoGiaCreateRequest {
    nhomVatId: number;
    soDeNghi: string;
    tuNgay: Date;
    denNgay: Date;
    trangThai: number;
    quy: number
    nam: number
    vanBanKemTheo: string;
    ghiChu: string;
    ngayYeuCau: Date;
    donViYeuCauId: number;
    thoiGianTao: Date;
    nguoiTaoId: number;
    thoiGianCapNhat: Date;
    nguoiCapNhatId: number;
    donViThamDinhId: number;
    userId: string;
    yeuCauVatTu: yeuCauVatTu[];
    donVi: DonVi[];
}
export class yeuCauVatTu {
    //idVatTU
    id: number;
    maVatTu: string;
    thongSoKyThuat: string;
    hangSanXuatId: number;
    nuocSanXuatId: number;
    donViTinhId: number;
    tenDonVi: string
    tenVatTu: string

}
export class DonVi {
    id: number;
    trangThai: number;
    diaChi: string;
    soDienThoai: string
    email: string
    loaiDonVi: number
    moTa: string
    nguoiTaoId: number
    tenDonVi: string
    tenVietTat: string
    thoiGianTao: Date
}