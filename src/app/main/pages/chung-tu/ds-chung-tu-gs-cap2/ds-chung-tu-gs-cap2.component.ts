import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu, trangThaiCT, trangThaiCTSearch } from '@app/shared/constants/chungtu.const';
import { HINH_THUC_TT } from '@app/shared/constants/hosothanhtoan.const';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';
import * as util from '@app/shared/constants/util';
import { forkJoin } from 'rxjs';
import { PheDuyetChungTuComponent } from '../phe-duyet-chung-tu/phe-duyet-chung-tu.component';
import { DialogConfirmComponent } from '../danh-sach-chung-tu/dialog-confirm/dialog-confirm.component';
import { DialogUpdateStatusComponent } from '../danh-sach-chung-tu/dialog-update-status/dialog-update-status.component';
import { ConfirmDialogComponent } from '../../bcxn/confirm-dialog/confirm-dialog.component';
import { DialogViewDetailComponent } from '../danh-sach-chung-tu/dialog-view-detail/dialog-view-detail.component';
import { XemChungTuComponent } from '../xem-chung-tu/xem-chung-tu.component';
import { XemChungTuGsComponent } from '../xem-chung-tu-gs/xem-chung-tu-gs.component';
import { KyChungTuGsComponent } from '../ky-chung-tu-gs/ky-chung-tu-gs.component';

@Component({
  selector: 'app-ds-chung-tu-gs-cap2',
  templateUrl: './ds-chung-tu-gs-cap2.component.html',
  styleUrls: ['./ds-chung-tu-gs-cap2.component.scss']
})
export class DsChungTuGsCap2Component extends BaseClass implements OnInit {
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
    capKy: 5,
    pageSize: 10,
    pageIndex: 1,
    LoaiChungTu: 1
  };

  constructor(
    public _notification: NotificationService,
    public _service: DanhSachChungTuService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
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
      capKy: 5,
      loaiChungTu: 1,
      hoSoId: hoSoId,
      element: element
    };
    item = JSON.parse(JSON.stringify(item));
    const dialogRef = this.dialog.open(KyChungTuGsComponent, {
      width: '80%',
      minWidth: '80vw',
      panelClass: 'dialog-pheduyetct',
      autoFocus: false,
      height: '90vh',
      data: {
        item,
        ctgs: true,
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getDSChungtu();
      }
    });
  }

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

  openDialogConfirm(id: string, hinhThucTT: any) {
    if (hinhThucTT === 1) {
      const dialogRef = this.dialog.open(DialogConfirmComponent,
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
    // const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
    //     confirmDialog.componentInstance.title = `Xác nhận đóng hồ sơ thanh toán?`;
    //     confirmDialog.componentInstance.confirmMessage = `Xác nhận đóng hồ sơ ${hoSo.maHoSo} - ${hoSo.tenHoSo}`;

    //     confirmDialog.afterClosed().subscribe(result => {
    //         if (result) {
    //           this._service.dongChungTu(chungTu?.chungTuId)
    //           .pipe(this.unsubsribeOnDestroy)
    //           .subscribe(
    //               res => {
    //                   if (res.success) {
    //                       this._notification.open(
    //                           res.message,
    //                           mType.success
    //                       );
    //                       this.getDSChungtu();
    //                   } else {
    //                       this._notification.open(
    //                           res.message,
    //                           mType.error
    //                       )
    //                   }
    //               },
    //               err => {
    //                   this._notification.open(
    //                       err.error.message,
    //                       mType.error
    //                   )
    //               })
    //         } else {
    //             //this._notification.open('Xoá thất bại!', mType.error);
    //         }
    //     });
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
    const dialogRef = this.dialog.open(XemChungTuGsComponent,
      {
        width: '70%',
        minWidth: '70vw',
        panelClass: 'dialog-viewct',
        height: '90vh',
        autoFocus: false,
        data: {
          id: id,
          ctgs: true,
          element: element
        }
      })
  }

}
