import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';

@Component({
  selector: 'app-dialog-quy-trinh-phe-duyet',
  templateUrl: './dialog-quy-trinh-phe-duyet.component.html',
  styleUrls: ['./dialog-quy-trinh-phe-duyet.component.scss']
})
export class DialogQuyTrinhPheDuyetComponent extends BaseClass implements OnInit {
  formQuyTrinh: FormGroup;
  listLoaiHoSo: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DialogQuyTrinhPheDuyetComponent>,
    private fb: FormBuilder,
    private _notification: NotificationService,
    private _loaiHoSoService: DanhMucLoaiHoSoService,
    private _quyTrinhService: QuytrinhpheduyetService,
  ) {
    super()
   }

  ngOnInit(): void {
    this.formQuyTrinh = this.fb.group({
      loaiHoSoId: ["", Validators.required],
      tenQuyTrinh: ["", Validators.required],
      ngayHieuLuc: ["", Validators.required],
      moTa: [""],
      trangThai: [true]
    })
    if(this.data.action == 'UPDATE'){
      this.formQuyTrinh.patchValue({
        loaiHoSoId: this.data.data.loaiHoSoId,
        tenQuyTrinh: this.data.data.tenQuyTrinh,
        ngayHieuLuc: this.data.data.ngayHieuLuc,
        moTa: this.data.data.moTa,
        trangThai: this.data.data.trangThai
      })
    }
    this.getAllLoaiHoSo();
  }

  getAllLoaiHoSo() {
    this._loaiHoSoService.getAllLoaiHoSo(3).subscribe(
      (res) => {
        if(res) {
          this.listLoaiHoSo = res
        }
      }
    )
  }

  createQuyTrinh() {
    if (this.formQuyTrinh.valid) {
      const param = {
        LoaiHoSoId: this.formQuyTrinh.get("loaiHoSoId").value,
        TenQuyTrinh: this.formQuyTrinh.get("tenQuyTrinh").value,
        NgayHieuLuc: this.formQuyTrinh.get("ngayHieuLuc").value,
        MoTa: this.formQuyTrinh.get("moTa").value,
        // TrangThai: this.formQuyTrinh.get("trangThai").value === true ? 1 : 2,
      }
      this._quyTrinhService.createQuyTrinh(param).pipe(this.unsubsribeOnDestroy)
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
      this.formQuyTrinh.markAllAsTouched();
    }

  }

  updateQuyTrinh(){
    if (this.formQuyTrinh.valid) {
      const param = {
        QuyTrinhPheDuyetId: this.data.data.quyTrinhPheDuyetId,
        LoaiHoSoId: this.formQuyTrinh.get("loaiHoSoId").value,
        TenQuyTrinh: this.formQuyTrinh.get("tenQuyTrinh").value,
        NgayHieuLuc: this.formQuyTrinh.get("ngayHieuLuc").value,
        MoTa: this.formQuyTrinh.get("moTa").value,
        TrangThai: this.formQuyTrinh.get("trangThai").value,
      }
      this._quyTrinhService.updateQuyTrinh(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (res) => {
            if (res.statusCode == 200) {
              this._notification.open(
                res.message,
                mType.success
              )
            }
            this.dialogRef.close(true);
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
      this.formQuyTrinh.markAllAsTouched();
    }
  }

}
