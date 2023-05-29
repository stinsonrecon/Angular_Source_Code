import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { trangThaiCT } from '@app/shared/constants/chungtu.const';
import { TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import { DialogBuocThucHienComponent } from '../dialog-buoc-thuc-hien/dialog-buoc-thuc-hien.component';

@Component({
  selector: 'app-ds-buoc-cua-mot-quy-trinh',
  templateUrl: './ds-buoc-cua-mot-quy-trinh.component.html',
  styleUrls: ['./ds-buoc-cua-mot-quy-trinh.component.scss']
})
export class DsBuocCuaMotQuyTrinhComponent extends BaseClass implements OnInit {

  displayedColumns = [
    "stt",
    "tenBuoc",
    "buocPheDuyetTruoc",
    "buocPheDuyetSau",
    // "trangThaiHoSo",
    // "trangThaiChungTu",
    "thuTu",
    "thoiGianXuLy",
    "taiKhoan",
    "nguoiThucHien",
    "thaoTac"
  ];
  searchItem: any = {
    tuKhoa: '',
    pageSize: 10,
    pageIndex: 1,
  };
  dataTable: any
  trangThaiHoSo = TRANG_THAI_HO_SO
  trangThaiChungTu = trangThaiCT

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DsBuocCuaMotQuyTrinhComponent>,
    private _quyTrinhPheDuyetService: QuytrinhpheduyetService,
    private dialog: MatDialog,
    private _notification: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getBuocTheoQuyTrinh(this.data.data.quyTrinhPheDuyetId)
  }
  getBuocTheoQuyTrinh(e) {
    this._quyTrinhPheDuyetService.getListBuocTheoQuyTrinh(e).subscribe(
      res => {
        if (res.length != 0) {
          this.dataTable = res
        }
        else {
          this.dataTable = []
        }
      }
    )
  }
  getTrangThaiHoSo(value) {
    let a = value.split(',')
    let b = []
    a.forEach(element => {
      b.push(this.trangThaiHoSo.find(x => x.value == element)?.name)
    });
    return b
  }
  getTrangThaiChungTu(value) {
    if(value == "") {
      return null
    }
    else{
      let a = value.split(',')
      let b = []
      a.forEach(element => {
        b.push(this.trangThaiChungTu.find(x => x.id == value)?.name);
      });
      return b
    }
  }
  openDialogBuocThucHien(e, action) {
    const dialogRef = this.dialog.open(DialogBuocThucHienComponent, {
      width: '1000px',
      height: '600px',
      autoFocus: false,
      data: {
        data: e,
        action: action
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getBuocTheoQuyTrinh(this.data.data.quyTrinhPheDuyetId)
      }
    });
  }

}
