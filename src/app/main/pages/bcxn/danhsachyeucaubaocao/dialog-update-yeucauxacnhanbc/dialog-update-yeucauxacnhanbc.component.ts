import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { convertViToEn, formatDate } from '@app/shared/constants/util';
import { BaoCaoService } from '@app/shared/services/bcxn/baocao.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { MatSelectSearchComponent } from 'ngx-mat-select-search';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
@Component({
    selector: 'app-dialog-update-yeucauxacnhanbc',
    templateUrl: './dialog-update-yeucauxacnhanbc.component.html',
    styleUrls: ['./dialog-update-yeucauxacnhanbc.component.scss']
})
export class DialogUpdateYeuCauXacBhanBcComponent extends BaseClass implements OnInit {
    displayedColumns1 = ["stt", "tenBaoCao", "linhVuc", "banPhuTrach", "thaoTac"]
    tableData1: any = [];
    displayedColumns2 = ["stt", "tenBaoCao", "linhVuc", "banPhuTrach", "thaoTac"]
    tableData2: any = [];
    namList: any = [];
    loaiBaoCao: any = 1
    nam: number;
    thang: number;
    quy: number;
    tuanList: any = [];
    thangList: any = [];
    quyList: any = [];
    tuan: number;
    ngay: Date = new Date()
    searchItem1: any = {
        loaiBaoCao: 0,
        trangThai: -99,
        pageIndex: 1,
        pageSize: 1000
    }
    searchItem2: any = {
        loaiBaoCao: 1,
        trangThai: -99,
        pageIndex: 1,
        pageSize: 1000
    }
    dsBcDinhKy: any;
    formControl: FormGroup;
    dsBcLinhVuc: any = [];
    totalRecord1: any;
    @ViewChild('treeview1')
    tree1: TreeViewComponent;
    @ViewChild('treeview2')
    tree2: TreeViewComponent;
    field1: any;
    field2: any;
    showCheckBox: boolean = true;
    checkedNodes: any = [];
    dataDonViTheoNhomQuyen: any = [];
    listBaoCao: any = [];
    listBaoCaoSelected: any = [];
    dsBaoCaoIdSelected: any = [];
    isBaoCaoPhatSinhOk: boolean = true;
    isBaoCaoDinhKyOk: boolean = false;
    @ViewChild('table2') table2: MatTable<Element>;
    @ViewChild('table1') table1: MatTable<Element>;
    dsLinhVucBaoCao: any[];
    linhVucId: any;
    dsDonVi: any;
    dsPhongBanSelected: any[];
    dsDonViGoc: any;
    donViId: any;
    today: any = new Date();
    listBaoCaoDinhKy:any = [];
    dsLinhVucFilter: any = [];
    dsDonViFilter: any = [];
    indexLinhVucFilter: any = -1;
    indexDonViFilter: any = -1;
    @ViewChildren("linhVucFilter") linhVucFilter: QueryList<MatSelectSearchComponent>;
    @ViewChildren("donViFilter") donViFilter: QueryList<MatSelectSearchComponent>;
    dsThuTu: any = [];
    dsThuTuBaoCao: any = [];
    dsBaoCaoDaSapXep: any = [];
    protected _onDestroy = new Subject<void>();
    nodeChecked1(args): void {
        this.dsBaoCaoIdSelected = this.tree1.checkedNodes.filter(item => item.split("-").pop() == "bc");
        if(this.dsBaoCaoDaSapXep.length) {
            this.listBaoCaoSelected = this.dsBaoCaoDaSapXep.filter(item => this.dsBaoCaoIdSelected.indexOf(item.id + "-bc") != -1);
            this.data.item.baoCaoDinhKy = [...this.listBaoCaoSelected]
        }
        if (this.data.item.baoCaoDinhKy.length) {
            this.isBaoCaoDinhKyOk = true
        }
        else {
            this.isBaoCaoDinhKyOk = false
        }
    }
    // nodeChecked2(args): void {
    //     this.dsPhongBanSelected = [];
    //     this.tree2.checkedNodes.forEach(item => {
    //         this.dsPhongBanSelected.push(this.dsDonViGoc.find(item2 => item2.id == item));
    //     })
    //     console.log(this.dsPhongBanSelected);
    // }
    constructor(public dialogRef: MatDialogRef<DialogUpdateYeuCauXacBhanBcComponent>, private formBuilder: FormBuilder, private baoCaoService: BaoCaoService,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public notification: NotificationService, public danhSachYeuCauBaoCaoService: DanhSachYeuCauBaoCaoService, public danhMucBaoCaoService: DanhMucBaoCaoService) { super() }
    ngOnInit(): void {
        this.DateInit();

        if (this.data.item.id) {
            this.getBcPhatSinhByYcbc();
        }
        this.getBcLinhVuc();
        this.getLinhVucBaoCao()
        this.getDsDonVi()

        this.formControl = this.formBuilder.group({
            tieuDe: ['', [Validators.required]],
            loaiChuKy: [this.data.item.loaiChuKy, [Validators.required]],
            tuan: [''],
            thang: [''],
            quy: [''],
            nam: [this.data.item.nam, [Validators.required]],
            hanHoanThanh: [this.data.item.hanHoanThanh, [Validators.required]],
            moTa: ['', [Validators.required]]
        });
        for(let obj of this.data.item.baoCaoPhatSinh) {
            obj.onLinhVucSearch = false;
            obj.onDonViSearch = false;
        }
    }
    searchLinhVuc(element: any) {
        let index = this.data.item.baoCaoPhatSinh.indexOf(element);
        if(index != this.indexLinhVucFilter) {
            if(this.indexLinhVucFilter != -1) {
                this.data.item.baoCaoPhatSinh[this.indexLinhVucFilter].onLinhVucSearch = false;
            }
            this.indexLinhVucFilter = index;
            this.data.item.baoCaoPhatSinh[index].onLinhVucSearch = true;
        }
        this.dsLinhVucFilter = this.dsLinhVucBaoCao ? this.dsLinhVucBaoCao.filter(item => convertViToEn(item.tieuDe).indexOf(convertViToEn(this.linhVucFilter.toArray()[index].value)) !== -1) : [];
    }
    searchDonVi(element: any) {
        let index = this.data.item.baoCaoPhatSinh.indexOf(element);
        if(index != this.indexDonViFilter) {
            if(this.indexDonViFilter != -1) {
                this.data.item.baoCaoPhatSinh[this.indexDonViFilter].onDonViSearch = false;
            }
            this.indexDonViFilter = index;
            this.data.item.baoCaoPhatSinh[index].onDonViSearch = true;
        }
        this.dsDonViFilter = this.dsDonViGoc ? this.dsDonViGoc.filter(item => convertViToEn(item.tenDonVi).indexOf(convertViToEn(this.donViFilter.toArray()[index].value)) !== -1) : [];
    }
    getWeekInit() {
        let d = new Date();
        let fd = new Date(new Date().getFullYear(), 0, 1);
        let week = Math.floor((d.getTime() - fd.getTime()) / (7 * 24 * 3600000))
        return week
    }
    DateInit() {
        let today = new Date();
        for (let index = 1; index <= 53; index++) {
            this.tuanList.push(index);
        }
        for (let index = 1; index <= 12; index++) {
            this.thangList.push(index);
        }
        for (let index = 1; index <= 4; index++) {
            this.quyList.push(index);
        }
        for (let index = today.getFullYear(); index > today.getFullYear() - 6; index--) {
            this.namList.push(index);
        }
        if (this.data.item.id) {
            if (this.data.item.loaiChuKy == 1) {
                this.tuan = this.data.item.chuKy
            }
            else {
                if (this.data.item.loaiChuKy == 2) {
                    this.thang = this.data.item.chuKy
                }
                else {
                    if (this.data.item.loaiChuKy == 3) {
                        this.quy = this.data.item.chuKy
                    }
                }
            }
        }
        else {         
            this.setDefault();
        }
    }

