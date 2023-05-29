export interface HoSoThanhToan {
    boPhanYeuCau: string;
    boPhanYeuCauId: number;
    buocThucHien: number;
    donViId: string;
    ghiChu: string;
    hinhThucChi: number;
    hinhThucTT: number;
    id: string;
    loaiHoSo: string;
    loaiHoSoId: string;
    maHoSo: string;
    mucDoUuTien: number;
    namHoSo: number;
    ngayDuyet: Date;
    ngayGui: Date;
    ngayLapCT: Date;
    ngayTao: Date;
    ngayTiepNhan: Date;
    nguoiThuHuong: string;
    soTKThuHuong: string;
    tenNguoiTao: string;
    tenVietTat: string;
    thoiGianLuutru: number;
    thoiGianThanhToan: Date;
    tongTienDeNghiTT: number;
    trangThaiHoSo: number;
    vaiTroPheDuyet: string;
}

export interface DonViYeuCau {
    dOfficeDonVi: number,
    diaChi: string,
    donViChaId: number,
    email: string,
    erpMaChiNhanh: string,
    erpMaCongTy: string,
    erpidDonVi: string,
    id: number,
    laPhongBan: number,
    maDonVi: string,
    moTa: string,
    nguoiTaoId: string,
    soDienThoai: string,
    tenDonVi: string,
    thoiGianTao: string,
    trangThai: number
}

export interface ILoaiHoSo {
    giayToLoaiHoSoResponse?: string | null
    loaiHoSoId: string
    luongPheDuyetResponse?: string | null
    maLoaiHoSo: string
    moTa: string | null
    ngayTao: string
    tenLoaiHoSo: string
    trangThai: number
}

export interface ITaiKhoanNganHang {
    chiNhanhNganHangId: string
    donViId: number
    ghiChu: string
    maChiNhanh: string
    maNganHang: string
    nganHangId: string
    soTaiKhoan: string
    taiKhoanId: string
    tenChiNhanh: string
    tenDonVi: string
    tenNganHang: string
    tenNganHangVietTat: string
    tenTaiKhoan: string
    thoiGianTao: string
    trangThai: number
}