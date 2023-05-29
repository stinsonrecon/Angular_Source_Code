import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu } from '@app/shared/constants/chungtu.const';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { AuthService } from '@app/shared/services';
import { PheDuyetChungTuService } from '@app/shared/services/chung-tu/phe-duyet-chung-tu.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';

@Component({
  selector: 'app-phe-duyet-chung-tu',
  templateUrl: './phe-duyet-chung-tu.component.html',
  styleUrls: ['./phe-duyet-chung-tu.component.scss']
})
export class PheDuyetChungTuComponent extends BaseClass implements OnInit {

  dataView: any;
  class1: string = '';
  class2: string = '';
  class3: string = '';
  capKy: any;
  noiDung: FormControl;
  constTrangThaiChungTu = TrangThaiChungTu
  listHD = []
  dataInfo: any;
  enableButtonDongYKyChungTu: boolean = false
  enableButtonTuChoiKyChungTu: boolean = false
  danhSachThaoTac = DanhSachThaoTac
  isChecked: boolean = true

  constructor(
    public _service: PheDuyetChungTuService,
    public dialogRef: MatDialogRef<PheDuyetChungTuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _notification: NotificationService,
    private _authService: AuthService,
    private hoSoToiTaoService: HoSoToiTaoService
  ) {
    super();
    this.noiDung = new FormControl();
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
        if (event.key === "Escape") {
            this.dialogRef.close(false);
        }
    });
    this.noiDung.setValue('');
    this._service.getBanTheHien(this.data.item.id).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      this.dataView = next;
        if (this.dataView.ChungTu?.trangThaiCT === 1) {
          this.class1 = "active";
        }
        if (this.dataView.ChungTu?.trangThaiCT === 2) {
          this.class1 = "completed"
          this.class2 = "active"
        }
        if (this.dataView.ChungTu?.trangThaiCT === 3) {
          this.class1 = "completed"
          this.class2 = "completed"
          this.class3 = "active"
        }
        if (this.dataView.ChungTu?.trangThaiCT === 4) {
          this.class1 = "completed"
          this.class2 = "completed"
          this.class3 = "completed"
        }
      console.log(next)
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    });

    this.hoSoToiTaoService.getChitiet(this.data.item.hoSoId).subscribe(
      res => {
        if(res.statusCode == 200) {
          this.dataInfo = res.data[0];
                this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                    this.listHD.push(x.hanhDong)
                })
                this.listHD.forEach(x => {
                    if(x == this.danhSachThaoTac.btnDongYKyChungTu && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonDongYKyChungTu = true
                    }
                    if(x == this.danhSachThaoTac.btnTuChoiKyChungTu && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                      this.enableButtonTuChoiKyChungTu = true
                  }
                })
        }
      }
    )
  }

  kyDuyet(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
      
    })
    let item: any = {
      NguoiKyId: this._authService.user.id,
      NoiDungKy: this.isChecked == true ? "Đồng ý" : this.noiDung.value,
      ChungTuId: this.data.item.id,
      CapKy: this.data.item.capKy,
      // KySoId: this.dataView.DanhSachChuKyCuaChungTu.Items.find(e => e.capKy === this.dataView.ChungTu?.capKy).kySoId,
      ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
      BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
    };
    item = JSON.parse(JSON.stringify(item));
    this._service.kyDuyet(item).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this._notification.open(next.message, mType.success);
        this.dialogRef.close(true)
      } else if(!next.success) {
        this._notification.open(next.message, mType.error);
      }
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    });
  }

  khongDuyet(action) {
      let cap = this.dataView.ChungTu?.capKy;
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
      
    })
    let item: any = {
      HoSoId: this.dataView.ChungTu?.hoSoThanhToan?.hoSoId,
      ChungTuId: this.data.item.id,
      NoiDungKy: this.noiDung.value,
      CapKy: this.dataView.ChungTu?.capKy + 1,
      KySoId: this.dataView.DanhSachChuKyCuaChungTu.Items.find(e => e.capKy === cap).kySoId,
      ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId
    };
    item = JSON.parse(JSON.stringify(item));
    this._service.khongDuyet(item).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this._notification.open(next.message, mType.success);
        this.dialogRef.close(true)
      } else {
        this._notification.open(next.message, mType.error);
      }
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    });
  }
}
