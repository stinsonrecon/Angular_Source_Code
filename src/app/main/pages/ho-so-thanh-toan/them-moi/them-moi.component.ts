import { ChiNhanhNganHang, NganHang, TaiKhoanNH } from './../../../../shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { DialogShowToTrinh } from './../ho-so-toi-tao/them-moi/dialog-show-to-trinh/dialog-show-to-trinh.component';
import { convertViToEn, formatDate, to_vietnamese } from '@app/shared/constants/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, forkJoin, from, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { concatMap, take, takeUntil } from 'rxjs/operators';
import { getYearsInit } from "./../../../../shared/constants/util"
import { DanhSachHoSoThamChieuComponent } from '../ds-hs-tham-chieu/danhsachhosothamchieu.component';
import { DonViYeuCau, ILoaiHoSo, ITaiKhoanNganHang } from '@app/shared/models/hosothanhtoan/hosothanhtoan.model';
import { ConfirmDialogComponent } from '@app/shared/component/confirm-dialog/confirm-dialog.component';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import readNumber from 'read-vn-number';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent extends BaseClass implements OnInit {
    formControl: FormGroup
    formCreatePaymentInfo: FormGroup
    formCreateMaterial: FormGroup
    filterLoaiHoSo: FormControl
    filterBoPhan: FormControl
    filteredBoPhan: any
    filteredLoaiHoSo: any
    public user = JSON.parse(localStorage.getItem("user"));
    public dataDonViYeuCau: DonViYeuCau[] = []
    public dataLoaiHoSo: ILoaiHoSo[] = []
    public dataBanks: NganHang[] = []
    public accountBanks: ITaiKhoanNganHang[] = []
    public dataChiNhanhNH: ChiNhanhNganHang[] = []
    public dataBoPhanYC = []

    loadingAPI: boolean = false;
    loading: boolean = false
    maHoSo: string = this.renderMaHoSo();
    type: string = '';
    tenVietTat: string = '';
    tenDayDu: string = '';
    nguoiYeuCauThanhToan: string = this.user.firstName + " " + this.user.lastName
    thoiHanYeuCauThanhToan: string = ''
    trangThaiHoatDong: string = ''
    hinhThucChi: any = 1
    chiNhanhYeuCau: any = 0
    donViYeuCau: any = this.user.donViId
    tongTienThanhToan: string = ''
    tongTienThanhToanVND: string = ''
    NguoiThuHuong: string = ''
    mauBieuPheDuyet: string = ''
    boPhanYeuCau: string = ''
    loaiTien: any = 1
    tyGia: string = ''
    coHieuLuc: string = ''
    hinhThucThanhToan: any = 1
    HinhThucThanhToan: any = 1
    mucDoUuTien: any = 1
    lanThanhToan: any = 1
    thoiHanLuuTru: any = 0
    loaiHoSo: any = 1
    namHoSo: any = new Date().getFullYear()
    moTa: string = ''
    date = new Date();
    coBaoGomTaiLieuBanCung: string = ''
    moTaBaoCao: string = ''
    checkIDHSTT: boolean = false
    TaiKhoanNganHangId: string = ''
    SoTKThuHuong: string = ''
    dataMaterial = null
    checkFile = true
    listYears = getYearsInit()

    listFileFromMaterial = []
    listHoSoThamChieu = []

    displayedColumns: string[] = [
        "stt",
        "maHoSo",
        "tenHoSo",
        "nguoiTao",
        "ngayTao",
        "thoiHanYeuCauTT",
        "hanhDong"
    ];

    protected banks: any[] = [];
    protected listHSTC: any[] = [];
    listArrayChecked = []
    valueChangeLoaiHS = false

    /** control for the selected bank */
    public bankCtrl: FormControl = new FormControl();
    test = []
    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();

    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
    dataToDisplay = []
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
    dataQuyTrinh: any;
    enableButtonLuu: boolean = false;
    enableButtonLuuVaDeNghiTT: boolean = false;
    danhSachThaoTac = DanhSachThaoTac

    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public hoSoToiTaoService: HoSoToiTaoService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private location: Location,
        private router: Router,
        private _quytrinhpheduyetService: QuytrinhpheduyetService
    ) {
        super()
    }

    ngOnInit(): void {
        this.bankFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterBanks();
            });

        this.formControl = this.formBuilder.group({
            maHoSo: ['', [Validators.required]],
            type: [''],
            tenVietTat: ['', [Validators.required]],
            tenDayDu: [''],
            nguoiYeuCauThanhToan: ['', [Validators.required, Validators.maxLength(30)]],
            SoTKThuHuong: ['', [Validators.required, Validators.maxLength(20)]],
            thoiHanYeuCauThanhToan: [''],
            mucDoUuTien: ['', [Validators.required]],
            lanThanhToan: ['', [Validators.required]],
            thoiHanLuuTru: ['', [Validators.required]],
            loaiHoSo: ['', [Validators.required]],
            namHoSo: ['', [Validators.required]],
            donViYeuCau: [''],
            boPhanYeuCau: ['', [Validators.required]],
            noiDungThanhToan: ['', [
                Validators.required, 
                Validators.maxLength(210),
                Validators.pattern(/^[0-9a-zA-Z (),;.\]\[+:]+$/)
            ]],
            loaiTien: [''],
            // nganHangId: ['', [Validators.required]],
            nganHangId: [''],
            NguoiThuHuong: ['', [Validators.required]],
            hinhThucChi: [''],
            chiNhanhYeuCau: [''],
            tongTienThanhToan: [''],
            tongTienThanhToanVND: ['', [
                Validators.required,
                Validators.pattern(/^[/.0-9]+$/),
                Validators.maxLength(20)
            ]
            ],
            mauBieuPheDuyet: [''],
            tyGia: [''],
            hinhThucThanhToan: [''],
            moTaBaoCao: [''],
            date: [''],
            coBaoGomTaiLieuBanCung: [''],
            coHieuLuc: ['']
        })

        // this.formControl.controls['SoTKThuHuong'].disable();
        this.formControl.controls['maHoSo'].disable();

        this.hoSoToiTaoService.getDsDonVi().pipe(this.unsubsribeOnDestroy).subscribe(listDonvi => {
            this.dataDonViYeuCau = listDonvi
        })
        this.hoSoToiTaoService.getLoaiHs().pipe(this.unsubsribeOnDestroy).subscribe(listHoSo => {
            this.dataLoaiHoSo = listHoSo
            this.filteredLoaiHoSo = listHoSo
            this.formControl.patchValue({ loaiHoSo: this.dataLoaiHoSo[0].loaiHoSoId })
            this.hoSoToiTaoService.changeMessage(this.dataLoaiHoSo[0].loaiHoSoId)
            this.getQuyTrinh(this.dataLoaiHoSo[0].loaiHoSoId)
        })

        this.hoSoToiTaoService.getDSNganHang().pipe(this.unsubsribeOnDestroy).subscribe(banks => {
            if (banks && banks.length > 0) {
                this.dataBanks = banks

                this.hoSoToiTaoService.getChiNhanhNganHang().pipe(this.unsubsribeOnDestroy).subscribe(listChiNhanh => {
                    if (listChiNhanh && listChiNhanh.success) {
                        this.dataChiNhanhNH = listChiNhanh.data.Items

                        this.hoSoToiTaoService.getDSTaiKhoanNganHang().pipe(this.unsubsribeOnDestroy).subscribe((listAccountsBank) => {
                            this.accountBanks = listAccountsBank.data.Items
                            this.banks = this.accountBanks
                            this.filteredBanks.next(this.banks.slice());
                            this.formControl.controls['chiNhanhYeuCau'].disable()
                            this.formControl.controls['nganHangId'].disable()
                            this.formControl.controls['SoTKThuHuong'].disable()
                        })
                    }
                })
            }
        })

        this.hoSoToiTaoService.getDonViYeuCau(this.user.donViId).pipe(this.unsubsribeOnDestroy).subscribe(data => {
            this.dataBoPhanYC = data
            this.filteredBoPhan = data
        })

        this.hoSoToiTaoService.dataMaterial.subscribe((dataMaterial: any) => {
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
        this.filterBoPhan = new FormControl('')
        this.filterBoPhan.valueChanges.subscribe(
            value => {
                this.filteredBoPhan = this.dataBoPhanYC.filter(x => x.tenDonVi.toLowerCase().includes(value.toLowerCase()));
            }
        )

        this.filterLoaiHoSo = new FormControl('')
        this.filterLoaiHoSo.valueChanges.subscribe(
            value => {
                this.filteredLoaiHoSo = this.dataLoaiHoSo.filter(x => x.tenLoaiHoSo.toLowerCase().includes(value.toLowerCase()));
            }
        )
        console.log(this.user)
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.hoSoToiTaoService.changeDataMaterial([])
        this.formControl.reset()
    }

    get f() {
        return this.formControl.controls;
    }

    showToTrinh(action) {
        this.loading = true
        let thaoTacBuocPheDuyetId = ''
        this.dataQuyTrinh[0].listBuocThuHien[0].listThaoTac.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        let arrayStringHSTC = this.listArrayChecked.map(item => item['hoSoId'])
        const {
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
            moTaBaoCao,
            date,
            coBaoGomTaiLieuBanCung,
            lanThanhToan,
            hinhThucChi,
            boPhanYeuCau,
            noiDungThanhToan

        } = this.formControl.value

        const reqData = {
            // "MaHoSo": maHoSo,
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
            "TaiKhoanNganHangId": NguoiThuHuong?.taiKhoanId,
            "NoiDungThanhToan": noiDungThanhToan,
            "HoSoLienQuan": arrayStringHSTC.length > 0 ? arrayStringHSTC :  null,
            "QuyTrinhPheDuyetId": this.dataQuyTrinh[0].quyTrinhPheDuyetId,
            "QuaTrinhPheDuyetId": this.dataQuyTrinh[0].listBuocThuHien[0].buocPheDuyetId,
            "ThaoTacBuocPheDuyetId": thaoTacBuocPheDuyetId
        }
        this.hoSoToiTaoService.createDonVi(reqData).pipe(this.unsubsribeOnDestroy).subscribe(res => {
            if (res?.statusCode === 200 && res?.idHoSoTT !== null) {
                this.hoSoToiTaoService.dataMaterial.subscribe((dataMaterial: any) => {
                    this.listFileFromMaterial = dataMaterial
                });
                let arrayCallAPI = []
                let success = []
                if (this.listFileFromMaterial.length > 0) {
                    this.listFileFromMaterial.map((item, index) => {
                        arrayCallAPI.push(this.hoSoToiTaoService.createChitietgiaytoHSTT(item, res?.idHoSoTT))
                    })
                    let arrSuccess = []
                    from(arrayCallAPI).pipe(concatMap(api => api)).subscribe((data: any) => {
                        if(!data || data?.statusCode !== 200) {
                            this._notification.open(
                                "Thêm mới hồ sơ thất bại!",
                                mType.error
                            );
                            return;
                        }
                        if(data && data?.statusCode === 200) {
                            arrSuccess.push(data)
                        }
                        if(arrSuccess.length === arrayCallAPI.length) {
                            this.loading = false
                            this._notification.open(
                                "Thêm mới hồ sơ thành công!",
                                mType.success
                            );
                            const dialogRef = this.dialog.open(DialogShowToTrinh, {
                                width: '1920px',
                                autoFocus: false,
                                data: {
                                    dataPost: this.formControl.value,
                                    newIDHSTT: res?.idHoSoTT
                                }
                            });
                    
                            dialogRef.afterClosed().subscribe((response: any) => {
                                this.hoSoToiTaoService.changeDataMaterial([])
                                this.formControl.reset()
                                this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
                            });
                        }
                    },err => {
                        this._notification.open(
                            "Có lỗi trong quá trình thêm mới hồ sơ!",
                            mType.error
                        );
                        this.formControl.reset()
                        this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
                    }
                    
                    );
                }
            } else {
                this._notification.open(
                    "Thêm mới thất bại, vui lòng kiểm tra lại",
                    mType.error
                );
                this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
            }
        })
        
    }

    save(action) {
        let thaoTacBuocPheDuyetId = ''
        this.dataQuyTrinh[0].listBuocThuHien[0].listThaoTac.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        this.loadingAPI = true;
        this.postDataToAPI(5, thaoTacBuocPheDuyetId)
    }

    postDataToAPI(status, thaoTacBuocPheDuyetId) {
        let arrayStringHSTC = this.listArrayChecked.map(item => item['hoSoId'])
        const {
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
            moTaBaoCao,
            date,
            coBaoGomTaiLieuBanCung,
            lanThanhToan,
            hinhThucChi,
            boPhanYeuCau,
            noiDungThanhToan

        } = this.formControl.value

        const reqData = {
            // "MaHoSo": maHoSo,
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
            "TaiKhoanNganHangId": NguoiThuHuong?.taiKhoanId,
            "NoiDungThanhToan": noiDungThanhToan,
            "HoSoLienQuan": arrayStringHSTC.length > 0 ? arrayStringHSTC :  null,
            "QuyTrinhPheDuyetId": this.dataQuyTrinh[0].quyTrinhPheDuyetId,
            "QuaTrinhPheDuyetId": this.dataQuyTrinh[0].listBuocThuHien[0].buocPheDuyetId,
            "ThaoTacBuocPheDuyetId": thaoTacBuocPheDuyetId
        }
        this.hoSoToiTaoService.createDonVi(reqData).pipe(this.unsubsribeOnDestroy).subscribe(res => {
            if(!res.statusCode || res.statusCode !== 200) {
                this._notification.open(
                    "Thêm mới thất bại",
                    mType.error
                )
                return 
            }
            if (res?.statusCode === 200 && res?.idHoSoTT !== null) {
                this.addChiTietTaiLieu(res.idHoSoTT)
            } else {
                this._notification.open(
                    "Thêm mới thất bại, vui lòng kiểm tra lại",
                    mType.error
                );

            }
        }, err => {
            this._notification.open(
                "Thêm mới thất bại, vui lòng kiểm tra lại",
                mType.error
            );
            this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
        })
    }
    
    formatNoiDungTT(value: string) {
        this.formControl.patchValue({noiDungThanhToan: convertViToEn(value).toLowerCase()})
    }

    formatNumber(number: string) {
        return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    removeDots(number: string) {
        return number.split('.').join("");
    }

    doSomething(data) {
        this.valueChangeLoaiHS = true
        this.listArrayChecked = []
        this.listHSTC = []
        this.hoSoToiTaoService.changeDataHoSoThamChieuChecked(this.listArrayChecked)
        this.hoSoToiTaoService.changeDataHoSoThamChieu(this.listHSTC)
        this.hoSoToiTaoService.changeMessage(data.value)
        this.enableButtonLuu = false
        this.enableButtonLuuVaDeNghiTT = false
        this.getQuyTrinh(data.value)

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
            let arrSuccess = []
            from(arrayCallAPI).pipe(concatMap(api => api)).subscribe((data: any) => {
                if(!data.statusCode || data.statusCode !== 200) {
                    this._notification.open(
                        "Thêm mới hồ sơ thất bại",
                        mType.error
                    )
                    return 
                }
                if(data && data?.statusCode === 200) {
                    arrSuccess.push(data)
                }
                if(arrSuccess.length === arrayCallAPI.length) {
                    this._notification.open(
                        "Thêm mới hồ sơ thành công!",
                        mType.success
                    );
                }
            },err => {
                this._notification.open(
                    "Có lỗi trong quá trình thêm mới hồ sơ!",
                    mType.error
                );
            }
            );
            setTimeout(() => {
                this.back()
            }, 1500);
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
            this.banks.filter((bank: ITaiKhoanNganHang) => (
                bank.tenTaiKhoan.toLowerCase().indexOf(search) > -1) 
                || (bank.tenNganHangVietTat.toLowerCase().indexOf(search) > -1) 
                || (bank.soTaiKhoan.toLowerCase().indexOf(search) > -1)
            )
        );
    }
    
    chonHoSoThamChieu() {
        const dialogRef = this.dialog.open(DanhSachHoSoThamChieuComponent, {
            width: "1920px",
            data: {
                arrHoSoThamChieu: this.listHSTC,
                arrayPicked: this.listArrayChecked,
                loaiHoSo: this.loaiHoSo,
                valueChangeLoaiHS: this.valueChangeLoaiHS
            } 
        })
        dialogRef.afterClosed().subscribe((response: any) => {
            if(this.listArrayChecked.length > 0) this.valueChangeLoaiHS = false
            this.hoSoToiTaoService.dataHoSoThamChieuChecked.subscribe(item => {
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

    onPaste(event: ClipboardEvent) {
        let clipboardData = event.clipboardData;
        let pastedText = clipboardData.getData('text');
        this.tongTienThanhToanVND = this.formatNumber(pastedText)
    }

    convertToVietnamese() {
        let number = this.removeDots(this.tongTienThanhToanVND)
        if(+number > 0) return readNumber(+number) + " đồng"
    }

    getQuyTrinh(e){
        let listHD = []
        this._quytrinhpheduyetService.getQuyTrinhBuocThaoTacByLoaiHoSoId(e).subscribe(
            res => {
                this.dataQuyTrinh = res
                this.dataQuyTrinh[0].listBuocThuHien[0].listThaoTac.forEach(x => {
                    listHD.push(x.hanhDong)
                })
                listHD.forEach(x => {
                    if(x == this.danhSachThaoTac.btnLuu && this.dataQuyTrinh[0].listBuocThuHien[0].dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                        this.enableButtonLuu = true
                    }
                    if(x == this.danhSachThaoTac.btnLuuVaDeNghiTT && this.dataQuyTrinh[0].listBuocThuHien[0].dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1) {
                        this.enableButtonLuuVaDeNghiTT = true
                    }
                })
            }
        )
    }

}
