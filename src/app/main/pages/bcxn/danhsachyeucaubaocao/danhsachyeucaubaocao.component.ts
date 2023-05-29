import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { loaiDonVi } from '@app/shared/constants/bcxn.constants';
import { formatDate, formatDateString } from '@app/shared/constants/util';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { environment } from '@environments/environment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogUpdateYeuCauXacBhanBcComponent } from './dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';

@Component({
    selector: 'app-danhsachyeucaubaocao',
    templateUrl: './danhsachyeucaubaocao.component.html',
    styleUrls: ['./danhsachyeucaubaocao.component.scss']
})
export class DanhSachYeuCauBaoCaoComponent extends BaseClass implements OnInit {
    chungLoai: any = []
    displayedColumns = ["stt","tieuDe", "yeuCauXacNhanBC", "bcDaXN", "hanXN", "thoiGianTao", "trangThai", "thaoTac"]
    dsDonVi: any;
    dsUser: any;
    loaiDonVi = loaiDonVi
    searchItem: any = {
        loaiBaoCao: -99,
        nam: -99,
        trangThai: -99,
        pageIndex: 1,
        pageSize: 10
    }

    tableData: any = ['', ''];
    totalRecord: any = 0;
    namList: any = [];
    nam: number;
    quy: number;
    thang: number;
    dsYcbc: any = [];
    checkNhomQuyen:boolean= true;
    constructor(public dialog: MatDialog, private router: Router, private chiTietYcbcService: ChiTietYcbcService, public notification: NotificationService, public danhSachYeuCauBaoCaoService: DanhSachYeuCauBaoCaoService) { super() }


    ngOnInit(): void {
        this.namInit();
        this.getDsYcbc();
        this.checkNhomQuyen = true;
    }

    namInit() {
        let today = new Date();
        this.nam = today.getFullYear()
        this.thang = today.getMonth()
        for (let index = today.getFullYear(); index > today.getFullYear() - 6; index--) {
            this.namList.push(index);
        }
        if (today.getMonth() < 4) {
            this.quy = 1;
        }
        else if (today.getMonth() < 7) {
            this.quy = 2;
        }
        else if (today.getMonth() < 10) {
            this.quy = 3;
        }
        else if (today.getMonth() < 13) {
            this.quy = 4;
        }
    }
    getDsYcbc(e?: any) {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.searchItem.donViId = null;
        this.danhSachYeuCauBaoCaoService.getDsYcbc(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next && next.statusCode == 200) {
                let today = new Date();
                next.data.forEach(element => {
                    if(new Date(element.hanHoanThanh) < new Date(formatDateString(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(), "mm/dd/yyyy")) && element.trangThai != 4){
                        element.trangThai = 3;
                        this.danhSachYeuCauBaoCaoService.updateTrangThaiYcbc(element.id, element.trangThai).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                        })
                    }
                });
                this.dsYcbc = next.data;
                this.totalRecord = next ? next.totalRecord : 0;
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    openDialogCreateYcbc() {
        let item: any = {
            tieuDe:'',
            nam: null,
            loaiChuKy: 2,
            hanHoanThanh: new Date(),
            moTa: '',
            trangThai: null,
            chuKy: null,
            baoCaoDinhKy: [],
            baoCaoPhatSinh: []
        };
        const dialogRef = this.dialog.open(DialogUpdateYeuCauXacBhanBcComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.danhSachYeuCauBaoCaoService.createYcbc(item).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                    if (next.statusCode == 200) {
                        if (item.trangThai == 2) {
                            this.notification.open(
                                "Đã gửi yêu cầu báo cáo!",
                                mType.success
                            );

                        }
                        else {
                            this.notification.open(
                                "Đã tạo mới yêu cầu báo cáo!",
                                mType.success
                            );
                        }
                        this.getDsYcbc();
                    } else {
                        this.notification.open(
                            "Thêm thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }
    openDialogUpdateYcbc(element: any) {
        let item: any = JSON.parse(JSON.stringify(element));
        item.baoCaoDinhKy = [];
        item.baoCaoPhatSinh = [];
        const dialogRef = this.dialog.open(DialogUpdateYeuCauXacBhanBcComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
        console.log("item",item)

                this.danhSachYeuCauBaoCaoService.updateYcbc(item).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                    if (next.statusCode == 200) {
                        if (item.trangThai == 2) {
                            this.notification.open(
                                "Đã gửi yêu cầu báo cáo!",
                                mType.success
                            );

                        }
                        else {
                            this.notification.open(
                                "Đã cập nhật yêu cầu báo cáo!",
                                mType.success
                            );
                        }
                        this.getDsYcbc();
                    } else {
                        this.notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }
    downloadCompletedFileMerge(id: any) {
        this.chiTietYcbcService.getCompletedFileMerge(id).subscribe(res => {
            window.open(res && res.data ? environment.apiUrl + res.data.replaceAll("\\", "/").replaceAll("wwwroot", "").replaceAll(".jpg", ".pptx") : "");
        });
    }
    view(id) {
        this.router.navigate(['/bcxn/chitietyeucaubkh'], {
            queryParams: { id: id }
        });
    }
    deleteYcbcById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.danhSachYeuCauBaoCaoService.deleteYcbc(id).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                    this.notification.open('Xoá thành công!', mType.success);
                    this.getDsYcbc();
                })
            }
        });
    }
    checkRole(id: any) {
        if (JSON.parse(localStorage.getItem("user")).listChucNang.indexOf(id) != -1) {
            return true;
        } else {
            return false;
        }
    }
}
