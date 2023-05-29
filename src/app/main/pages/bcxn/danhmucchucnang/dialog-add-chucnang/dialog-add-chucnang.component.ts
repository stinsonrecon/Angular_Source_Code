import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
@Component({
    selector: 'app-dialog-add-chucnang',
    templateUrl: './dialog-add-chucnang.component.html',
    styleUrls: ['./dialog-add-chucnang.component.scss']
})
export class DialogAddChucnangComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    dsChucNangCha: any = [];
    dsCha: any = [];
    objChucNang: any = [];
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddChucnangComponent>, public chucNangService: ChucNangService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            tenChucNang: ['', [Validators.required]],
            chucNangCha: ['', [Validators.required]],
            url: [''],
            icon: [''],
            thuTuHienThi: [''],
            moTa: [''],
            trangThai: [''],
            claimValue: [''],
            type: ['']
        });
        this.getChucNangCha();
        if (this.data.item.chucNangChaId == null) this.data.item.chucNangChaId = 0;
    }
    list_to_tree(list) {
        let map = {}, node, roots = [], i;

        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].child = []; // initialize the children
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.chucNangChaId != 0) {
                // if you have dangling branches check that map[node.parentId] exists
                if(map[node.chucNangChaId] != null ) list[map[node.chucNangChaId]].child.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }

    getChucNangCha() {
        this.chucNangService.getAllChucNang().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.objChucNang = this.list_to_tree(next.data)
            console.log(this.objChucNang)
        });
    }
    get f() {
        return this.formControl.controls;
    }
    save() {
        if (this.data.item.trangThai == true) {
            this.data.item.trangThai = 1;
        }
        else {
            this.data.item.trangThai = 0;
        }
        this.formControl.markAllAsTouched();

        if (this.formControl.invalid) {
            return;
        } else {

            this.dialogRef.close(true);
        }

    }

}
