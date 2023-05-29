export interface DanhSachQuocGIa {
    idQuocGia: number;
    maQuocGia: string;
    tenQuocGia: string;
    thuTu?: any;
}

export interface DanhSachTinhThanh {
    idTinhThanh: number;
    idQuocGia: number;
    maTinhThanh: string;
    tenTinhThanh: string;
    thuTu: number;
}

export interface ApiResult<T> {
    resultObj: T[];
    statusCode: number;
    message: string;
}



