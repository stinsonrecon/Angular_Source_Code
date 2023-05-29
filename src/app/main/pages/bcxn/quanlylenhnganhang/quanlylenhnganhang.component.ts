import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { convertViToEn } from '@app/shared/constants/util';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-quanlylenhnganhang',
    templateUrl: './quanlylenhnganhang.component.html',
    styleUrls: ['./quanlylenhnganhang.component.scss']
})

export class QuanLyLenhNganHangComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;
    displayedColumns = ["tt", "maChungTu", "moTaChungTu", "nguoiTao", "ngayLap", "ngayNganHangHachToan", "trangThai", "chon", "thaoTac"];
    dataFake: any = [
        {
            maChungTu: 'PC_CVP_EVNICT_VTB',
            moTaChungTu: 'Cấp phát chi phí SXKD cho EVNICT quý 4 2021',
            nguoiTao: 'Nguyễn Văn Long',
            ngayLap: '01/12/2021',
            ngayNganHangHachToan: '',
            trangThai: 'Đã gửi ngân hàng',
            chon: ''
        },
        {
            maChungTu: 'UNC_VP_VPP_VCB',
            moTaChungTu: 'Ủy nhiệm chi NCC Văn phòng phẩm quý 4 2021',
            nguoiTao: 'Nguyễn Văn Long',
            ngayLap: '02/12/2021',
            ngayNganHangHachToan: '',
            trangThai: 'Chưa gửi ngân hàng',
            chon: ''
        },
        {
            maChungTu: 'UNC_SAL_VPEVN_122021',
            moTaChungTu: 'Thanh toán lương tháng 12 năm 2021  Văn phòng EVN',
            nguoiTao: 'Mai Thị Liên',
            ngayLap: '02/12/2021',
            ngayNganHangHachToan: '',
            trangThai: 'Chưa gửi ngân hàng',
            chon: ''
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
