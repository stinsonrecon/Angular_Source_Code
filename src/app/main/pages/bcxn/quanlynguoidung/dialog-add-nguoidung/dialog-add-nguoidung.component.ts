import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { convertViToEn } from '@app/shared/constants/util';
import { YeuCauBaoGiaService } from '@app/shared/services/bcxn/yeucaubaogia.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dialog-add-nguoidung',
    templateUrl: './dialog-add-nguoidung.component.html',
    styleUrls: ['./dialog-add-nguoidung.component.scss']
})
export class DialogAddNguoidungComponent extends BaseClass implements OnInit {

    formControl: FormGroup
    submitted: boolean;
    temp: any = [{
        id: 1,
        name: 'EVN'
    }]
    dsDonVi: any = [];
    dsDonViSearch:any = [];
    dsRole: any = [];
    protected _onDestroy = new Subject<void>();
    dvFilterCtrl: FormControl = new FormControl();

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private yeuCauBaoGiaService: YeuCauBaoGiaService, public dialogRef: MatDialogRef<DialogAddNguoidungComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }

    ngOnInit(): void {
        this.getDonVi();
        this.getRole();
        this.formControl = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, this.validateEmail]],
            donVi: ['', [Validators.required]],
            sdt: [''],
            taiKhoan: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', !this.data.item.id ? [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._])[A-Za-z\d$@$!%*?&._].{7,}')] : []],
            confirmPass: ['', !this.data.item.id ? [Validators.required] : []],
            nhomQuyen: ['', [Validators.required]],
            accountType: ['', Validators.required],
            trangThai: [''],
            dinhDanhKy: ['', Validators.required]
        }, { validator: this.checkIfMatchingPasswords('password', 'confirmPass') });
        
        this.dvFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.searchDv(); 
            });
    }
    getDonVi() {
        this.yeuCauBaoGiaService.getDonVi(null).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsDonVi = next;
            this.dsDonViSearch = next;
        })
    }
    getRole() {
        this.yeuCauBaoGiaService.getRole().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsRole = next;
        })
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    get f() {
        return this.formControl.controls;
    }
    save() {
        this.formControl.markAllAsTouched();
        this.submitted = true;

        if (this.formControl.invalid) {
            return;
        } else {
            this.dialogRef.close(true);
        }

    }
    validatePhone(control: AbstractControl): { [key: string]: any } | null {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (control.value && vnf_regex.test(control.value) == false) {
            return { 'phoneNumberInvalid': true };
        }
        return null;
    }
    validateEmail(control: AbstractControl): { [key: string]: any } | null {
        let vnf_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value && vnf_regex.test(control.value) == false) {
            return { 'emailInvalid': true };
        }
        return null;
    }

    searchDv() {
        this.dsDonViSearch = this.dsDonVi ? this.dsDonVi.filter(item => convertViToEn(item.tenDonVi).indexOf(convertViToEn(this.dvFilterCtrl.value || "")) !== -1) : [];
    }

}
