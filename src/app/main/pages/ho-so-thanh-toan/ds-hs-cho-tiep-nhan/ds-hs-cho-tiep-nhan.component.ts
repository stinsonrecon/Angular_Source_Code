import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { HINH_THUC_TT, MUC_DO_UU_TIEN, TrangThaiHoSo, TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { forkJoin } from 'rxjs';
import * as util from '@app/shared/constants/util';
import { XacnhanComponent } from './xacnhan/xacnhan.component';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-ds-hs-cho-tiep-nhan',
  templateUrl: './ds-hs-cho-tiep-nhan.component.html',
  styleUrls: ['./ds-hs-cho-tiep-nhan.component.scss']
})
export class DsHsChoTiepNhanComponent extends BaseClass implements OnInit {
  trangThai = TRANG_THAI_HO_SO;
  mucDoUuTien = MUC_DO_UU_TIEN;
  hinhThucTT = HINH_THUC_TT;
  displayedColumns: string[] = [
    "stt",
    "maHoSo",
    "tenHoSo",
    "loaiHoSo",
    "donViDeNghiTT",
    "nguoiTao",
    "tongTienDeNghiTT",
    // "hinhThucTT",
    // "thoiHanYeuCauTT",
    "ngayTao",
    // "ngayDuyet",
    // "nguoiDuyet",
    // "noiDung",
    "hanhDong",
  ];

  searchItem: any = {
    // TinhTrangPheDuyet: 12,
    TinhTrangPheDuyet: 0,
    BoPhanYeuCau: 0,
    LoaiHoSo: '',
    TuKhoa: '',
    PageSize: 20,
    PageIndex: 1,
    TuNgay: '',
    DenNgay: '',
    // DaPheDuyet: 0,
    DaPheDuyet: 3,

  };
  dsLoaiHs: any;

  listTest: MatTableDataSource<any>;

  @ViewChild("paginator") paginator: MatPaginator;
  totalRecord: any;
  dsChucNang: any;
  tuKhoaChange: any = "";
  trangThaiChange: any = -99;
  dsDonvi: any;
  filterDonVi: FormControl;
  filteredDonVi: any;

  constructor(
    public dialog: MatDialog,
    public chucNangService: ChucNangService,
    public _notification: NotificationService,
    private _service: HoSoToiTaoService,
    private _authService: AuthService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    const getLoaiHs = this._service.getLoaiHs();
    const getListHs = this._service.getListHoSo(this.searchItem);
    const getListDonVi = this._service.getDsDonVi();

    forkJoin([getLoaiHs, getListHs, getListDonVi])
      .pipe(this.unsubsribeOnDestroy)
      .subscribe(
        res => {
          if (res[0]?.length > 0) {
            this.dsLoaiHs = res[0];
          } else {
            this.dsLoaiHs = []
          }

          if (res[1] && res[1].data?.length > 0) {
            this.listTest = new MatTableDataSource<any>(res[1].data);
            this.totalRecord = res[1].totalRecord;
          } else {
            this.listTest = new MatTableDataSource<any>([]);
            this.totalRecord = 0;
          }

          if (res[2]?.length > 0) {
            this.dsDonvi = res[2];
            this.filteredDonVi = res[2];
          } else {
            this.dsDonvi = [];
            this.filteredDonVi = []
          }
        }
      );
    this.filterDonVi = new FormControl('');
    this.filterDonVi.valueChanges.subscribe(
      value => {
        this.filteredDonVi = this.dsDonvi.filter(x => x.tenDonVi.toLowerCase().includes(value.toLowerCase()));
      }
    )
  }

  searchHs() {
    const param = {
      ...this.searchItem,
      TuNgay: !this.searchItem.TuNgay ? '' : util.formatDate(this.searchItem.TuNgay, 'DD/MM/YYYY'),
      DenNgay: !this.searchItem.DenNgay ? '' : util.formatDate(this.searchItem.DenNgay, 'DD/MM/YYYY')
    }

    this._service.getListHoSo(param)
      .pipe(this.unsubsribeOnDestroy)
      .subscribe(
        res => {
          if (res && res.data?.length > 0) {
            this.listTest = new MatTableDataSource<any>(res.data);
            this.totalRecord = res.totalRecord;
          } else {
            this.listTest = new MatTableDataSource<any>([]);
            this.totalRecord = 0;
          }
        }
      );
  }

  pageChange(e) {
    this.searchItem.pageSize = e.pageSize;
    this.searchItem.pageIndex = e.pageIndex + 1;
    this.searchHs();
  }

  tiepNhan(ele: any) {
    let item: any = {
      maHoSo: ele.maHoSo,
      tenHoSo: ele.tenVietTat,
      loaiHoSo: ele.loaiHoSo,
      loaiHoSoId: ele.loaiHoSoId,
      donVi: ele.donVi,
      nguoiYeuCau: ele.tenNguoiTao,
      soTien: ele.tongTienDeNghiTT,
      ngayGuiYeuCau: ele.ngayTao,
      hoSoId: ele.id,
      nguoiThucHienId: this._authService.user.id,
      loaiTienTe: ele.loaiTienTe
    };
    item = JSON.parse(JSON.stringify(item));
    const confirmDialog = this.dialog.open(XacnhanComponent, {
      autoFocus: false,
      data: {
        item,
        actions: 'access'
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.searchHs();
      }
    });
  }

  tuChoi(ele: any) {
    let item: any = {
      maHoSo: ele.maHoSo,
      tenHoSo: ele.tenVietTat,
      loaiHoSo: ele.loaiHoSo,
      donVi: ele.donVi,
      nguoiYeuCau: ele.tenNguoiTao,
      soTien: ele.tongTienDeNghiTT,
      ngayGuiYeuCau: ele.ngayTao,
      hoSoId: ele.id,
      nguoiThucHienId: this._authService.user.id,
      loaiTienTe: ele.loaiTienTe
    };
    item = JSON.parse(JSON.stringify(item));
    const confirmDialog = this.dialog.open(XacnhanComponent, {
      autoFocus: false,
      data: {
        item,
        actions: 'deny'
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.searchHs();
      }
    });
  }

  getTrangThai(value: number): string {
    return this.trangThai.find(x => x.value === value)?.name;
  }

  getMucDoUuTien(value: number): string {
    return this.mucDoUuTien.find(x => x.value === value)?.name;
  }

  getHinhThucTT(value: number): string {
    return this.hinhThucTT.find(x => x.value === value)?.name;
  }

  view(e: any) {
    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${e}`, { action: 'YEU_CAU_THAY_DOI' }]);
  }

  redirectToTrinh() {
    // this.router.navigate([`/ho-so-thanh-toan`])
  }

}
