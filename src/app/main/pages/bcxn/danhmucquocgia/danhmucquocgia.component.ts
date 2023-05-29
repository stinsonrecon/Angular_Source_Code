import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { loaiDonVi } from '@app/shared/constants/bcxn.constants';
import { QuocGiaService } from "@app/shared/services/bcxn/danhmucquocgia.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { DialogAddQuocGiaComponent } from "./dialog-add-quocgia/dialog-add-quocgia.component";

@Component({
    selector: 'app-danhmucquocgia',
    templateUrl: 'danhmucquocgia.component.html',
    styleUrls: ['danhmucquocgia.component.scss']
})
export class DanhmucquocgiaComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator : MatPaginator;
    totalRecord: any;
    displayedColumns = ["stt", "maQuocGia", "tenQuocGia", "trangThai", "thaoTac"];
    dsDonVi: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    loaiDonVi = loaiDonVi;
    searchItem: any = {
        tuKhoa: '',
        trangThai: -99,
        pageSize: 10,
        pageIndex: 1
    }
    constructor(
        public dialog: MatDialog,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private service: QuocGiaService
    ) {
        super()
    }

    ngOnInit(): void {
        this.getListQuocGia();
    }

    getListQuocGia(e? : any) {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.service.getQuocGia(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsDonVi = next.data.Items;
            this.totalRecord = next ? next.data.TotalRecord : 0;
        })
    }

    openDialogAddQuocGia() {
        let item : any = {
            
        };

        const dialogRef = this.dialog.open(DialogAddQuocGiaComponent, {
            width: '700px',
            autoFocus: false,
            data: {
                data: item,
                actions: 'create'
            }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if(response === true) {
                this.getListQuocGia();
            }
        });
    }

    openDialogUpdateQuocGia(element: any) {
        let item: any = {

        };

        item = JSON.parse(JSON.stringify(element));

        const dialogRef = this.dialog.open(DialogAddQuocGiaComponent, {
            width: '700px',
            autoFocus: false,
            data: {
              data: item,
              actions: 'update'
            }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if(response === true) {
                this.getListQuocGia();
            }
        });
    }

    changeTrangThai(element : any) {
        this.service.getQuocGia().pipe(this.unsubsribeOnDestroy).subscribe(res => {
            let item = {
                ...element,
                trangThai : element.trangThai === 1 ? 2 : 1,
            }
            
            item - JSON.parse(JSON.stringify(item));

            this.service.updateQuocGia(item).pipe(this.unsubsribeOnDestroy).subscribe(
                (res) => {
                    if(res.success == true) {
                        this._notification.open(
                            res.message,
                            mType.success
                        )
                        this.getListQuocGia();
                    }
                    else
                    {
                        this._notification.open(
                            res.message,
                            mType.error
                        )
                    }
                },
                (err) => {
                    this._notification.open(
                        err.message,
                        mType.error
                    )
                }
            )
        })
    }

    deleteQuocGiaById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        })

        confirmDialog.componentInstance.title = "Xác nhận xóa?";

        confirmDialog.afterClosed().subscribe(result => {
            if(result) {
                this.service.deleteQuocGia(id).subscribe(resp => {
                    if(resp.success == true) {
                        this._notification.open(
                            "Xóa thành công!",
                            mType.success
                        );
                        this.getListQuocGia();
                    }
                    else {
                        this._notification.open(
                            "Xóa thất bại!",
                            mType.error
                        );
                    }
                })
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