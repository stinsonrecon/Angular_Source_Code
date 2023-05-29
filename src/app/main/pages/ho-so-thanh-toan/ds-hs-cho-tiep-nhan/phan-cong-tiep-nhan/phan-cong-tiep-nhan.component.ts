import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { AuthService } from '@app/shared/services';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-phan-cong-tiep-nhan',
  templateUrl: './phan-cong-tiep-nhan.component.html',
  styleUrls: ['./phan-cong-tiep-nhan.component.scss']
})
export class PhanCongTiepNhanComponent extends BaseClass implements OnInit {
  noiDung: string = '';
  listNPD: any;
  filterNPD: any;
  filteredNPD: any;
  nguoiPheDuyet: any
  listHD = []
  dataInfo: any;
  enableButtonDongYTiepNhanHoSo: boolean = false
  enableButtonTuChoiTiepNhanHoSo: boolean = false
  danhSachThaoTac = DanhSachThaoTac
  dataQuyTrinh: any;
  isDataLoaded: boolean = false

  constructor(
    public dialogRef: MatDialogRef<PhanCongTiepNhanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: HoSoToiTaoService,
    public _notification: NotificationService,
    private userService: UserService,
    private quyTrinhPheDuyetService: QuytrinhpheduyetService,
    private _authService: AuthService,
  ) { 
    super()
  }

  ngOnInit(): void {
    this.filterNPD = new FormControl('');
    this.filterNPD.valueChanges.subscribe(
      value => {
        this.filteredNPD = this.listNPD.filter(x => x.id.includes(value));
      }
    )
    this.userService.getUser().pipe(this.unsubsribeOnDestroy).subscribe(
      (rs: any) => {
        this.listNPD = rs;
        this.filteredNPD = this.listNPD;
        this.nguoiPheDuyet = new FormControl('', Validators.required);
        this.filterQuyTrinh()
      })
  }

  filterQuyTrinh() {
    this.quyTrinhPheDuyetService.getQuyTrinhBuocThaoTacByLoaiHoSoId(this.data.item.loaiHoSoId)
      .pipe(
        finalize(() => {
          this._service.getChitiet(this.data.item.hoSoId).subscribe(
            res => {
              if (res.statusCode == 200) {
                this.isDataLoaded = true
                this.dataInfo = res.data[0];
                this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                  this.listHD.push(x.hanhDong)
                })
                this.listHD.forEach(x => {
                  if (x == this.danhSachThaoTac.btnDongYTiepNhanHSVaKyNhay && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                    this.enableButtonDongYTiepNhanHoSo = true
                  }
                  if (x == this.danhSachThaoTac.btnTuChoiTiepNhanHoSoVaKyNhay && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                    this.enableButtonTuChoiTiepNhanHoSo = true
                  }
                })
              }
              let NPD = []
              let buocHienTai = this.dataQuyTrinh[0].listBuocThuHien.filter(x => x.buocPheDuyetId == this.dataInfo.buocPheDuyet.buocPheDuyetId)
              var buocTiepTheo = this.dataQuyTrinh[0].listBuocThuHien.filter(x => x.thuTu == buocHienTai[0].thuTu + 1)
              buocTiepTheo[0].dsNguoiThucHien.forEach(element => {
                NPD.push(this.filteredNPD.filter(x => x.id == element)[0])
              });
              this.filteredNPD = NPD
              // this.nguoiPheDuyet.setValue([this.filteredNPD[0].id])
            }
          )
        })
      )
      .subscribe(
        res => {
          this.dataQuyTrinh = res
        }
      )
  }

  compareFn(x, y): boolean {
    return x === y[0];
  }

  access(action) {
    if (this.nguoiPheDuyet.invalid) {
      this.nguoiPheDuyet.markAllAsTouched()
    }
    else {
      let thaoTacBuocPheDuyetId = ''
      this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
        if (x.hanhDong == action) {
          thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
        }

      })
      let nguoiThamTraId = ''
      if (typeof (this.nguoiPheDuyet.value) == "string") {
        nguoiThamTraId = this.nguoiPheDuyet.value
      }
      else if (typeof (this.nguoiPheDuyet.value) == "object") {
        nguoiThamTraId = this.nguoiPheDuyet.value[0]
      }
      let params = {
        // TrangThaiHoSo: 11,
        // TrangThaiPheDuyet: 9,
        // BuocThucHien: 'tiếp nhận hồ sơ',
        // NoiDung: this.noiDung,
        HoSoId: this.data.item.hoSoId,
        NguoiPhanCongId: this._authService.user.id,
        NguoiDuocPhanCongId: nguoiThamTraId,
        ThaoTacBuocPheDuyetId: this.data.item.thaoTacBuocPheDuyetId,
        // BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
      }
      this._service.phanCong(params).pipe(this.unsubsribeOnDestroy).subscribe(
        (rs: any) => {
          if (rs.statusCode === 200) {
            this._notification.open(rs.message, mType.success);
            this.dialogRef.close(true)
          } else {
            this._notification.open(rs.message, mType.error);
          }
        }
      )
    }

  }

  deny(action) {
  //   let thaoTacBuocPheDuyetId = ''
  //   this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
  //     if (x.hanhDong == action) {
  //       thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
  //     }

  //   })
  //   let params = {
  //     TrangThaiHoSo: 3,
  //     TrangThaiPheDuyet: 9,
  //     BuocThucHien: 'tiếp nhận hồ sơ',
  //     NoiDung: this.noiDung,
  //     HoSoId: this.data.item.hoSoId,
  //     NguoiThucHienId: this._authService.user.id,
  //     ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
  //     BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
  //   }
  //   this._service.xacNhanHSTT(params).pipe(this.unsubsribeOnDestroy).subscribe(
  //     (rs: any) => {
  //       if (rs.success == true) {
  //         this._notification.open('Từ chối tiếp nhận thành công!', mType.success);
  //         this.dialogRef.close(true)
  //       } else {
  //         this._notification.open(rs.message, mType.error);
  //       }
  //     }
  //   )
  }

}
