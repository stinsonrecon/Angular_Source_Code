import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { loaiDonVi } from '@app/shared/constants/bcxn.constants';
import { TinhTPService } from '@app/shared/services/bcxn/danhmuctinhtp.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogAddTinhtpComponent } from './dialog-add-tinhtp/dialog-add-tinhtp.component';

@Component({
  selector: 'app-danhmuctinhtp',
  templateUrl: './danhmuctinhtp.component.html',
  styleUrls: ['./danhmuctinhtp.component.scss']
})
export class DanhmuctinhtpComponent extends BaseClass implements OnInit {

  @ViewChild("paginator") paginator: MatPaginator;
  totalRecord: any;
  displayedColumns = ["stt", "maTinhTP", "tenTinhTp", "tenQuocGia", "trangThai", "thaoTac"];
  dsDonVi: any;
  tuKhoaChange: any = "";
  trangThaiChange: any = -99;
  loaiDonVi = loaiDonVi;
  searchItem: any = {
    tuKhoa: '',
    trangThai: -99,
    pageSize: 10,
    pageIndex: 1
  }
  constructor(
    public dialog: MatDialog,
    public _notification: NotificationService,
    private formBuilder: FormBuilder,
    private tinhTPService: TinhTPService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getListTinhTP();
  }
  getListTinhTP(e?: any) {
    if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
      this.searchItem.pageIndex = e.pageIndex + 1;
    }
    if (e && e.pageSize !== "" && e.pageSize !== undefined) {
      this.searchItem.pageSize = e.pageSize;
    }
    this.tinhTPService.getTinhTP(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      this.dsDonVi = next.data;
      this.totalRecord = next ? next.totalRecord : 0;
    })
  }

  openDialogAddTinhTP() {
    let item: any = {
    };

    const dialogRef = this.dialog.open(DialogAddTinhtpComponent, {
      width: '700px',
      autoFocus: false,
      data: {
        data: item,
        actions: 'create'
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListTinhTP();
      }
    });
  }
  openDialogUpdateTinhTP(element: any) {
    let item: any = {
    };
    item = JSON.parse(JSON.stringify(element));
    const dialogRef = this.dialog.open(DialogAddTinhtpComponent, {
      width: '700px',
      autoFocus: false,
      data: {
        data: item,
        actions: 'update'
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListTinhTP();
      }
    });
  }

  changeTrangThai(element: any){
    this.tinhTPService.getQuocGia().pipe(this.unsubsribeOnDestroy).subscribe(res => {
      let item = {
        ...element,
        trangThai: element.trangThai === 1 ? 2 : 1,
        quocGia: res.find(x=> x.tenQuocGia === element.tenQuocGia)
      }
      item = JSON.parse(JSON.stringify(item));
      delete item['tenQuocGia'];
      this.tinhTPService.updateTinhTP(item).pipe(this.unsubsribeOnDestroy).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this._notification.open(
              res.message,
              mType.success
            )
            this.getListTinhTP();
          } else {
            this._notification.open(
              res.message,
              mType.error
            )
          }
        },
        (err) => {
          this._notification.open(
            err.message,
            mType.error
          )
        }
      )
    })
  }
  deleteTinhTPById(id: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
    confirmDialog.componentInstance.title = 'Xác nhận xóa?';
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.tinhTPService.deleteTinhTP(id).subscribe(resp =>{
            if (resp.statusCode == 200) {
                this._notification.open(
                    "Xóa thành công!",
                    mType.success
                );
                this.getListTinhTP();
            } else {
                this._notification.open(
                    "Xóa thất bại!",
                    mType.error
                );
            }
        })
      }
    });
  }
  
  toHeadPage() {
    if (this.searchItem.tuKhoa != this.tuKhoaChange) {
      this.paginator.firstPage();
      this.tuKhoaChange = this.searchItem.tuKhoa;
    }
    if (this.searchItem.trangThai != this.trangThaiChange) {
      this.paginator.firstPage();
      this.trangThaiChange = this.searchItem.trangThai;
    }
  }
}
