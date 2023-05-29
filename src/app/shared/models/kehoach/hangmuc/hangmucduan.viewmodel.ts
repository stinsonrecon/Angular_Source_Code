export interface HangMucDuAnViewModel {
    idHangMuc: string;
    idDonVi: number;
    idDuAn: string;
    idHangMucCha: string;
    maHangMuc?: any;
    tenHangMuc: string;
    thuTu: number;
    suDung: boolean;
}


export interface HangMucDuAnCreate {
    idHangMucCha: string;
    maHangMuc: string;
    tenHangMuc: string;
    thuTu: number;
    suDung: boolean;
  }
  
  export interface HangMucDuAnUpdate {
    idHangMuc: string;
    maHangMuc: string;
    tenHangMuc: string;
    thuTu: number;
    suDung: boolean;
  }
  

// export interface HangMucDuAnRespon {
//     resultObj: HangMucDuAnViewModel[];
//     statusCode: number;
//     message: string;
// }
