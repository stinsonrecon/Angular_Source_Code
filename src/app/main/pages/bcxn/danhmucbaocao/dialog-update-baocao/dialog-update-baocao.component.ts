import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';

@Component({
    selector: 'app-dialog-update-baocao',
    templateUrl: './dialog-update-baocao.component.html',
    styleUrls: ['./dialog-update-baocao.component.scss']
})
export class DialogUpdateBaocaoComponent extends BaseClass implements OnInit {
    loaiBaoCao: any = 1
    loaiLinhVuc: any
    dsLinhVucBaoCao: any = [];
    formControl: FormGroup;
    constructor(public dialogRef: MatDialogRef<DialogUpdateBaocaoComponent>, private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, public danhMucBaoCaoService: DanhMucBaoCaoService, public dialog: MatDialog, public notification: NotificationService) { super() }

    ngOnInit(): void {
        this.getLinhVucBaoCao();
        this.formControl = this.formBuilder.group({
            tenBaoCao: ['', [Validators.required, Validators.minLength(4)]],
            loaiBaoCao: [this.data.item.loaiBaoCao, [Validators.required]],
            linhVucId: [this.data.item.linhVucId, [Validators.required]],
            phongBan: [''],
            soLieu: [''],
            urlLink: ['', [Validators.required]],
            siteName: ['', [Validators.required]],
            viewName: ['', [Validators.required]],
            trangThai: [this.data.item.trangThai],
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
}
