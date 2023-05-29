import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { formatDate } from '@app/shared/constants/util';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';
import { TrangThaiChungTu, trangThaiCT, trangThaiCTSearch } from '@app/shared/constants/chungtu.const';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { PheDuyetChungTuComponent } from '../phe-duyet-chung-tu/phe-duyet-chung-tu.component';
import { DialogUpdateStatusComponent } from './dialog-update-status/dialog-update-status.component';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ChiTietHoSoComponent } from '../../ho-so-thanh-toan/chi-tiet-ho-so/chi-tiet-ho-so.component';
import { XemChungTuComponent } from '../xem-chung-tu/xem-chung-tu.component';
import { HINH_THUC_TT } from '@app/shared/constants/hosothanhtoan.const';
import * as util from '@app/shared/constants/util';
import { ConfirmDialogComponent } from '@app/shared/component/confirm-dialog/confirm-dialog.component';
import { DialogViewDetailComponent } from './dialog-view-detail/dialog-view-detail.component';
import { ConfirmChuyenTienComponent } from '@app/shared/component/confirm-chuyen-tien/confirm-chuyen-tien.component';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';

@Component({
  selector: 'app-danh-sach-chung-tu',
  templateUrl: './danh-sach-chung-tu.component.html',
  styleUrls: ['./danh-sach-chung-tu.component.scss']
})
export class DanhSachChungTuComponent extends BaseClass implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  hinhThucTT = HINH_THUC_TT
  trangThaiCT = trangThaiCT;
  trangThaiCTSearch = trangThaiCTSearch;
  constTrangTHaiChungTu = TrangThaiChungTu
  totalRecord: any;
  displayedColumns = ["stt", "idChungTu", "ngayLapCT", "noiDungTT", "hoSoTT", "hinhThucChi", "donViThanhToan", "donViHuong", "soTienTTNguyenTe", "soTienTTVND", "ngayHachToan", "trangThaiKyDuyet", "trangThaiCT", "thaoTac"];
  dataTable: any = [];
  tuKhoaChange: any = '';
  trangThaiCTChange: any = -99;
  trangThaiKDChange: any = -99;
  _dateFrom = new Date();
  _dateTo = new Date();
  searchItem: any = {
    NgayYeuCauLapCTStart: this._dateFrom,
    NgayYeuCauLapCTEnd: this._dateTo,
    tuKhoa: '',
    // daXoa: false,
    trangThaiCT: -99,
    trangThaiKD: -99,
    capKy: 1,
    pageSize: 10,
    pageIndex: 1,
    LoaiChungTu: 0
  };
  dataInfo: any;
  danhSachThaoTac = DanhSachThaoTac
  enableButtonDongYChuyenTienNganHang: boolean = false

  constructor(
    public _notification: NotificationService,
    public _service: DanhSachChungTuService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private _hoSoService: HoSoToiTaoService
  ) {
    super();
    this._dateFrom.setMonth(this._dateFrom.getMonth() - 1);
  }

  ngOnInit(): void {
    this.getDSChungtu();
  }
  getDSChungtu(e?: any): any {
    if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
      this.searchItem.pageIndex = e.pageIndex + 1;
    }
    if (e && e.pageSize !== "" && e.pageSize !== undefined) {
      this.searchItem.pageSize = e.pageSize;
    }
    const param = {
      ...this.searchItem,
      NgayYeuCauLapCTStart: !this.searchItem.NgayYeuCauLapCTStart ? '' : util.formatDate(this.searchItem.NgayYeuCauLapCTStart, 'YYYY-MM-DD'),
      NgayYeuCauLapCTEnd: !this.searchItem.NgayYeuCauLapCTEnd ? '' : util.formatDate(this.searchItem.NgayYeuCauLapCTEnd, 'YYYY-MM-DD')
    }
    if (this.searchItem.trangThaiCT === 2) {
      let item = {
        ...this.searchItem,
        trangThaiCT: 3,
      }

      const trangThai2 = this._service.getDSChungTu(param);
      const trangThai3 = this._service.getDSChungTu(item);
      forkJoin([trangThai2, trangThai3])
        .subscribe(
          res => {
            if (res[0]) {
              this.dataTable = res[0].data.Items;
            } else {
              this.dataTable = []
            }
            if (res[1]) {
              this.dataTable = this.dataTable.concat(res[1].data.Items);
            } else {
              this.dataTable = [];
            }
            this.totalRecord = res ? res[0].data.TotalRecord + res[1].data.TotalRecord : 0
          }, err => {
            this._notification.open(
              err,
              mType.error
            );
          }
        );
    } else {
      this._service.getDSChungTu(param).pipe(this.unsubsribeOnDestroy).subscribe(next => {
        this.totalRecord = next ? next.data.TotalRecord : 0;
        this.dataTable = next.data.Items;
        console.log(next)
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      });
    }
  }

  openDialogApprove(id: any, hoSoId: any, element: any) {
    let item: any = {
      id: id,
      capKy: 1,
      hoSoId: hoSoId,
      element: element
    };
    item = JSON.parse(JSON.stringify(item));
    const dialogRef = this.dialog.open(PheDuyetChungTuComponent, {
      width: '80%',
      minWidth: '80vw',
      panelClass: 'dialog-pheduyetct',
      autoFocus: false,
      height: '90vh',
      data: {
        item
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getDSChungtu();
      }
    });
  }

  // changeDaXoa() {
  //   this.searchItem.daXoa = !this.searchItem.daXoa;
  //   this.toHeadPage();
  //   this.getDSChungtu()
  // }

  toHeadPage() {
    if (this.searchItem.tuKhoa != this.tuKhoaChange) {
      this.paginator.firstPage();
      this.tuKhoaChange = this.searchItem.tuKhoa;
    }
    if (this.searchItem.trangThaiCT != this.trangThaiCTChange) {
      this.paginator.firstPage();
      this.trangThaiCTChange = this.searchItem.trangThai;
    }
    if (this.searchItem.trangThaiKD != this.trangThaiKDChange) {
      this.paginator.firstPage();
      this.trangThaiKDChange = this.searchItem.trangThai;
    }
  }

  openDialogConfirm(id: string, hinhThucTT: any, hoSoId: any) {
    if (hinhThucTT === 1) {
      const dialogRef = this.dialog.open(DialogConfirmComponent,
        {
          width: '700px',
          autoFocus: false,
          data: {
            id: id,
            hoSoId: hoSoId
          }
        })
      dialogRef.afterClosed().subscribe((response: any) => {
        if (response === true) {
          this.getDSChungtu();
        }
      });
    }
    if (hinhThucTT !== 1) {
      const dialogRef = this.dialog.open(DialogUpdateStatusComponent,
        {
          width: '450px',
          autoFocus: false,
          data: {
            id: id,
          }
        })
      dialogRef.afterClosed().subscribe((response: any) => {
        if (response === true) {
          this.getDSChungtu();
        }
      });
    }
  }
  openDialogClose(chungTu: any, hoSo: any) {
    let listHD = []
    this._hoSoService.getChitiet(hoSo.hoSoId).pipe(this.unsubsribeOnDestroy).subscribe(
      next => {
        if (next.statusCode == 200) {
          this.dataInfo = next.data[0];
          this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
            listHD.push(x.hanhDong)
          })
          listHD.forEach(x => {
            if (x == this.danhSachThaoTac.btnPheDuyetHS && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
              this.enableButtonDongYChuyenTienNganHang = true
            }
          })
        }
      }
    )
    const confirmDialog = this.dialog.open(ConfirmChuyenTienComponent, { disableClose: false })
    confirmDialog.componentInstance.title = `Xác nhận đóng hồ sơ thanh toán?`;
    confirmDialog.componentInstance.confirmMessage = `Xác nhận đóng hồ sơ ${hoSo.maHoSo} - ${hoSo.tenHoSo}`;
    confirmDialog.componentInstance.confirmClose = this.enableButtonDongYChuyenTienNganHang;

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if (x.hanhDong == this.danhSachThaoTac.btnDongHoSo) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }
        })
        this._service.dongChungTu(chungTu?.chungTuId, thaoTacBuocPheDuyetId)
          .pipe(this.unsubsribeOnDestroy)
          .subscribe(
            res => {
              if (res.success) {
                this._notification.open(
                  res.message,
                  mType.success
                );
                this.getDSChungtu();
              } else {
                this._notification.open(
                  res.message,
                  mType.error
                )
              }
            },
            err => {
              this._notification.open(
                err.error.message,
                mType.error
              )
            })
      } else {
        //this._notification.open('Xoá thất bại!', mType.error);
      }
    });
  }
  view(id: string) {
    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${id}`, {action: 'DS_CHUNG_TU'}]);
  }

  openDialogViewYCC(id){
    const dialogRef = this.dialog.open(DialogViewDetailComponent,
      {
        width: '700px',
        autoFocus: false,
        data: {
          id: id,
        }
      })
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getDSChungtu();
      }
    });
  }

  openDialogView(id: any, element: any) {
    const dialogRef = this.dialog.open(XemChungTuComponent,
      {
        width: '70%',
        minWidth: '70vw',
        panelClass: 'dialog-viewct',
        height: '90vh',
        autoFocus: false,
        data: {
          id: id,
          element: element
        }
      })
  }
}
