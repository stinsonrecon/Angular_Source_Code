export class HstkCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idTram: string;
    idHangMuc: number;
    idHstk: number;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class BbntCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idTram: string;
    idHangMuc: number;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class HatcCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idTram: string;
    idHangMuc: number;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    dateCreated: string;
    dateModified: string;
    dateTaken: Date;
    latitude: number;
    longitude: number;
    userId: string;
}