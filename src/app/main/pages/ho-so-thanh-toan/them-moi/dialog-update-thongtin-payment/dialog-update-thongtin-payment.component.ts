import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';

@Component({
    selector: 'app-dialog-update-baocao',
    templateUrl: './dialog-update-thongtin-payment.component.html',
    styleUrls: ['./dialog-update-thongtin-payment.component.scss']
})
export class DialogUpdateThongTinPaymentComponent extends BaseClass implements OnInit {
    loaiBaoCao: any = 1
    loaiLinhVuc: any
    dsLinhVucBaoCao: any = [];
    soTaiKhoanThuHuong: 'sssss'
    formControl: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DialogUpdateThongTinPaymentComponent>, 
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public danhMucBaoCaoService: DanhMucBaoCaoService, 
        public dialog: MatDialog, 
        public notification: NotificationService
    ) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            soTaiKhoanThuHuong: [this.data.item.soTaiKhoanThuHuong, [Validators.required]],
            tenTaiKhoanThuHuong: [this.data.item.tenTaiKhoanThuHuong, [Validators.required]],
            soTienThanhToan: [this.data.item.soTienThanhToan, [Validators.required]],
            nganHangThuHuong: [this.data.item.nganHangThuHuong, [Validators.required]],
            hinhThucThanhToan: [this.data.item.hinhThucThanhToan, [Validators.required]],
           
        });
    }
    
    get f() {
        return this.formControl.controls;
    }

    handleUpdatePaymentInfo() {
        // if(res?.statusCode === 200) {
            this.notification.open(
                "Cập nhập thành công!",
                mType.success
            );
        this.dialogRef.close(true)
    }
}
