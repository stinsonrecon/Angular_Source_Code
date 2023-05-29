import { PagingRequest } from "../common/pagers/paging.request";

export interface Response {
    resultObj: any;
    statusCode: number;
    message: string;
}
export interface DonVi {
    idDonVi: number;
    idDonViCha?: number;
    maLoaiDonVi?: string;
    maDonVi?: string;
    tenDonVi?: string;
    tenTat?: string;
    diaChi?: string;
    dienThoai?: string;
    eofficeMaDonVi?: any;
    hrmsMaDonVi?: any;
    suDung?: boolean;
    thuTu?: number;
}
export interface LoaiHinhDuAn {
    idLoaiHinh: number;
    tenLoaiHinh: string;
    nhomLoaiHinh: number;
    thuTu?: any;
}
export interface LoaiHinhDangKy {
    idLoaiHinhDk: number;
    tenLoaiHinhDk: string;
    thuTu: number;
}
export interface HienThi {
    value: boolean | any;
    viewValue: string | any;
}
export interface KhoiTaoDuAn {
    idDonVi: number;
    idDuAn: string;
    idHangMuc: string;
    idTinhTrangKh: number;
    idLoaiHinhDk: number;
    namKh: number;
    daDkkh: boolean;
    isEnable: boolean;
    tenLoaiDa?: any;
    tenTinhTrangKh: string;
    tenTinhTrangDa?: any;
    tenDuAn: string;
    maDuAn: string;
    tenDonVi: string;
    tenNguonVon?: string;
    thuTu: number;
    laDuAnGop: boolean;
    thuocDuAnGop: boolean;
    tenDuAnGop?: any;
    namKhoiTao: number;
}
export interface ParamGetDuAn {
    idDonVi?: number;
    TheoNam: boolean;
    NamKh: number;
    IdLoaiHinhDa: number;
    IdLoaiHinhDk: number;
    idDonViQlda?: number;
}
// export interface ParamChonDuAnDKKH {
//     idDonVi?: number;
//     namKh: number;
//     dsDuAn?: DsDuAn[];
// }
export interface DsDuAn {
    isSelect: boolean;
    idDuAn: string;
    idTinhTrangKh: number;
    thuTu: number;
}
export interface TinhTrangDuAn {
    idTinhTrangKh: number;
    tenTinhTrangKh: string;
    idGiaiDoan: number;
    thuTu: number;
}
export interface LoaiKeHoach {
    idLoaiKh: number;
    tenLoaiKh: string;
    thuTu?: any;
}
export interface DotGiao {
    idDonVi: number;
    idDuAn: string;
    idHangMuc: string;
    idTinhTrangKh: number;
    idLoaiHinhDk: number;
    namKh: number;
    daDkkh: boolean;
    isEnable: boolean;
    tenLoaiDa?: any;
    tenTinhTrangKh: string;
    tenTinhTrangDa?: any;
    tenDuAn: string;
    maDuAn: string;
    tenDonVi: string;
    tenNguonVon?: string;
    thuTu: number;
    laDuAnGop: boolean;
    thuocDuAnGop: boolean;
    tenDuAnGop?: any;
    namKhoiTao: number;
}

