import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styles: [
        `
        ::ng-deep .mat-dialog-container {
         padding: 8px 24px 24px 24px ;
        }
        `
    ]
})
export class ConfirmDialogComponent
{
    public title: string;
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>
    )
    {
    }

}
