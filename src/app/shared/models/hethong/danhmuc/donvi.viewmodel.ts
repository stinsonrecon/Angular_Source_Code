import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';
export class DonViViewModel {
    idDonVi: number;
    tenDonVi: string;
    tenTat: string;
    maDonVi: string;
    maLoaiDonVi: string;
    diaChi: string;
}

export class DonviPagingRequest extends PagingRequest {
    idDonVi: number;
    keyword: string;
}
