import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';

@Component({
  selector: 'app-dialog-update-status',
  templateUrl: './dialog-update-status.component.html',
  styleUrls: ['./dialog-update-status.component.scss']
})
export class DialogUpdateStatusComponent extends BaseClass implements OnInit {

  noiDung: FormControl;
  dialogData: any;

  constructor(
    private _service: DanhSachChungTuService,
    private dialogRef: MatDialogRef<DialogUpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _notification: NotificationService,
  ) {
    super();
    this.noiDung = new FormControl();
  }

  ngOnInit(): void {
    this.noiDung.setValue('');
    this._service.getDetailConfirm(this.data.id)
      .pipe(this.unsubsribeOnDestroy)
      .subscribe(
        res => {
          if (res.success) {
            this.dialogData = res.data;
          }
        },
        err => {
          this._notification.open(
            err,
            mType.error
          )
        }
      )
  }

  ok() {
    let item: any = {
      noiDung: this.noiDung.value,
      chungTuId: this.data.id,
      nguoiThuHuong: this.dialogData.tenTaiKhoanNhan,
      hoSoId: this.dialogData.hoSoThanhToan.hoSoId,
      soTien: this.dialogData.soTien,
    }
    item = JSON.parse(JSON.stringify(item));
    this._service.updateStatus(item).pipe(this.unsubsribeOnDestroy)
      .subscribe(res => {
        if(res.success){
          this._notification.open(res.message,mType.success);
          this.dialogRef.close(true);
        } else {
          this._notification.open(res.message,mType.error);
        }
      })
  }

}
