import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu, trangThaiCT, trangThaiCTSearch } from '@app/shared/constants/chungtu.const';
import { formatDate } from '@app/shared/constants/util';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';
import { forkJoin } from 'rxjs';
import { DialogConfirmComponent } from '../danh-sach-chung-tu/dialog-confirm/dialog-confirm.component';
import { PheDuyetChungTuComponent } from '../phe-duyet-chung-tu/phe-duyet-chung-tu.component';
import * as util from '@app/shared/constants/util';
import { XemChungTuComponent } from '../xem-chung-tu/xem-chung-tu.component';
import { HINH_THUC_TT } from '@app/shared/constants/hosothanhtoan.const';

@Component({
  selector: 'app-phe-duyet-ke-toan',
  templateUrl: './phe-duyet-ke-toan.component.html',
  styleUrls: ['./phe-duyet-ke-toan.component.scss']
})
export class PheDuyetKeToanComponent extends BaseClass implements OnInit {

  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  hinhThucTT = HINH_THUC_TT
  trangThaiCT = trangThaiCT;
  trangThaiCTSearch = trangThaiCTSearch;
  constTrangThaiChungTu = TrangThaiChungTu
  totalRecord: any;
  displayedColumns = ["stt", "idChungTu", "ngayLapCT", "noiDungTT", "hoSoTT", "hinhThucChi", "donViThanhToan", "donViHuong", "soTienTTNguyenTe", "soTienTTVND", "ngayHachToan", "trangThaiKyDuyet", "trangThaiCT", "thaoTac"];
  dataTable: any = [];
  tuKhoaChange: any = '';
  trangThaiCTChange: any = -99;
  trangThaiKDChange: any = -99;
  _dateFrom = new Date();
  _dateTo = new Date();
  searchItem: any = {
    NgayYeuCauLapCTStart: this._dateFrom,
    NgayYeuCauLapCTEnd: this._dateTo,
    tuKhoa: '',
    trangThaiCT: -99,
    trangThaiKD: -99,
    capKy: 2,
    pageSize: 10,
    pageIndex: 1,
    LoaiChungTu: 0
  };

  constructor(
    public dialog: MatDialog,
    public _notification: NotificationService,
    public _service: DanhSachChungTuService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super();
    this._dateFrom.setMonth(this._dateFrom.getMonth() - 1);
  }

  ngOnInit(): void {
    this.getDSChungtu();
  }

  openDialogApprove(id: any, status: any, hoSoId: any, element) {
    if (status === 2) {
      let item: any = {
        id: id,
        capKy: 2,
        hoSoId: hoSoId,
        element: element
      };
      item = JSON.parse(JSON.stringify(item));
      const dialogRef = this.dialog.open(PheDuyetChungTuComponent, {
        width: '80%',
        minWidth: '80vw',
        panelClass: 'dialog-pheduyetct',
        autoFocus: false,
        height: '90vh',
        data: {
          item,
        }
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        if (response === true) {
          this.getDSChungtu();
        }
      });
    } else this._notification.open("Ký duyệt không đúng cấp", mType.error)
  }

  getDSChungtu(e?: any): any {
    console.log(this.searchItem)
    if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
      this.searchItem.pageIndex = e.pageIndex + 1;
    }
    if (e && e.pageSize !== "" && e.pageSize !== undefined) {
      this.searchItem.pageSize = e.pageSize;
    }
    const param = {
      ...this.searchItem,
      NgayYeuCauLapCTStart: !this.searchItem.NgayYeuCauLapCTStart ? '' : util.formatDate(this.searchItem.NgayYeuCauLapCTStart, 'YYYY-MM-DD'),
      NgayYeuCauLapCTEnd: !this.searchItem.NgayYeuCauLapCTEnd ? '' : util.formatDate(this.searchItem.NgayYeuCauLapCTEnd, 'YYYY-MM-DD')
    }

    if (this.searchItem.trangThaiCT === 2) {
      let item = {
        ...this.searchItem,
        trangThaiCT: 3,
      }

      const trangThai2 = this._service.getDSChungTu(param);
      const trangThai3 = this._service.getDSChungTu(item);
      forkJoin([trangThai2, trangThai3])
        .subscribe(
          res => {
            if (res[0]) {
              this.dataTable = res[0].data.Items;
            } else {
              this.dataTable = []
            }
            if (res[1]) {
              this.dataTable = this.dataTable.concat(res[1].data.Items);
            } else {
              this.dataTable = [];
            }
            this.totalRecord = res ? res[0].data.TotalRecord + res[1].data.TotalRecord : 0
          }, err => {
            this._notification.open(
              err,
              mType.error
            );
          }
        );
    } else {
      this._service.getDSChungTu(param).pipe(this.unsubsribeOnDestroy).subscribe(next => {
        this.totalRecord = next ? next.data.TotalRecord : 0;
        this.dataTable = next.data.Items;
        console.log(next)
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      });
    }
  }



  toHeadPage() {
    if (this.searchItem.tuKhoa != this.tuKhoaChange) {
      this.paginator.firstPage();
      this.tuKhoaChange = this.searchItem.tuKhoa;
    }
    if (this.searchItem.trangThaiCT != this.trangThaiCTChange) {
      this.paginator.firstPage();
      this.trangThaiCTChange = this.searchItem.trangThaiCT;
    }
    if (this.searchItem.trangThaiKD != this.trangThaiKDChange) {
      this.paginator.firstPage();
      this.trangThaiKDChange = this.searchItem.trangThaiKD;
    }
  }
  view(id: string) {
    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${id}`, {action: 'CHUNG_TU_KE_TOAN'}]);
  }

  openDialogView(id: any, element) {
    const dialogRef = this.dialog.open(XemChungTuComponent,
      {
        width: '70%',
        minWidth: '70vw',
        panelClass: 'dialog-viewct',
        autoFocus: false,
        height: '90vh',
        data: {
          id: id,
          element: element
        }
      })
  }
}
