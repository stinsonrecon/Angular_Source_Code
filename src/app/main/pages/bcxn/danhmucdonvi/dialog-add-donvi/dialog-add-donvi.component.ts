import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { DonViService } from '@app/shared/services/bcxn/donvi.service';
// import { loaiDonVi } from '@app/shared/constants/bcxn.constants';


@Component({
    selector: 'app-dialog-add-donvi',
    templateUrl: './dialog-add-donvi.component.html',
    styleUrls: ['./dialog-add-donvi.component.scss']
})
export class DialogAddDonViComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    dsDonViCha: any = [];
    dsCha: any = [];
    // loaiDonVi = loaiDonVi;
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddDonViComponent>, private donViService: DonViService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            tenDonVi: ['', [Validators.required]],
            // email: ['',[this.validateEmail]],
            // sdt: ['',[this.validatePhone]],
            maDonVi: ['', [Validators.required]],
            donViCha: ['', [Validators.required]],
            phongBan: [''],
            erpidDonVi: ['', [Validators.required]],
            erpMaChiNhanh: ['', [Validators.required]],
            erpMaCongTy: ['', [Validators.required]],
            trangThai: [''],
            maDonViDOffice: ['', Validators.required]
        });
        this.getDonViCha();
        if (this.data.item.donViChaId == null) this.data.item.donViChaId = 0;
    }
    // validatePhone(control: AbstractControl): { [key: string]: any } | null {
    //     let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    //     if (control.value && vnf_regex.test(control.value) == false) {
    //         return { 'phoneNumberInvalid': true };
    //     }
    //     return null;
    // }
    // validateEmail(control: AbstractControl): { [key: string]: any } | null {
    //     let vnf_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if (control.value && vnf_regex.test(control.value) == false) {
    //         return { 'emailInvalid': true };
    //     }
    //     return null;
    // }
    getDonViCha() {
        this.donViService.getDonVi().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            // for(let obj of next.data) {
            //     if(obj.donViChaId == 0) {
            //         this.dsDonViCha.push(obj);
            //         this.dsCha.push(obj);
            //     }
            // }
            // for(let index in next.data) {
            //     if(next.data[index].donViChaId != 0) {
            //         let tmp = this.dsCha.map(res => res.id).indexOf(next.data[index].donViChaId);
            //         if(tmp == this.dsCha.length - 1) {
            //             this.dsDonViCha.push(next.data[index]);
            //         }
            //         else {
            //             let tmp2 = this.dsDonViCha.map(res => res.id).indexOf(this.dsCha[tmp + 1].id);
            //             if(tmp2 > 0) {
            //                 this.dsDonViCha.splice(tmp2, 0, next.data[index]);
            //             }
            //         }
            //     }
            // }
            this.dsDonViCha = next.data

        });
    }
    get f() {
        return this.formControl.controls;
    }
    save() {
        this.data.item.trangThai = this.data.item.trangThai ? 1 : 0;
        this.data.item.laPhongBan = this.data.item.laPhongBan ? 1 : 0;
        this.formControl.markAllAsTouched();
        

        if (this.formControl.invalid) {
            return;
        } else {
    
            this.dialogRef.close(true);
        }

    }

}
