export const trangThaiCT = [
    {
        id: -99,
        name: 'Tất cả'
    },
    {
        id: 0,
        name: 'Đang lập'
    },
    {
        id: 1,
        name: 'Đã lập'
    },
    {
        id: 2,
        name: 'Đang duyệt' // trạng thái đang duyệt với 1 chữ ký
    },
    {
        id: 3,
        name: 'Đang duyệt' // trạng thái đang duyệt với 2 chữ ký
    },
    {
        id: 4,
        name: 'Đã duyệt' // trạng thái đã duyệt với đủ 3 chữ ký
    },
    {
        id: 5,
        name: 'Đã gửi ngân hàng'
    },
    {
        id: 6,
        name: 'Đã thanh toán'
    },
    {
        id: 7,
        name: 'Đã đóng'
    },
    {
        id: -1,
        name: 'Đã hủy'
    },
    {
        id: 8,
        name: 'Đã lập chứng từ ghi sổ'
    },
    {
        id: 9,
        name: 'ERP đã xác nhận chứng từ ghi sổ'
    },
    {
        id: 10,
        name: 'Đã hủy chứng từ ghi sổ'
    },
    {
        id: 11,
        name: 'Kế toán thanh toán đã ký chứng từ ghi sổ'
    },
    {
        id: 12,
        name: 'Lãnh đạo ban tài chính kế toán đã ký chứng từ ghi sổ'
    },
]

export class TrangThaiChungTu {
    public static dangLap = 0;           // đang lập
    public static daLap = 1;             // đã lập
    public static dangDuyetMotChuKy = 2; // trạng thái phê duyệt với 1 chữ ký
    public static dangDuyetHaiChuKy = 3; // trạng thái phê duyệt với 2 chữ ký
    public static daDuyet = 4;           // đã duyệt với đủ 3 chữ ký
    public static daGuiNganHang = 5;     // đã gửi ngân hàng
    public static daThanhToan = 6;       // đã thanh toán
    public static daDong = 7;            // đã đóng
    public static daHuy = -1;            // đã hủy
    public static khoiTaoCTGS = 8;
    public static erpXacNhanCTGS = 9;
    public static daHuyCTGS = 10;
    public static keToanThanhToanDaKyCTGS = 11;
    public static lanhDaoTaiChinhKeToanDaKyCTGS = 12;

}
export const trangThaiCTSearch = [
    {
        id: -99,
        name: 'Tất cả'
    },
    {
        id: 0,
        name: 'Đang lập'
    },
    {
        id: 1,
        name: 'Đã lập'
    },
    {
        id: 2,
        name: 'Đang duyệt'
    },
    {
        id: 4,
        name: 'Đã duyệt'
    },
    {
        id: 5,
        name: 'Đã gửi ngân hàng'
    },
    {
        id: 6,
        name: 'Đã thanh toán'
    },
    {
        id: 7,
        name: 'Đã đóng'
    },
    {
        id: -1,
        name: 'Đã hủy'
    },
]

export const LOAI_PHI = [
    { value: "OUR", name: "Người chuyển trả phí"},
    { value: "BEN", name: "Người hưởng trả phí"}
]

export const LOAI_GIAO_DICH = [
    { value: "IN", name: "Trong cùng ngân hàng"},
    { value: "OUT", name: "Bên ngoài ngân hàng chuyển"}
]