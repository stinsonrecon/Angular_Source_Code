import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { QuocGiaService } from "@app/shared/services/bcxn/danhmucquocgia.service";

@Component({
    selector: 'app-dialog-add-quocgia',
    templateUrl: 'dialog-add-quocgia.component.html',
    styleUrls: ['dialog-add-quocgia.component.scss']
})
export class DialogAddQuocGiaComponent extends BaseClass implements OnInit {
    formQuocGia: FormGroup;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<DialogAddQuocGiaComponent>,
        private fb: FormBuilder,
        private _notification: NotificationService,
        private service: QuocGiaService
    ) {
        super()
    }

    ngOnInit(): void {
        this.formQuocGia = this.fb.group({
            tenQuocGia: ["", Validators.required],
            maQuocGia: ["", Validators.required],
            trangThai: [true]
        })
        if(this.data.actions == "update") {
            this.formQuocGia.patchValue({
                tenQuocGia : this.data.data.tenQuocGia,
                maQuocGia: this.data.data.maQuocGia,
                trangThai: this.data.data.trangThai === 1 ? true : false
            })
        }
    }
    
    createQuocGia() {
        if(this.formQuocGia.valid) {
            const param = {
                tenQuocGia: this.formQuocGia.get("tenQuocGia").value,
                maQuocGia: this.formQuocGia.get("maQuocGia").value,
                trangThai: this.formQuocGia.get("trangThai").value === true ? 1 : 2,
                daXoa: 1
            }

            this.service.createOrUpdateQuocGia(param).pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    (res) => {
                        if(res.success == true) {
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
            this.formQuocGia.markAllAsTouched();
        }
    }

    updateQuocGia() {
        if(this.formQuocGia.valid)
        {
            const param = {
                quocGiaId: this.data.data.quocGiaId,
                tenQuocGia: this.formQuocGia.get("tenQuocGia").value,
                maQuocGia: this.formQuocGia.get("maQuocGia").value,
                trangThai: this.formQuocGia.get("trangThai").value === true ? 1 : 2,
                daXoa: 1
            }
            this.service.updateQuocGia(param).pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    (res) => {
                        if(res.success == true) {
                            this._notification.open(
                                res.message,
                                mType.success
                            )
                            this.dialogRef.close(true)
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
            this.formQuocGia.markAllAsTouched();
        }
    }

    close() {
        this.dialogRef.close(false);
    }
}