import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import * as util from '@app/shared/constants/util';
import { TaikhoannhanService } from '@app/shared/services/bcxn/taikhoannhan.service';
import { ChiNhanhNganHang, NganHang, TaiKhoanNhan } from '@app/shared/models/hosothanhtoan/tai-khoan-nhan.model';
import { ReplaySubject } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'dialog-taochungtu',
    templateUrl: './dialog-taochungtu.component.html',
    styleUrls: ['./dialog-taochungtu.component.scss']
})
export class DialogTaoChungTuComponent extends BaseClass implements OnInit {

    accountBanks: any;
    formPayment: FormGroup;
    listBank: any[] = [];
    listDonVi: any[] = []
    utilFunc = util;
    requiredCheckbox: boolean;
    filterDonVi: FormControl;
    filterTaiKhoan: FormControl;
    filteredDonVi: any;
    filteredTaiKhoan: any;
    taiKhoanDetail: any;
    listTKN: TaiKhoanNhan[]
    listNganHang: NganHang[]
    listChiNhanh: ChiNhanhNganHang[]
    filterTKN: FormControl;
    filteredTKN: any;
    tenChiNhanh: string
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private hoSoToiTaoService: HoSoToiTaoService,
        private dialogRef: MatDialogRef<DialogTaoChungTuComponent>,
        private taiKhoanService: TaikhoannhanService,
    ) {
        super();
    }

    ngOnInit(): void {
        console.log(this.data);
        this.filterTKN = new FormControl('');
        this.hoSoToiTaoService.getDSTaiKhoanNganHang().pipe(this.unsubsribeOnDestroy).subscribe(listAccountsBank => {
            this.accountBanks = listAccountsBank.data.Items.filter(x => x.trangThai == 1);
            // this.filteredTKN = listAccountsBank.data.Items;
            // this.filterTKN.valueChanges.subscribe(
            //     value => {
            //         this.filteredTKN = this.accountBanks.filter(x => x.tenTaiKhoan.toLowerCase().includes(value.toLowerCase()));
            //     }
            // )
            this.filteredTaiKhoan = this.accountBanks;
        });
        this.getListChiNhanh()
        this.data.trangThaiChungTuBuocTiepTheo
        this.formPayment = this.fb.group({
            CTGS_GL: [false],
            CTGS_AP: [this.data.trangThaiChungTuBuocTiepTheo == 8 ? true : false], // ctgs
            CTGS_CM: [this.data.trangThaiChungTuBuocTiepTheo == 0 ? true : false], // pcunc
            TenNguoiChuyen: [JSON.parse(localStorage.getItem('user')).firstName + " " + JSON.parse(localStorage.getItem('user')).lastName, Validators.required],
            DonViThanhToanId: [this.data?.idDonVi, Validators.required],
            SoTien: [this.data?.tongTienDeNghi, [Validators.required]],
            LoaiTienTe: [this.data?.loaiTienTe, Validators.required],
            TyGia: ['1', Validators.required],
            TenTaiKhoanNhan: [this.data?.trangThaiTaiKhoan == 2 ? null : this.data?.taikhoanNhanId, Validators.required],
            SoTaiKhoanNhan: [this.data?.trangThaiTaiKhoan == 2 ? null : this.data?.soTkNhan, Validators.required],
            MaNganHangNhan: [this.data?.trangThaiTaiKhoan == 2 ? null : this.data?.idNganHangNhan, Validators.required],
            NgayLap: [new Date(), Validators.required],
            ChiNhanh: [this.data?.trangThaiTaiKhoan == 2 ? null : this.data?.chiNhanhId, Validators.required],
            NoiDungTT: [this.data?.noiDungThanhToan, [
                Validators.required,
                Validators.maxLength(210)
            ]]
        })

        this.hoSoToiTaoService.getDSNganHang().pipe(this.unsubsribeOnDestroy).subscribe(banks => {
            this.listBank = banks
        })

        this.hoSoToiTaoService.getDsDonVi().pipe(this.unsubsribeOnDestroy).subscribe(listDonvi => {
            this.listDonVi = listDonvi;
            this.filteredDonVi = listDonvi;
        })

        this.filterDonVi = new FormControl('');
        this.filterDonVi.valueChanges.subscribe(
            value => {
                this.filteredDonVi = this.listDonVi.filter(x => x.tenDonVi.toLowerCase().includes(value.toLowerCase()));
            }
        )

        this.filterTaiKhoan = new FormControl('');
        this.filterTaiKhoan.valueChanges.subscribe(
            value => {
                this.filteredTaiKhoan = this.accountBanks.filter(x => (x.tenTaiKhoan.toLowerCase().includes(value.toLowerCase())) || (x.tenNganHangVietTat.toLowerCase().includes(value.toLowerCase())) || (x.soTaiKhoan.toLowerCase().includes(value.toLowerCase())));
            }
        )
        this.formPayment.get("NoiDungTT").valueChanges.subscribe(
            (res) => {
                if(res){
                    let test: boolean
                    const regex = new RegExp(/^[0-9a-zA-Z (),;.\[\]+:]+$/);
                    test = regex.test(res)
                    console.log(test)
                    if(!test){
                        this.formPayment.get("NoiDungTT").setErrors({ incorrectMessage: true})
                    }
                }
            }
        )
    }

    formatCurrency(c: FormControl) {
        let num = c.value;
        if (typeof num == 'number') {
            num = num.toString();
        }
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    getListChiNhanh(e?) {
        this.taiKhoanService.getListChiNhanhNHByNganHang(e).pipe(this.unsubsribeOnDestroy)
            .subscribe(
                (res) => {
                    this.listChiNhanh = res.data.Items
                    let tenChhiNhanh = this.listChiNhanh.filter(x => x.chiNhanhNganHangId == this.data?.chiNhanhId)[0].tenChiNhanh
                    this.formPayment.get("ChiNhanh").patchValue(this.data?.chiNhanhId)
                    this.tenChiNhanh = this.listChiNhanh.filter(x => x.chiNhanhNganHangId == this.data.chiNhanhId)[0].tenChiNhanh
                }
            )
    }

    formatNoiDungTT(value: string) {
        this.formPayment.patchValue({NoiDungTT: util.convertViToEn(value).toLowerCase()})
    }

    submit(e: boolean, action: number) {
        let type
        if (!e) {
            this.dialogRef.close();
            return;
        }
        this.formPayment.markAllAsTouched();
        if (this.formPayment.invalid && action !== 0) {
            return
        }

        if (!this.formPayment.value.CTGS_GL && !this.formPayment.value.CTGS_AP && !this.formPayment.value.CTGS_CM && action !== 0) {
            this.requiredCheckbox = true;
            return;
        } else {
            this.requiredCheckbox = false;
        }
        let tongThanhToan = Number(this.formPayment.value.SoTien.toString().replace(/[^0-9]/g, ""))
        let tongDeNghi = this.data?.tongTienDeNghi
        if(tongThanhToan > tongDeNghi){
            this.formPayment.get("SoTien").setErrors({ incorrectMoney: true})
            return
        }
        else{
            this.formPayment.get("SoTien").setErrors({ incorrectMoney: false})
        }
        if (this.formPayment.value.CTGS_CM) type = 0
        else if (this.formPayment.value.CTGS_AP) type = 1

        const data = {
            submit: e,
            action: action,
            param: {
                HoSoThanhToanId: this.data.id,
                GhiChu: this.data.tenHoSo,
                NguoiYeuCauLapId: JSON.parse(localStorage.getItem('user')).id,
                MaChiNhanhNhan: this.listChiNhanh.find(x => x.chiNhanhNganHangId == this.formPayment.value.ChiNhanh).maChiNhanhErp,
                // ...this.formPayment.value,
                SoTien: parseInt(this.formPayment.value.SoTien.toString().replace(/[^0-9]/g, "")),
                TyGia: parseInt(this.formPayment.value.TyGia.toString().replace(/[^0-9]/g, "")),
                NgayYeuCauLapCt: moment(this.formPayment.value.NgayLap).format('DD/MM/YYYY HH:mm:00'),
                MaNganHangNhan: this.listBank.find(x => x.nganHangId === this.formPayment.value.MaNganHangNhan).maNganHang,
                TenNganHangNhan : this.listBank.find(x => x.nganHangId === this.formPayment.value.MaNganHangNhan).tenNganHang,
                CTGS_AP: this.formPayment.value.CTGS_AP,
                CTGS_CM: this.formPayment.value.CTGS_CM,
                CTGS_GL: this.formPayment.value.CTGS_GL,
                LoaiChungTu: type,
                DonViThanhToanId: this.formPayment.value.DonViThanhToanId,
                LoaiTienTe: this.formPayment.value.LoaiTienTe,
                SoTaiKhoanNhan:this.formPayment.value.SoTaiKhoanNhan,
                TenNguoiChuyen: this.formPayment.value.TenNguoiChuyen,
                TenTaiKhoanNhan: this.accountBanks.find(x => x.taiKhoanId == this.formPayment.value.TenTaiKhoanNhan).tenTaiKhoan,
                NoiDungTT: this.formPayment.value.NoiDungTT,
                ThaoTacBuocPheDuyetId: ''
            }
        }

        this.dialogRef.close(data);
    }

    changeTaiKhoan(e){
        const param = {
            TaiKhoanId: e.value
        }
        this.taiKhoanService.getTaiKhoan(param).pipe(this.unsubsribeOnDestroy)
        .subscribe(
            (res) => {
                this.taiKhoanDetail = res.data.Items[0]
                this.formPayment.patchValue({
                    TenTaiKhoanNhan: this.taiKhoanDetail.taiKhoanId,
                    SoTaiKhoanNhan: this.taiKhoanDetail.soTaiKhoan,
                    MaNganHangNhan: this.taiKhoanDetail.nganHangId,
                    ChiNhanh: this.taiKhoanDetail.chiNhanhNganHangId,
                })
            }
        )
    }
}
