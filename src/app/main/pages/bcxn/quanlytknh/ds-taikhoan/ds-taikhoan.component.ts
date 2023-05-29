import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChiNhanhNganHang, NganHang, TaiKhoanNhan } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { DialogTaikhoanComponent } from '../dialog-taikhoan/dialog-taikhoan.component';

@Component({
  selector: 'app-ds-taikhoan',
  templateUrl: './ds-taikhoan.component.html',
  styleUrls: ['./ds-taikhoan.component.scss']
})
export class DsTaikhoanComponent extends BaseClass implements OnInit {
  displayedColumns = ["tt", "tenTaiKhoan", "soTaiKhoan","sdt", "email", "diaChi", "quocGia", "tinhTP", "tenNganHang", "tenChiNhanh", "donVi", "trangThai", "thoiGianTao", "type", "ghiChu", "thaoTac"];
  searchItem: any = {
    NganHangId: "0",
    ChiNhanhNganHangId: "0",
    SearchString: "",
    trangThai: -99,
    pageSize: 20,
    pageIndex: 1,
  };
  listTKN: TaiKhoanNhan[]
  listNganHang: NganHang[]
  listChiNhanh: ChiNhanhNganHang[]
  totalRecord: number;
  filterNH: FormControl;
  filteredNH: any;
  filterCN: FormControl;
  filteredCN: any;
  actionTrangThai 

  constructor(
    private taiKhoanService: TaikhoannhanService,
    private _dialog: MatDialog,
    private _notification: NotificationService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getListTaiKhoan();
    this.getListNganHang();
    this.getListChiNhanh()
    this.filterNH = new FormControl('');
    this.filterNH.valueChanges.subscribe(
      value => {
        this.filteredNH = this.listNganHang.filter(x => x.tenNganHang.toLowerCase().includes(value.toLowerCase()));
      }
    )
    this.filterCN = new FormControl('');
    this.filterCN.valueChanges.subscribe(
      value => {
        this.filteredCN = this.listChiNhanh.filter(x => x.tenChiNhanh.toLowerCase().includes(value.toLowerCase()));
      }
    )
  }
  getListTaiKhoan() {
    this.taiKhoanService.getListTaiKhoan(this.searchItem).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          this.listTKN = res.data.Items;
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
          this.listNganHang = res.data.Items
          this.filteredNH = this.listNganHang;
        }
      )
  }
  getListChiNhanh(e?) {
    this.taiKhoanService.getListChiNhanhNHByNganHang(e).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          this.listChiNhanh = res.data.Items;
          this.filteredCN = this.listChiNhanh;
        }
      )
  }
  changeNgangHang(e) {
    // this.getListChiNhanh(e.value)
  }

  searchTaiKhoan() {
    this.getListTaiKhoan()
  }

  createTaiKhoan() {
    const dialogRef = this._dialog.open(DialogTaikhoanComponent, {
      width: '700px',
      height: '500px',
      autoFocus: false,
      data: {
        action: "CREATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListTaiKhoan();
      }
    });
  }

  updateTaiKhoan(e) {
    const dialogRef = this._dialog.open(DialogTaikhoanComponent, {
      width: '700px',
      height: '500px',
      autoFocus: false,
      data: {
        data: e,
        action: "UPDATE"
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getListTaiKhoan()
      }
    });
  }

  deleteTaiKhoan(e) {
    this.taiKhoanService.deleteTaiKhoanNhan(e.taiKhoanId).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          if (res.success == true) {
            this._notification.open(
              res.message,
              mType.success
            )
            this.getListTaiKhoan()
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
    this.getListTaiKhoan()
  }

  changeTrangThai(data: any) {
    const param = {
      "TaiKhoanId": data.taiKhoanId,
      "NganHangId": data.nganHangId,
      "ChiNhanhNganHangId": data.chiNhanhNganHangId,
      "DonViId": data.donViId,
      "TenTaiKhoan": data.tenTaiKhoan,
      "SoTaiKhoan": data.soTaiKhoan,
      "TrangThai": data.trangThai === 2 ? 1 : 2,
      "GhiChu": data.ghiChu
  }
  this.taiKhoanService.updateTaiKhoanNhan(param).pipe(this.unsubsribeOnDestroy)
      .subscribe(
          (res) => {
              if (res.success == true) {
                  this._notification.open(
                      'Cập nhập trạng thái thành công',
                      mType.success
                  )
                  
              } else {
                  this._notification.open(
                      'Cập nhập trạng thái thất bại',
                      mType.error
                  )
              }
              this.getListTaiKhoan()
          },
          (err) => {
              this._notification.open(
                  `Cập nhập trạng thái thất bại (${err.message})`,
                  mType.error
              )
              this.getListTaiKhoan()
          }
      )
}

}
