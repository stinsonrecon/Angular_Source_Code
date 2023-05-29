import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TinhTPService } from '@app/shared/services/bcxn/danhmuctinhtp.service';

@Component({
  selector: 'app-dialog-add-tinhtp',
  templateUrl: './dialog-add-tinhtp.component.html',
  styleUrls: ['./dialog-add-tinhtp.component.scss']
})
export class DialogAddTinhtpComponent extends BaseClass implements OnInit {
  formTinhTP: FormGroup;
  dsQuocGia: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DialogAddTinhtpComponent>,
    private fb: FormBuilder,
    private _notification: NotificationService,
    private service: TinhTPService,
  ) {
    super()
  }
  
  ngOnInit(): void {
    this.formTinhTP = this.fb.group({
      tenTinhTP: ["", Validators.required],
      maTinhTP: ["", Validators.required],
      tenQuocGia: ["", Validators.required],
      trangThai: [true]
    })
    this.service.getQuocGia().pipe(this.unsubsribeOnDestroy).subscribe(res => {
      this.dsQuocGia = res;
      if (this.data.actions == "update") {
        this.formTinhTP.patchValue({
          tenTinhTP: this.data.data.tenTinhTp,
          maTinhTP: this.data.data.maTinhTp,
          tenQuocGia: this.dsQuocGia.find(x => x.tenQuocGia === this.data.data.tenQuocGia),
          trangThai: this.data.data.trangThai === 1 ? true : false
        })
      }
    })
  }

  createTinhTP() {
    if (this.formTinhTP.valid) {
      const param = {
        tenTinhTP: this.formTinhTP.get("tenTinhTP").value,
        maTinhTP: this.formTinhTP.get("maTinhTP").value,
        QuocGia: this.formTinhTP.get("tenQuocGia").value,
        TrangThai: this.formTinhTP.get("trangThai").value === true ? 1 : 2,
        DaXoa: 1
      }
      this.service.createTinhTP(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (res) => {
            if (res.statusCode == 200) {
              this._notification.open(
                res.message,
                mType.success
              )
              this.dialogRef.close(true);
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
    }
    else {
      this.formTinhTP.markAllAsTouched();
    }

  }

  updateTinhTP() {
    if (this.formTinhTP.valid) {
      const param = {
        tinhTpId: this.data.data.tinhTpId,
        tenTinhTP: this.formTinhTP.get("tenTinhTP").value,
        maTinhTP: this.formTinhTP.get("maTinhTP").value,
        QuocGia: this.formTinhTP.get("tenQuocGia").value,
        TrangThai: this.formTinhTP.get("trangThai").value === true ? 1 : 2,
        DaXoa: 1
      }
      this.service.updateTinhTP(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (res) => {
            if (res.statusCode == 200) {
              this._notification.open(
                res.message,
                mType.success
              )
              this.dialogRef.close(true);
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
    }
    else {
      this.formTinhTP.markAllAsTouched();
    }

  }
  close() {
    this.dialogRef.close(false);
  }

}
