import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogBuocThucHienComponent } from './dialog-buoc-thuc-hien/dialog-buoc-thuc-hien.component';
import { DialogQuyTrinhPheDuyetComponent } from './dialog-quy-trinh-phe-duyet/dialog-quy-trinh-phe-duyet.component';
import { DsBuocCuaMotQuyTrinhComponent } from './ds-buoc-cua-mot-quy-trinh/ds-buoc-cua-mot-quy-trinh.component';

@Component({
  selector: 'app-ds-quy-trinh-phe-duyet',
  templateUrl: './ds-quy-trinh-phe-duyet.component.html',
  styleUrls: ['./ds-quy-trinh-phe-duyet.component.scss']
})
export class DsQuyTrinhPheDuyetComponent extends BaseClass implements OnInit {
  displayedColumns = ["stt", "tenLoaiHoSo", "tenQuyTrinh", "ngayHieuLuc", "moTa", "trangThai", "thaoTac"];
  searchItem: any = {
    tuKhoa: '',
    pageSize: 10,
    pageIndex: 1,
  };
  dataTable: any

  constructor(
    private _quyTrinhPheDuyetService: QuytrinhpheduyetService,
    private dialog: MatDialog,
    private _notification: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getDSQuyTrinh()
  }
  getDSQuyTrinh() {
    this._quyTrinhPheDuyetService.getDSQuyTrinhPheDuyet(this.searchItem).subscribe(
      (res) => {
        if (res.statusCode == 204) {
          this.dataTable = null
        }
        else {
          this.dataTable = res.data
        }
      }
    )
  }
  openDialogQuyTrinh() {
    const dialogRef = this.dialog.open(DialogQuyTrinhPheDuyetComponent, {
      width: '40%',
      autoFocus: false,
      data: {
        action: "CREATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getDSQuyTrinh()
    });
  }

  updateQuyTrinh(e) {
    const dialogRef = this.dialog.open(DialogQuyTrinhPheDuyetComponent, {
      width: '650px',
      height: '400px',
      autoFocus: false,
      data: {
        data: e,
        action: "UPDATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getDSQuyTrinh()
      }
    });
  }

  deleteQuyTrinh(e) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
    confirmDialog.componentInstance.title = 'Xác nhận đóng xác nhận?';
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this._quyTrinhPheDuyetService.deleteQuyTrinh(e.quyTrinhPheDuyetId).pipe(this.unsubsribeOnDestroy)
          .subscribe(
            (res) => {
              if (res.statusCode == 200) {
                this._notification.open(
                  res.message,
                  mType.success
                )
                this.getDSQuyTrinh()
              }
            },
            (err) => {
              this._notification.open(
                err.message,
                mType.success
              )
            }
          )
      }
    })

  }

  openDialogBuocThucHien(e) {
    const dialogRef = this.dialog.open(DsBuocCuaMotQuyTrinhComponent, {
      width: '800px',
      height: '600px',
      autoFocus: false,
      data: {
        data: e
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
      }
    });
  }

}
