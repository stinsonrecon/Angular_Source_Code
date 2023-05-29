import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { ChiNhanhNganHangService } from '@app/shared/services/bcxn/chi-nhanh-ngan-hang.service';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';

@Component({
  selector: 'app-dialog-chinhanh',
  templateUrl: './dialog-chinhanh.component.html',
  styleUrls: ['./dialog-chinhanh.component.scss']
})
export class DialogChinhanhComponent extends BaseClass implements OnInit {
  formChiNhanh: FormGroup;

  listNganHang: NganHang[];
  filterNH: FormControl;
  filteredNH: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DialogChinhanhComponent>,
    private fb: FormBuilder,
    private _notification: NotificationService,
    private taiKhoanService: TaikhoannhanService,
    private chiNhanhNganHangService: ChiNhanhNganHangService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getListNganHang()
    this.filterNH = new FormControl('');
    this.filterNH.valueChanges.subscribe(
      value => {
        this.filteredNH = this.listNganHang.filter(x => x.tenNganHang.toLowerCase().includes(value.toLowerCase()));
      }
    )
    this.formChiNhanh = this.fb.group({
      tenChiNhanh: ["", Validators.required],
      maChiNhanhERP: ["", Validators.required],
      tenNganHang: ["", Validators.required],
      loaiTK: ["CITAD"],
      trangThai: [true]
    })
    if (this.data.action == "UPDATE") {
      this.formChiNhanh.patchValue({
        tenChiNhanh: this.data.data.tenChiNhanh,
        maChiNhanhERP: this.data.data.maChiNhanhErp,
        tenNganHang: this.data.data.nganHangId,
        loaiTK: this.data.data.loaiTaiKhoan,
        trangThai: this.data.data.trangThai === 1 ? true : false
      })
    }
  }

  getListNganHang() {
    let lookupType = 'CITAD'
    this.taiKhoanService.getListNganHangCITAD(lookupType).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          this.listNganHang = res.data.Items;
          this.filteredNH = res.data.Items
        }
      )
  }

  createChiNhanh() {
    if (this.formChiNhanh.valid) {
      const param = {
        TenChiNhanh: this.formChiNhanh.get("tenChiNhanh").value,
        MaChiNhanhErp: this.formChiNhanh.get("maChiNhanhERP").value,
        NganHangId: this.formChiNhanh.get("tenNganHang").value,
        LoaiTaiKhoan: this.formChiNhanh.get("loaiTK").value,
        TrangThai: this.formChiNhanh.get("trangThai").value === true ? 1 : 2,
      }
      this.chiNhanhNganHangService.createChiNhanh(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (res) => {
            if (res.success == true) {
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
      this.formChiNhanh.markAllAsTouched();
    }

  }

  updateChiNhanh() {
    if (this.formChiNhanh.valid) {
      const param = {
        ChiNhanhNganHangId: this.data.data.chiNhanhNganHangId,
        TenChiNhanh: this.formChiNhanh.get("tenChiNhanh").value,
        MaChiNhanhErp: this.formChiNhanh.get("maChiNhanhERP").value,
        NganHangId: this.formChiNhanh.get("tenNganHang").value,
        LoaiTaiKhoan: this.formChiNhanh.get("loaiTK").value,
        TrangThai: this.formChiNhanh.get("trangThai").value === true ? 1 : 2,
      }
      this.chiNhanhNganHangService.updateChiNhanh(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (res) => {
            if (res.success == true) {
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
      this.formChiNhanh.markAllAsTouched();
    }

  }
  close() {
    this.dialogRef.close(false);
  }

}