    setDefault() {
        let today = new Date();
        this.thang = today.getMonth() + 1
        this.data.item.nam = today.getFullYear()
        this.tuan = this.getWeekInit()
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

    getBcDaSapXep() {
        let params: any = {
            typeId: 1
        }
        this.baoCaoService.getBaoCao(params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsBaoCaoDaSapXep = next.data;
            this.dsThuTu = [];
            this.dsThuTuBaoCao = [];
            if(!this.data.item.id) {
                this.data.item.baoCaoDinhKy = [...this.dsBaoCaoDaSapXep];
                if(!this.listBaoCaoSelected.length) {
                    this.data.item.baoCaoDinhKy = [...this.dsBaoCaoDaSapXep];
                }
                else {
                    this.data.item.baoCaoDinhKy = [];
                    for(let item of this.listBaoCaoSelected) {
                        for(let baoCao of this.dsBaoCaoDaSapXep) {
                            if(item.id == baoCao.id) {
                                this.data.item.baoCaoDinhKy.push(baoCao);
                                break;
                            }
                        }
                    }
                }
                for (let i = 1; i <= this.dsBaoCaoDaSapXep.length; i++) {
                    this.dsThuTu.push({ hienthi: i, giatri: i });
                    this.dsThuTuBaoCao.push({ id: this.dsBaoCaoDaSapXep[i - 1].id, order: this.dsBaoCaoDaSapXep[i - 1].order });
                }
                this.treeCheck();
            }
        });
    }

