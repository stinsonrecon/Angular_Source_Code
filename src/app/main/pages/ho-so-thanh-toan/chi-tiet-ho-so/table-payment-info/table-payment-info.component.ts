import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { ConfirmDialogComponent } from '@app/main/pages/bcxn/confirm-dialog/confirm-dialog.component';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { MatTable } from '@angular/material/table';


const listTest = [
    {
        "id": 2,
        "soTaiKhoanThuHuong": "001212 00233333",
        "tenTaiKhoanThuHuong": "Nguyễn Ngọc Hiệp",
        "soTienThanhToan": "300.000.333",
        "nganHangThuHuong": 1,
        "hinhThucThanhToan": 3,
        "mucDoUuTien": "khẩn",
        "trangThaiHoSo": "Đang phê duyệt",
        "loaiHoSo": "Văn phòng phẩm",
        "tongTienDeNghiTT": "5 000 000",
        "hanhDong": 1
    },
    {
        "id": 3,
        "soTaiKhoanThuHuong": "001212 0001212 12345",
        "tenTaiKhoanThuHuong": "Hoang Thị Hồng Ngát",
        "soTienThanhToan": "300.000.333",
        "nganHangThuHuong": 2,
        "hinhThucThanhToan": 2,
        "mucDoUuTien": "khẩn",
        "trangThaiHoSo": "Đang phê duyệt",
        "loaiHoSo": "Văn phòng phẩm",
        "tongTienDeNghiTT": "5 000 000",
        "hanhDong": 1
    },

]
@Component({
  selector: 'app-view-table-payment-info',
  templateUrl: './table-payment-info.component.html',
  styleUrls: ['./table-payment-info.component.scss']
})
export class ViewTablePaymentInfo extends BaseClass implements OnInit {
    formControl: FormGroup
    formCreatePaymentInfo: FormGroup
    dataToDisplay :any =[];
    displayedColumns: string[] = [
        "stt",
        "soTaiKhoanThuHuong",
        "tenTaiKhoanThuHuong",
        "soTienThanhToan",
        "nganHangThuHuong",
        "hinhThucThanhToan",
        // "hanhDong"
    ];

    dataSource = new ExampleDataSource(this.dataToDisplay);
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;

    constructor(
        public dialog: MatDialog, 
        public chucNangService: ChucNangService,
        public _service: HoSoToiTaoService, 
        public _notification: NotificationService, 
        private formBuilder: FormBuilder
    ) { 
        super() 
    }

    ngOnInit(): void {
        this.dataToDisplay = [this._service.infoHoSo];
        console.log(this.dataToDisplay)
        this.formCreatePaymentInfo = this.formBuilder.group({
            inputStkNguoiThuHuong: ['', [Validators.required]],
            inputTenTkNhanTien: ['', [Validators.required]],
            inputSoTienThanhToan: ['', [Validators.required]],
            inputNganHangThuHuong: ['', [Validators.required]],
            inputHinhThucThanhToan: ['', [Validators.required]],

        })
        this.dataSource.setData(this.dataToDisplay)
    }

    get formPaymentInfo() {
        return this.formCreatePaymentInfo.controls;
    }

    savePaymentInfo() {
        const {
            inputHinhThucThanhToan, 
            inputNganHangThuHuong, 
            inputSoTienThanhToan, 
            inputStkNguoiThuHuong, 
            inputTenTkNhanTien
        } = this.formCreatePaymentInfo.value;

        let newData = {
            "id": 5,
            "soTaiKhoanThuHuong": inputStkNguoiThuHuong,
            "tenTaiKhoanThuHuong": inputTenTkNhanTien,
            "soTienThanhToan": inputSoTienThanhToan,
            "nganHangThuHuong": inputNganHangThuHuong,
            "hinhThucThanhToan": inputHinhThucThanhToan,
            "mucDoUuTien": "khẩn",
            "trangThaiHoSo": "Đang phê duyệt",
            "loaiHoSo": "Văn phòng phẩm",
            "tongTienDeNghiTT": "5 000 000",
            "hanhDong": 1
        }
        this.dataToDisplay = [...this.dataToDisplay, newData]
        this.dataSource.setData(this.dataToDisplay)
        this.formCreatePaymentInfo.reset()
    }

}

class ExampleDataSource extends DataSource<any> {
    private _dataStream = new ReplaySubject<any[]>();

    constructor(initialData: any[]) {
      super();
      this.setData(initialData);
    }

    connect(): Observable<any[]> {
      return this._dataStream;
    }

    disconnect() {}

    setData(data: any[]) {
      this._dataStream.next(data);
    }
  }
