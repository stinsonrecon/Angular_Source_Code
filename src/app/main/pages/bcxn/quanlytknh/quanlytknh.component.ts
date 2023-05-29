import { DialogEditTaiKhoanNganHangComponent } from './dialog-add-tknh/dialog-edit-tknh/dialog-edit-tknh.component';
import { DialogAddConfigTaiKhoanNganHangComponent } from './dialog-config-tknh/dialog-add-config-tknh/dialog-add-config-tknh.component';
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
import { DialogAddTaiKhoanNganHangComponent } from './dialog-add-tknh/dialog-add-tknh.component';
import { MatTable } from '@angular/material/table';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { CauHinhNganHangService } from '@app/shared/services/bcxn/cau-hinh-ngan-hang.service';


@Component({
    selector: 'app-quanlytknh',
    templateUrl: './quanlytknh.component.html',
    styleUrls: ['./quanlytknh.component.scss']
})

export class QuanLyTaiKhoanNganHangComponent extends BaseClass implements OnInit {
    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    totalRecord: any;
    displayedColumns = ["tt", "tenNganHang", "tenVietTat", "tenLoaiHoSo", "moTa","phuongThucKetNoi", "lookupType", "trangThai", "thaoTac"];
    dataFake: any
    tuKhoaChange: any = "";
    trangThaiChange: any = 1;
    searchItem: any = {
        TuKhoa: "",
        trangThai: 3,
        pageSize: 100,
        pageIndex: 1,
    };
    configData: any = {
        NganHangId: ""
    }

    constructor(
        public dialog: MatDialog, 
        public loaiHoSoService: DanhMucLoaiHoSoService, 
        public hosott: HoSoToiTaoService, 
        public _notification: NotificationService, 
        private formBuilder: FormBuilder,
        public _configService : CauHinhNganHangService
    ) { super() }

    ngOnInit(): void {
        this.getListBanks();
    }

    changeTrangThai(data: any) {
        let params = {
            "nganHangId": data.nganHangId,
            "MaNganHang": data.maNganHang,
            "TrangThaiTiepNhan": data.trangThaiTiepNhan === 1 ? 0 : 1,
            "GhiChu": data.ghiChu,
            "TenNganHang": data.tenNganHang,
            "TenVietTat": data.tenVietTat
        }
        this.loaiHoSoService.updateNganHang(params).pipe(this.unsubsribeOnDestroy).subscribe((res) => {
            if(res && res.success) {
                this._notification.open("Cập nhập trạng thái thành công!", mType.success);
            } else {
                this._notification.open("Cập nhập trạng thái thất bại", mType.error)
            }
            this.getListBanks();
        })
    }

    getListBanks(e?: any): any {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.hosott.getALLNganHang(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {

            this.totalRecord = next ? next.data.TotalRecord : 0;
            this.dataFake = next.data.Items;
        });
    }

