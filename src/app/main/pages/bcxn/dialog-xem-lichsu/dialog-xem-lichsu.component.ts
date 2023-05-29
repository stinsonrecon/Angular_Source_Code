import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { FileService } from '@app/shared/services/files/files.service';
import { environment } from '@environments/environment';
import { DialogUpdateYeuCauXacBhanBcComponent } from '../danhsachyeucaubaocao/dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';

@Component({
    selector: 'app-dialog-xemlichsu',
    templateUrl: './dialog-xem-lichsu.component.html',
    styleUrls: ['./dialog-xem-lichsu.component.scss']
})
export class DialogXemLichSuComponent extends BaseClass implements OnInit {
    displayedColumns = ["stt", "soLieu", "yKien", "thoiGianXN", "nguoiXN", "xem"]
    tableData: any = ['', ''];
    dsLichSuXn: any[];
    fileBaoCao:any = "";
    environment = environment;
    constructor(public dialogRef: MatDialogRef<DialogXemLichSuComponent>, private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public notification: NotificationService, public chiTietYcbcService: ChiTietYcbcService, private fileService: FileService) { super() }

    ngOnInit(): void {
        this.getLichSuXnById()
    }
    getLichSuXnById() {
        this.dsLichSuXn = []
        this.chiTietYcbcService.getLichSuXnById(this.data.item.yeuCauBaoCaoId, this.data.item.baoCaoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.length) {
                this.dsLichSuXn = next;
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    } 
}
