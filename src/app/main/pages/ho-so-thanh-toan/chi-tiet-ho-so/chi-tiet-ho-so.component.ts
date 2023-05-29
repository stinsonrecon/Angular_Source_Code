import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkStepperNext } from '@angular/cdk/stepper';
import { DsHoSoToiTaoComponent } from '../ds-ho-so-toi-tao/ds-ho-so-toi-tao.component';
import { ACTION, LAN_THANH_TOAN, MucDoUuTien, MUC_DO_UU_TIEN, THOI_GIAN_LUU_TRU, TrangThaiHoSo } from '@app/shared/constants/hosothanhtoan.const';
import { DialogApproveComponent } from './dialog-approve/dialog-approve.component';
import { Location } from '@angular/common';
import { DialogTaoChungTuComponent } from './dialog-taochungtu/dialog-taochungtu.component';
import { DialogLichsupheduyetComponent } from './dialog-lichsupheduyet/dialog-lichsupheduyet.component';
import { ViewToTrinhComponent } from '../../to-trinh/view-to-trinh/view-to-trinh.component';
import { DialogTaoPhieuThamTra } from './dialog-taophieuthamtra/dialog-taophieuthamtra.component';
import { KyHoSoThamChieuComponent } from './ky-ho-so-tham-chieu/ky-ho-so-tham-chieu.component';
import readNumber from 'read-vn-number';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { PhanCongPheDuyetHsComponent } from '../phan-cong-phe-duyet-hs/phan-cong-phe-duyet-hs.component';
import { XacnhanComponent } from '../ds-hs-cho-tiep-nhan/xacnhan/xacnhan.component';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import { PhanCongTiepNhanComponent } from '../ds-hs-cho-tiep-nhan/phan-cong-tiep-nhan/phan-cong-tiep-nhan.component';

@Component({
    selector: 'app-chi-tiet-ho-so',
    templateUrl: './chi-tiet-ho-so.component.html',
    styleUrls: ['./chi-tiet-ho-so.component.scss']
})
export class ChiTietHoSoComponent extends BaseClass implements OnInit {
    formControl: FormGroup
    idHoSo: any
    formCreatePaymentInfo: FormGroup
    @ViewChild(DsHoSoToiTaoComponent) dsHoSo: DsHoSoToiTaoComponent;
    public user = JSON.parse(localStorage.getItem('user'));
    maHoSo: string = '';
    type: string = '';
    tenVietTat: string = '';
    tenDayDu: string = '';
    nguoiYeuCauThanhToan: string = ''
    thoiHanYeuCauThanhToan: string = ''
    trangThaiHoatDong: string = ''
    chiNhanhYeuCau: string = ''
    donViYeuCau: any = this.user.donViId
    tongTienThanhToan: string = ''
    tongTienThanhToanVND: string = ''
    mauBieuPheDuyet: string = ''
    boPhanYeuCau: string = ''
    loaiTien: number = 1
    tyGia: string = ''
    coHieuLuc: string = ''
    hinhThucThanhToan: any = 1
    mucDoUuTien: any = ''
    lanThanhToan: any = ''
    thoiHanLuuTru: any = ''
    loaiHoSo: any = ''
    namHoSo: any = ''
    moTa: string = ''
    date = new Date();
    coBaoGomTaiLieuBanCung: string = ''
    tenbaocao2: string = ''
    dataCreate: {
        tenbaocao: ''
    }
    dataInfo: any
    public dataBoPhanYC = []

