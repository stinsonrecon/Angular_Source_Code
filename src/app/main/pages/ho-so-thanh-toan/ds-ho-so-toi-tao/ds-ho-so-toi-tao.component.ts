import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { ConfirmDialogComponent } from '@app/shared/component/confirm-dialog/confirm-dialog.component';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { HINH_THUC_TT, MUC_DO_UU_TIEN, TrangThaiHoSo, TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { forkJoin } from 'rxjs';
import { ChiTietHoSoComponent } from '../chi-tiet-ho-so/chi-tiet-ho-so.component';
import * as util from '@app/shared/constants/util';
import { AuthService } from '@app/shared/services';

@Component({
    selector: 'app-ds-ho-so-toi-tao',
    templateUrl: './ds-ho-so-toi-tao.component.html',
    styleUrls: ['./ds-ho-so-toi-tao.component.scss']
})
export class DsHoSoToiTaoComponent extends BaseClass implements OnInit {

    trangThai = TRANG_THAI_HO_SO;
    mucDoUuTien = MUC_DO_UU_TIEN;
    hinhThucTT = HINH_THUC_TT;
    constTrangThaiHoSo = TrangThaiHoSo

    listTest: MatTableDataSource<any>;
    public user = JSON.parse(localStorage.getItem("user"));

    displayedColumns: string[] = [
        "stt",
        "maHoSo",
        "tenHoSo",
        "loaiHoSo",
        "donViDeNghiTT",
        "nguoiTao",
        "tongTienDeNghiTT",
        // "thoiHanYeuCauTT",
        "ngayTao",
        "ngayPheDuyet",
        // "hinhThucTT",
        "ngayThanhToan",
        "trangThaiHoSo",
        "hanhDong",
    ];
    listNktc: any

    @ViewChild("paginator") paginator: MatPaginator;
    totalRecord: number;
    dsChucNang: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;
    searchItem: any = {
        TinhTrangPheDuyet: 0,
        BoPhanYeuCau: 0,
        LoaiHoSo: '',
        TuKhoa: '',
        PageSize: 20,
        PageIndex: 1,
        TuNgay: '',
        DenNgay: '',
        DaPheDuyet: 0,
        userId: '',
    };
    dsLoaiHs: any;
    dsDonvi: any;
    filterDonVi: FormControl;
    filteredDonVi: any;
    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private _service: HoSoToiTaoService,
        private _authService: AuthService,
        private router: Router
    ) {
        super();
        this.searchItem.userId = this._authService.user.id;
    }

    ngOnInit(): void {
        console.log(this.user)
        const getLoaiHs = this._service.getLoaiHs();
        const getListHs = this._service.getListHoSo(this.searchItem);
        const getListDonVi = this._service.getDsDonVi();

        forkJoin([getLoaiHs, getListHs, getListDonVi])
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res[0]?.length > 0) {
                        this.dsLoaiHs = res[0];
                    } else {
                        this.dsLoaiHs = []
                    }

                    if (res[1] && res[1].data?.length > 0) {
                        this.listTest = new MatTableDataSource<any>(res[1].data);
                        this.totalRecord = res[1].totalRecord;
                    } else {
                        this.listTest = new MatTableDataSource<any>([]);
                        this.totalRecord = 0;
                    }

                    if (res[2]?.length > 0) {
                        this.dsDonvi = res[2];
                        this.filteredDonVi = res[2];
                    } else {
                        this.dsDonvi = [];
                        this.filteredDonVi = [];
                    }
                }
            );
        this.filterDonVi = new FormControl('');
        this.filterDonVi.valueChanges.subscribe(
            value => {
                this.filteredDonVi = this.dsDonvi.filter(x => x.tenDonVi.toLowerCase().includes(value.toLowerCase()));
            }
        )
    }

    searchHs() {
        const param = {
            ...this.searchItem,
            TuNgay: !this.searchItem.TuNgay ? '' : util.formatDate(this.searchItem.TuNgay, 'DD/MM/YYYY'),
            DenNgay: !this.searchItem.DenNgay ? '' : util.formatDate(this.searchItem.DenNgay, 'DD/MM/YYYY')
        }
        this._service.getListHoSo(param)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res && res.data?.length > 0) {
                        this.listTest = new MatTableDataSource<any>(res.data);
                        this.totalRecord = res.totalRecord;
                    } else {
                        this.listTest = new MatTableDataSource<any>([]);
                        this.totalRecord = 0;
                    }
                }
            );
    }

    pageChange(e) {
        this.searchItem.PageSize = e.pageSize;
        this.searchItem.PageIndex = e.pageIndex + 1;
        this.searchHs();
    }

    getTrangThai(value: number): string {
        return this.trangThai.find(x => x.value === value)?.name;
    }

    getHinhThucTT(value: number): string {
        return this.hinhThucTT.find(x => x.value === value)?.name;
    }

    view(e: any) {
        this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${e}`, {action: 'DS_HO_SO'}]);
    }

    edit(data) {
        this.router.navigate([`/ho-so-thanh-toan/cap-nhap/${data.id}`])
    }

    delete(id: string) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa hồ sơ thanh toán?';
        confirmDialog.afterClosed().subscribe(
            result => {
                if (result) {
                    this._service.deleteHoSo(id).subscribe(
                        res => {
                            if (res?.statusCode === 200) {
                                this._notification.open(
                                    "Xóa hồ sơ thanh toán thành công!",
                                    mType.success
                                );
                                this.searchHs();
                            }
                            else if (res?.statusCode === 400) {
                                this._notification.open(
                                    res?.message,
                                    mType.warn
                                );
                                this.searchHs();
                            }
                        },
                        err => {
                            this._notification.open(
                                "Xóa hồ sơ thanh toán thất bại!",
                                mType.error
                            );
                        }
                    );
                }
            }
        );
    }

    approval() {

    }

    redirectCreate() {
        // this._service.changeIDHSTT('')
        // this._service.changeDataMaterial({})
        this.router.navigate(['/ho-so-thanh-toan/themmoi'])
    }

}
