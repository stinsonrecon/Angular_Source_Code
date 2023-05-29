import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';

@Component({
  selector: 'app-dialog-dong-xacnhan',
  templateUrl: './dialog-dong-xacnhan.component.html',
  styleUrls: ['./dialog-dong-xacnhan.component.scss']
})
export class DialogDongXacnhanComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    ghiChu: any;
    tenFile: any;
    constructor(public dialogRef: MatDialogRef<DialogDongXacnhanComponent>, private formBuilder: FormBuilder, private notification: NotificationService,
        @Inject(MAT_DIALOG_DATA) public data: any) { 
            super();
        }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            file: ['', Validators.required],
            ghiChu: ['']
        });
    }

    get f() {
        return this.formControl.controls;
    }

    uploadFile(files: any) {
        if(files.files[0].type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || files.files[0].type == "application/vnd.ms-powerpoint") {
            this.data.item.file = files.files[0];
        }
        else {
            this.data.item.file = null;
            this.notification.open("Chỉ chọn file định dạng ppt, pptx", mType.info);
        }
        this.tenFile = files.files[0].name;
    }

    removeFile() {
        this.formControl.controls["file"].reset();
        this.data.item.file = null;
        this.tenFile = null;
    }

    dongXacNhan() {
        this.formControl.markAllAsTouched();
        console.log(this.data);
        if(this.formControl.invalid || !this.data.item.file) {
            return;
        }
        else {
            this.dialogRef.close(true);
        }
    }
}
