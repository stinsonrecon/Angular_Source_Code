import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {

    public title: string;
    public confirmMessage: string;

    constructor(
        public dialogRef: MatDialogRef<InfoDialogComponent>
    ) {
    }

}
