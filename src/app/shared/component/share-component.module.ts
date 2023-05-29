
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmChuyenTienComponent } from './confirm-chuyen-tien/confirm-chuyen-tien.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
    ],
    declarations:[
        ConfirmDialogComponent,
        ConfirmChuyenTienComponent
    ],
    exports: [
    ]
})
export class ShareComponentModule
{
}
