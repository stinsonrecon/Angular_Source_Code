import { PagingRequest } from "@app/shared/models/common/pagers/paging.request";

export class KeHoachLcntViewModel {
    idKeHoachLcnt: string;
    tenKeHoachLcnt: string;
    tongSoGoiThau?: number;
    noiDung: string;
    pheDuyetSoQd: string;
    pheDuyetNgayQd?: Date;
    pheDuyetFileDinhKem: string;
    pheDuyetCoQuan: string;
    pheDuyetNguoiKy: string;
    giaTriVnd: number;
    tuVanLapDuAn: boolean;
    tenDuAn: string;
    maDuAn: string;
}

export class KeHoachLcntGetPagingRequest extends PagingRequest {
    idDonVi: number;
    idPhanLoai: number;
    idDuAn?: string;
    tuNgay: string;
    denNgay: string;
    tinhTrang?: string;
    tuKhoa: string;
}

export class KeHoachLcntCreateRequest {
    idDonVi: number;
    idDuAn?: string;
    tenKeHoachLcnt: string;
    tongSoGoiThau?: number;
    noiDung: string;

    trinhSoVb: string;
    trinhNgayVb?: Date;
    trinhFileDinhKem: string;

    thamDinhSoVb: string;
    thamDinhNgayVb?: Date;
    thamDinhFileDinhKem: string;

    pheDuyetSoQd: string;
    pheDuyetNgayQd?: Date;
    pheDuyetFileDinhKem: string;

    pheDuyetCoQuan: string;
    pheDuyetNguoiKy: string;

    tuVanLapDuAn: boolean;
    idPhanLoai: number;
    userId: string;

    dsGoiThau:[];
}

export class KeHoachLcntUpdateRequest {
    idKeHoachLcnt: string;
    tenKeHoachLcnt: string;
    tongSoGoiThau?: number;
    noiDung: string

    trinhSoVb: string;
    trinhNgayVb?: Date;
    trinhFileDinhKem: string;

    thamDinhSoVb: string;
    thamDinhNgayVb?: Date;
    thamDinhFileDinhKem: string;

    pheDuyetSoQd:string;
    pheDuyetNgayQd?: Date;
    pheDuyetFileDinhKem: string;

    pheDuyetCoQuan: string;
    pheDuyetNguoiKy: string;

    tuVanLapDuAn: boolean;
    dsGoiThau:[];

    userId: string;
}


