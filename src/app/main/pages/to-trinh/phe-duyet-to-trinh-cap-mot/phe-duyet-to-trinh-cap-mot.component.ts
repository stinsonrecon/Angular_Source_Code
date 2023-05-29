import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { ToTrinh } from '@app/shared/models/hosothanhtoan/ds-to-trinh.model';
import { ToTrinhService } from '@app/shared/services/to-trinh/to-trinh.service';
import { PheDuyetToTrinhComponent } from '../phe-duyet-to-trinh/phe-duyet-to-trinh.component';
import * as util from '@app/shared/constants/util';

@Component({
  selector: 'app-phe-duyet-to-trinh-cap-mot',
  templateUrl: './phe-duyet-to-trinh-cap-mot.component.html',
  styleUrls: ['./phe-duyet-to-trinh-cap-mot.component.scss']
})
export class PheDuyetToTrinhCapMotComponent extends BaseClass implements OnInit {
  searchItem: any = {
    TuKhoa: null,
    DaKy: -99,
    TuNgay: '',
    DenNgay: '',
    CapKy: 1,
    PageIndex: 1,
    PageSize: 20
  }
  displayedColumns = ["stt", "noiDungToTring", "hoSoThanhToan", "ngayTring", "soTienTTNguyenTe", "soTienTTVND", "trangThai", "thaoTac"];
  dataTable: ToTrinh[]
  totalRecord: number

  constructor(
    private toTrinhService: ToTrinhService,
    private dialog: MatDialog,
    private router: Router,
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
    this.toTrinhService.getToTrinhPaging(param).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (res) => {
          this.dataTable = res.data.Items
          this.totalRecord = res.data.TotalRecord
        }
      )
  }

  search() {
    this.getToTringPaging()
  }

  openDialogApprove(id: any) {
    let item: any = {
      id: id,
      capKy: 1,
    };
    item = JSON.parse(JSON.stringify(item));
    const dialogRef = this.dialog.open(PheDuyetToTrinhComponent, {
      width: '80%',
      minWidth: '80vw',
      autoFocus: false,
      panelClass: 'dialog-pheduyettt',
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

  pageChange(e) {
    this.searchItem.pageSize = e.pageSize;
    this.searchItem.pageIndex = e.pageIndex + 1;
    this.getToTringPaging()
  }
  view(id: string) {
    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${id}`]);
  }

}
