export const TRANG_THAI_HO_SO = [
    { value: 5, name: 'Khởi tạo' },
    { value: 1, name: 'Chưa phê duyệt' },
    { value: 2, name: 'Đã soát xét' },
    { value: 3, name: 'Yêu cầu thay đổi' },
    { value: 4, name: 'Đã thanh toán' },
    { value: 6, name: 'Đã tạo chứng từ' },
    { value: 7, name: 'Đã đóng' },
    { value: 8, name: 'Đang trình ký' },
    { value: -1, name: 'Đã xóa' },
    { value: 9, name: 'Đã tạo chứng từ ghi sổ' },
    { value: 10, name: 'Trình ký chứng từ ghi sổ' },
    { value: 11, name: 'Thẩm tra hồ sơ' },
    { value: 12, name: 'Chờ tiếp nhận' },
    { value: 13, name: 'Ký phiếu thẩm tra' },
    // { value: 14, name: 'Phân công phê duyệt hồ sơ' },

]
export class TrangThaiHoSo {
    public static khoiTao = 5;           // khởi tạo hồ sơ
    public static chuaPheDuyet = 1;      // hồ sơ chưa được phê duyệt
    public static daSoatXet = 2;         // hồ sơ đã soát xét
    public static yeuCauThayDoi = 3;     // hồ sơ bị trả lại và yêu cầu thay đổi
    public static daThanhToan = 4;       // đã thanh toán
    public static daTaoChungTu = 6;      // hồ sơ đã được tạo chứng từ
    public static daDong = 7;            // hồ sơ đã được đóng
    public static dangTrinhKy = 8;       // hồ sơ đang trong quá trình ký tờ trình
    public static daXoa = -1;            // đã bị xóa
    public static daTaoChungTuGhiSo = 9; // hồ sơ đã tạo chứng từ ghi sổ
    public static trinhKyCTGS = 10;      // hồ sơ đang trình ký
    public static thamTraHoSo = 11;      // hồ sơ đang thẩm tra
    public static chuaTiepNhan = 12;     // hồ sơ chưa tiếp nhận
    public static kyPhieuThamTra = 13;     // ký phiếu thẩm tra cấp 1
    // public static phanCongPheDuyetHoSo = 14;     // phân công phê duyệt hồ sơ
}

export const MUC_DO_UU_TIEN = [
    { value: 1, name: 'Bình thường' },
    { value: 2, name: 'Ưu tiên' },
    { value: 3, name: 'Ưu tiên cao' }
]
export class MucDoUuTien {
    public static binhThuong = 1; // bình thường
    public static uuTien = 2;     // ưu tiên
    public static uuTienCao = 3;  // ưu tiên cao
}

export const HINH_THUC_TT = [
    { value: 1, name: 'Chuyển khoản' },
    { value: 2, name: 'Tiền mặt' },
    { value: 3, name: 'Thanh toán tại quầy' }
]
export class HinhThucThanhToan {
    public static chuyenKhoan = 1;      // chuyển khoản
    public static tienMat = 2;          // tiền mặt
    public static thanhToanTaiQuay = 3; // thanh toán tại quầy
}

export const ACTION = {
    view: 'DETAIL',
    update: 'UPDATE',
    aprrove: 'APPROVE',
    createLicense: 'CREATE_LICENSE'
}

export const THOI_GIAN_LUU_TRU = [
    { value: 0, name: 'Vĩnh viễn' },
    { value: 1, name: '1 năm' },
    { value: 3, name: '3 năm' },
    { value: 5, name: '5 năm' },
    { value: 10, name: '10 năm' }
]

export const LAN_THANH_TOAN = [
    { value: 1, name: 'Lần 1' },
    { value: 2, name: 'Lần 2' },
    { value: 3, name: 'Lần 3' },
    { value: 4, name: 'Lần 4' },
    { value: 5, name: 'Lần 5' },
    { value: 6, name: 'Lần 6' },
    { value: 7, name: 'Quyết toán' }
]

export const TRANG_THAI_PHE_DUYET = [
    { value: 2, name: 'Phê duyệt' },
    { value: 3, name: 'Từ chối' },
    { value: 4, name: 'Đóng hồ sơ' },
    { value: 5, name: 'Phê duyệt tờ trình' },
    { value: 6, name: 'Từ chối duyệt tờ trình' }
]
export class TrangThaiPheDuyet {
    public static pheDuyet = 2;               // đã phê duyệt hồ sơ
    public static tuChoi = 3;                 // từ chối phê duyệt hồ sơ
    public static dongHoSo = 4;               // đóng hồ sơ
    public static pheDuyetToTrinh = 5;        // đã phê duyệt tờ trình
    public static tuChoiPheDuyetToTrinh = 6;  // từ chối phê duyệt tờ trình
}

export const TYPE_FILE_ACCEPT: string[] = ['png', 'pdf', 'jpg', 'jpeg', 'docx', 'doc']