export interface SaveDotGiao {
    idDonVi?: number;
    namKh: number;
    tenDotGiao: string;
    idLoaiKh?: number;
}
export interface LuuDuAnDKKHNam {
    idDonVi?: number;
    namKh: number;
    dsDuAn: DsDuAn[];
}
export interface DanhSachDuAnDangKy {
    idLoaiHinhDk?: number;
    idChuDauTu?: number;
    idLoaiHinh?: number;
    idHangMuc?: string;
    idTinhTrangKh?: number;
    thuTu?: number;
    idDuAn?: string;
    tenLoaiHinhDk?: string;
    tenChuDauTu?: string;
    tenLoaiHinh?: string;
    tenTinhTrangKh?: string;
    maDuAn?: string;
    tenDuAn?: string;
    tongMucDauTu?: number;
    luyKeGiaiNgan?: number;
    idDonVi?: number;
    namKh?: number;
    idDangKyKh?: string;
    idGiaoKh?: any;
    duocChon?: boolean;
    cC_TS?: any;
    cC_01?: any;
    cC_02?: any;
    cC_03?: any;
    nN_TS?: any;
    tN_TS?: any;
    hD_21?: any;
    hD_22?: any;
    hD_23?: any;
    hD_24?: any;
    hD_25?: any;
    hD_26?: any;
    hD_27?: any;
    hD_28?: any;
    hD_29?: any;
    hD_30?: any;
    hD_51?: any;
    treeOrder?: string;
    treeLevel?: number;
    treeIsLeaf?: boolean;
}
export interface DanhMucNguonVon {
    idNguonVon: number;
    idNguonVonCha: number;
    idLoaiVon: number;
    vonNuocNgoai: boolean;
    tenNguonVon: string;
    tenVietTat: string;
    chiaChiTiet: boolean;
    vonTuCo: boolean;
    thuTu: number;
    donViSuDung?: boolean;
    thanhToanThue?: boolean;
}
export interface DeleteDKKeHoach {
    idDonVi?: number;
    namKh: number;
    dsDuAn: DsDuAnDelete[];
}
export interface DsDuAnDelete {
    idDuAn: string;
    idDangKyKh: string;
}
export interface SaveDKKeHoach {
    idDonVi?: number;
    namKh: number;
    chiTiet: ChiTiet[];
}

export interface ChiTiet {
    idDangKyKh?: string;
    idDuAn?: string;
    idHangMuc?: string;
    idNguonVon?: number;
    idLoaiVon?: number;
    giaTri?: number;
}

export interface GetSoGiao {
    idDonVi?: number;
    namKh: number;
}
export interface LanGui {
    idDotGiao?: number;
    lanGui?: number;
    giaoBoSung?: boolean;
    ngayGui?: string;
}
export interface GetLanGui {
    idDonVi?: number;
    namkh: number;
    iddotgiao: number;
}
export interface GetDotGiao {
    idDotGiao?: number;
    idDonVi?: number;
    namKh?: number;
    idLoaiKh?: number;
    tenLoaiKh?: string;
    tenDotGiao?: string;
    ngayTao?: string;
    ngayKetThuc?: string;
    ketThuc?: boolean;
}
export interface DangKyKehoachDaGui extends DanhSachDuAnDangKy { }
export interface LanGiaoKeHoach {
    idDotGiao?: number;
    lanGiao?: number;
    giaoBoSung?: boolean;
    ngayGiao?: string;
    tenDotGiao?: string;
}
export interface DangKyKeHoachDaGiao extends DanhSachDuAnDangKy { }
export interface SoLieuKeHoachDoVi extends DanhSachDuAnDangKy { }
export interface GiaoKeHoachNam extends DanhSachDuAnDangKy { }
export interface LanGiao extends LanGui { }
export interface PutSoLieuDonVi {
    idDonViCha: number;
    idDonVi: number;
    chiTiet: ChiTietSoLieuDonVi[];
}

interface ChiTietSoLieuDonVi {
    soLieu: number;
    idDangKyKh: string;
    idGiaoKh: string;
}
export interface GetGiaoKeHoachNam {
    idDonVi: number;
    NamKh: number;
    IdDotGiao: number;
    LanGui: number;
}
export interface PostGiaoKeHoachNam {
    idDangKyKh: string;
    idGiaoKh: string;
    idDuAn: string;
    idHangMuc: string;
    idTinhTrangKh: number;
    idLoaiHinhDk: number;
    chiTiet: ChiTiet[];
}

export interface DonViGiao {

    idDonVi: number;
    tenDonVi: string;
    tenTat: string;
    thuTu: number;
    namKh: number;
    idDotGiao: number;
    dangKySoLanGui: number;
    dangKyLanGui: number;
    dangKyNgayGui: any;
    dangKyNguoiGui: any;
    giaoNguoiGiao: any;
    giaoNgayGiao: any;
    dangKyGiaTri: any;
    giaoGiaTri: any;
    giaoSoVanBan: any;
    giaoNgayVanBan: any;
    giaoFileDinhKem: any;

}
export enum StepKeHoachVonLuoi {
    KHOI_TAO_DU_AN_NAM = 0,
    DKKH = 1,
    XEM_DKKH_DA_GUI = 2,
    XEM_SO_GIAO_KH_NAM = 3,
    LAY_SO_LIEU_KH_DON_VI = 4,
    GIAO_KH_NAM = 5,
    TINH_HINH_GIAO_KH = 6,
    THUC_HIEN_VON_THANG = 7
}

