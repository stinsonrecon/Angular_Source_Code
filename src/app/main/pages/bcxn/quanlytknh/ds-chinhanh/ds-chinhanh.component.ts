import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChiNhanhNganHang, NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { ChiNhanhNganHangService } from '@app/shared/services/bcxn/chi-nhanh-ngan-hang.service';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { DialogChinhanhComponent } from '../dialog-chinhanh/dialog-chinhanh.component';

@Component({
  selector: 'app-ds-chinhanh',
  templateUrl: './ds-chinhanh.component.html',
  styleUrls: ['./ds-chinhanh.component.scss']
})
export class DsChinhanhComponent extends BaseClass implements OnInit {
  displayedColumns = ["tt", "maChiNhanhErp", "nganHang", "tenChiNhanh", "loaiTK", "trangThai", "thaoTac"];
  listChiNhanh: ChiNhanhNganHang[]
  listNganHang: NganHang[]
  searchItem: any = {
    SearchString: "",
    NganHangId:"0",
    trangThai: -99,
    pageSize: 20,
    pageIndex: 1,
  };
  totalRecord: number;
  filterNH: FormControl;
  filteredNH: any;
  constructor(
    private chiNhanhNganHangService: ChiNhanhNganHangService,
    private _notification: NotificationService,
    private taiKhoanService: TaikhoannhanService,
    private _dialog: MatDialog
  ) { 
    super()
  }

  ngOnInit(): void {
    this.getListChiNhanh()
    this.getListNganHang()
    this.filterNH = new FormControl('');
    this.filterNH.valueChanges.subscribe(
      value => {
        this.filteredNH = this.listNganHang.filter(x => x.tenNganHang.toLowerCase().includes(value.toLowerCase()));
      }
    )
  }
  getListChiNhanh(){
    this.chiNhanhNganHangService.getListChiNhanhNH(this.searchItem).pipe(this.unsubsribeOnDestroy)
    .subscribe(
      (res) =>
      {
        this.listChiNhanh = res.data.Items;
        this.totalRecord = res.data.TotalRecord;
      },
      (err) => {
        this._notification.open(
          "Có lỗi xảy ra! Vui lòng thử lại",
          mType.error
        )
      }
      
    )
  }
  getListNganHang() {
    this.taiKhoanService.getListNganHang().pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          this.listNganHang = res.data.Items;
          this.filteredNH = this.listNganHang;
        }
      )
  }

  createChiNhanh() {
    const dialogRef = this._dialog.open(DialogChinhanhComponent, {
      width: '650px',
      height: '400px',
      autoFocus: false,
      data: {
        action: "CREATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListChiNhanh();
      }
    });
  }

  updateChiNhanh(e) {
    const dialogRef = this._dialog.open(DialogChinhanhComponent, {
      width: '650px',
      height: '400px',
      autoFocus: false,
      data: {
        data: e,
        action: "UPDATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListChiNhanh()
      }
    });
  }

  changeTrangThai(data) {
    const param = {
      ChiNhanhNganHangId: data.chiNhanhNganHangId,
      TenChiNhanh: data.tenChiNhanh,
      MaChiNhanhErp: data.maChiNhanhErp,
      NganHangId: data.nganHangId,
      TrangThai: data.trangThai === 2 ? 1 : 2,
    }
    this.chiNhanhNganHangService.updateChiNhanh(param).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          if (res.success == true) {
            this._notification.open(
              "Cập nhập trạng thái thành công",
              mType.success
            )
          }
          this.getListChiNhanh()
        },
        (err) => {
          this._notification.open(
            "Cập nhập trạng thái thất bại",
            mType.error
          )
          this.getListChiNhanh()
        }
        )
  }

  deleteTaiKhoan(e) {
    this.chiNhanhNganHangService.deleteChiNhanh(e.chiNhanhNganHangId).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          if (res.success == true) {
            this._notification.open(
              res.message,
              mType.success
            )
            this.getListChiNhanh()
          }
        },
        (err) => {
          this._notification.open(
            err.message,
            mType.success
          )
        }
      )
  }

  pageChange(e) {
    this.searchItem.pageSize = e.pageSize;
    this.searchItem.pageIndex = e.pageIndex + 1;
    this.getListChiNhanh()
  }

  searchChiNhanh(){
    this.getListChiNhanh()
  }

}
