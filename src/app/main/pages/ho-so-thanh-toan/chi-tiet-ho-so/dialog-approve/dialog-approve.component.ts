import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-dialog-approve',
    templateUrl: './dialog-approve.component.html',
    styleUrls: ['./dialog-approve.component.scss']
})
export class DialogApproveComponent implements OnInit {

    ykien: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<DialogApproveComponent>,
    ) {
        this.ykien = new FormControl('', Validators.required)
    }

    ngOnInit(): void { }

    submit() {
        if (this.ykien.invalid) {
            this.ykien.markAllAsTouched();
            return;
        }
        const data = {
            submit: true,
            ykien: this.ykien.value,
        }
        this.dialogRef.close(data);
    }
}
