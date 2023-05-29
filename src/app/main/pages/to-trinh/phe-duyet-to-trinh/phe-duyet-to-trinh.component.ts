import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { ToTrinhService } from '@app/shared/services/to-trinh/to-trinh.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-phe-duyet-to-trinh',
  templateUrl: './phe-duyet-to-trinh.component.html',
  styleUrls: ['./phe-duyet-to-trinh.component.scss']
})
export class PheDuyetToTrinhComponent extends BaseClass implements OnInit {

  class1: string = '';
  class2: string = '';
  class3: string = '';
  pdfSource: string;
  noiDung: FormControl;
  dataInfo: any;
  listHD = []
  enableButtonDongYKy: boolean = false
  enableButtonTuChoiKyToTrinh: boolean = false
  danhSachThaoTac = DanhSachThaoTac
  isChecked: boolean = true

  constructor(
    public _notification: NotificationService,
    public dialogRef: MatDialogRef<PheDuyetToTrinhComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: ToTrinhService,
    public danhMucService: DanhMucBaoCaoService,
    public hoSoToiTaoService: HoSoToiTaoService
  ) {
    super();
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.noiDung = new FormControl();
    if (this.data.item.capKy === 1) {
      this.class1 = "active";
    }
    if (this.data.item.capKy === 2) {
      this.class1 = "completed"
      this.class2 = "active"
    }
    if (this.data.item.capKy === 3) {
      this.class1 = "completed"
      this.class2 = "completed"
      this.class3 = "active"
    }
    if (this.data.item.capKy > 3) {
      this.class1 = "completed"
      this.class2 = "completed"
      this.class3 = "completed"
    }
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.dialogRef.close(false);
      }
    });
    this.noiDung.setValue('');
    this.danhMucService.convertPdfToBase64(this.data.item.fileName).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this.pdfSource = next.data;
      } else {
        this._notification.open(
          next.message,
          mType.error
        );
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
                    if(x == this.danhSachThaoTac.btnDongyKyToTrinh && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonDongYKy = true
                    }
                    if(x == this.danhSachThaoTac.btnTuChoiKyToTrinh && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                      this.enableButtonTuChoiKyToTrinh = true
                  }
                })
        }
      }
    )
  }
  valueChange(e){
    this.isChecked = e.checked
  }

  kyDuyet(action: any){
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
      
    })
    let item: any = {
      NoiDungKy: this.noiDung.value,
      HoSoThanhToanId: this.data.item.hoSoId,
      CapKy: this.data.item.capKy,
      thaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
      BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
    };
    item = JSON.parse(JSON.stringify(item));
    this._service.kyDuyetToTrinh(item).pipe(this.unsubsribeOnDestroy).subscribe(
      res => {
        if (res.success) {
          this._notification.open(res.message, mType.success);
          this.dialogRef.close(true)
        } else {
          this._notification.open(res.message, mType.error);
        }
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      }
    )
  }

  cancel(action){
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
      
    })
    let item: any = {
      NoiDungKy: this.noiDung.value,
      HoSoThanhToanId: this.data.item.hoSoId,
      KySoTaiLieuId: this.data.item.kySoId,
      ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId,
      BuocPheDuyetId: this.dataInfo.buocPheDuyet.buocPheDuyetId
    };
    item = JSON.parse(JSON.stringify(item));
    this._service.huyDuyetToTrinh(item).pipe(this.unsubsribeOnDestroy).subscribe(
      res => {
        if (res.success) {
          this._notification.open(res.message, mType.success);
          this.dialogRef.close(true)
        } else {
          this._notification.open(res.message, mType.error);
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
