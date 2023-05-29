import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhSachChungTuService } from '@app/shared/services/chung-tu/ds-chung-tu.service';

@Component({
    selector: 'app-dialog-submit',
    templateUrl: './dialog-submit.component.html',
    styleUrls: ['./dialog-submit.component.scss']
})
export class DialogSubmitComponent extends BaseClass implements OnInit {

    username: string = '';
    password: FormControl;

    constructor(
        private _service: DanhSachChungTuService,
        private _notification: NotificationService,
        private dialogRef: MatDialogRef<DialogSubmitComponent>
    ) {
        super();
    }

    ngOnInit(): void {
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.password = new FormControl('', Validators.required);
    }

    submit() {
        if (this.password.invalid) {
            return;
        };

        const param = {
            username: this.username,
            password: this.password.value
        }
        this._service.confirmPassword(param)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res) {
                        this.dialogRef.close(true);
                    } else {
                        this.password.setErrors({ wrong: true });
                        this.password.markAsTouched();
                    }
                },
                err => {
                    this._notification.open(
                        'Có lỗi xảy ra!',
                        mType.error
                    )
                }
            )
    }
}
