import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';

@Component({
    selector: 'app-view-dialog-update-baocao',
    templateUrl: './dialog-update-thongtin-payment.component.html',
    styleUrls: ['./dialog-update-thongtin-payment.component.scss']
})
export class ViewDialogUpdateThongTinPaymentComponent extends BaseClass implements OnInit {
    loaiBaoCao: any = 1
    loaiLinhVuc: any
    dsLinhVucBaoCao: any = [];
    soTaiKhoanThuHuong: 'sssss'
    formControl: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ViewDialogUpdateThongTinPaymentComponent>, 
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public danhMucBaoCaoService: DanhMucBaoCaoService, 
        public dialog: MatDialog, 
        public notification: NotificationService
    ) { super() }

    ngOnInit(): void {
        console.log('====================================');
        console.log(this.data.item);
        console.log('====================================');
        this.getLinhVucBaoCao();
        this.formControl = this.formBuilder.group({
            soTaiKhoanThuHuong: [this.data.item.soTaiKhoanThuHuong, [Validators.required]],
            tenTaiKhoanThuHuong: [this.data.item.tenTaiKhoanThuHuong, [Validators.required]],
            soTienThanhToan: [this.data.item.soTienThanhToan, [Validators.required]],
            nganHangThuHuong: [this.data.item.nganHangThuHuong, [Validators.required]],
            hinhThucThanhToan: [this.data.item.hinhThucThanhToan, [Validators.required]],
           
        });
    }
    getLinhVucBaoCao() {
        this.dsLinhVucBaoCao = []
        this.danhMucBaoCaoService.getLinhVucBaoCao().pipe(this.unsubsribeOnDestroy).subscribe(next => {

            if (!next.length) {
                this.notification.open('Chưa có dữ liệu lĩnh vực báo cáo', mType.info)
            }
            else {
                this.dsLinhVucBaoCao = next;
                this.data.item.linhVucId = next && next[0] ? next[0].id : null
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    get f() {
        return this.formControl.controls;
    }
    save() {

        this.formControl.markAllAsTouched();
        if (this.formControl.invalid) {
            return;
        } else {
            this.data.item = this.formControl.value
            this.data.item.tenLinhVuc = this.dsLinhVucBaoCao.find(next => next.id == this.data.linhVucId) && this.data.linhVucId ? this.dsLinhVucBaoCao.find(next => next.id == this.data.linhVucId).tieuDe : '';
            this.data.item.trangThai = this.data.item.trangThai == true ? 1 : 0
            this.dialogRef.close(true);
        }
    }

    handleUpdatePaymentInfo() {
        console.log('====================================');
        console.log(this.formControl);
        console.log('====================================');
    }
}
