import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
import { LoaiDuAnModel } from '../../kehoach/duan/duan.viewmodel';

export class ThucHienBtgpmbViewModel {
    idTinhThanh: number;
    tenTinhThanh: string;
    idQuanHuyen: number;
    tenQuanHuyen: string;
    idPhuongXa: number;
    tenPhuongXa: string;
    idDuAn: number;
    idHopDong: number;
    idHangMuc: number;
    idCot: number;
    idKhoangCot: number;
    thuTu: number;
    kyHieu: string;
    idThucHien: number;
    tongSoHo: number;
    tongDienTich: number;
    soHoDoDacGiaiThua: number;
    soHoThongBaoThuHoiDat: number;
    soHoKeKiem: number;
    soHoXetNguonGoc: number;
    soHoApGia: number;
    soHoTrinhPabt: number;
    soHoDuyetPabt: number;
    soHoDaNhanTienDaBgmb: number;
    soHoDaNhanTienChuaBgmb: number;
    soHoChuaNhanTien: number;
    soLanThongBao: number;
    daBanGiaoDoVanDong: boolean;
    dienTichDaBanGiao: number;
    thoiGianDuKienBgmb: string;
    thoiGianBgmb: string;
    idVuongMac: string;
    vuongMac: string;
    ngayPhatSinh: string;
    idKetQua: string;
    kqLamViecQlda: string;
    kqLamViecCdt: string;
    ngayLamViec: string;
    tongSoVuongMac: number;
    vuongMacTonTai: number;
    capDong: number;
}

export class ThucHienBtgpmGetPagingRequest extends PagingRequest {
    idDuAn: string;
    idPhanLoai: number;
    nam: number;
    tuan: number;
    kieuCn: number;
    chuaBgmb: number;
    vuongMac: number;
    kyHieu: string;
}
