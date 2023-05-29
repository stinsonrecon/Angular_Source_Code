import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu } from '@app/shared/constants/chungtu.const';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { AuthService } from '@app/shared/services';
import { PheDuyetChungTuService } from '@app/shared/services/chung-tu/phe-duyet-chung-tu.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';

@Component({
  selector: 'app-ky-ho-so-tham-chieu',
  templateUrl: './ky-ho-so-tham-chieu.component.html',
  styleUrls: ['./ky-ho-so-tham-chieu.component.scss']
})
export class KyHoSoThamChieuComponent extends BaseClass implements OnInit {
  FormNoiDungTT: FormGroup
  dataView: any;
  class1: string = '';
  class2: string = '';
  class3: string = '';
  capKy: any;
  noiDung: FormControl;
  constTrangThaiChungTu = TrangThaiChungTu

  taiLieuKy: string = ''
  listHD = []
  dataInfo: any;
  danhSachThaoTac = DanhSachThaoTac
  isChecked: boolean = true

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public _service: PheDuyetChungTuService,
    public hsttService: HoSoToiTaoService,
    public dialogRef: MatDialogRef<KyHoSoThamChieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _notification: NotificationService,
    private _authService: AuthService,
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
    let header = `HoSoId=${this.data.item.idHoSo}&GiayToId=${this.data.item.phieuThamTra.idGiayTo}`
    this.hsttService.kyPhieuThamTra(header).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      this.taiLieuKy = next.data.taiLieuKy

      this.dataView = next.data
      if(this.data.capKy === 1) {
        this.class1 = "active";
      } else {
        this.class1 = "completed"
        this.class2 = "active"
      }
    })
    this.FormNoiDungTT = this.formBuilder.group({
      noiDung: ['']
    })
    // this.noiDung.setValue('');
    this.hsttService.getChitiet(this.data.item.idHoSo).subscribe(
      res => {
        if(res.statusCode == 200) {
          this.dataInfo = res.data[0];
                this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                    this.listHD.push(x.hanhDong)
                })
              //   this.listHD.forEach(x => {
              //       if(x == 17 && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
              //           this.enableButtonDongYTiepNhanHoSo = true
              //       }
              //   })
        }
      }
    )
  }
  valueChange(e){
    // console.log(e)
    this.isChecked = e.checked
  }

  kyDuyet(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
    })
    let dataPost = {
      "GiayToId": this.data.item.phieuThamTra.idGiayTo,
      "HoSoThanhToanId": this.data.item.idHoSo,
      "CapKy": 3,
      "NoiDungKy": this.isChecked == true ? "Đồng ý" : this.FormNoiDungTT.value.noiDung,
      "ThaoTacBuocPheDuyetId": thaoTacBuocPheDuyetId,
      "BuocPheDuyetId": this.dataInfo.buocPheDuyet.buocPheDuyetId
    }
    this.hsttService.kyCap2PhieuThamTra(dataPost).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this._notification.open(next.message, mType.success);
      }
      this.dialogRef.close(true)
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${this.data.item.idHoSo}`, { action: "YEU_CAU_THAY_DOI" }]); // navigate to same route
      // });
      this.router.navigate([`/ho-so-thanh-toan/hosothamtra`])
    }, error => {
      this._notification.open(
        error,
        mType.error
      );
      this.dialogRef.close(true)
    })
  }

  khongDuyet(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
    })
    let dataPost = {
      "GiayToId": this.data.item.phieuThamTra.idGiayTo,
      "HoSoThanhToanId": this.data.item.idHoSo,
      "CapKy": 0,
      "NoiDungKy": this.FormNoiDungTT.value.noiDung,
      "ThaoTacBuocPheDuyetId": thaoTacBuocPheDuyetId
    }
    this.hsttService.kyCap2PhieuThamTra(dataPost).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this._notification.open(next.message, mType.success);
      }
      this.dialogRef.close(true)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${this.data.item.idHoSo}`, { action: "YEU_CAU_THAY_DOI" }]); // navigate to same route
      });
    }, error => {
      this._notification.open(
        error,
        mType.error
      );
      this.dialogRef.close(true)
    })
  }
}
