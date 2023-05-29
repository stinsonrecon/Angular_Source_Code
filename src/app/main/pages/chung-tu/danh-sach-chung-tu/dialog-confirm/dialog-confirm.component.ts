import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterContentInit, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { BaseClass } from '@app/base-class';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DialogSubmitComponent } from '../dialog-submit/dialog-submit.component';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { ChiNhanhNganHang, NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { forkJoin } from 'rxjs';
import { LOAI_GIAO_DICH, LOAI_PHI } from '@app/shared/constants/chungtu.const';
import { formatDate } from '@app/shared/constants/util';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent extends BaseClass implements OnInit {

    dialogData;
    listNganHang: NganHang[]
    listChiNhanh: ChiNhanhNganHang[]
    minDate = new Date()
    maxToDate = new Date().setDate(2);
    tenChiNhanhNhan: string
    tenChiNhanhChuyen: string
    loaiGiaoDich = LOAI_GIAO_DICH
    loaiPhi = LOAI_PHI
    date = new Date();
    currentUserId = JSON.parse(localStorage.getItem('user')).id;
    dataInfo: any;
    listHD = []
    enableButtonDongYChuyenTien: boolean = false
    thaoTacBuocPheDuyetId: string = ''
    danhSachThaoTac = DanhSachThaoTac
    constructor(
        private _service: DanhSachChungTuService,
        @Inject(MAT_DIALOG_DATA) public data,
        private _notification: NotificationService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<DialogConfirmComponent>,
        private taiKhoanNhanService: TaikhoannhanService,
        private hoSoToiTaoService: HoSoToiTaoService
    ) {
        super();
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

            this.hoSoToiTaoService.getChitiet(this.data.hoSoId).subscribe(
                res => {
                  if(res.statusCode == 200) {
                    this.dataInfo = res.data[0];
                          this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                              this.listHD.push(x.hanhDong)
                          })
                          this.listHD.forEach(x => {
                              if(x == this.danhSachThaoTac.btnDongYChuyenTienNganHang && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                                  this.enableButtonDongYChuyenTien = true
                              }
                          })
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

    openDialogSubmit(action) {
        this.thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if(x.hanhDong == action) {
            this.thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        const dialogRef = this.dialog.open(DialogSubmitComponent);
        dialogRef.afterClosed().subscribe(
            res => {
                if (res === true) {
                    this.sendRequest();
                    // this.dialogRef.close();
                }
            }
        )
    }

    sendRequest() {
        const param = {
            NguoiYeuCauChiId: this.currentUserId,
            ChungTuId: this.data.id,
            SoTienTT: this.dialogData.soTien,
            TaiKhoanThuHuong: this.dialogData.soTaiKhoanNhan,
            NguoiThuHuong: this.dialogData.tenTaiKhoanNhan,
            TrangThaiChi: 1,
            NgayGiaoDichThucTe: formatDate(this.date, "yyyy-mm-dd"),
            ThaoTacBuocPheDuyetId: this.thaoTacBuocPheDuyetId
        }
        this._service.sendRequest(param)
            .pipe(this.unsubsribeOnDestroy,
                finalize(() => this.dialogRef.close(true)))
            .subscribe(
                res => {
                    if (res.success) {
                        this._notification.open(
                            res.message,
                            mType.success
                        )
                    } else {
                        this._notification.open(
                            res.message,
                            mType.error
                        )
                    }
                },
                err => {
                    this._notification.open(
                        err.error.message,
                        mType.error
                    )
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
