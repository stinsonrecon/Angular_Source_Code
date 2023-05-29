import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
import { GiaoDaDuAnToTrinh } from '../totrinh/giaodatotrinh.viewmodel';
export class DmDaGiaoPagingRequest extends PagingRequest {
    idDonVi: number;
    nam: number;
    tuKhoa: string;
    tuNgay: string;
    denNgay: string;
    idNhomDuAn: number;
    idLoaiHinh: number;
}

export class GiaoDaQdGiaoViewModel {
    idToTrinh: string;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    tinhTrang: number;
    tenTinhTrang: string;
}

export class GiaoDaQdGiaoPagingRequest extends PagingRequest {
    idDonVi: number;
    nam: number;
    tuKhoa: string;
    tuNgay: string;
    denNgay: string;
    tinhTrang: number;
}

export class GiaoDaDmDuAnGiaoViewModel {
    
}

export class GiaoDaCreateRequest {
    idDonVi: number;
    nam: number;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    ngayTao: string;
    dsDuAn: GiaoDaDuAnToTrinh[];
}

export class GiaoDaUpdateRequest {
    idQuyetDinh: string;
    idDonVi: number;
    nam: number;
    soVanBan: string;
    ngayVanBan: string;
    noiDung: string;
    fileDinhKem: string;
    ngaySuaCuoi: string;
    dsDuAn: GiaoDaDuAnToTrinh[];
}