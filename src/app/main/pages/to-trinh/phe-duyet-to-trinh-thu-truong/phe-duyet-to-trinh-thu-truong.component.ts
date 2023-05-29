import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { ToTrinh } from '@app/shared/models/hosothanhtoan/ds-to-trinh.model';
import { ToTrinhService } from '@app/shared/services/to-trinh/to-trinh.service';
import { PheDuyetToTrinhComponent } from '../phe-duyet-to-trinh/phe-duyet-to-trinh.component';
import * as util from '@app/shared/constants/util';
import { forkJoin } from 'rxjs';
import { ViewToTrinhComponent } from '../view-to-trinh/view-to-trinh.component';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';

@Component({
  selector: 'app-phe-duyet-to-trinh-thu-truong',
  templateUrl: './phe-duyet-to-trinh-thu-truong.component.html',
  styleUrls: ['./phe-duyet-to-trinh-thu-truong.component.scss']
})
export class PheDuyetToTrinhThuTruongComponent extends BaseClass implements OnInit {
  searchItem: any = {
    TuKhoa: null,
    DaKy: -99,
    TuNgay: '',
    DenNgay: '',
    CapKy: 3,
    PageIndex: 1,
    PageSize: 10,
    CapKyTrongHoSo: 3
  }
  displayedColumns = ["stt", "noiDungToTring", "hoSoThanhToan", "ngayTring", "soTienTTVND", "trangThai", "thaoTac"];
  dataTable: ToTrinh[]
  totalRecord: number;
  hoSoDetail: any

  constructor(
    private toTrinhService: ToTrinhService,
    private dialog: MatDialog,
    private router: Router,
    public hoSoService: HoSoToiTaoService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getToTringPaging()
  }
  getToTringPaging() {
    const param = {
      ...this.searchItem,
      TuNgay: (this.searchItem.TuNgay == "" || this.searchItem.TuNgay == null) ? "" : util.formatDate(this.searchItem.TuNgay, 'DD/MM/YYYY'),
      DenNgay: (this.searchItem.DenNgay == "" || this.searchItem.DenNgay == null) ? "" : util.formatDate(this.searchItem.DenNgay, 'DD/MM/YYYY')
    }
    this.toTrinhService.getToTrinhPaging(param).subscribe(
      (res) => {
        this.dataTable = res.data.Items
        this.totalRecord = res.data.TotalRecord
      }
    )
  }

  search() {
    this.getToTringPaging()
  }

  openDialogApprove(ele: any) {
    this.hoSoService.getChitiet(ele.hoSoThanhToanId).subscribe(
      (res) => {
        this.hoSoDetail = res.data[0];
        let item: any = {
          kySoId: (this.hoSoDetail && this.hoSoDetail.capKy > 2) ? this.hoSoDetail.taiLieuKyId[2] : ele.kySoTaiLieuId,
          fileName: this.hoSoDetail.taiLieuKy,
          capKy: 3,
          hoSoId: ele.hoSoThanhToanId
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(PheDuyetToTrinhComponent, {
          width: '80%',
          minWidth: '80vw',
          panelClass: 'dialog-pheduyettt',
          autoFocus: false,
          height: '90vh',
          data: {
            item
          }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
          if (response === true) {
            this.getToTringPaging()
          }
        });
      }
    )
  }

  openDialogView(ele: any) {
    this.hoSoService.getChitiet(ele.hoSoThanhToanId).subscribe(
      (res) => {
        this.hoSoDetail = res.data[0];
        let item: any = {
          kySoId: (this.hoSoDetail && this.hoSoDetail.capKy > 2) ? this.hoSoDetail.taiLieuKyId[2] : ele.kySoTaiLieuId,
          fileName: this.hoSoDetail.taiLieuKy,
          capKy: 3,
          hoSoId: ele.hoSoThanhToanId
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(ViewToTrinhComponent, {
          width: '80%',
          minWidth: '80vw',
          panelClass: 'dialog-viewtt',
          autoFocus: false,
          height: '90vh',
          data: {
            item
          }
        });
      })
  }

  pageChange(e) {
    this.searchItem.PageSize = e.pageSize;
    this.searchItem.PageIndex = e.pageIndex + 1;
    this.getToTringPaging()
  }
  view(id: string) {
    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${id}`, {action: 'TO_TRINH_THU_TRUONG'}]);
  }
}
