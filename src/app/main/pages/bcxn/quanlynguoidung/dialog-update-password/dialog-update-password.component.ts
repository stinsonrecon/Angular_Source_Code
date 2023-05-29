import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { DialogAddNguoidungComponent } from '../dialog-add-nguoidung/dialog-add-nguoidung.component';

@Component({
    selector: 'app-dialog-update-password',
    templateUrl: './dialog-update-password.component.html',
    styleUrls: ['./dialog-update-password.component.scss']
})
export class DialogUpdatePasswordComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    checkExistPassword:boolean = false;
    checkPassword:boolean = true;
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddNguoidungComponent>,private userService: UserService,public _notification: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }
    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            passwordOld: ['', this.data.item.isAccountHolder ? [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._])[A-Za-z\d$@$!%*?&._].{7,}')] : []],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&._])[A-Za-z\d$@$!%*?&._].{7,}')]],
            confirmPass: ['', [Validators.required]],
        }, { validator: this.checkIfMatchingPasswords('password', 'confirmPass') });
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

        if (this.formControl.invalid || this.checkExistPassword) {
            return;
        } else {
            this.data.item.dataNguoiDung = this.formControl.value

            this.dialogRef.close(true);
        }
    }

    checkPasswordExist(){
        let item = {
            id: this.data.item.id,
            password: this.formControl.value.password
        }
        this.userService.checkPasswordExist(item).subscribe(resp => {
                this.checkExistPassword = resp;
        })
    }

    checkPasswordOld(){
        let item = {
            id: this.data.item.id,
            password: this.formControl.value.passwordOld
        }
        this.userService.checkPasswordExist(item).subscribe(resp => {
                this.checkPassword = resp;
        })
    }
}
