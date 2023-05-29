import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
import { LoaiDuAnModel } from '../../kehoach/duan/duan.viewmodel';

export class HosoBtgpmbViewModel {
    stt: number;
    loai: number;
    idDauMuc: number
    capDauMuc: string;
    noiDung: string;
    idTaiLieu: number;
    fileDinhKem: string;
}

export class HosoBtgpmGetPagingRequest extends PagingRequest {
    idDonVi: number;
    idDuAn: string;
    idTinhThanh : number;
    idQuanHuyen: number;
    idPhuongXa: number;
}

export class HosoBtgpmbCreate {
    idDonVi: number;

    idDuAn:	string;
    
    idDauMuc: number;

    idTinhThanh: number;

    idQuanHuyen: number;

    idPhuongXa: number;

    soVanBan:	string;

    ngayVanBan:	string;

    fileDinhKem:	string;

    noiDung:	string;

    tenFile:	string;
}
