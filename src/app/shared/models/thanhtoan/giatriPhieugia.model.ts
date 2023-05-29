export interface Response {
  resultObj: any;
  statusCode: number;
  message: string;
}

export interface PhieuGiaGtri {

  userId?: string;
  idPhieuGia?: string;
  soPhieu: string;
  noiDung: string;
  ngayLap: string;
  namKh?: number;
  fileDinhKem?: any;
  truocThueVnd: number;
  thueVnd: number;
  truTamUng: number;
  giuLaiKyNay: number;
  giuLaiKhac: number;
  idDonVi: number;
  tenDonVi?: any;
  idDuAn: string;
  tenDuAn?: any;
  idHopDong: string;
  soHopDong?: any;
  idNhaThau: string;
  tenNhaThau?: any;
  dsPhieuGiaGiaTri?: DsPhieuGiaGiaTri[];
}

export interface DsPhieuGiaGiaTri {
  idPhieuGia?: string;
  dienGiai: string;
  laVat: boolean;
  idNguonVon: number;
  idDongTien: number;
  tyGia: number;
  xayLap: number;
  thietBi: number;
  khac: number;
  giaTri: number;
  idLoaiVat: number;
  phanTramVat: number;
}