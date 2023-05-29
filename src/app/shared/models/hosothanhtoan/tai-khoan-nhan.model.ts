export interface TaiKhoanNhan {
    taiKhoanId: string,
    chiNhanhNganHangId: string,
    nganHangId: string,
    tenTaiKhoan: string,
    soTaiKhoan: string,
    trangThai: number,
    thoiGianTao: string,
    ghiChu: string,
    tenNganHang: string,
    tenChiNhanh: string
}
export interface DSTaiKhoanNhanColection {
    data:
    {
        TotalRecord: number;
        Items: TaiKhoanNhan[];
    }
    errorCode: string,
    message: string,
    success: boolean
  }

  export interface ChiNhanhNganHang {
    chiNhanhNganHangId: string,
    nganHangId: string,
    maChiNhanhErp: string,
    trangThai: number,
    tenChiNhanh: string,
    daXoa: boolean,
    tenNganHang: string
}
export interface DSChiNhanhNganHangColection {
    data:
    {
        TotalRecord: number;
        Items: ChiNhanhNganHang[];
    }
    errorCode: string,
    message: string,
    success: boolean
  }

  export interface NganHang {
    maNganHang: string,
    nganHangId: string,
    maChiNhanhErp: string,
    trangThaiTiepNhan: number,
    ghiChu: string,
    daXoa: boolean,
    tenNganHang: string,
    tenVietTat: string,
    thoiGianTao: string,
    thoiGianTiepNhan: string
}

export interface TaiKhoanNH extends NganHang {
    tenNganHangVietTat: string,
    tenTaiKhoan: string,
    soTaiKhoan: string
}
export interface DSNganHangColection {
    data:
    {
        TotalRecord: number;
        Items: NganHang[];
    }
    errorCode: string,
    message: string,
    success: boolean
  }

export interface CauHinhNganHang {
    cauHinhNganHangId : string,
    nganHangId : string,
    maNganHang : string,
    tenNganHang: string,
    linkTransferUrl : string,
    linkQueryBaseUrl: string,
    fTPPath : string,
    fTPUserName : string,
    fTPPassword: string,
    eVNDSAPath : string,
    passPhraseDSA: string,
    eVNRSAPath: string,
    passPhraseRSA: string,
    bankDSAPath : string,
    bankRSAPath : string,
    bankApprover : string,
    bankSenderAddr : string,
    bankModel : string,
    version : string,
    softwareProviderId : string,
    bankLanguage : string,
    bankAppointedApprover : string,
    bankChannel : string,
    bankMerchantId : string,
    bankClientIP : string,
    daXoa : boolean
}

export interface CauHinhNganHangCollection {
    data : 
    {
        TotalRecord: number,
        Items: CauHinhNganHang[]
    },
    errorCode: string,
    message: string,
    success: boolean
}