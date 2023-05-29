import { TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { element } from 'protractor';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-danhsachhosothamchieu',
    templateUrl: './danhsachhosothamchieu.component.html',
    styleUrls: ['./danhsachhosothamchieu.scss']
})

export class DanhSachHoSoThamChieuComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    totalRecord: any;
    displayedColumns = ["tt","moTa", "soTien", "maLoaiHoSo",  "coHieuLuc"];
    dataFake: any = []
    trangThaiHS = [
        { value: "5", name: 'Khởi tạo'},
        { value: "1", name: 'Chưa phê duyệt' },
        { value: "2", name: 'Đã soát xét' },
        { value: "3", name: 'Yêu cầu thay đổi' },
        { value: "4", name: 'Đã thanh toán' },
        { value: "6", name: 'Đã tạo chứng từ' },
        { value: "7", name: 'Đã đóng' },
        { value: "8", name: 'Đang trình ký' },
        { value: "-1", name: 'Đã xóa'}
    ];
    tuKhoaChange: any = "";
    trangThaiChange: any = 1;
    searchItem: any = {
        TuKhoa: "",
        Trangthaihoso: "",
        pageSize: 10,
        pageIndex: 1,
    };
    checked: boolean = false
    arrHSTC: any[] = []
    currentLoaiHoSo = this.data.loaiHoSo

    constructor(
        public dialog: MatDialog, 
        public loaiHoSoService: DanhMucLoaiHoSoService, 
        public _notification: NotificationService, 
        private formBuilder: FormBuilder,
        public hoSoToiTaoService: HoSoToiTaoService,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        ) { super() }

    ngOnInit(): void {
        this.getLoaiHoSoAll();
    }

    ngOnDestroy(): void
    {
        this.searchItem = {
            TuKhoa: "",
            Trangthaihoso: "",
            pageSize: 10,
            pageIndex: 1,
        };
    }

    changeTrangThai(idx: any, index) {
        this.dataFake[index] = {...this.dataFake[index], active: !this.dataFake[index].active}
        this.hoSoToiTaoService.changeDataHoSoThamChieu(this.dataFake)
        if(idx.active === false) {
            this.data.arrayPicked.push({...idx, active: true})
        } else {
            this.data.arrayPicked = this.data.arrayPicked.filter(item => item.hoSoId !== idx.hoSoId)
        }
        this.data.arrHoSoThamChieu = this.dataFake;
        this.hoSoToiTaoService.changeDataHoSoThamChieuChecked(this.data.arrayPicked)
    }

    getLoaiHoSoAll(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.hoSoToiTaoService.getHoSoThamChieu(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.totalRecord = next ? next.totalRecord : 0;
            this.dataFake = next.data.map(obj => ({...obj, active: false}));
            let arrIndex = []
            this.dataFake.map((item, index) => {
                let check = this.data.arrayPicked.findIndex(item2 => item.hoSoId === item2.hoSoId);
                if(check !==  -1) {
                    this.dataFake[index] = {...this.dataFake[index], active: true}
                }
            })
            this.hoSoToiTaoService.changeDataHoSoThamChieu(this.dataFake)

        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }

    deleteLoaiHoSoById(id: any) {
       
    }
    formatNumber(number) {
        return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    toHeadPage() {
        if (this.searchItem.tuKhoa != this.tuKhoaChange) {
            this.paginator.firstPage();
            this.tuKhoaChange = this.searchItem.tuKhoa;
        }
        if (this.searchItem.trangThai != this.trangThaiChange) {
            this.paginator.firstPage();
            this.trangThaiChange = this.searchItem.trangThai;
        }
    }

    renderTrangThaiHoSo(ele) {
        switch (ele) {
            case 1:
                return "Chưa phê duyệt"
            case 2:
                return "Đã soát xét"
            case 3:
                return "Yêu cầu thay đổi"
            case 4:
                return "Đã thanh toán"
            case 5:
                return "Khởi tạo"
            case 6:
                return "Đã tạo chứng từ"
            case 7:
                return "Đã đóng"
            case 8:
                return "Đang trình ký"
            case -1: 
                return "Đã xoá"
            default:
                break;
        }
    }
}
