export interface ToTrinh {
    kySoTaiLieuId: string,
    hoSoThanhToanId: string,
    // hoSoThanhToan: any,
    maHoSoTT: string,
    tenHoSoTT: string,
    soTienNguyenTe: number,
    soTienThanhToan: number,
    noiDungKy: string,
    ngayKy: string,
    nguoiKyId: string,
    tenNguoiKy: string,
    taiLieuGoc: string,
    taiLieuKy: string,
    daXoa: string,
    capKy: number,
    daKy: number,
    ngayTao: string,
    loaiTien: string,
    // fileKyHoSoTT: string,
    // fileGocHoSoTT: string,
    capKyHoSoTT: number,
}
export interface ToTringCollection {
    data:
    {
        TotalRecord: number;
        Items: ToTrinh[];
    }
    errorCode: string,
    message: string,
    success: boolean
}