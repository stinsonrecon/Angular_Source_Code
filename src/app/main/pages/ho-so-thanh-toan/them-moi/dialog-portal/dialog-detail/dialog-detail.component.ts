import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { PortalSerice } from '@app/shared/services/ho-so-thanh-toan/portal.service';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent extends BaseClass implements OnInit {

  dataDetail: any;
  listVpp: any
  displayedColumnsVPP: string[] = ['noiDung', 'nguoiDeNghi', 'ngayDeNghi', 'soNguoiDK', 'trangThai', 'listVpp'];
  displayedColumnsTH: string[] = ['soHoaDon', 'nguoiDeNghi', 'PPThanhToan', 'trangThai', 'xuLy'];

  constructor(
    public dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: PortalSerice,
    public _notification: NotificationService,
  ) {
    super();
    if(this.data.type === "PDK") {
      this._service.getChiTietPhieuVPP(this.data.id).pipe(this.unsubsribeOnDestroy).subscribe(
        (res: any) => {
          if (res.success) {
            this.dataDetail = [res.data];
            this.listVpp = JSON.parse(res.data.ListVPP);
            console.log(this.listVpp);
          } else {
            this._notification.open(
              'Có lỗi xảy ra',
              mType.error
            );
          }
        }, err => {
          this._notification.open(
            err,
            mType.error
          );
        }
      )
    } else {
      this._service.getChiTietPhieuTH(this.data.id).pipe(this.unsubsribeOnDestroy).subscribe(
        (res: any) => {
          if (res.success) {
            this.dataDetail = [res.data];
          } else {
            this._notification.open(
              'Có lỗi xảy ra',
              mType.error
            );
          }
        }, err => {
          this._notification.open(
            err,
            mType.error
          );
        }
      )

    }
  }

  ngOnInit(): void {

  }

}
