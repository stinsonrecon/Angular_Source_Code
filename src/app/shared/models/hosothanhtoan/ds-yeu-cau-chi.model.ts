export interface DSYeuCauChi {
    yeuCauChiTienId: string,
    chungTuId: string,
    soTienTT: number,
    nganHangChiId: string,
    taiKhoanChi: string,
    taiKhoanThuHuong: string,
    nguoiThuHuong: string,
    nganHangThuHuongId: string,
    trangThaiChi: number,
    ngayYeuCauChi: string,
    nguoiYeuCauChiId: string,
    chuKy: string,
    maKetQuaChi: string,
    thoiGianChi: string,
    nganHangThuHuong: string,
    nganHangChi: string,
    // noiDungTT: string,
    // loaiGiaoDich: string,
    // loaiPhi: string,
    // loaiTienTe: string,
    // tenNganHangChuyen: string,
    // tenNganHangNhan: string,
    // soChungTuERP: string
    chungTu: chungTu,
    tenNganHangNhanVietTat: string,
    tenNganHangThanhToanVietTat: string
}
export interface chungTu {
    capKy: number
    chungTuERPId: string
    chungTuId: string
    ctgS_AP: boolean
    ctgS_CM: boolean
    ctgS_GL: boolean
    daXoa: boolean
    diaChiChuyen: string
    donViThanhToan: string
    ghiChu: string
    hoSoThanhToan: string
    kySoId: string
    loaiGiaoDich: string
    loaiGiaoDichCha: string
    loaiPhi: string
    loaiTienTe: string
    maChiNhanhChuyen: string
    maChiNhanhNhan: string
    maNganHangChuyen: string
    maNganHangNhan: string
    maNuocChuyen: string
    maTinhTPChuyen: string
    ngayDuyet: string
    ngayGiaoDichThucTe: string
    ngayKy: string
    ngayLapChungTu: string
    ngayYeuCauLapCT: string
    nguoiDuyet: string
    nguoiYeuCauLap: string
    noiDungTT: string
    soChungTuERP: string
    soTaiKhoanChuyen: string
    soTaiKhoanNhan: string
    soTien: number
    tenNganHangChuyen: string
    tenNganHangNhan: string
    tenNguoiChuyen: string
    tenTaiKhoanChuyen: string
    tenTaiKhoanNhan: string
    trangThaiCT: number
    tyGia: number,
    tenLoaiGiaoDich: string
}
export interface DSYeuCauChiColection {
    data:
    {
        TotalRecord: number;
        Items: DSYeuCauChi[];
    }
    errorCode: string,
    message: string,
    success: boolean
}