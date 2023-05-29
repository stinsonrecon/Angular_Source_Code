import { PagingRequest } from "../common/pagers/paging.request";

export interface Response {
  resultObj: any;
  statusCode: number;
  message: string;
};
export interface PhieuGia {
  items: Item[];
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  pageCount: number;
}

export interface Item {
  idPhieuGia: string;
  soPhieu: string;
  noiDung: string;
  ngayLap: string;
  fileDinhKem?: any;
  truocThueVnd: number;
  thueVnd: number;
  truTamUng: number;
  giuLaiKyNay: number;
  giuLaiKhac: number;
  idDonVi: number;
  tenDonVi?: any;
  idDuAn: string;
  tenDuAn: string;
  idHopDong: string;
  soHopDong: string;
  idNhaThau?: string;
  tenNhaThau?: any;
  dsPhieuGiaGiaTri?: any;
}

export class PhieuGiaPagingRequest extends PagingRequest {
  idDonVi: number;
  namkh: number;
  tungay: string;
  denngay: string;
  idHodong: number;
  idDuAn: string;
}