import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { loaiDonVi } from '@app/shared/constants/bcxn.constants';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { YeuCauBaoGiaService } from '@app/shared/services/bcxn/yeucaubaogia.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogAddNguoidungComponent } from './dialog-add-nguoidung/dialog-add-nguoidung.component';
import { DialogUpdatePasswordComponent } from './dialog-update-password/dialog-update-password.component';

@Component({
    selector: 'app-quanlynguoidung',
    templateUrl: './quanlynguoidung.component.html',
    styleUrls: ['./quanlynguoidung.component.scss']
})
export class QuanLyNguoiDungComponent extends BaseClass implements OnInit {
    chungLoai: any = []
    displayedColumns = ["tt", "hoVaTen", "taiKhoan", "email", "roleName", "sdt", "caProvider", "dinhDanhKy", "donVi", "accountType", "trangThai", "thaoTac"]
    dsDonVi: any;
    dsUser: any;
    loaiDonVi = loaiDonVi
    searchItem: any = {
        loaiDonVi: -99,
        tuKhoa: '',
        trangThai: -99,
        accountType: -99
    }
    pagination:any = {
        pageIndex: 1,
        pageSize: 10
    }
    tableData:any=[];
    totalRecord:any = 0;
    constructor(public dialog: MatDialog, private userService: UserService, private yeuCauBaoGiaService: YeuCauBaoGiaService, public _notification: NotificationService) { super() }

    ngOnInit(): void {
        this.getDonVi();
    }
    getUser() {
        this.userService.getUser().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsUser = next;
            this.dsUser.forEach(element => {
                element.tenDonVi = this.dsDonVi.find(item => item.id == element.donViId) ? this.dsDonVi.find(item => item.id == element.donViId).tenDonVi : null
            });
            this.dsUser = this.dsUser.filter(item => item.firstName.includes(this.searchItem.tuKhoa.trim()) || (item.lastName.includes(this.searchItem.tuKhoa.trim())) || (item.userName.includes(this.searchItem.tuKhoa.trim())) || (item.tenDonVi && item.tenDonVi.includes(this.searchItem.tuKhoa.trim())))
            if(this.searchItem.loaiDonVi != -99){
                this.dsUser = this.dsUser.filter(item => item.loaiDonVi == this.searchItem.loaiDonVi);
            }
            if(this.searchItem.trangThai != -99){
                this.dsUser = this.dsUser.filter(item => ((item.isActive ? 1 : 0) == this.searchItem.trangThai));
            }
            if(this.searchItem.accountType != -99){
                this.dsUser = this.dsUser.filter(item => ((item.accountType ? 1 : 0) == this.searchItem.accountType));
            }
            // this.dsUser = [...this.dsUser]
            this.handlePagination({pageIndex:0})
        })
    }

    handlePagination(e?: any) {
        this.tableData= [];
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.pagination.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.pagination.pageSize = e.pageSize;
        }
        this.totalRecord = this.dsUser.length;
        this.dsUser.forEach((element,index) => {
            element.stt = index + 1
        });
        this.tableData = this.dsUser.filter((item, index) => (index >= this.pagination.pageIndex * this.pagination.pageSize - this.pagination.pageSize && index < this.pagination.pageIndex * this.pagination.pageSize));
    }

    getDonVi() {
        this.yeuCauBaoGiaService.getDonVi(null).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsDonVi = next;
            this.getUser();
        })
    }
    openDialogAddNguoiDung() {
        let item: any = {
            firstName: null,
            lastName: null,
            email: null,
            userName: null,
            phoneNumber: null,
            donViId: null,
            password: null,
            applicationRoleId: null,
            isActive: true,
            isDelete: null,
            accountTypeString: "0",
            dinhDanhKy: null
        };
        const dialogRef = this.dialog.open(DialogAddNguoidungComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                item.accountType = parseInt(item.accountTypeString);
                this.userService.userCreate(item).subscribe(resp => {
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Thêm thành công!",
                            mType.success
                        );
                        this.getUser();
                    } else {
                        this._notification.open(
                            "Thêm thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }
    openDialogUpdateNguoiDung(element: any) {
        let item: any;
        item = JSON.parse(JSON.stringify(element));
        if(item.accountType != null) {
            item.accountTypeString = item.accountType.toString();
        }
        const dialogRef = this.dialog.open(DialogAddNguoidungComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                item.accountType = parseInt(item.accountTypeString);
                this.userService.userCreate(item).subscribe(resp => {
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Cập nhật thành công!",
                            mType.success
                        );
                        this.getUser();
                    } else {
                        this._notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }
                })
            }
        });
    }
    openDialogUpdatePassword(element: any) {
        let item: any = {
            passwordNew:null,
            id: element.id,
            userName: element.userName,
            isClose: true
        };
        // item = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogUpdatePasswordComponent, {
            width: '500px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.userService.userChangePassword(item).subscribe(resp => {
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Cập nhật thành công!",
                            mType.success
                        );
                        this.getUser();
                    } else {
                        this._notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }
    deleteUserById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.userService.deleteUser(id).subscribe(resp => {
                    this._notification.open('Xoá thành công!', mType.success);
                    this.getUser();
                })

            }
        });
    }

    changeCAProvider(item: any) {
        this.userService.userCreate(item).subscribe(resp => {
            if (resp.statusCode == 200) {
                this.getUser();
            } else {
                
            }
        })
    }
}