    getBcLinhVuc() {
        this.danhSachYeuCauBaoCaoService.getBcLinhVuc().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            next.forEach(item => {
                if (item.linhVucChaId) {
                    let temp = {
                        id: item.id + "-lv",
                        pid: item.linhVucChaId + "-lv",
                        name: item.tieuDe,
                        isBaoCao: false,
                        hasChild: (next.find(item2 => item2.linhVucChaId == item.id) || item.baoCao.length) ? true : false
                    }
                    this.dsBcLinhVuc.push(temp)
                    if (item.baoCao.length) {
                        item.baoCao.forEach(item1 => {
                            let temp = {
                                id: item1.id + "-bc",
                                pid: item.id + "-lv",
                                name: item1.tenBaoCao,
                                isBaoCao: true,
                                hasChild: false
                            }
                            this.dsBcLinhVuc.push(temp);
                            this.listBaoCao.push(item1);
                        })
                    }
                }
                else {
                    let temp = {
                        id: item.id + "-lv",
                        // pid: item.linhVucChaId,
                        name: item.tieuDe,
                        isBaoCao: false,
                        hasChild: (next.find(item2 => item2.linhVucChaId == item.id) || item.baoCao.length) ? true : false
                    }
                    this.dsBcLinhVuc.push(temp)
                    if (item.baoCao.length) {
                        item.baoCao.forEach(item1 => {
                            let temp = {
                                id: item1.id + "-bc",
                                pid: item.id + "-lv",
                                name: item1.tenBaoCao,
                                isBaoCao: true,
                                hasChild: false
                            }
                            this.dsBcLinhVuc.push(temp);
                            this.listBaoCao.push(item1);
                        })
                    }
                }
            });
            this.field1 = { dataSource: this.dsBcLinhVuc, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
            if (this.data.item.id) {
                this.getBcDinhKyByYcbc();
            }
            this.getBcDaSapXep();
        })
    }
    // getDsBaoCaoDinhKy() {
    //     this.danhSachYeuCauBaoCaoService.getDsBc(this.searchItem1).pipe(this.unsubsribeOnDestroy).subscribe(next => {
    //         if (next && next.statusCode == 200) {
    //             this.dsBcDinhKy = next.data;
    //             if (!this.dsBcDinhKy.length) {
    //                 this.notification.open('Chưa có dữ liệu danh sách báo cáo định kỳ', mType.info)
    //             }
    //             else {
    //                 this.dsBcDinhKy = next.data;
    //                 this.totalRecord1 = next ? next.totalRecord : 0;
    //             }
    //         }
    //     }, error => {
    //         this.notification.open(error, mType.error)
    //     })
    // }
    getDsDonVi() {
        this.dsDonVi = []
        this.dsDonViGoc = []
        this.danhSachYeuCauBaoCaoService.getDsDonVi().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next && next.length) {
                this.dsDonViGoc = next;
                this.dsDonViFilter = this.dsDonViGoc;
                this.donViId = next && next[0] ? next[0].id : null
                // next.forEach(item => {
                //     if (item.donViChaId) {
                //         let temp = {
                //             id: item.id,
                //             pid: item.donViChaId,
                //             name: item.tenDonVi,
                //             hasChild: (next.find(item2 => item2.donViChaId == item.id)) ? true : false
                //         }
                //         this.dsDonVi.push(temp)
                //     }
                //     else {
                //         let temp = {
                //             id: item.id,
                //             // pid: item.linhVucChaId,
                //             name: item.tenDonVi,
                //             hasChild: (next.find(item2 => item2.donViChaId == item.id)) ? true : false
                //         }
                //         this.dsDonVi.push(temp)
                //     }
                // });
                // this.field2 = { dataSource: this.dsDonVi, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    getLinhVucBaoCao() {
        this.dsLinhVucBaoCao = []
        this.danhMucBaoCaoService.getLinhVucBaoCao().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (!next.length) {
                // this.notification.open('Chưa có dữ liệu lĩnh vực báo cáo', mType.info)
            }
            else {
                this.dsLinhVucBaoCao = next;
                this.dsLinhVucFilter = this.dsLinhVucBaoCao;
                this.linhVucId = next && next[0] ? next[0].id : null
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    getBcDinhKyByYcbc() {
        this.data.item.baoCaoDinhKy = []
        this.danhSachYeuCauBaoCaoService.getBcByYcbc(this.data.item.id, 1).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next) {
                if (!next.length) {
                    // this.notification.open('Báo cáo định kỳ rỗng', mType.info)
                }
                else {
                    this.data.item.baoCaoDinhKy = next;
                    this.listBaoCaoDinhKy = next;
                    this.treeCheck()

                    // this.totalRecord1 = next ? next.totalRecord : 0;
                }
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    treeCheck() {
        this.checkedNodes = []
        this.data.item.baoCaoDinhKy.map(item => {
            this.checkedNodes.push(item.id + "-bc")
        })
        this.dsBcLinhVuc.forEach(element => {
            if (this.checkedNodes.indexOf(element.id) != -1) {
                element.checked = true
            }
        });
        this.tree1.checkedNodes = this.checkedNodes;
    }
    getBcPhatSinhByYcbc() {
        this.data.item.baoCaoPhatSinh = []
        this.danhSachYeuCauBaoCaoService.getBcByYcbc(this.data.item.id, 2).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next) {
                if (!next.length) {
                    // this.notification.open('Báo cáo phát sinh rỗng', mType.info)
                }
                else {
                    this.data.item.baoCaoPhatSinh = next;
                    // this.totalRecord1 = next ? next.totalRecord : 0;
                }
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    addRow() {
        let temp: any = {
            tenBaoCao: '',
            linhVucId: this.linhVucId,
            loaiBaoCao: 1,
            donViId: this.donViId
        }

        this.data.item.baoCaoPhatSinh.push(temp);
        this.data.item.baoCaoPhatSinh = [...this.data.item.baoCaoPhatSinh]
        this.table2.renderRows();
    }
    // openDialogUpdateBaoCao() {
    //     let item: any = {
    //         idBaoCao: null,
    //         loaiBaoCao: 1,
    //         tenBaoCao: '',
    //         urlLink: '',
    //         moTa: '',
    //         soLieu: 1,
    //         trangThai: 0,
    //         donViId: null,
    //         linhVucId: null,
    //         tenLinhVuc: '',
    //         chuKy: '',
    //         viewName: '',
    //     };
    //     const dialogRef = this.dialog.open(DialogUpdateBaocaoComponent, {
    //         width: '1000px',
    //         data: {
    //             item
    //         }
    //     });
    //     dialogRef.afterClosed().subscribe((response: any) => {
    //         if (response == true) {
    //             this.data.item.baoCaoPhatSinh.push(item)
    //             this.data.item.baoCaoPhatSinh = [...this.data.item.baoCaoPhatSinh]
    //             this.isBaoCaoPhatSinhOk = true
    //         }
    //     });
    // }
    deleteBaoCaoDinhKy(element: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                const index = this.data.item.baoCaoDinhKy.indexOf(element, 0);
                if (this.data.item.baoCaoDinhKy.length > 0) {
                    this.data.item.baoCaoDinhKy.splice(index, 1);
                }
                this.data.item.baoCaoDinhKy = [... this.data.item.baoCaoDinhKy]
                this.treeCheck()
                this.table1.renderRows();
            }
        });
    }
    deleteBaoCaoPhatSinh(element: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                const index = this.data.item.baoCaoPhatSinh.indexOf(element, 0);
                if (this.data.item.baoCaoPhatSinh.length > 0) {
                    this.data.item.baoCaoPhatSinh.splice(index, 1);
                }
                this.data.item.baoCaoPhatSinh = [... this.data.item.baoCaoPhatSinh]
            }
        });
    }
    get f() {
        return this.formControl.controls;
    }
    save(trangThai: any) {
        // this.listBaoCaoDinhKy.forEach((element,index) => {
        //     if(!this.data.item.baoCaoDinhKy.find(item2 => item2.id == element.id)){
        //         this.listBaoCaoDinhKy.splice(index, 1);

        //     }
        // });
        let listItem = []
        this.data.item.baoCaoDinhKy.forEach(item => {
            if(this.listBaoCaoDinhKy.find(item2 => item2.id == item.id)){
                listItem.push(this.listBaoCaoDinhKy.find(item2 => item2.id == item.id));
            }else{
                listItem.push(item);
            }
        })
        this.data.item.baoCaoDinhKy = [...listItem];
        this.formControl.markAllAsTouched();
        this.isBaoCaoPhatSinhOk = true;
        if (this.data.item.baoCaoPhatSinh.length) {
            this.data.item.baoCaoPhatSinh.forEach(element => {
                if (!element.tenBaoCao) {
                    this.isBaoCaoPhatSinhOk = false
                }
            });
        }
        if (!this.isBaoCaoPhatSinhOk) return;
        if (!this.data.item.baoCaoDinhKy.length && !this.data.item.baoCaoPhatSinh.length) {
            const confirmDialog = this.dialog.open(InfoDialogComponent, { disableClose: false })
            confirmDialog.componentInstance.title = 'Bạn hãy nhập ít nhất 1 báo cáo ở 1 trong 2 loại';
            return
        }
        if (this.formControl.invalid) {
            return;
        } else {
            if (this.data.item.loaiChuKy == 1) {
                this.data.item.chuKy = this.tuan
            }
            else {
                if (this.data.item.loaiChuKy == 2) {
                    this.data.item.chuKy = this.thang
                }
                else {
                    if (this.data.item.loaiChuKy == 3) {
                        this.data.item.chuKy = this.quy
                    }
                    else {
                        if (this.data.item.loaiChuKy == 4) {
                            this.data.item.chuKy = null
                        }
                    }
                }
            }
            if (trangThai == 1) {
                if (!this.data.item.id) {
                    this.data.item.trangThai = trangThai
                }
            }
            else {
                if (trangThai == 2) {
                    this.data.item.trangThai = trangThai
                }
            }
            this.data.item.hanHoanThanh = formatDate(this.data.item.hanHoanThanh, 'yyyy-mm-dd')
            this.dialogRef.close(true);
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
                this.getBcDaSapXep()
            }
            else {
                this.notification.open('Chưa lưu được cách sắp xếp', mType.error)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }

    dropTable(event: CdkDragDrop<Element[]>) {
        event.item.data.order = JSON.parse(JSON.stringify(event.container.data[event.currentIndex])).order;
        this.saveGiaThuTu(event.item.data);
    }
}