    openDialogAddLoaiHoSo() {
        let item: any = {
            tenLoaiHoSo: null,
            maLoaiHoSo: null,
            moTa: null,
            trangThai: null,
            luongPheDuyet: [],
            taiLieuYeuCau: [],
        };
        // item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogAddTaiKhoanNganHangComponent, {
            width: '40%',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            this.getListBanks()
            // if (response === true) {
            //     this.loaiHoSoService.createLoaiHoSo(item).subscribe((res: any) => {
            //         if (res.statusCode == 200) {
            //             this._notification.open("Thêm mới thành công!", mType.success);
            //             this.loaiHoSoService.setDataLuongPheDuyet([]);
            //             this.getListBanks();
            //         } else {
            //             this._notification.open("Thêm mới thất bại!", mType.error);
            //             this.loaiHoSoService.setDataLuongPheDuyet([]);
            //         }
            //     });
            // } else {
            //     // this.loaiHoSoService.dataLuongPheDuyet = [];
            // }
        });
    }

    openDialogUpdate(element: any) {
        let item: any = {
        }
            item = JSON.parse(JSON.stringify(element));
            const dialogRef = this.dialog.open(DialogEditTaiKhoanNganHangComponent, {
                width: '40%',
                autoFocus: false,
                data: {
                    item
                }
            });
            dialogRef.afterClosed().subscribe((response: any) => {
                if (response === true) {
                    this.getListBanks()
                } else {
                }
            });
    }

    openDialogAddConfig(element: any) {
        let item: any;
        this.configData.NganHangId = element.nganHangId;

        this._configService.getListCauHinhNganHang(this.configData).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if(next.data.Items.length > 0) {
                item = {
                    linkTransferUrl : next.data.Items[0].linkTransferUrl,
                    linkQueryBaseUrl : next.data.Items[0].linkQueryBaseUrl,
                    fTPPath : next.data.Items[0].fTPPath,
                    fTPUserName : next.data.Items[0].fTPUserName,
                    fTPPassword : next.data.Items[0].fTPPassword,
                    eVNDSAPath : next.data.Items[0].eVNDSAPath,
                    passPhraseDSA : next.data.Items[0].passPhraseDSA,
                    eVNRSAPath : next.data.Items[0].eVNRSAPath,
                    passPhraseRSA : next.data.Items[0].passPhraseRSA,
                    bankDSAPath : next.data.Items[0].bankDSAPath,
                    bankRSAPath : next.data.Items[0].bankRSAPath,
                    bankApprover : next.data.Items[0].bankApprover,
                    bankSenderAddr : next.data.Items[0].bankSenderAddr,
                    bankModel : next.data.Items[0].bankModel,
                    version : next.data.Items[0].version,
                    softwareProviderId : next.data.Items[0].softwareProviderId,
                    bankLanguage : next.data.Items[0].bankLanguage,
                    bankAppointedApprover : next.data.Items[0].bankAppointedApprover,
                    bankChannel : next.data.Items[0].bankChannel,
                    bankMerchantId : next.data.Items[0].bankMerchantId,
                    bankClientIP : next.data.Items[0].bankClientIP,
                    daXoa :next.data.Items[0].daXoa
                }
                item = JSON.parse(JSON.stringify(next.data.Items[0]));
                const dialogRef = this.dialog.open(DialogAddConfigTaiKhoanNganHangComponent, {
                    width: '100%',
                    autoFocus: false,
                    data: {
                        item
                    }
                });
                dialogRef.afterClosed().subscribe((response: any) => {
                    if(response === true) {
                        console.log(response)
                        this.getListBanks()
                    }
                    else {
                        console.log(response)
                    }
                });
            }
            else{
                item = {
                    linkTransferUrl : element.linkTransferUrl,
                    linkQueryBaseUrl : element.linkQueryBaseUrl,
                    fTPPath : element.fTPPath,
                    fTPUserName : element.fTPUserName,
                    fTPPassword : element.fTPPassword,
                    eVNDSAPath : element.eVNDSAPath,
                    passPhraseDSA : element.passPhraseDSA,
                    eVNRSAPath : element.eVNRSAPath,
                    passPhraseRSA : element.passPhraseRSA,
                    bankDSAPath : element.bankDSAPath,
                    bankRSAPath : element.bankRSAPath,
                    bankApprover : element.bankApprover,
                    bankSenderAddr : element.bankSenderAddr,
                    bankModel : element.bankModel,
                    version : element.version,
                    softwareProviderId : element.softwareProviderId,
                    bankLanguage : element.bankLanguage,
                    bankAppointedApprover : element.bankAppointedApprover,
                    bankChannel : element.bankChannel,
                    bankMerchantId : element.bankMerchantId,
                    bankClientIP : element.bankClientIP,
                    daXoa : [false]
                }
                item = JSON.parse(JSON.stringify(element));  
                const dialogRef = this.dialog.open(DialogAddConfigTaiKhoanNganHangComponent, {
                    width: '100%',
                    autoFocus: false,
                    data: {
                        item
                    }
                });
                dialogRef.afterClosed().subscribe((response: any) => {
                    if(response === true) {
                        console.log(response)
                        this.getListBanks()
                    }
                    else {
                        console.log(response)
                    }
                });
            }
        });
    }

    deleteLoaiHoSoById(id: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataFake = this.dataFake.filter((item ) => item.nganHangId !== id)
                this.hosott.deleteNganHang(id).subscribe(res => {
                    if (res && res.success) {
                        this._notification.open('Xoá thành công!', mType.success);
                        this.getListBanks();
                    } else {
                        this._notification.open('Không thể xoá ngân hàng này, ngân hàng đang được liên kết với tài khoản và chi nhánh!', mType.error);
                        this.getListBanks();
                    }
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