export class GiaoTDDuAnPagingRequest extends PagingRequest {
    idDonVi: number;
    namKH: number;
    idLoaiHinh: string;
}

export class GiaoTDDuAnModel {
    id: string;
    idDonVi: number;
    idDuAn: string;
    nam: number;
    bcncktTvTrinhANgay: number;
    bcncktTvTrinhAThang: number;
    bcncktTvTrinhANam: number;
    bcncktATrinhCdtNgay: number;
    bcncktATrinhCdtThang: number;
    bcncktATrinhCdtNam: number;
    bcncktNgay: number;
    bcncktThang: number;
    bcncktNam: number;
    tkktdtTvTrinhANgay: number;
    tkktdtTvTrinhAThang: number;
    tkktdtTvTrinhANam: number;
    tkktdtATrinhCdtNgay: number;
    tkktdtATrinhCdtThang: number;
    tkktdtATrinhCdtNam: number;
    tkktdtNgay: number;
    tkktdtThang: number;
    tkktdtNam: number;
    khlcntATrinhCdtNgay: number;
    khlcntATrinhCdtThang: number;
    khlcntATrinhCdtNam: number;
    khlcntNgay: number;
    khlcntThang: number;
    khlcntNam: number;
    khoiCongNgay: number;
    khoiCongThang: number;
    khoiCongNam: number;
    dongDienNgay: number;
    dongDienThang: number;
    dongDienNam: number;
    quyetToanNgay: number;
    quyetToanThang: number;
    quyetToanNam: number;
    tctGiao: boolean;
    evnGiao: boolean;
    isDisable: boolean;
    maDuAn: string;
    tenDuAn: string;
}

export interface GiaoTDDA {
    idDonVi: number;
    nam: number;
    tdRutGon: boolean;
    tdTheoNgay: boolean;
    userId: string;
    dsDuAn: GiaoTDDuAnModel[];
}

export class GiaoTDKTDuAnModel {
    idDonVi: number;
    idDuAn: string;
    maDuAn: string;
    tenDuAn: string;
    tenDonVi: string;
    isSelect: boolean;
    isDisable: boolean;
}

export class GiaoTDKhoiTaoDuAnModel {
    idDuAn: string;
    isSelect: boolean;
}

export interface GiaoKTDA {
    idDonVi: number;
    nam: number;
    userId: string;
    dsDuAn: GiaoTDKhoiTaoDuAnModel[];
}

// KẾ HOẠCH VỐN NGUỒN
export interface KhoiTaoDuAnNguon extends KhoiTaoDuAn { }

// THỰC HIỆN VỐN THÁNG 
export interface ThucHhienVonThang {
    loaiThucHien: number;
    idLoaiHinhDk: number;
    idChuDauTu: number;
    idLoaiHinh: number;
    idTinhTrangKh: number;
    thuTu?: number;
    idDuAn: string;
    idHangMuc: string;
    idHangMucCha?: any;
    tenLoaiHinhDk: string;
    tenChuDauTu: string;
    tenLoaiHinh: string;
    tenTinhTrangKh: string;
    maDuAn: string;
    tenDuAn: string;
    tongMucDauTu: number;
    luyKeGiaiNgan: number;
    idDonVi: number;
    namKh: number;
    idThVonThang?: any;
    cC_TS: number;
    cC_01: number;
    cC_02: number;
    cC_03: number;
    ghiChu?: string;
};
export interface PostGiaoVonThangGiaTri {
    idNguonVon: number;
    giaTri: number;
}

export interface PostGiaoVonThangChiTiet {
    idThVonThang: string;
    idDuAn: string;
    idHangMuc: string;
    ghiChu: string;
    giaTri: PostGiaoVonThangGiaTri[];
}
export interface PostGiaoVonThang {
    type?: string;
    loaiThucHien: number;
    idDonVi: number;
    namKh: number;
    nam: number;
    thang: number;
    chiTiet: PostGiaoVonThangChiTiet[];
}
export interface PostChiTietLaySoLieuDonVi {
    idThVonThang: string;
}
export interface PostLaySoLieuDonVi {
    loaiThucHien: number;
    idDonVi: number;
    chiTiet: PostChiTietLaySoLieuDonVi[];
}