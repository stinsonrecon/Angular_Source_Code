import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { LOAI_GIAO_DICH, LOAI_PHI } from '@app/shared/constants/chungtu.const';
import { ChiNhanhNganHang, NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-dialog-view-detail',
    templateUrl: './dialog-view-detail.component.html',
    styleUrls: ['./dialog-view-detail.component.scss']
})
export class DialogViewDetailComponent extends BaseClass implements OnInit {
    dialogData;
    listNganHang: NganHang[]
    listChiNhanh: ChiNhanhNganHang[]
    tenChiNhanhNhan: string
    tenChiNhanhChuyen: string
    loaiGiaoDich = LOAI_GIAO_DICH
    loaiPhi = LOAI_PHI
    currentUserId = JSON.parse(localStorage.getItem('user')).id;
    constructor(
        private _service: DanhSachChungTuService,
        @Inject(MAT_DIALOG_DATA) public data,
        private _notification: NotificationService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<DialogViewDetailComponent>,
        private taiKhoanNhanService: TaikhoannhanService
    ) {
        super()
    }

    ngOnInit(): void {
        const listNganHang = this.taiKhoanNhanService.getListNganHang();
        const getDetail = this._service.getDetailConfirm(this.data.id)
        forkJoin([listNganHang, getDetail]).pipe(
            this.unsubsribeOnDestroy,
            finalize(() => {
                let nganHangNhanId = null
                let nganHangChuyenId = null
                if (this.dialogData) {
                    nganHangNhanId = this.getNganHangId(this.dialogData.maNganHangNhan)
                    nganHangChuyenId = this.getNganHangId(this.dialogData.maNganHangChuyen)

                    this.getChiNhanhNhan()
                }
            })
        )
            .subscribe((res) => {
                if (res[0]) {
                    this.listNganHang = res[0].data.Items
                }
                if (res[1]) {
                    if (res[1].success) {
                        this.dialogData = res[1].data;
                    }
                }
            })
    }

    getNganHangId(maNganHang) {
        let nganHangId = this.listNganHang.find(x => x.maNganHang == maNganHang)
        if (nganHangId) {
            return nganHangId.nganHangId
        }
        else {
            return null
        }
    }

    getChiNhanhNhan() {
        this.taiKhoanNhanService.getListChiNhanhNHByNganHang().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listChiNhanh = res.data.Items;
                    this.tenChiNhanhChuyen = this.listChiNhanh.find(x => x.maChiNhanhErp == this.dialogData.maChiNhanhChuyen) ?
                        this.listChiNhanh.find(x => x.maChiNhanhErp == this.dialogData.maChiNhanhChuyen).tenChiNhanh :
                        null
                    this.tenChiNhanhNhan = this.listChiNhanh.find(x => x.maChiNhanhErp == this.dialogData.maChiNhanhNhan) ?
                        this.listChiNhanh.find(x => x.maChiNhanhErp == this.dialogData.maChiNhanhNhan).tenChiNhanh :
                        null
                }
            )
    }

    getLoaiGiaoDich(value): string {
        if(value == null){
            return null
        }
        else{
            return this.loaiGiaoDich.find(x => x.value == value.toUpperCase())?.name
        }
    }
    getLoaiPhi(value): string {
        if(value == null){
            return null
        }
        else{
            return this.loaiPhi.find(x => x.value == value.toUpperCase())?.name
        }
    }

}
