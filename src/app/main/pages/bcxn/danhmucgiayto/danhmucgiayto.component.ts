import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhmucgiaytoService } from '@app/shared/services/bcxn/danhmucgiayto.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGiaytoComponent } from './dialog-giayto/dialog-giayto.component';
import { PageEvent } from '@angular/material/paginator';
import * as util from '@app/shared/constants/util'

@Component({
    selector: 'app-danhmucgiayto',
    templateUrl: './danhmucgiayto.component.html',
    styleUrls: ['./danhmucgiayto.component.scss']
})
export class DanhmucgiaytoComponent extends BaseClass implements OnInit {

    listGiayTo: MatTableDataSource<any>;
    displayedColumns: string[] = [ 'tt', 'maGT', 'tenGT', 'nguon', 'trangthai', 'nguoitao', 'ngaytao', 'action'];

    search = {
        tuKhoa: '',
        tinhTrang: '',
        tuNgay: '',
        denNgay: '',
        pageIndex: 1,
        pageSize: 20
    }
    totalRecord: number = 0;

    constructor(
        private _notification: NotificationService,
        private danhMucGiayToService: DanhmucgiaytoService,
        private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        this.getListGiayTo();
    }

    searchGiayTo() {
        this.getListGiayTo();
    }

    pageChange(e: PageEvent) {
        this.search.pageIndex = e.pageIndex + 1;
        this.search.pageSize = e.pageSize;
        this.getListGiayTo();
    }

    getListGiayTo() {
        const param = {
            ...this.search,
            TuNgay: !this.search.tuNgay ? '' : util.formatDate(new Date(this.search.tuNgay), 'DD/MM/YYYY'),
            DenNgay: !this.search.denNgay ? '' : util.formatDate(new Date(this.search.denNgay), 'DD/MM/YYYY')
        }
        this.danhMucGiayToService.getListGiayTo(param)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res?.statusCode === 200) {
                        this.totalRecord = res.totalRecord;
                        this.listGiayTo = new MatTableDataSource(res.data);
                    }
                },
                err => {
                    this._notification.open(
                        "Có lỗi xảy ra! Vui lòng thử lại",
                        mType.error
                    )
                },
            )

    }

    openDialog(e: string, item?) {
        const dialogRef = this.dialog.open(DialogGiaytoComponent,
            {
                width: '600px',
                autoFocus: false,
                height: 'auto',
                data: {
                    action: e,
                    item: item
                }
            }
        )

        dialogRef.afterClosed().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res?.action === 'UPDATE') {
                        this.danhMucGiayToService.updateGiayTo(res.param, res.param.id)
                            .pipe(this.unsubsribeOnDestroy)
                            .subscribe(
                                result => {
                                    if (result.statusCode === 200) {
                                        this._notification.open(
                                            result.message,
                                            mType.success
                                        )
                                    } else {
                                        this._notification.open(
                                            "Có lỗi xảy ra! Vui lòng thử lại",
                                            mType.error
                                        )
                                    }
                                }
                            )
                    } else if (res?.action === 'CREATE') {
                        this.danhMucGiayToService.createGiayTo(res.param)
                            .pipe(this.unsubsribeOnDestroy)
                            .subscribe(
                                result => {
                                    if (result.statusCode === 200) {
                                        this._notification.open(
                                            result.message,
                                            mType.success
                                        )
                                    } else {
                                        this._notification.open(
                                            "Có lỗi xảy ra! Vui lòng thử lại",
                                            mType.error
                                        )
                                    }
                                }
                            )
                    }
                    this.getListGiayTo();
                },
                err => {
                    this._notification.open(
                        "Có lỗi xảy ra! Vui lòng thử lại",
                        mType.error
                    )
                }
            );
    }

    changeTrangThai(data) {
        let param = {
            "MaGiayTo": data.maGiayTo,
            "TenGiayTo": data.tenGiayTo,
            "Nguon": data.nguon,
            "TrangThai": data.trangThai === 2 ? 1 : 2,
            "KySo": data.kySo,
            "giayToId": data.id
        }

        this.danhMucGiayToService.updateGiayTo(param, undefined)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                result => {
                    if (result.statusCode === 200) {
                        this._notification.open(
                            'Cập nhập trạng thái thành công',
                            mType.success
                        )
                    } else {
                        this._notification.open(
                            "Có lỗi xảy ra! Vui lòng thử lại",
                            mType.error
                        )
                    }
                    this.getListGiayTo();
                }
            )
    }

    delete(id: string) {
        this.danhMucGiayToService.deleteGiayTo(id)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                result => {
                    if (result.statusCode === 200) {
                        this._notification.open(
                            result.message,
                            mType.success
                        )
                        this.getListGiayTo();
                    } else {
                        this._notification.open(
                            "Có lỗi xảy ra! Vui lòng thử lại",
                            mType.error
                        )
                    }
                },
                err => {
                    this._notification.open(
                        "Có lỗi xảy ra! Vui lòng thử lại",
                        mType.error
                    )
                }
            )
    }

}
