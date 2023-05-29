import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { YeuCauBaoGiaService } from '@app/shared/services/bcxn/yeucaubaogia.service';
import { NhomQuyenService } from '@app/shared/services/bcxn/nhomquyen.service';
import { DialogAddNhomQuyenComponent } from './dialog-add-nhomquyen/dialog-add-nhomquyen.component';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';

@Component({
    selector: 'app-quanlynhomquyen',
    templateUrl: './quanlynhomquyen.component.html',
    styleUrls: ['./quanlynhomquyen.component.scss']
})
export class QuanLyNhomQuyenComponent extends BaseClass implements OnInit {
    chungLoai: any = []
    displayedColumns = ["tt", "tenNhomQuyen", "moTa", "thaoTac"];
    tableData: any = ['', '', '', '']
    dsRole: any;
    constructor(public dialog: MatDialog, private yeuCauBaoGiaService: YeuCauBaoGiaService, private nhomQuyenService: NhomQuyenService, public _notification: NotificationService) { super() }

    ngOnInit(): void {
        this.getRole()
    }
    getRole() {
        this.yeuCauBaoGiaService.getRole().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsRole = next;
        })
    }

    openDialogAddNhomQuyen() {
        let item: any = {
            chucNangDefault: null,
            description: null,
            dsChucNang: null,
            dsDonVi: null,
            id: "",
            numberOfUsers: 0,
            roleName: null
        };
        const dialogRef = this.dialog.open(DialogAddNhomQuyenComponent, {
            width: '900px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.nhomQuyenService.createOrUpdateDonVi(item).subscribe(resp => {
                    this._notification.open(
                        "Thêm mới thành công!",
                        mType.success
                    );
                    this.getRole();
                })
            }
        });
    }

    openDialogUpdateNhomQuyen(data: any) {
        let item: any = Object.assign({}, data);
        const dialogRef = this.dialog.open(DialogAddNhomQuyenComponent, {
            width: '900px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.nhomQuyenService.createOrUpdateDonVi(item).subscribe(resp => {
                    this._notification.open(
                        "Cập nhật thành công!",
                        mType.success
                    );
                this.getRole();
                })
            }
        });
    }
}
