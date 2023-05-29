import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { LinhVucService } from '@app/shared/services/bcxn/linhvuc.service';

@Component({
    selector: 'app-dialog-add-linhvuc',
    templateUrl: './dialog-add-linhvuc.component.html',
    styleUrls: ['./dialog-add-linhvuc.component.scss']
})
export class DialogAddLinhvucComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    dsLinhVucCha: any = [];
    dsCha: any = [];
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddLinhvucComponent>, private linhVucService: LinhVucService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }
    
    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            tenLinhVuc: ['', [Validators.required]],
            linhVucCha: ['', [Validators.required]],
            trangThai: ['']
        });
        this.getLinhVucCha();
        if (this.data.item.linhVucChaId == null) this.data.item.linhVucChaId = 0;
    }
    getLinhVucCha() {
        this.linhVucService.getLinhVuc().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            for(let obj of next.data) {
                if(obj.linhVucChaId == 0) {
                    this.dsLinhVucCha.push(obj);
                    this.dsCha.push(obj);
                }
            }
            for(let index in next.data) {
                if(next.data[index].linhVucChaId != 0) {
                    let tmp = this.dsCha.map(res => res.id).indexOf(next.data[index].linhVucChaId);
                    if(tmp == this.dsCha.length - 1) {
                        this.dsLinhVucCha.push(next.data[index]);
                    }
                    else {
                        let tmp2 = this.dsLinhVucCha.map(res => res.id).indexOf(this.dsCha[tmp + 1].id);
                        if(tmp2 > 0) {
                            this.dsLinhVucCha.splice(tmp2, 0, next.data[index]);
                        }
                    }
                }
            }
        });
    }
    get f() {
        return this.formControl.controls;
    }
    save() {
        if (this.data.item.trangThaiHoatDong == true) {
            this.data.item.trangThaiHoatDong = 1;
        }
        else {
            this.data.item.trangThaiHoatDong = 0;
        }
        this.formControl.markAllAsTouched();

        if (this.formControl.invalid) {
            return;
        } else {
            
            this.dialogRef.close(true);
        }

    }

}
