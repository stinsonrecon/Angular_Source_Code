import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChiNhanhNganHang, NganHang } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { BaseClass } from '@app/base-class';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DonViService } from '@app/shared/services/bcxn/donvi.service';
import { validateEvents } from 'angular-calendar/modules/common/util';

@Component({
    selector: 'app-dialog-taikhoan',
    templateUrl: './dialog-taikhoan.component.html',
    styleUrls: ['./dialog-taikhoan.component.scss']
})
export class DialogTaikhoanComponent extends BaseClass implements OnInit {

    formTaiKhoan: FormGroup;

    listNganHang: NganHang[]
    listChiNhanh: ChiNhanhNganHang[]
    listDonVi: any;
    filterDonVi: FormControl;
    filteredDonVi: any;
    filterNH: FormControl;
    filteredNH: NganHang[];
    filterChiNhanh: FormControl
    filteredChiNhanh: ChiNhanhNganHang[]
    listQuocGia: any;
    filteredQG: any
    filterQuocGia: FormControl
    listTinhTP: any;
    filteredTinhTP: any
    filterTinhTP: FormControl;
    nganHang: any = "";
    loaiTK: any = "";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<DialogTaikhoanComponent>,
        private fb: FormBuilder,
        private taiKhoanService: TaikhoannhanService,
        private donViService: DonViService,
        private _notification: NotificationService,
        public hoSoToiTaoService: HoSoToiTaoService,
    ) {
        super()
    }

    ngOnInit(): void {
        this.formTaiKhoan = this.fb.group({
            tenTK: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\&\/\?\:\)\(\.\,\+\-\_ ]+$")]],
            soTK: ["", Validators.required],
            tenNH: ["", Validators.required],
            loaiTK: ["", Validators.required],
            chiNhanh: ["", Validators.required],
            donVi: ["", Validators.required],
            trangThai: [true],
            type: [true],
            ghiChu: [""],
            quocGia: ["", Validators.required],
            tinhTP: ["", Validators.required],
            sdt: ["", Validators.required],
            email: [""],
            diaChi: [""]
        })
        this.getListNganHang()
        this.filterNH = new FormControl('');
        this.filterNH.valueChanges.subscribe(
            value => {
                this.filteredNH = this.listNganHang.filter(x => x.tenNganHang.toLowerCase().includes(value.toLowerCase()));
            }
        )
        this.filterChiNhanh = new FormControl('')
        this.filterChiNhanh.valueChanges.subscribe(
            value => {
                this.filteredChiNhanh = this.listChiNhanh.filter(x => x.tenChiNhanh.toLowerCase().includes(value.toLowerCase()))
            }
        )
        this.getListDonVi();
        this.filterDonVi = new FormControl('');
        this.filterDonVi.valueChanges.subscribe(
            value => {
                this.filteredDonVi = this.listDonVi.filter(x => x.tenDonVi.toLowerCase().includes(value.toLowerCase()));
            }
        )
        this.getAllQuocGia();
        this.filterQuocGia = new FormControl('');
        this.filterQuocGia.valueChanges.subscribe(
            value => {
                this.filteredQG = this.listQuocGia.filter(x => x.tenQuocGia.toLowerCase().includes(value.toLowerCase()));
            }
        )
        this.filterTinhTP = new FormControl('')
        this.filterTinhTP.valueChanges.subscribe(
            value => {
                this.filteredTinhTP = this.listTinhTP.filter(x => x.tenTinhTp.toLowerCase().includes(value.toLowerCase()))
            }
        )
        if (this.data.action == "UPDATE") {
            this.getListChiNhanh(this.data.data.nganHangId, this.data.data.loaiTaiKhoan)
            this.getTinhTPByQuocGiaId(this.data.data.quocGiaId)
            this.formTaiKhoan.patchValue({
                tenTK: this.data.data.tenTaiKhoan,
                soTK: this.data.data.soTaiKhoan,
                tenNH: this.data.data.nganHangId,
                loaiTK: this.data.data.loaiTaiKhoan,
                chiNhanh: this.data.data.chiNhanhNganHangId,
                donVi: this.data.data.donViId,
                trangThai: this.data.data.trangThai === 1 ? true : false,
                type: this.data.data.laTaiKhoanNhan,
                ghiChu: this.data.data.ghiChu,
                quocGia: this.data.data.quocGiaId,
                tinhTP: this.data.data.tinhTPId,
                sdt: this.data.data.sdt,
                email: this.data.data.email,
                diaChi: this.data.data.diaChi
            })
        }
    }

    close() {
        this.dialogRef.close(false);
    }

    getListNganHang() {
        this.taiKhoanService.getListNganHang().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listNganHang = res.data.Items
                    this.filteredNH = res.data.Items
                }
            )
    }
    getListChiNhanh(id, e) {
        this.formTaiKhoan.get("chiNhanh").setValue('');
        this.taiKhoanService.getListChiNhanhNHByNganHang(id, e).pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listChiNhanh = res.data.Items
                    this.filteredChiNhanh = res.data.Items
                }
            )
    }
    getListDonVi() {
        this.donViService.getDonVi().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listDonVi = res.data
                    this.filteredDonVi = res.data
                }
            )
    }

    changeNgangHang(e) {
        this.nganHang = e.value;
        if (this.loaiTK !== "") {
            this.getListChiNhanh(e.value, this.loaiTK);
        }
    }

    changeLoaiTK(e) {
        this.loaiTK = e.value
        if (this.nganHang !== "" && e.value !== "") this.getListChiNhanh(this.nganHang, e.value);
    }

    getAllQuocGia() {
        this.taiKhoanService.getAllQuocGia().pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listQuocGia = res
                    this.filteredQG = res
                }
            )
    }

    getTinhTPByQuocGiaId(e?) {
        this.taiKhoanService.getTinhTPByQuocGiaId(e).pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listTinhTP = res
                    this.filteredTinhTP = res
                }
            )
    }

    changeQuocGia(e) {
        this.listTinhTP = []
        this.filteredTinhTP = []
        this.formTaiKhoan.controls['tinhTP'].setValue('')
        this.getTinhTPByQuocGiaId(e.value)
    }

    createTaiKhoan() {
        if (this.formTaiKhoan.valid) {
            const param = {
                NganHangId: this.formTaiKhoan.get("tenNH").value,
                LoaiTaiKhoan: this.formTaiKhoan.get("loaiTK").value,
                ChiNhanhNganHangId: this.formTaiKhoan.get("chiNhanh").value,
                DonViId: this.formTaiKhoan.get("donVi").value,
                TenTaiKhoan: this.formTaiKhoan.get("tenTK").value,
                SoTaiKhoan: this.formTaiKhoan.get("soTK").value,
                TrangThai: this.formTaiKhoan.get("trangThai").value === true ? 1 : 2,
                laTaiKhoanNhan: this.formTaiKhoan.get("type").value,
                GhiChu: this.formTaiKhoan.get("ghiChu").value,
                QuocGiaId: this.formTaiKhoan.get("quocGia").value,
                TinhTPId: this.formTaiKhoan.get("tinhTP").value,
                SDT: this.formTaiKhoan.get("sdt").value,
                DiaChi: this.formTaiKhoan.get("diaChi").value,
                Email: this.formTaiKhoan.get("email").value
                // DonViId:
            }
            this.taiKhoanService.createTaiKhoanNhan(param).pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    (res) => {
                        if (res.success == true) {
                            this._notification.open(
                                res.message,
                                mType.success
                            )
                            this.dialogRef.close(true);
                        }
                        else {
                            this._notification.open(
                                res.message,
                                mType.error
                            )
                        }
                    },
                    (err) => {
                        this._notification.open(
                            err.message,
                            mType.error
                        )
                    }
                )
        }
        else {
            this.formTaiKhoan.markAllAsTouched();
        }

    }

    updateTaiKhoan() {
        if (this.formTaiKhoan.valid) {
            const param = {
                TaiKhoanId: this.data.data.taiKhoanId,
                NganHangId: this.formTaiKhoan.get("tenNH").value,
                LoaiTaiKhoan: this.formTaiKhoan.get("loaiTK").value,
                ChiNhanhNganHangId: this.formTaiKhoan.get("chiNhanh").value,
                DonViId: this.formTaiKhoan.get("donVi").value,
                TenTaiKhoan: this.formTaiKhoan.get("tenTK").value,
                SoTaiKhoan: this.formTaiKhoan.get("soTK").value,
                TrangThai: this.formTaiKhoan.get("trangThai").value === true ? 1 : 2,
                laTaiKhoanNhan: this.formTaiKhoan.get("type").value,
                GhiChu: this.formTaiKhoan.get("ghiChu").value,
                QuocGiaId: this.formTaiKhoan.get("quocGia").value,
                TinhTPId: this.formTaiKhoan.get("tinhTP").value,
                SDT: this.formTaiKhoan.get("sdt").value,
                DiaChi: this.formTaiKhoan.get("diaChi").value,
                Email: this.formTaiKhoan.get("email").value
            }
            this.taiKhoanService.updateTaiKhoanNhan(param).pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    (res) => {
                        if (res.success == true) {
                            this._notification.open(
                                res.message,
                                mType.success
                            )
                            this.dialogRef.close(true);
                        } else {
                            this._notification.open(
                                res.message,
                                mType.error
                            )
                        }
                    },
                    (err) => {
                        this._notification.open(
                            err.message,
                            mType.error
                        )
                    }
                )
        }
        else {
            this.formTaiKhoan.markAllAsTouched();
        }

    }

    validateTenTK() {
        const value = this.formTaiKhoan.value.tenTK.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.formTaiKhoan.patchValue({
            tenTK: value,
        })
    }

}
