import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-giayto',
    templateUrl: './dialog-giayto.component.html',
    styleUrls: ['./dialog-giayto.component.scss']
})
export class DialogGiaytoComponent implements OnInit {

    formGiayTo: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogGiaytoComponent>
    ) { }

    ngOnInit(): void {
        this.formGiayTo = this.fb.group({
            MaGiayTo: ['', Validators.required],
            TenGiayTo: ['', Validators.required],
            Nguon: ['', Validators.required],
            TrangThai: [true],
            KySo: [1, Validators.required],
        })

        if (this.data.item) {
            this.formGiayTo.patchValue({
                MaGiayTo: this.data.item.maGiayTo,
                TenGiayTo: this.data.item.tenGiayTo,
                Nguon: this.data.item.nguon,
                TrangThai: this.data.item.trangThai == 1 ? true : false,
                KySo: this.data.item.kySo,
            });
        }
    }

    submit(e: string) {
        this.formGiayTo.markAllAsTouched();
        if (this.formGiayTo.invalid) {
            return;
        }
        this.formGiayTo.controls.TrangThai.setValue(this.formGiayTo.controls.TrangThai.value === true ? 1 : 2);

        const param = {
            ...this.formGiayTo.value,
            giayToId: this.data.item?.id,
        }

        if(e === 'CREATE') {
            delete param.giayToId;
        }

        this.dialogRef.close({ param: param, action: e });
    }
}
