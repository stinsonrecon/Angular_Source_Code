import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { DialogAddChucnangComponent } from './dialog-add-chucnang/dialog-add-chucnang.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { convertViToEn } from '@app/shared/constants/util';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-danhmucchucnang',
    templateUrl: './danhmucchucnang.component.html',
    styleUrls: ['./danhmucchucnang.component.scss']
})
export class DanhMucChucNangComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;
    displayedColumns = ["tt", "tenChucNang", "icon", "url", "chucNangCha", "trangThai", "thaoTac"];
    dsChucNang: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    searchItem: any = {
        tuKhoa: "",
        nhomQuyenId: -99,
        pageSize: 10,
        pageIndex: 1,
        trangThai: -99
    };

    constructor(public dialog: MatDialog, public chucNangService: ChucNangService, public _notification: NotificationService, private formBuilder: FormBuilder,) { super() }

    ngOnInit(): void {
        this.getChucNangAll();
    }
    getChucNangAll(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.chucNangService.getAllChucNang(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsChucNang = next.data;
            this.totalRecord = next ? next.totalRecord : 0;
        });
    }

    openDialogAddChucNang() {
        let item: any = {
            chucNangChaId: null,
            icon: null,
            //id: null,
            linkUrl: null,
            moTa: null,
            //nhomQuyenId: null,
            tieuDe: null,
            trangThai: true,
            order: null,
            claimValue: null,
            type: null
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddChucnangComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.chucNangService.insertChucNang(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Thêm mới thành công!", mType.success);
                        this.getChucNangAll();
                    } else {
                        this._notification.open("Thêm mới thất bại!", mType.error);
                    }
                });
                // this.yeuCauBaoGiaService.postYeuCauBaoGia(item.yeuCauBG).pipe(this.unsubsribeOnDestroy).subscribe(
                //     (resp: any) => {
                //         if (resp.statusCode === 200) {
                //             this._notification.open(
                //                 "Thêm thành công!",
                //                 mType.success
                //             );
                //             this.getChucNangAll();
                //         }
                //         else {
                //             this._notification.open(
                //                 "Thêm thất bại!",
                //                 mType.error
                //             );
                //         }
                //     },
                //     (error) => {
                //         console.log(error);
                //     }
                // );

            }
        });
    }
    openDialogDetailChucNang(element: any) {
        let item: any = {
            chucNangChaId: element.chucNangChaId,
            icon: element.icon,
            id: element.id,
            linkUrl: element.linkUrl,
            moTa: element.moTa,
            nhomQuyenId: element.nhomQuyenId,
            tieuDe: element.tieuDe,
            trangThai: element.trangThai,
            order: element.order,
            claimValue: element.claimValue,
            type: element.type
        }
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddChucnangComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.chucNangService.editChucNang(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Chỉnh sửa thành công!", mType.success);
                        this.getChucNangAll();
                    } else {
                        this._notification.open("Chỉnh sửa thất bại!", mType.error);
                    }
                });
                // this.yeuCauBaoGiaService.postYeuCauBaoGia(item.yeuCauBG).pipe(this.unsubsribeOnDestroy).subscribe(
                //     (resp: any) => {
                //         if (resp.statusCode === 200) {
                //             this._notification.open(
                //                 "Thêm thành công!",
                //                 mType.success
                //             );
                //             this.getChucNangAll();
                //         }
                //         else {
                //             this._notification.open(
                //                 "Thêm thất bại!",
                //                 mType.error
                //             );
                //         }
                //     },
                //     (error) => {
                //         console.log(error);
                //     }
                // );

            }
        });
    }
    deleteChucNangById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.chucNangService.deleteChucNang(id).subscribe(res => {
                    if(res.statusCode == 200) {
                        this._notification.open('Xoá thành công!', mType.success);
                        this.getChucNangAll();
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
}
