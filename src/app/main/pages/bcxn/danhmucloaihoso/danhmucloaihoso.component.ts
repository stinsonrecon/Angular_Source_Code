import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { convertViToEn } from '@app/shared/constants/util';
import { MatPaginator } from '@angular/material/paginator';
// import { DialogViewHoSoComponent } from './dialog-view-hoso/dialog-view-hoso.component';
import { DialogAddHoSoComponent } from './dialog-add-hoso/dialog-add-hoso.component';
import { MatTable } from '@angular/material/table';
import { DanhMucLuongPheDuyetComponent } from '../danhmucluongpheduyet/danhmucluongpheduyet.component';
import { TableTaiLieuYeuCauUpdateComponent } from './dialog-add-hoso/table-tai-lieu-yeu-cau-update/table-tai-lieu-yeu-cau-update.component';
import { TableTaiLieuYeuCau } from './dialog-add-hoso/table-tai-lieu-yeu-cau/table-tai-lieu-yeu-cau.component';


@Component({
    selector: 'app-danhmucloaihoso',
    templateUrl: './danhmucloaihoso.component.html',
    styleUrls: ['./danhmucloaihoso.component.scss']
})

export class DanhMucLoaiHoSoComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    totalRecord: any;
    displayedColumns = ["tt", "maLoaiHoSo", "tenLoaiHoSo", "moTa", "coHieuLuc", "thaoTac"];
    dataFake: any
    // = [
    //     {
    //         tenVietTatLoaiHSTT: 'Văn phòng phẩm',
    //         tenDayDuLoaiHSTT: 'Loại hình hồ sơ thanh toán Văn phòng phẩm',
    //         maLoaiHoSo: 'Nguyễn Văn A',
    //         ngayTao: '15/5/2021',
    //         coHieuLuc: true,
    //         moTa: '',
    //         ghiChu: ''
    //     },
    //     {
    //         tenVietTatLoaiHSTT: 'Công tác phí',
    //         tenDayDuLoaiHSTT: 'Loại hình hồ sơ thanh toán Công tác phí',
    //         maLoaiHoSo: 'Phạm Văn B',
    //         ngayTao: '31/5/2021',
    //         coHieuLuc: true,
    //         moTa: '',
    //         ghiChu: ''
    //     },
    //     {
    //         tenVietTatLoaiHSTT: 'Mua sắm nhỏ lẻ',
    //         tenDayDuLoaiHSTT: 'Loại hình hồ sơ thanh toán mua sắm nhỏ lẻ',
    //         maLoaiHoSo: 'Nguyễn Thị C',
    //         ngayTao: '05/6/2021',
    //         coHieuLuc: false,
    //         moTa: '',
    //         ghiChu: ''
    //     },
    // ];
    tuKhoaChange: any = "";
    trangThaiChange: any = 1;
    searchItem: any = {
        TuKhoa: "",
        trangThai: 3,
        pageSize: 10,
        pageIndex: 1,
    };

    constructor(public dialog: MatDialog, public loaiHoSoService: DanhMucLoaiHoSoService, public _notification: NotificationService, private formBuilder: FormBuilder,) { super() }

    ngOnInit(): void {
        this.getLoaiHoSoAll();
    }

    changeTrangThai(idx: any) {
        this.loaiHoSoService.updateTrangThai(idx).pipe(this.unsubsribeOnDestroy).subscribe(res => {
            if (res.statusCode === 201) {
                this._notification.open(res.message, mType.success);
                this.getLoaiHoSoAll();
            } else {
                this._notification.open(res.message, mType.error);
            }
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }

    getLoaiHoSoAll(e?: any): any {
        console.log(this.searchItem)
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.loaiHoSoService.getDanhMucLoaiHoSo(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            console.log(next);
            this.totalRecord = next ? next.totalRecord : 0;
            this.dataFake = next.data;
            console.log(this.dataFake)
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }

    openDialogAddLoaiHoSo() {
        let item: any = {
            tenLoaiHoSo: null,
            maLoaiHoSo: null,
            moTa: null,
            trangThai: 1,
            luongPheDuyet: [],
            taiLieuYeuCau: [],
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddHoSoComponent, {
            width: '80%',
            autoFocus: false,
            panelClass: 'dialog-upsert',
            data: {
                item,
                actions: 'CREATE'
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            this.loaiHoSoService.setDataLuongPheDuyet([]);
            if (response === true) {
                this.loaiHoSoService.createLoaiHoSo(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Thêm mới thành công!", mType.success);
                        this.loaiHoSoService.setDataLuongPheDuyet([]);
                        this.getLoaiHoSoAll();
                    } else {
                        this._notification.open(res.message, mType.error);
                        this.loaiHoSoService.setDataLuongPheDuyet([]);
                    }
                }, err => {
                    this._notification.open(
                        err,
                        mType.error
                    );
                });
            }
        });
    }

    openDialogUpdate(element: any) {
        let item: any = {
        }
        this.loaiHoSoService.getLoaiHoSo(element.loaiHoSoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            item = next[0];
            item = JSON.parse(JSON.stringify(item));
            const dialogRef = this.dialog.open(DialogAddHoSoComponent, {
                width: '80%',
                panelClass: 'dialog-upsert',
                autoFocus: false,
                data: {
                    item,
                    actions: 'UPDATE'
                }
            });
            dialogRef.afterClosed().subscribe((response: any) => {
                if (response === true) {
                    delete item["giayToLoaiHoSoResponse"];
                    delete item["luongPheDuyetResponse"];
                    console.log(item);
                    this.loaiHoSoService.updateLoaiHoSo(item).pipe(this.unsubsribeOnDestroy).subscribe((res: any) => {
                        if (res.statusCode == 200) {
                            this._notification.open("Cập nhật thành công!", mType.success);
                            this.loaiHoSoService.setDataLuongPheDuyet([]);
                            this.getLoaiHoSoAll();
                        } else {
                            this._notification.open("Cập nhật thất bại!", mType.error);
                            this.loaiHoSoService.setDataLuongPheDuyet([]);
                        }
                    }, err => {
                        this._notification.open(
                            err,
                            mType.error
                        );
                    });

                } else {
                    this.loaiHoSoService.setDataLuongPheDuyet([]);
                }
            });
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }
    openDialogTaiLieu(element: any) {
        let item: any = {}
        this.loaiHoSoService.getLoaiHoSo(element.loaiHoSoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            item = next[0];
            item = JSON.parse(JSON.stringify(item));
            this.loaiHoSoService.setDataLuongPheDuyet(next[0].luongPheDuyetResponse);
            const dialogRef = this.dialog.open(TableTaiLieuYeuCau, {
                width: '80%',
                height: '600px',
                panelClass: 'my-dialog',
                autoFocus: false,
                data: {
                    item,
                    actions: 'UPDATE',
                    title: `Cập nhật danh mục tài liệu cho loại hồ sơ ${next[0].tenLoaiHoSo.toUpperCase()}`
                }
            });
            dialogRef.afterClosed().subscribe(result => {
            })
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }
    openDialogLuongPheDuyet(element: any) {
        let item: any = {}
        this.loaiHoSoService.getLoaiHoSo(element.loaiHoSoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            item = next[0];
            item = JSON.parse(JSON.stringify(item));
            this.loaiHoSoService.setDataLuongPheDuyet(next[0].luongPheDuyetResponse);
            const dialogRef = this.dialog.open(DanhMucLuongPheDuyetComponent, {
                width: '80%',
                panelClass: 'my-dialog',
                autoFocus: false,
                data: {
                    item,
                    actions: 'UPDATE'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.loaiHoSoService.setDataLuongPheDuyet([]);
            })
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }
    deleteLoaiHoSoById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.loaiHoSoService.deleteLoaiHoSoById(id).subscribe(res => {
                    if (res.statusCode == 200) {
                        this._notification.open('Xoá thành công!', mType.success);
                        this.getLoaiHoSoAll();
                    } else {
                        this._notification.open('Xoá thất bại!', mType.error);
                    }
                }, err => {
                    this._notification.open(
                        err,
                        mType.error
                    );
                });
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        });
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
}
