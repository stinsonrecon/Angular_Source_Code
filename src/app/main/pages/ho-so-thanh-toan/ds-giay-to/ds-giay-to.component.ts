import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { BaseClass } from '@app/base-class';

@Component({
  selector: 'app-ds-giay-to',
  templateUrl: './ds-giay-to.component.html',
  styleUrls: ['./ds-giay-to.component.scss']
})
export class DsGiayToComponent extends BaseClass implements OnInit {

  @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;
    displayedColumns = ["tt", "idGiayTo", "maGiayTo", "tenGiayTo", "kySo", "nguon", "trangThai", "ngayTao", "nguoiTao", "thaoTac"];
    dataFake: any = [
        {
            maGiayTo: 'PC_CVP_EVNICT_VTB',
            tenGiayTo: 'Cấp phát chi phí SXKD cho EVNICT quý 4 2021',
            kySo: 'Nguyễn Văn Long',
            nguon: '',
            trangThai: 'Đã gửi ngân hàng',
            ngayTao: '01/12/2021',
            nguoiTao: ''
        },
        {
            maGiayTo: 'UNC_VP_VPP_VCB',
            tenGiayTo: 'Ủy nhiệm chi NCC Văn phòng phẩm quý 4 2021',
            kySo: 'Nguyễn Văn Long',
            nguon: '',
            trangThai: 'Chưa gửi ngân hàng',
            ngayTao: '02/12/2021',
            nguoiTao: ''
        },
        {
            maGiayTo: 'UNC_SAL_VPEVN_122021',
            tenGiayTo: 'Thanh toán lương tháng 12 năm 2021  Văn phòng EVN',
            kySo: 'Mai Thị Liên',
            nguon: '',
            trangThai: 'Chưa gửi ngân hàng',
            ngayTao: '02/12/2021',
            nguoiTao: ''
        },
    ];
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    searchItem: any = {
        tuKhoa: "",
        pageSize: 10,
        pageIndex: 1,
        loaiHoSo: -99,
        trangThai: -99
    };

    constructor(public dialog: MatDialog, public _notification: NotificationService, private formBuilder: FormBuilder,) { super() }

    ngOnInit(): void {
        this.getLenhNganHangAll();
    }
    getLenhNganHangAll(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
    }
    toHeadPage() {
        if(this.searchItem.tuKhoa != this.tuKhoaChange) {
            this.paginator.firstPage();
            this.tuKhoaChange = this.searchItem.tuKhoa;
        }
        if(this.searchItem.trangThai != this.trangThaiChange) {
            this.paginator.firstPage();
            this.trangThaiChange = this.searchItem.trangThai;
        }
    }
}
