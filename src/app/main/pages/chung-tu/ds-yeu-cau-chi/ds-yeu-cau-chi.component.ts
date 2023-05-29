import { YeuCauChiService } from './../../../../shared/services/chung-tu/yeu-cau-chi.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { forkJoin } from 'rxjs';
import { DSYeuCauChiColection } from '@app/shared/models/hosothanhtoan/ds-yeu-cau-chi.model';
import * as util from '@app/shared/constants/util';
import { UNCDetailComponent } from './unc-detail/unc-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { XemChungTuComponent } from '../xem-chung-tu/xem-chung-tu.component';
import { TRANG_THAI_YEU_CAU_CHI } from '@app/shared/constants/yeucauchi.const';
import { LOAI_GIAO_DICH, LOAI_PHI, TrangThaiChungTu } from '@app/shared/constants/chungtu.const';
import { NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { DialogViewDetailComponent } from '../danh-sach-chung-tu/dialog-view-detail/dialog-view-detail.component';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-ds-yeu-cau-chi',
    templateUrl: './ds-yeu-cau-chi.component.html',
    styleUrls: ['./ds-yeu-cau-chi.component.scss']
})
export class DsYeuCauChiComponent extends BaseClass implements OnInit {
    displayedColumns = ["stt", "maYeuCauChi", "soChungTu", "noiDungTT", "loaiGiaoDich", "ngayYeuCauChi", "soTien", "donViHuong", "donViNhan", "loaiPhiChuyen", "ngayChiThucTe", "ketQuaChi", "trangThaiChi", "thaoTac"];
    searchItem: any = {
        NganHangChiId: '',
        NganHangThuHuongId: '',
        TuKhoa: '',
        ThoiGianChiTu: '',
        ThoiGianChiDen: '',
        NgayYeuCauChiTu: '',
        NgayYeuCauChiDen: '',
        PageSize: 20,
        PageIndex: 1,
        TrangThaiChi: -99
    };
    listBank: NganHang[]
    listYeuCauChi: MatTableDataSource<DSYeuCauChiColection>;
    totalRecord: number;
    trangThai = TRANG_THAI_YEU_CAU_CHI
    loaiPhi = LOAI_PHI
    loaiGiaoDich = LOAI_GIAO_DICH
    constTrangThaiChungTu = TrangThaiChungTu
    constructor(
        private hoSoToiTaoService: HoSoToiTaoService,
        private yeuCauChiService: YeuCauChiService,
        private _dialog: MatDialog,
    ) {
        super()
    }

    ngOnInit(): void {
        this.getYeuCauChi();
    }

    getYeuCauChi() {
        const param = {
            ...this.searchItem,
            ThoiGianChiTu: (this.searchItem.ThoiGianChiTu == "" || this.searchItem.ThoiGianChiTu == null) ? "" : util.formatDate(this.searchItem.ThoiGianChiTu, 'DD/MM/YYYY'),
            ThoiGianChiDen: (this.searchItem.ThoiGianChiDen == "" || this.searchItem.ThoiGianChiDen == null) ? "" : util.formatDate(this.searchItem.ThoiGianChiDen, 'DD/MM/YYYY'),
            NgayYeuCauChiTu: (this.searchItem.NgayYeuCauChiTu == "" || this.searchItem.NgayYeuCauChiTu == null) ? "" : util.formatDate(this.searchItem.NgayYeuCauChiTu, 'DD/MM/YYYY'),
            NgayYeuCauChiDen: (this.searchItem.NgayYeuCauChiDen == "" || this.searchItem.NgayYeuCauChiDen == null) ? "" : util.formatDate(this.searchItem.NgayYeuCauChiDen, 'DD/MM/YYYY')
        }
        this.hoSoToiTaoService.getDSNganHang()
            .pipe(this.unsubsribeOnDestroy,
                finalize(() => {
                    this.yeuCauChiService.getDsYeuCauChi(param)
                        .pipe(this.unsubsribeOnDestroy)
                        .subscribe(
                            (res) => {
                                if (res.data.TotalRecord > 0) {
                                    this.listYeuCauChi = res.data.Items.map(
                                        ele => {
                                            return {
                                                ...ele,
                                                tenNganHangNhanVietTat: ele.chungTu.maNganHangNhan == "" ? null :
                                                    this.listBank.filter(x => x.maNganHang == ele.chungTu.maNganHangNhan)[0]?.tenVietTat,
                                                tenNganHangThanhToanVietTat: ele.chungTu.maNganHangChuyen == "" ? null :
                                                    this.listBank.filter(x => x.maNganHang == ele.chungTu.maNganHangChuyen)[0]?.tenVietTat,
                                                thoiGianChi: ele.thoiGianChi == "01/01/0001 00:00:00" ? null : ele.thoiGianChi.substring(0, ele.thoiGianChi.indexOf(' '))
                                            }
                                        }
                                    )
                                    this.totalRecord = res.data.TotalRecord
                                }
                                else {
                                    this.listYeuCauChi = null
                                }
                                console.log(res)
                            }
                        )
                }))
            .subscribe(
                (res) => {
                    this.listBank = res
                }
            )

    }
    search() {
        this.getYeuCauChi()
    }
    pageChange(e) {
        this.searchItem.pageSize = e.pageSize;
        this.searchItem.pageIndex = e.pageIndex + 1;
        this.getYeuCauChi()
    }

    getUNC(e) {
        // const dialogRef = this._dialog.open(UNCDetailComponent, {
        //     width: '1000px',
        //     height: '800px',
        //     data: e.chungTuId
        // });
        // dialogRef.afterClosed().subscribe((response: any) => {
        //     if (response === true) {

        //     }
        // });
        const dialogRef = this._dialog.open(XemChungTuComponent,
            {
                width: '70%',
                minWidth: '70vw',
                height: '90vh',
                data: {
                    id: e.chungTuId,
                }
            })
    }
    getTrangThai(value: number): string {
        return this.trangThai.find(x => x.value === value)?.name;
    }
    getLoaiGiaoDich(value): string {
        return this.loaiGiaoDich.find(x => x.value == value.toUpperCase())?.name
    }
    getLoaiPhi(value): string {
        return this.loaiPhi.find(x => x.value == value.toUpperCase())?.name
    }

    openDialogViewYCC(id) {
        const dialogRef = this._dialog.open(DialogViewDetailComponent,
            {
                width: '700px',
                data: {
                    id: id,
                }
            })
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
            }
        });
    }

}
