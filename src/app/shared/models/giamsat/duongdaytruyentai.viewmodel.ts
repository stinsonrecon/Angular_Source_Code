export class HstkCotDzCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idCot: number;
    idHopDong: string;
    idHstk: number;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class HstkKNeoDzCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idKhoangNeo: number;
    idHstk: number;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class HatcCotDzCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idCot: string;
    idHopDong: string;
    idHatc: number;
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

export class HatcKNeoDzCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idKhoangNeo: string;
    idHatc: number;
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

export class BbntCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idCot: string;
    idHopDong: string;
    idBbnt: number
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class BbntKNeoCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idKhoangNeo: string;
    idBbnt: number
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class BvhcCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idCot: string;
    idHopDong: string;
    idBvhc: number
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class BvhcKNeoCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idKhoangNeo: string;
    idBvhc: number
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}

export class tamDungCreateRequest {
    idDonVi: number;
    idDuAn: string;
    idHopDong: string;
    idCot: string;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    noiDung: string;
    tenFile: string;
    fileDinhKem: string;
    userId: string;
}