import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { BaoCaoService } from '@app/shared/services/bcxn/baocao.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-dialog-view-image-baocao',
    templateUrl: './dialog-view-image-baocao.component.html',
    styleUrls: ['./dialog-view-image-baocao.component.scss']
})
export class DialogViewImageComponent extends BaseClass implements OnInit {
    environment = environment;
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogViewImageComponent>, private baoCaoService: BaoCaoService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }
    
    ngOnInit(): void {
        
    }

    downloadFile(){
        window.open(environment.apiUrl + this.data.item.fileBaoCao.replaceAll("\\","/").replaceAll("wwwroot","").replaceAll(".jpg", ".pptx"));
    }
}
