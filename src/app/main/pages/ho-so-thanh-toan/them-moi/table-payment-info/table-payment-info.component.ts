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
import { DialogUpdateThongTinPaymentComponent } from '../dialog-update-thongtin-payment/dialog-update-thongtin-payment.component';
import { ConfirmDialogComponent } from '@app/main/pages/bcxn/confirm-dialog/confirm-dialog.component';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';


const listTest = [
    {
        "id": 2,
        "soTaiKhoanThuHuong": "001212 00233333",
        "tenTaiKhoanThuHuong": "Nguyễn Ngọc Hiệp",
        "soTienThanhToan": "300.000.333",
        "nganHangThuHuong": 'MB',
        "hinhThucThanhToan": 3,
        "mucDoUuTien": "khẩn",
        "trangThaiHoSo": "Đang phê duyệt",
        "loaiHoSo": "Văn phòng phẩm",
        "tongTienDeNghiTT": "5 000 000",
        "hanhDong": 1
    },

]
@Component({
  selector: 'app-table-payment-info',
  templateUrl: './table-payment-info.component.html',
  styleUrls: ['./table-payment-info.component.scss']
})
export class TablePaymentInfo extends BaseClass implements OnInit {
    formControl: FormGroup
    formCreatePaymentInfo: FormGroup
    dataToDisplay = [...listTest]
    inputSoTienThanhToan:any =  ''
    dataSource = new ExampleDataSource(this.dataToDisplay);
    public dataBanks = []
    displayedColumns: string[] = [
        "stt",
        "soTaiKhoanThuHuong",
        "tenTaiKhoanThuHuong",
        "soTienThanhToan",
        "nganHangThuHuong",
        "hinhThucThanhToan",
        "hanhDong"
    ];
    inputHinhThucThanhToan: any = 1

    constructor(
        public dialog: MatDialog, 
        public chucNangService: ChucNangService, 
        public _notification: NotificationService, 
        private formBuilder: FormBuilder,
        public hoSoToiTaoService: HoSoToiTaoService,
    ) { 
        super() 
    }

    ngOnInit(): void {
        this.formCreatePaymentInfo = this.formBuilder.group({
            inputStkNguoiThuHuong: ['', [Validators.required]],
            inputTenTkNhanTien: ['', [Validators.required]],
            inputSoTienThanhToan: ['', [Validators.required]],
            inputNganHangThuHuong: ['', [Validators.required]],
            inputHinhThucThanhToan: ['', [Validators.required]],
        })

        this.hoSoToiTaoService.getDSNganHang().pipe(this.unsubsribeOnDestroy).subscribe(banks => {            
            this.dataBanks = banks
        })
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
            "soTienThanhToan": this.removeDots(inputSoTienThanhToan),
            "nganHangThuHuong": this.formatNganHang(inputNganHangThuHuong),
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

    openDialogUpdatePaymentInfo(element) {
        const item = JSON.parse(JSON.stringify(element))
        
        const dialogRef = this.dialog.open(DialogUpdateThongTinPaymentComponent, {
            width: '600px',
            autoFocus: false,
            data: {
                item
            }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            
        });
    }

    deletePaymentInfo(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';

        this.dataSource.setData(this.dataToDisplay)
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataToDisplay = this.dataToDisplay.filter(item => item.id !== id)
                // this.baoCaoService.deleteBaoCao(id).subscribe(res => {
                //     if(res.statusCode == 200) {
                //         this._notification.open('Xoá thành công!', mType.success);
                //         this.getBaoCao();
                //     } else {
                //         this._notification.open('Xoá thất bại!', mType.error);
                //     }
                // });
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        });
    
    }

    addCommasTongTienTTVND(value) {
        this.inputSoTienThanhToan = this.formatNumber(value)
    }

    formatNumber(number: string) {
        return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    removeDots(number: string) {
        return number.split('.').join("");
    }

    formatNganHang(bank: string) {
        return bank.split('/')[1].toString()
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
