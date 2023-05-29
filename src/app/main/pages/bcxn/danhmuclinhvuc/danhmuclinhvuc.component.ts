import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service'
import { LinhVucService } from '@app/shared/services/bcxn/linhvuc.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogAddLinhvucComponent } from './dialog-add-linhvuc/dialog-add-linhvuc.component';

@Component({
  selector: 'app-danhmuclinhvuc',
  templateUrl: './danhmuclinhvuc.component.html',
  styleUrls: ['./danhmuclinhvuc.component.scss']
})
export class DanhmuclinhvucComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;
    displayedColumns = ["stt", "tenLinhVuc", "linhVucCha", "order", "trangThai", "thaoTac"];
    dsLinhVuc: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    searchItem: any = {
        tuKhoa: "",
        pageSize: 10,
        pageIndex: 1,
        trangThai: -99
    };

    constructor(public dialog: MatDialog, public linhVucService: LinhVucService, public _notification: NotificationService, private formBuilder: FormBuilder,) { super() }


    ngOnInit(): void {
        this.getLinhVuc();
    }

    getLinhVuc(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.linhVucService.getLinhVuc(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsLinhVuc = next.data;
            this.totalRecord = next ? next.totalRecord : 0;
        });
    }

    openDialogAddLinhVuc() {
        let item: any = {
            tieuDe: null,
            linhVucChaId: null,
            linhVucChaTieuDe: null,
            trangThaiHoatDong: true
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddLinhvucComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.linhVucService.insertLinhVuc(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Thêm mới thành công!", mType.success);
                        this.getLinhVuc();
                    } else {
                        this._notification.open("Thêm mới thất bại!", mType.error);
                    }
                });
            }
        });
    }
    openDialogUpdateLinhVuc(element: any) {
        let item: any = {
        };
        item = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogAddLinhvucComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.linhVucService.editLinhVuc(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Chỉnh sửa thành công!", mType.success);
                        this.getLinhVuc();
                    } else {
                        this._notification.open("Chỉnh sửa thất bại!", mType.error);
                    }
                });
            }
        });
    }
    deleteLinhVucById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.linhVucService.deleteLinhVuc(id).subscribe(res => {
                    if(res.statusCode == 200) {
                        this._notification.open('Xoá thành công!', mType.success);
                        this.getLinhVuc();
                    } else {
                        this._notification.open('Xoá thất bại!', mType.error);
                    }
                });
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        });
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

    changeTrangThai(data) {
        let params = {
            "id": data.id,
            "tieuDe": data.tieuDe,
            "linhVucChaId": data.linhVucChaId,
            "linhVucChaTieuDe": data.linhVucChaTieuDe,
            "trangThaiHoatDong": data.trangThaiHoatDong === 1 ? 0 : 1,
            "daXoa": data.daXoa,
            "thoiGianTao": data.thoiGianTao,
            "nguoiTaoId": data.nguoiTaoId
        }
        this.linhVucService.editLinhVuc(params).subscribe((res: any) => {
            if (res.statusCode == 200) {
                this._notification.open("Cập nhập trạng thái thành công!", mType.success);
            } else {
                this._notification.open("cập nhập trạng thái thất bại!", mType.error);
            }
            this.getLinhVuc();
        });
    }

}