    public dataDonViYeuCau = []
    public dataLoaiHoSo = []
    // public user: any;
    displayedColumns: string[] = [
        'stt',
        'maHoSo',
        'tenHoSo',
        'nguoiTao',
        'ngayTao',
        'thoiHanYeuCauTT',
        'hanhDong'
    ];
    displayedColumnsMaterial: string[] = [
        "stt",
        "maTaiLieu",
        "nguonTaiLieu",
        "noiDungAndLink",
    ];
    arrTrangThaiHoSo;
    actionHstt = ACTION;
    action: string;
    thoiGianLuuTruEnum = THOI_GIAN_LUU_TRU
    lanThanhToanEnum = LAN_THANH_TOAN
    mucDoUuTienEnum = MUC_DO_UU_TIEN
    constMucDoUuTien = MucDoUuTien
    constTrangThaiHoSo = TrangThaiHoSo
    checkShowKyPhieuThamTra = false
    itemPhieuThamTra: object = {}

    enableButtonPheDuyet: boolean = false
    enableButtonTaoChungTu: boolean = false
    enableButtonTuChoiPheDuyetHS: boolean = false
    enableButtonPheDuyetVaTaoChungTu: boolean = false
    enableButtonTaoPhieuThamTra: boolean = false
    enableButtonKyPhieuThamTra: boolean = false
    enableButtonPhanCongPheDuyet: boolean = false
    enableButtonTuChoiTiepNhanHoSo: boolean = false
    enableButtonTraLaiHoSo: boolean = false
    enableButtonPhanCong: boolean = false
    danhSachThaoTac = DanhSachThaoTac
    dataTable: any;

    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public _service: HoSoToiTaoService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location,
        private _quyTrinhPheDuyetService: QuytrinhpheduyetService,
    ) {
        super()
    }

    ngOnInit(): void {
        const currentRoute = this.router;
        console.log(currentRoute)
        this.route.params.pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    this.idHoSo = res.id;
                    this.action = res.action;
                    this.getDetails(this.idHoSo);
                }
            );

        this._service.getLoaiHs().pipe(this.unsubsribeOnDestroy).subscribe(listHoSo => {
            this.dataLoaiHoSo = listHoSo
        })
    }
    getBuocTheoQuyTrinh(e) {
        this._quyTrinhPheDuyetService.getListBuocTheoQuyTrinh(e).subscribe(
          res => {
            if (res.length != 0) {
              this.dataTable = res
            }
            else {
              this.dataTable = []
            }
          }
        )
      }

    notifyMessage($event) {
        this.arrTrangThaiHoSo = $event;
        let arrayTTHS = $event.map(item => item.trangThaiGiayTo)
        if(arrayTTHS.includes(2)) {
            this.itemPhieuThamTra = $event.find(item => item.trangThaiGiayTo === 2)
            this.checkShowKyPhieuThamTra = arrayTTHS.includes(2)
        }
    }

    getDetails(id: string) {
        let listHD = []
        this._service.getChitiet(id).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode === 200) {
                this.dataInfo = next.data[0];
                this._service.infoHoSo = next.data[0];
                this.getBuocTheoQuyTrinh(this.dataInfo.buocPheDuyet.quyTrinhPheDuyetId)
                this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                    listHD.push(x.hanhDong)
                })
                listHD.forEach(x => {
                    if(x == this.danhSachThaoTac.btnPheDuyetHS && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonPheDuyet = true
                    }
                    if(x == this.danhSachThaoTac.btnTaoChungTu && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonTaoChungTu = true
                    }
                    if(x == this.danhSachThaoTac.btnTuChoiPheDuyetHS && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonTuChoiPheDuyetHS = true
                    }
                    if(x == this.danhSachThaoTac.btnPheDuyetVaTaoChungTu && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonPheDuyetVaTaoChungTu = true
                    }
                    if(x == this.danhSachThaoTac.btnTaoPhieuThamTra && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonTaoPhieuThamTra = true
                    }
                    if(x == this.danhSachThaoTac.btnKyPhieuThamTra && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonKyPhieuThamTra = true
                    }
                    if(x == this.danhSachThaoTac.btnPhanCongPheDuyetHoSo && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonPhanCongPheDuyet = true
                    }
                    if(x == this.danhSachThaoTac.btnDongYTiepNhanHSVaKyNhay && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonTuChoiTiepNhanHoSo = true
                    }
                    if(x == this.danhSachThaoTac.btnTraLaiHoSo && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonTraLaiHoSo = true
                    }
                    if(x == this.danhSachThaoTac.btnPhanCongTiepNhan && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonPhanCong = true
                    }

                })
            }
        }, error => {
            this._notification.open(error, mType.error)
        })
    }

    convertToVietnamese() {
        // let number = this.removeDots(this.tongTienThanhToanVND)
        if(+this.dataInfo.tongTienDeNghiTT > 0) return readNumber(+this.dataInfo.tongTienDeNghiTT) + " đồng"
    }

    openDialogApprove(e: string, action) {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
            this.dataTable.forEach(a => {
                if (x.hanhDong == action && this.dataInfo.buocPheDuyet.thuTu == a.thuTu) {
                    thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
                }
            })


        })
        let dialogRef = this.dialog.open(DialogApproveComponent, {
            width: '600px',
            autoFocus: false,
            data: { action: e }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.submit) {
                const param = {
                    HoSoId: this.dataInfo.id,
                    NguoiThucHienId: JSON.parse(localStorage.getItem('user')).id,
                    BuocThucHien: e === 'DENIED' ? 'bước 2.1' : 'bước 2.2',
                    TrangThaiHoSo: e === 'DENIED' ? 3 : 2,
                    TrangThaiPheDuyet: e === 'DENIED' ? 3 : 2,
                    NoiDung: result.ykien,
                    ThaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId
                }

                this._service.updateStatusHSTT(param)
                    .pipe(this.unsubsribeOnDestroy)
                    .subscribe(
                        res => {
                            if (res.statusCode === 201) {
                                if (e === 'DENIED') {
                                    this._notification.open(
                                        'Trả lại thành công!',
                                        mType.success
                                    );
                                    this._location.back();
                                } else {
                                    this._notification.open(
                                        'Phê duyệt thành công!',
                                        mType.success
                                    );
                                    this.getDetails(this.dataInfo.id);
                                    this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${this.dataInfo.id}`, { action: ACTION.createLicense }]);
                                }
                            } else {
                                if (e === 'DENIED') {
                                    this._notification.open(
                                        'Trả lại thất bại!',
                                        mType.error
                                    );
                                } else {
                                    this._notification.open(
                                        'Phê duyệt thất bại!',
                                        mType.error
                                    );
                                }
                            }
                        },
                        err => {
                            this._notification.open(
                                'Phê duyệt thất bại!',
                                mType.error
                            );
                        },
                    );

                this.enableButtonPheDuyet = false
                this.enableButtonTaoChungTu = false
                this.enableButtonTuChoiPheDuyetHS = false
                this.enableButtonPheDuyetVaTaoChungTu = false
                this.enableButtonTaoPhieuThamTra = false
                this.enableButtonKyPhieuThamTra = false
                this.enableButtonPhanCongPheDuyet = false
                this.enableButtonTuChoiTiepNhanHoSo = false
                this.enableButtonPhanCong = false
                this.enableButtonTraLaiHoSo = false
                this.getDetails(this.dataInfo.id)
            }
        });
    }

    openDialogTaoChungTu(action) {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }
        })
        const data = {
            id: this.dataInfo.id,
            nguoilapId: JSON.parse(localStorage.getItem('user'))?.id,
            nguoiduyetId: '',
            ngayDuyet: this.dataInfo.ngayDuyet,
            hstt: this.dataInfo.maHoSo,
            tenHoSo: this.dataInfo.tenVietTat,
            loaiHoSo: this.dataInfo.loaiHoSo,
            noiDung: this.dataInfo.GhiChu,
            tongTienDeNghi: this.dataInfo.tongTienDeNghiTT,
            soTkNhan: this.dataInfo.soTKThuHuong,
            chuTkNhan: this.dataInfo.nguoiThuHuong,
            nganHangNhan: this.dataInfo.tenNganHang,
            idNganHangNhan: this.dataInfo.nganHangThuHuongId,
            idDonVi: this.dataInfo.donViId,
            chiNhanhId: this.dataInfo.chiNhanhId,
            taikhoanNhanId: this.dataInfo.tkTaiKhoanId,
            loaiTienTe: this.dataInfo.loaiTienTe,
            noiDungThanhToan: this.dataInfo.noiDungThanhToan,
            trangThaiTaiKhoan: this.dataInfo.tkTrangThaiTaiKhoan,
            trangThaiChungTuBuocTiepTheo: this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet[0].trangThaiChungTu
        }

        let dialogRef = this.dialog.open(DialogTaoChungTuComponent, {
            width: '1000px',
            autoFocus: false,
            data: { ...data },
        });

        dialogRef.afterClosed().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                next => {
                    if (next) if (next.submit && next.action === 1) {
                        console.log(next.param);
                        next.param.ThaoTacBuocPheDuyetId = thaoTacBuocPheDuyetId
                        this._service.createChungTu(next.param)
                            .pipe(this.unsubsribeOnDestroy)
                            .subscribe(
                                result => {
                                    if (result.success) {
                                        this._notification.open(
                                            result.message, mType.success
                                        );
                                        this._location.back();
                                    } else {
                                        this._notification.open(
                                            'Có lỗi xảy ra!', mType.success
                                        )
                                    }
                                }
                            );
                    }

                },
                err => {
                    this._notification.open(
                        'Có lỗi xảy ra!', mType.success
                    )
                }
            );
    }

    dialogLichSuPheDuyet() {
        const dialogRef = this.dialog.open(DialogLichsupheduyetComponent,
            {
                data: { id: this.dataInfo.id },
                width: '800px',
                autoFocus: false,
            })
    }

    getThoiGianLuuTru(id: number): string {
        return this.thoiGianLuuTruEnum.find(x => x.value === id)?.name;
    }

    getLanThanhToan(id: number): string {
        return this.lanThanhToanEnum.find(x => x.value === id)?.name;
    }

    getMucDoUuTien(id: number): string {
        return this.mucDoUuTienEnum.find(x => x.value === id)?.name;
    }
    
    renderPrice(price) {
        return this.formatNumber(price.toString())
    }

    formatNumber(number) {
        return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    viewToTrinh(data){
        let id
        if(data.capKy == 2){
            id = data.taiLieuKyId[1]
        }
        else if( data.capKy == 3){
            id = data.taiLieuKyId[2]
        }
        else if(data.capKy == 4) {
            id = data.taiLieuKyId[2]
        }
        let item: any = {
            id: id,
            capKy: data.capKy - 1,
          };
          item = JSON.parse(JSON.stringify(item));
          const dialogRef = this.dialog.open(ViewToTrinhComponent, {
            width: '80%',
            minWidth: '80vw',
            height: '90vh',
            autoFocus: false,
            data: {
              item
            }
          });
    }

    renderTrangThaiHoSo(ele) {
        switch (ele) {
            case 1:
                return "Chưa phê duyệt"
            case 2:
                return "Đã soát xét"
            case 3:
                return "Yêu cầu thay đổi"
            case 4:
                return "Đã thanh toán"
            case 5:
                return "Khởi tạo"
            case 6:
                return "Đã tạo chứng từ"
            case 7:
                return "Đã đóng"
            case 8:
                return "Đang trình ký"
            case -1: 
                return "Đã xoá"
            default:
                break;
        }
    }

    taoPhieuThamTra() {
        const dialogRef = this.dialog.open(DialogTaoPhieuThamTra,
            {
                data: { 
                    userId: this.dataInfo.nguoiTaoId,
                    hoSoID: this.dataInfo.id
                },
                width: '1920px',
                autoFocus: false,
            })
        dialogRef.afterClosed().subscribe((response) => {
            if(!response) return
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([`/ho-so-thanh-toan/chitiethoso/${this.idHoSo}`, {action: "DS_HO_SO"}]); // navigate to same route
            }); 
        })
    }

    kyPhieuThamTra() {
        let item: any = {
            idHoSo: this.dataInfo.id,
            // idGiayTo: this.dataInfo.,
            capKy: 4,
            loaiChungTu: 1,
            phieuThamTra: this.itemPhieuThamTra
          };
          item = JSON.parse(JSON.stringify(item));
          const dialogRef = this.dialog.open(KyHoSoThamChieuComponent, {
            width: '80%',
            minWidth: '80vw',
            panelClass: 'dialog-pheduyetct',
            autoFocus: false,
            height: '90vh',
            data: {
              item,
              kyPhieuThamTra: true,
            }
          });
          dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
            //   this.getDSChungtu();
            }
          });
    }

    openDialogPhanCongPheDuyet(action) {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        const item = {
            hoSoId: this.dataInfo.id,
            loaiHoSoId: this.dataInfo.loaiHoSoId
        }
        let dialogRef = this.dialog.open(PhanCongPheDuyetHsComponent, {
            width: '600px',
            autoFocus: false,
            data: { 
                item
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.enableButtonPheDuyet = false
                this.enableButtonTaoChungTu = false
                this.enableButtonTuChoiPheDuyetHS = false
                this.enableButtonPheDuyetVaTaoChungTu = false
                this.enableButtonTaoPhieuThamTra = false
                this.enableButtonKyPhieuThamTra = false
                this.enableButtonPhanCongPheDuyet = false
                this.enableButtonTuChoiTiepNhanHoSo = false
                this.enableButtonPhanCong = false
                this.enableButtonTraLaiHoSo = false
                this.getDetails(this.dataInfo.id)
            }
        });
    }

    openDialogTiepNhanHoSo(action)
    {
        const item = {
            hoSoId: this.dataInfo.id,
            loaiHoSoId: this.dataInfo.loaiHoSoId
        }
        let dialogRef = this.dialog.open(XacnhanComponent, {
            width: '600px',
            autoFocus: false,
            data: { 
                item
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.enableButtonPheDuyet = false
                this.enableButtonTaoChungTu = false
                this.enableButtonTuChoiPheDuyetHS = false
                this.enableButtonPheDuyetVaTaoChungTu = false
                this.enableButtonTaoPhieuThamTra = false
                this.enableButtonKyPhieuThamTra = false
                this.enableButtonPhanCongPheDuyet = false
                this.enableButtonTuChoiTiepNhanHoSo = false
                this.enableButtonPhanCong = false
                this.enableButtonTraLaiHoSo = false
                this.getDetails(this.dataInfo.id)
            }
        });
    }

    openDialogPhanCongTiepNhan(action)
    {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        const item = {
            hoSoId: this.dataInfo.id,
            loaiHoSoId: this.dataInfo.loaiHoSoId,
            thaoTacBuocPheDuyetId: thaoTacBuocPheDuyetId
        }
        let dialogRef = this.dialog.open(PhanCongTiepNhanComponent, {
            width: '600px',
            autoFocus: false,
            data: { 
                item
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.enableButtonPheDuyet = false
                this.enableButtonTaoChungTu = false
                this.enableButtonTuChoiPheDuyetHS = false
                this.enableButtonPheDuyetVaTaoChungTu = false
                this.enableButtonTaoPhieuThamTra = false
                this.enableButtonKyPhieuThamTra = false
                this.enableButtonPhanCongPheDuyet = false
                this.enableButtonTuChoiTiepNhanHoSo = false
                this.enableButtonPhanCong = false
                this.enableButtonTraLaiHoSo = false
                this.getDetails(this.dataInfo.id)
            }
        });
    }
}
