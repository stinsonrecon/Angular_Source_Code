export class HangMucImportRequest {
    idDonVi: number;
    idDuAn: string;
    action: number;
    // dsHeThong: DSHeThong[];
    dsHangMuc: DSHangMuc[];
}

// export class DSHeThong {
//     idHeThong: string;
//     tenHeThong: string;
//     stt: number;
// }

export class HangMucDeleteRequest {
    idDonVi: number;
    idDuAn: string;
    isLock: boolean;
}

export class DSHangMuc {
    idHangMuc: string;
    tenHangMuc: string;
    stt: number;
    ketThuc: boolean;
    idHeThong: string;
    tenHeThong: string;
    sttHt: number;
}