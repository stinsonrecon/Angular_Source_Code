export class ThucHienCreateRequest{
  idDonVi: number;
  idDuAn: string;
  idLoaiCongViec: number;
  ngay: Date;
  hangMuc: string;
  danhGia: number;
  ykien: string;
  nguoiGiamSat: string;
  idHangMuc: string;
  tenFile: string;
  fileDinhKem: string;
  dateCreated: string;
  dateModified: string;
  dateTaken: Date;
  latitude: number;
  longitude: number;
  userId: string
}

export class ThucHienUpdateRequest{
  idThucHien: string;
  idLoaiCongViec: number;
  ngay: Date;
  hangMuc: string;
  danhGia: number;
  ykien: string;
  nguoiGiamSat: string;
  idHangMuc: string;
  tenFile: string;
  fileDinhKem: string;
  dateCreated: string;
  dateModified: string;
  dateTaken: Date;
  latitude: number;
  longitude: number;
  userId: string
}