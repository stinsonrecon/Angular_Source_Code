import { DialogShowToTrinh } from './../ho-so-toi-tao/them-moi/dialog-show-to-trinh/dialog-show-to-trinh.component';
import { delay, take, takeUntil } from 'rxjs/operators';
import { convertViToEn, formatDate, getYearsInit } from '@app/shared/constants/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, from, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { DanhSachHoSoThamChieuComponent } from '../ds-hs-tham-chieu/danhsachhosothamchieu.component';
import { TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { ConfirmDialogComponent } from '@app/shared/component/confirm-dialog/confirm-dialog.component';
import readNumber from 'read-vn-number';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateHoSoThanhToanComponent extends BaseClass implements OnInit {
    formControl: FormGroup
    formCreateMaterial: FormGroup
    formCreatePaymentInfo: FormGroup
    public user = JSON.parse(localStorage.getItem("user"));
    public dataDonViYeuCau = []
    public dataLoaiHoSo = []
    public dataBanks = []
    public accountBanks = []
    public dataChiNhanhNH = []
    public dataBoPhanYC = []
    Counter = 1
    maHoSo: string = this.renderMaHoSo();
    type: string = '';
    tenVietTat: string = '';
    tenDayDu: string = '';
    nguoiYeuCauThanhToan: string = this.user.firstName + " " + this.user.lastName
    thoiHanYeuCauThanhToan: string = ''
    trangThaiHoatDong: string = ''
    hinhThucChi: any = 1
    chiNhanhYeuCau: any = 0
    donViYeuCau: any = ''
    tongTienThanhToan: string = ''
    tongTienThanhToanVND: string = ''
    NguoiThuHuong: string = ''
    mauBieuPheDuyet: string = ''
    // boPhanYeuCau: string = this.user.idDonVi
    loaiTien: any = 1
    tyGia: string = ''
    coHieuLuc: string = ''
    hinhThucThanhToan: any = 1
    HinhThucThanhToan: any = 1
    // mucDoUuTien: any = 1
    lanThanhToan: any = 7
    thoiHanLuuTru: any = 0
    // loaiHoSo: any = 1
    namHoSo: any = 2021
    moTa: string = ''
    date = new Date();
    coBaoGomTaiLieuBanCung: string = ''
    moTaBaoCao: string = ''
    checkIDHSTT: boolean = false
    TaiKhoanNganHangId: string = ''
    listYears = getYearsInit()

    dataMaterial = null
    checkFile = false


    listFileFromMaterial = []

    displayedColumns: string[] = [
        "stt",
        "maHoSo",
        "tenHoSo",
        "nguoiTao",
        "ngayTao",
        "thoiHanYeuCauTT",
        "hanhDong"
    ];
    displayedColumnsMaterial: string[] = [
        "stt",
        "maTaiLieu",
        // "tenTaiLieu",
        // "ngayTao",
        // "nguoiTao",
        "nguonTaiLieu",
        // "pheDuyet",
        "noiDungAndLink",
        "lichSuThayDoi"
    ];

    protected banks: any[] = [];
    protected listHSTC: any[] = [];
    listArrayChecked = []
    valueChangeLoaiHS = false
    // listHD = []
    // danhSachThaoTac = DanhSachThaoTac
    // enableButtonLuu: boolean = false;
    // enableButtonLuuVaDeNghiTT: boolean = false;

    /** control for the selected bank */
    public bankCtrl: FormControl = new FormControl();

    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();

    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

    public detail: any
    public id = ''
    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public hoSoToiTaoService: HoSoToiTaoService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private location: Location,
        private router: Router,
        private activeRouter: ActivatedRoute
    ) {
        super()
    }

    ngOnInit(): void {
        this.bankFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterBanks();
            });

        this.id = this.activeRouter.snapshot.paramMap.get('id')
        this.hoSoToiTaoService.getChitiet(this.id).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode === 200) {
                this.detail = next.data[0]
                this.hoSoToiTaoService.changeMessage(this.detail.loaiHoSoId)
                // this.detail.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                //     this.listHD.push(x.hanhDong)
                // })
                // this.listHD.forEach(x => {
                //     if (x == this.danhSachThaoTac.btnLuu && this.detail.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                //         this.enableButtonLuu = true
                //     }
                //     if (x == this.danhSachThaoTac.btnLuuVaDeNghiTT && this.detail.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                //         this.enableButtonLuuVaDeNghiTT = true
                //     }
                // })
                this.TaiKhoanNganHangId = this.detail.tkTaiKhoanId
                this.detail.loaiTienTe === "VND" ? this.loaiTien = 1 : this.loaiTien = 2
                this.detail.hinhThucTT === 1 ? this.hinhThucThanhToan = true : this.hinhThucThanhToan = false
                this.listArrayChecked = this.detail.hoSoThamChieu
                this.hoSoToiTaoService.changeDataHoSoThamChieuChecked(this.listArrayChecked)
                this.formControl = this.formBuilder.group({
                    maHoSo: [this.detail.maHoSo, [Validators.required]],
                    type: [''],
                    tenVietTat: [this.detail.tenVietTat, [Validators.required]],
                    tenDayDu: [this.detail.tenVietTat],
                    nguoiYeuCauThanhToan: [this.detail.tenYeuCauThanhToan, [Validators.required, Validators.maxLength(30)]],
                    SoTKThuHuong: [this.detail.tkSoTk, [Validators.required, Validators.maxLength(30)]],
                    thoiHanYeuCauThanhToan: [this.detail.thoiGianThanhToan],
                    mucDoUuTien: [this.detail.mucDoUuTien, [Validators.required]],
                    lanThanhToan: [this.detail.lanThanhToan, [Validators.required]],
                    thoiHanLuuTru: [this.detail.thoiGianLuutru, [Validators.required]],
                    loaiHoSo: [this.detail.loaiHoSoId, [Validators.required]],
                    namHoSo: [this.detail.namHoSo, [Validators.required]],
                    donViYeuCau: [this.detail.donViId, [Validators.required]],
                    boPhanYeuCau: [this.detail.boPhanYeuCauId, [Validators.required]],
                    loaiTien: [this.detail.loaiTienTe],
                    noiDungThanhToan: [this.detail.noiDungThanhToan, [Validators.required, Validators.maxLength(210), Validators.pattern(/^[0-9a-zA-Z (),;.\]\[+:]+$/)]],
                    // nganHangId: ['', [Validators.required]],
                    nganHangId: [this.detail.tenNganHang],
                    NguoiThuHuong: [this.detail.tkTaiKhoanId, [Validators.required]],
                    chiNhanhYeuCau: [this.detail.tenChiNhanh],
                    tongTienThanhToan: [''],
                    tongTienThanhToanVND: [this.formatNumber(this.detail.tongTienDeNghiTT), [
                        Validators.required,
                        Validators.pattern(/^[/.0-9]+$/),
                        Validators.maxLength(20)
                        ]
                    ],
                    mauBieuPheDuyet: [''],
                    tyGia: [''],
                    hinhThucThanhToan: [this.hinhThucThanhToan],
                    moTaBaoCao: [this.detail.ghiChu],
                    date: [this.detail.thoiGianThanhToan],
                    coBaoGomTaiLieuBanCung: [this.detail.coBanCung],
                    coHieuLuc: [''],
                    hinhThucChi: [this.detail.hinhThucChi],
                })
                this.hoSoToiTaoService.changeIDHSTT(this.detail.id)
                this.hoSoToiTaoService.getDonViYeuCau(this.detail.donViId).pipe(this.unsubsribeOnDestroy).subscribe(data => {
                    this.dataBoPhanYC = data
                })
            }
        }, error => {
            this._notification.open(error, mType.error)
        })
        if (this.id !== "") {
            this.hoSoToiTaoService.getDsDonVi().pipe(this.unsubsribeOnDestroy).subscribe(listDonvi => {
                this.dataDonViYeuCau = listDonvi
            })
            this.hoSoToiTaoService.getLoaiHs().pipe(this.unsubsribeOnDestroy).subscribe(listHoSo => {
                this.dataLoaiHoSo = listHoSo
                // this.formControl.patchValue({ loaiHoSo: this.dataLoaiHoSo[0].loaiHoSoId })
                // this.hoSoToiTaoService.changeMessage(this.dataLoaiHoSo[0].loaiHoSoId)
            })

            this.hoSoToiTaoService.getDSNganHang().pipe(this.unsubsribeOnDestroy).subscribe(banks => {
                if (banks && banks.length > 0) {
                    this.dataBanks = banks

                    this.hoSoToiTaoService.getChiNhanhNganHang().pipe(this.unsubsribeOnDestroy).subscribe(listChiNhanh => {
                        if (listChiNhanh && listChiNhanh.success) {
                            this.dataChiNhanhNH = listChiNhanh.data.Items

                            this.hoSoToiTaoService.getDSTaiKhoanNganHang().pipe(this.unsubsribeOnDestroy).subscribe(listAccountsBank => {
                                this.accountBanks = listAccountsBank.data.Items

                                let dataInitBank = this.accountBanks.filter((item) => item.taiKhoanId === this?.detail?.tkTaiKhoanId)

                                this.banks = this.accountBanks
                                this.bankCtrl.setValue(dataInitBank[0]);
                                this.filteredBanks.next(this.banks.slice());
                                
                                this.formControl.controls['chiNhanhYeuCau'].disable()
                                this.formControl.controls['nganHangId'].disable()
                                this.formControl.controls['SoTKThuHuong'].disable()
                            })
                        }
                    })
                }
            })

            this.hoSoToiTaoService.dataMaterial.subscribe((dataMaterial: any) => {
                if (dataMaterial.length > 0) {
                    let arrChildRequied = []
                    let currentMaterialRequired = dataMaterial.filter((item => item.batBuoc === 1));

                    arrChildRequied = dataMaterial.filter(item => item.batBuoc === 1 && item.file.length > 0)

                    if (arrChildRequied.length === currentMaterialRequired.length) {
                        this.checkFile = false
                    } else {
                        this.checkFile = true
                    }
                }
            });
        }

        this.hoSoToiTaoService.dataMaterial.subscribe((dataMaterial: any) => {
            this.listFileFromMaterial = dataMaterial
            if (dataMaterial.length > 0) {
                let arrChildRequied = []
                let currentMaterialRequired = dataMaterial.filter((item => item.batBuoc === 1));
                if(currentMaterialRequired.length <= 0) {
                    this.checkFile = false; 
                    return
                } 
                arrChildRequied = dataMaterial.filter(item => item.batBuoc === 1 && item.file.length > 0)
                if (arrChildRequied.length === currentMaterialRequired.length) {
                    this.checkFile = false
                } else {
                    this.checkFile = true
                }
            }
        });
    }

    ngOnDestroy(): void
    {
        this.hoSoToiTaoService.changeDataHoSoThamChieuChecked([])
        this.hoSoToiTaoService.changeDataHoSoThamChieu([])
    }

    get f() {
        return this.formControl.controls;
    }
    saveAndSend() {
        this.postDataToAPI(1)
    }

    save() {
        this.postDataToAPI(5)
    }

    showToTrinh() {
        let arrayStringHSTC = this.listArrayChecked.map(item => item['hoSoId'])
        const {
            maHoSo,
            loaiHoSo,
            loaiTien,
            donViYeuCau,
            mucDoUuTien,
            namHoSo,
            nguoiYeuCauThanhToan,
            tenDayDu,
            tenVietTat,
            thoiHanLuuTru,
            tongTienThanhToanVND,
            NguoiThuHuong,
            hinhThucThanhToan,
            HinhThucThanhToan,
            tyGia,
            moTaBaoCao,
            date,
            coBaoGomTaiLieuBanCung,
            lanThanhToan,
            hinhThucChi,
            boPhanYeuCau,
            noiDungThanhToan

        } = this.formControl.value

        const reqData = {
            "HoSoId": this.id,
            "TenHoSo": tenVietTat,
            "namHoSo": +namHoSo,
            "ThoiGianLuTru": thoiHanLuuTru,
            "MucDoUuTien": mucDoUuTien,
            "HanThanhToan": formatDate(date),
            "GhiChu": moTaBaoCao,
            "LoaiHoSoId": loaiHoSo,
            "DonViYeuCauId": donViYeuCau,
            "BoPhanCauId": boPhanYeuCau,
            "NgayGui": formatDate(new Date()),
            "NgayTiepNhan": formatDate(new Date()),
            "SoTien": +this.removeDots(tongTienThanhToanVND),
            "NgayLapCT": null,
            "NgayDuyet": null,
            "TrangThaiHoSo": 5,
            "BuocThucHien": 1,
            "SoTienThucTe": +this.removeDots(tongTienThanhToanVND),
            "HinhThucTT": hinhThucThanhToan ? 1 : 0,
            "HinhThucChi": hinhThucChi,
            "CoHieuLuc": 0,
            "CoBanCung": coBaoGomTaiLieuBanCung ? 1 : 0,
            "lanThanhToan": lanThanhToan,
            "TenYeuCauThanhToan": nguoiYeuCauThanhToan,
            "tenVietTatHoSo": tenDayDu,
            "loaiTienTe": loaiTien === 1 ? "VND" : "USD",
            "TaiKhoanNganHangId": this.TaiKhoanNganHangId,
            "NoiDungThanhToan": noiDungThanhToan,
            "HoSoLienQuan": arrayStringHSTC.length > 0 ? arrayStringHSTC :  null
        }

        this.hoSoToiTaoService.updateDonVi(reqData).pipe(this.unsubsribeOnDestroy).subscribe(res => {

            if (res?.statusCode === 200) {
                let arrayCallAPI = []
                let success = []
                
                if (this.listFileFromMaterial.length > 0) {
                    this.listFileFromMaterial.map((item, index) => {
                        arrayCallAPI.push(this.hoSoToiTaoService.updateChitietgiaytoHSTT(item))
                    })
                    forkJoin(arrayCallAPI).subscribe(results => {
                        results.map((item: any) => {
                            if (item.statusCode === 200) {
                                success.push(item)
                            } else {
                                this._notification.open(
                                    "Cập nhập tài liệu thất bại!",
                                    mType.error
                                );
                                return
                            }

                            if(success.length === arrayCallAPI.length) {
                                this._notification.open(
                                    "Cập nhập tài liệu thành công!",
                                    mType.success
                                );
                                const dialogRef = this.dialog.open(DialogShowToTrinh, {
                                    width: '1920px',
                                    autoFocus: false,
                                    data: {
                                        dataPost: this.formControl.value,
                                        idHSTT: this.id,
                                        detail: this.detail,
                                        bank: this.TaiKhoanNganHangId
                                    }
                                });
                        
                                dialogRef.afterClosed().subscribe((response: any) => {
                                });
                            }
                        })
                        this.hoSoToiTaoService.changeDataMaterial([])
                        this.formControl.reset()
                    });
                    // this.back()
                } else {
                    this._notification.open(
                        "Cập nhập tài liệu thành công!",
                        mType.success
                    );
                    const dialogRef = this.dialog.open(DialogShowToTrinh, {
                        width: '1920px',
                        autoFocus: false,
                        data: {
                            dataPost: this.formControl.value,
                            idHSTT: this.id,
                            detail: this.detail,
                            bank: this.TaiKhoanNganHangId
                        }
                    });
            
                    dialogRef.afterClosed().subscribe((response: any) => {
                    });
                }
                // this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
            } else {
                this._notification.open(
                    "Cập nhập hồ sơ thất bại!",
                    mType.error
                );
                return
            }
        }, error => {
            this._notification.open(
                "Có lỗi trong quá trình cập nhập hồ sơ",
                mType.warn
            )
        })
        
    }

    postDataToAPI(status) {
        let arrayStringHSTC = this.listArrayChecked.map(item => item['hoSoId'])
        const {
            maHoSo,
            loaiHoSo,
            loaiTien,
            donViYeuCau,
            mucDoUuTien,
            namHoSo,
            nguoiYeuCauThanhToan,
            tenDayDu,
            tenVietTat,
            thoiHanLuuTru,
            tongTienThanhToanVND,
            NguoiThuHuong,
            hinhThucThanhToan,
            HinhThucThanhToan,
            tyGia,
            moTaBaoCao,
            date,
            coBaoGomTaiLieuBanCung,
            lanThanhToan,
            hinhThucChi,
            boPhanYeuCau,
            noiDungThanhToan

        } = this.formControl.value

        const reqData = {
            "HoSoId": this.id,
            "TenHoSo": tenVietTat,
            "namHoSo": +namHoSo,
            "ThoiGianLuTru": thoiHanLuuTru,
            "MucDoUuTien": mucDoUuTien,
            "HanThanhToan": formatDate(date),
            "GhiChu": moTaBaoCao,
            "LoaiHoSoId": loaiHoSo,
            "DonViYeuCauId": donViYeuCau,
            "BoPhanCauId": boPhanYeuCau,
            "NgayGui": formatDate(new Date()),
            "NgayTiepNhan": formatDate(new Date()),
            "SoTien": +this.removeDots(tongTienThanhToanVND),
            "NgayLapCT": null,
            "NgayDuyet": null,
            "TrangThaiHoSo": status,
            "BuocThucHien": 1,
            "SoTienThucTe": +this.removeDots(tongTienThanhToanVND),
            "HinhThucTT": hinhThucThanhToan ? 1 : 0,
            "HinhThucChi": hinhThucChi,
            "CoHieuLuc": 0,
            "CoBanCung": coBaoGomTaiLieuBanCung ? 1 : 0,
            "lanThanhToan": lanThanhToan,
            "TenYeuCauThanhToan": nguoiYeuCauThanhToan,
            "tenVietTatHoSo": tenDayDu,
            "loaiTienTe": loaiTien === 1 ? "VND" : "USD",
            "TaiKhoanNganHangId": this.TaiKhoanNganHangId,
            "NoiDungThanhToan": noiDungThanhToan,
            "HoSoLienQuan": arrayStringHSTC.length > 0 ? arrayStringHSTC :  null
        }

        this.updateApiMaterials(this.listFileFromMaterial)

        this.hoSoToiTaoService.updateDonVi(reqData).pipe(this.unsubsribeOnDestroy).subscribe(res => {

            if (res?.statusCode === 200) {
                this._notification.open(
                    "Cập nhập hồ sơ thành công!",
                    mType.success
                );
                this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
            } else if (res.statusCode === 201) {
                this._notification.open(
                    res?.message,
                    mType.error
                );
            } else {
                this._notification.open(
                    "Cập nhập hồ sơ thất bại!",
                    mType.error
                );
                return
            }
        })
    }

    convertToVietnamese() {
        let number = this.removeDots(this.formControl.value.tongTienThanhToanVND)
        if(+number > 0) return readNumber(+number) + " đồng"
    }

    updateApiMaterials(materials) {
        let arrayCallAPI = []
        let formData = new FormData()
        if (materials.length > 0) {
            materials.map((item, index) => {
                arrayCallAPI.push(this.hoSoToiTaoService.updateChitietgiaytoHSTT(item))
            })
            forkJoin(arrayCallAPI).subscribe(results => {
                results.map((item: any) => {
                    if (item.statusCode === 200) {
                        this._notification.open(
                            "Cập nhập danh sách tài liệu thành công!",
                            mType.success
                        );
                    } else {
                        this._notification.open(
                            "Cập nhập danh sách tài liệu thất bại!",
                            mType.error
                        );
                    }
                })
                this.hoSoToiTaoService.changeDataMaterial([])
                this.formControl.reset()
            });
            // this.back()
        }
    }
    addCommasTongTienTT(value) {
        this.tongTienThanhToan = this.formatNumber(value)
    }
    addCommasTongTienTTVND(value) {
        this.tongTienThanhToanVND = this.formatNumber(value)
    }

    formatNumber(number: string) {
        return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    removeDots(number: string) {
        if(number != null){
            return number.split('.').join("");
        }
    }

    formatNganHang(bank: string) {
        return bank.split('/')[0].toString()
    }

    formatNoiDungTT(value: string) {
        this.formControl.patchValue({noiDungThanhToan: convertViToEn(value).toLowerCase()})
    }

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    doSomething(data) {
        this.hoSoToiTaoService.changeMessage(data.value)
    }

    back() {
        this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
    }

    renderMaHoSo() {
        return `VTCNTT_M1_2021_${Math.floor(Math.random() * 100)}`
    }

    addChiTietTaiLieu(idHSTT) {
        this.hoSoToiTaoService.dataMaterial.subscribe((dataMaterial: any) => {

            this.listFileFromMaterial = dataMaterial
        });
        let arrayCallAPI = []
        if (this.listFileFromMaterial.length > 0) {

            this.listFileFromMaterial.map((item, index) => {
                arrayCallAPI.push(this.hoSoToiTaoService.createChitietgiaytoHSTT(item, idHSTT))
            })

            forkJoin(arrayCallAPI).subscribe(results => {
                results.map((item: any) => {
                    if (item.statusCode === 200) {
                        this._notification.open(
                            "Thêm mới thành công!",
                            mType.success
                        );

                    } else {
                        this._notification.open(
                            "Thêm mới thất bại!",
                            mType.error
                        );
                    }
                })
                this.hoSoToiTaoService.changeDataMaterial([])
                this.formControl.reset()
            });
            this.back()
        }
    }

    handleChangeAccountBank = (acc: any) => {
        let dataAccBank = this.accountBanks.filter((item) => item.taiKhoanId === acc.taiKhoanId)
        let NganHangName = this.dataBanks.filter((item) => item.nganHangId === dataAccBank?.[0]?.nganHangId)
        let chiNhanhNH = this.dataChiNhanhNH.filter(item => item.chiNhanhNganHangId === dataAccBank?.[0]?.chiNhanhNganHangId)

        this.formControl.controls['chiNhanhYeuCau'].setValue(chiNhanhNH?.[0]?.tenChiNhanh ?? 'Chưa có tên chi nhánh')
        this.formControl.controls['SoTKThuHuong'].setValue(dataAccBank?.[0]?.soTaiKhoan)
        this.formControl.controls['nganHangId'].setValue(NganHangName?.[0]?.tenNganHang)
        this.formControl.controls['NguoiThuHuong'].setValue(acc)
        this.TaiKhoanNganHangId = dataAccBank?.[0]?.taiKhoanId
    }

    filterMyOptions(e) {
    }

    protected setInitialValue() {
        this.filteredBanks
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(() => {
                this.singleSelect.compareWith = (a: any, b: any) => a && b && a.tenTaiKhoan === b.tenTaiKhoan;
            });
    }

    protected filterBanks() {
        if (!this.banks) {
            return;
        }
        // get the search keyword
        let search = this.bankFilterCtrl.value;
        if (!search) {
            this.filteredBanks.next(this.banks.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredBanks.next(
            this.banks.filter(bank => (bank.tenTaiKhoan.toLowerCase().indexOf(search) > -1) || (bank.tenNganHangVietTat.toLowerCase().indexOf(search) > -1) || (bank.soTaiKhoan.toLowerCase().indexOf(search) > -1))
        );
    }

    chonHoSoThamChieu() {
        const dialogRef = this.dialog.open(DanhSachHoSoThamChieuComponent, {
            width: "1920px",
            data: {
                arrHoSoThamChieu: this.listHSTC,
                arrayPicked: this.listArrayChecked,
                loaiHoSo: this.detail.loaiHoSoId,
                valueChangeLoaiHS: this.valueChangeLoaiHS
            } 
        })
        dialogRef.afterClosed().subscribe((response: any) => {
            if(this.listArrayChecked.length > 0) this.valueChangeLoaiHS = false
            this.hoSoToiTaoService.dataHoSoThamChieuChecked.subscribe((item: any) => {
                this.listArrayChecked = [...item]
            })
            this.hoSoToiTaoService.dataHoSoThamChieu.subscribe(item => {
                this.listHSTC = [...item]
            })
            this.hoSoToiTaoService.changeDataHoSoThamChieu(this.listHSTC)
        });
    }

    deleteHoSoThamChieu(ele) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {         
                this.listArrayChecked = this.listArrayChecked.filter(item => item.hoSoId !== ele.hoSoId)
                this.listHSTC = this.listHSTC.map((item, index) => {
                    if(item.hoSoId === ele.hoSoId) {
                        return {...item, active: false}
                    }
                    return item
                })
                this.hoSoToiTaoService.changeDataHoSoThamChieuChecked(this.listArrayChecked)
                this.hoSoToiTaoService.changeDataHoSoThamChieu(this.listHSTC)
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
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

}
