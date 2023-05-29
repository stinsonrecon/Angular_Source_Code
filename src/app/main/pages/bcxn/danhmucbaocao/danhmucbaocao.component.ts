import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { BaoCaoService } from '@app/shared/services/bcxn/baocao.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogAddBaocaoComponent } from './dialog-add-baocao/dialog-add-baocao.component';
import { DialogViewBaocaoComponent } from './dialog-view-baocao/dialog-view-baocao.component';

@Component({
    selector: 'app-danhmucbaocao',
    templateUrl: './danhmucbaocao.component.html',
    styleUrls: ['./danhmucbaocao.component.scss']
})
export class DanhmucbaocaoComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: any;
    displayedColumns = ["stt", "tenBaoCao", "linhVuc", "phongBan", "urlLink", "soLieu", "trangThai", "thaoTac"];
    dsBaoCao: any = [];
    dsLinhVuc: any = [];
    dsLinhVucCha: any = [];
    dsPhongBan: any = [];
    dsPhongBanCha: any = [];
    dsThuTu: any = [];
    dsThuTuBaoCao: any = [];
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    loaiBaoCaoChange: any = -99;
    linhVucIdChange: any = -99;
    donViIdChange:any = -99;
    searchItem: any = {
        tuKhoa: "",
        pageSize: 10,
        pageIndex: 1,
        trangThai: -99,
        loaiBaoCao: -99,
        linhVucId: -99,
        donViId: -99,
        typeId: 1
    };

    constructor(public dialog: MatDialog, public baoCaoService: BaoCaoService, public _notification: NotificationService, private formBuilder: FormBuilder,) { super() }


    ngOnInit(): void {
        this.getBaoCao();
        this.getLinhVuc();
        this.getPhongBan();
    }

    getBaoCao(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.baoCaoService.getBaoCao(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsBaoCao = next.data;
            this.totalRecord = next ? next.totalRecord : 0;
            this.dsThuTuBaoCao = [];
            for (let i = (this.searchItem.pageIndex - 1) * this.searchItem.pageSize + 1; i <= this.searchItem.pageIndex * this.searchItem.pageSize; i++) {
                this.dsBaoCao[i - (this.searchItem.pageIndex - 1) * this.searchItem.pageSize - 1].order = i;
                this.dsThuTuBaoCao.push({ id: this.dsBaoCao[i - (this.searchItem.pageIndex - 1) * this.searchItem.pageSize - 1].id, order: i });
            }
            this.dsThuTu = [];
            for(let i = 1; i <= this.totalRecord; i++) {
                this.dsThuTu.push({ hienthi: i, giatri: i });
            }
        });
    }
    getLinhVuc() {
        this.baoCaoService.getLinhVuc().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            for(let obj of next.data) {
                if(obj.linhVucChaId == 0) {
                    this.dsLinhVuc.push(obj);
                    this.dsLinhVucCha.push(obj);
                }
            }
            for(let index in next.data) {
                if(next.data[index].linhVucChaId != 0) {
                    let tmp = this.dsLinhVucCha.map(res => res.id).indexOf(next.data[index].linhVucChaId);
                    if(tmp == this.dsLinhVucCha.length - 1) {
                        this.dsLinhVuc.push(next.data[index]);
                    }
                    else {
                        let tmp2 = this.dsLinhVuc.map(res => res.id).indexOf(this.dsLinhVucCha[tmp + 1].id);
                        if(tmp2 > 0) {
                            this.dsLinhVuc.splice(tmp2, 0, next.data[index]);
                        }
                    }
                }
            }
        });
    }
    getPhongBan() {
        this.baoCaoService.getPhongBan().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            for(let obj of next.data) {
                if(obj.donViChaId == 0) {
                    this.dsPhongBan.push(obj);
                    this.dsPhongBanCha.push(obj);
                }
            }
            for(let index in next.data) {
                if(next.data[index].donViChaId != 0) {
                    let tmp = this.dsPhongBanCha.map(res => res.id).indexOf(next.data[index].donViChaId);
                    if(tmp == this.dsPhongBanCha.length - 1) {
                        this.dsPhongBan.push(next.data[index]);
                    }
                    else {
                        let tmp2 = this.dsPhongBan.map(res => res.id).indexOf(this.dsPhongBanCha[tmp + 1].id);
                        if(tmp2 > 0) {
                            this.dsPhongBan.splice(tmp2, 0, next.data[index]);
                        }
                    }
                }
            }
        });
    }
    openDialogAddBaoCao() {
        let item: any = {
            tenBaoCao: null,
            loaiBaoCao: -99,
            donViId: -99,
            soLieuId: 2,
            siteName: null,
            siteId: null,
            viewName: null,
            viewId: null,
            linhVucId: -99,
            trangThai: null,
            trangThaiHoatDong: true,
            urlLink: null,
            tenLinhVuc: null,
            tenDonVi: null,
            typeId: 1,
            order: this.totalRecord + 1
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddBaocaoComponent, {
            width: '700px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.baoCaoService.insertBaoCao(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Thêm mới thành công!", mType.success);
                        this.getBaoCao();
                    } else {
                        this._notification.open("Thêm mới thất bại!", mType.error);
                    }
                });
            }
        });
    }
    openDialogViewBaoCao(element: any) {
        let item: any = {
        };
        item = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogViewBaocaoComponent, {
            width: '100%',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {

            }
        });
    }
    openDialogUpdateBaoCao(element: any) {
        let item: any = {
        };
        item = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogAddBaocaoComponent, {
            width: '700px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.baoCaoService.editBaoCao(item).subscribe((res: any) => {
                    if (res.statusCode == 200) {
                        this._notification.open("Chỉnh sửa thành công!", mType.success);
                        this.getBaoCao();
                    } else {
                        this._notification.open("Chỉnh sửa thất bại!", mType.error);
                    }
                });
            }
        });
    }
    deleteBaoCaoById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.baoCaoService.deleteBaoCao(id).subscribe(res => {
                    if(res.statusCode == 200) {
                        this._notification.open('Xoá thành công!', mType.success);
                        this.getBaoCao();
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
        if(this.searchItem.loaiBaoCao != this.loaiBaoCaoChange) {
            this.paginator.firstPage();
            this.loaiBaoCaoChange = this.searchItem.loaiBaoCao;
        }
        if(this.searchItem.linhVucId != this.linhVucIdChange) {
            this.paginator.firstPage();
            this.linhVucIdChange = this.searchItem.linhVucId;
        }
        if(this.searchItem.donViId != this.donViIdChange) {
            this.paginator.firstPage();
            this.donViIdChange = this.searchItem.donViId;
        }
    }

    saveGiaThuTu(data: any) {
        let params: any = {
            pageIndex: 1,
            typeId: 1
        }
        let dsBaoCaoTemp;
        let tableData: any = [];
        let checkTang = false;
        let checkGiam = false;
        for(let thuTu of this.dsThuTuBaoCao) {
            if(thuTu.id == data.id) {
                if(thuTu.order > data.order) {
                    checkGiam = true;
                    checkTang = false;
                }
                else if(thuTu.order < data.order) {
                    checkGiam = false;
                    checkTang = true;
                }
                if(checkGiam) {
                    params.pageSize = thuTu.order;
                    this.baoCaoService.getBaoCao(params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                        dsBaoCaoTemp = next.data;
                        for(let index = dsBaoCaoTemp.length - 1; index >= 0; index--) {
                            if(data.order > dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: dsBaoCaoTemp[index].id,
                                    order: dsBaoCaoTemp[index].order
                                });
                            }
                            else if(thuTu.order == dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: data.id,
                                    order: data.order
                                });
                            }
                            else if(thuTu.order > dsBaoCaoTemp[index].order && data.order <= dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: dsBaoCaoTemp[index].id,
                                    order: dsBaoCaoTemp[index].order + 1
                                });
                            }
                        }
                        this.saveSapXep(tableData);
                    });
                }
                if(checkTang) {
                    params.pageSize = data.order;
                    this.baoCaoService.getBaoCao(params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                        dsBaoCaoTemp = next.data;
                        for(let index in dsBaoCaoTemp) {
                            if(thuTu.order > dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: dsBaoCaoTemp[index].id,
                                    order: dsBaoCaoTemp[index].order
                                });
                            }
                            else if(thuTu.order == dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: data.id,
                                    order: data.order
                                });
                            }
                            else if(thuTu.order < dsBaoCaoTemp[index].order && data.order >= dsBaoCaoTemp[index].order) {
                                tableData.push({
                                    id: dsBaoCaoTemp[index].id,
                                    order: dsBaoCaoTemp[index].order - 1
                                });
                            }
                        }
                        this.saveSapXep(tableData);
                    });
                }
            }
        }
    }

    saveSapXep(tableData: any) {
        this.baoCaoService.sapxep(tableData).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.getBaoCao()
            }
            else {
                this._notification.open('Chưa lưu được cách sắp xếp', mType.error)
            }
        }, error => {
            this._notification.open(error, mType.error)
        })
    }

    dropTable(event: CdkDragDrop<Element[]>) {
        // let item = this.dsBaoCaoXacNhan.splice(event.previousIndex, 1);
        // this.dsBaoCaoXacNhan.splice(event.currentIndex, 0, item[0]);
        moveItemInArray(this.dsBaoCao, event.previousIndex, event.currentIndex);
        this.dsBaoCao = [...this.dsBaoCao]
        this.dsBaoCao.forEach((element, index) => {
            element.order = index + (this.searchItem.pageIndex - 1) * this.searchItem.pageSize + 1
        });
        this.putTable(this.dsBaoCao)
    }

    putTable(data: any) {
        let tableData = data.map(item => {
            return {
                id: item.id,
                order: item.order
            }
        })
        this.baoCaoService.sapxep(tableData).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.getBaoCao()
            } else {
                this._notification.open('Chưa lưu được cách sắp xếp', mType.error)
            }
        }, error => {
            this._notification.open(error, mType.error)
        })
    }
}
