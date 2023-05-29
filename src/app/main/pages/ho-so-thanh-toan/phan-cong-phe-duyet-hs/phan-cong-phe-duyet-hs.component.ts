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
  selector: 'app-phan-cong-phe-duyet-hs',
  templateUrl: './phan-cong-phe-duyet-hs.component.html',
  styleUrls: ['./phan-cong-phe-duyet-hs.component.scss']
})
export class PhanCongPheDuyetHsComponent extends BaseClass implements OnInit {
  noiDung: string = '';
  listNPD: any;
  filterNPD: any;
  filteredNPD: any;
  nguoiPheDuyet: any
  listHD = []
  dataInfo: any;
  enableButtonDongYTiepNhanHoSo: boolean = false
  danhSachThaoTac = DanhSachThaoTac
  isDataLoaded: boolean = false
  dataQuyTrinh: any;

  constructor(
    public dialogRef: MatDialogRef<PhanCongPheDuyetHsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: HoSoToiTaoService,
    public _notification: NotificationService,
    private userService: UserService,
    private _authService: AuthService,
    private quyTrinhPheDuyetService: QuytrinhpheduyetService
  ) {
    super()
    this.filterNPD = new FormControl('');

  }

  ngOnInit() {
    this.filterNPD.valueChanges.subscribe(
      value => {
        this.filteredNPD = this.listNPD.filter(x => x.id.includes(value));
      }
    )
    this.userService.getUser().pipe(this.unsubsribeOnDestroy).subscribe(
      (rs: any) => {
        this.listNPD = rs;
        this.filteredNPD = this.listNPD;
        this.nguoiPheDuyet = new FormControl();
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
                // this.listHD.forEach(x => {
                //   if (x == 17 && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                //     this.enableButtonDongYTiepNhanHoSo = true
                //   }
                // })
              }
              let NPD = []
              let buocHienTai = this.dataQuyTrinh[0].listBuocThuHien.filter(x => x.buocPheDuyetId == this.dataInfo.buocPheDuyet.buocPheDuyetId)
              var buocTiepTheo = this.dataQuyTrinh[0].listBuocThuHien.filter(x => x.thuTu == buocHienTai[0].thuTu + 1)
              buocTiepTheo[0].dsNguoiThucHien.forEach(element => {
                NPD.push(this.filteredNPD.filter(x => x.id == element)[0])
              });
              this.filteredNPD = NPD
              this.nguoiPheDuyet.setValue(this.filteredNPD[0].id)
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
    return x === y;
  }

  phanCong(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if (x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }

    })
    let params = {
      TrangThaiHoSo: 1,
      TrangThaiPheDuyet: 12,
      BuocThucHien: 'Phân công phê duyệt hồ sơ',
      NoiDung: this.noiDung,
      HoSoId: this.data.item.hoSoId,
      NguoiThucHienId: this._authService.user.id,
      NguoiPheDuyetHoSoId: this.nguoiPheDuyet.value,
      ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
      BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
    }
    this._service.updateStatusHSTT(params).pipe(this.unsubsribeOnDestroy).subscribe(
      (rs: any) => {
        if (rs.statusCode === 201) {
          this._notification.open(rs.message, mType.success);
          this.dialogRef.close(true)
        } else {
          this._notification.open(rs.message, mType.error);
        }
      }
    )
  }

  tuChoi(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if (x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }

    })
    let params = {
      TrangThaiHoSo: 1,
      TrangThaiPheDuyet: 10,
      BuocThucHien: '',
      NoiDung: this.noiDung,
      HoSoId: this.data.item.hoSoId,
      NguoiThucHienId: this._authService.user.id,
      // NguoiPheDuyetHoSoId: this.nguoiPheDuyet.value,
      ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
      BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
    }
    this._service.updateStatusHSTT(params).pipe(this.unsubsribeOnDestroy).subscribe(
      (rs: any) => {
        if (rs.statusCode === 201) {
          this._notification.open(rs.message, mType.success);
          this.dialogRef.close(true)
        } else {
          this._notification.open(rs.message, mType.error);
        }
      }
    )
  }

}
