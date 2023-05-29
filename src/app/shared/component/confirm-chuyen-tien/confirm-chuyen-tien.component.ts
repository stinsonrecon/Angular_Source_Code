import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-confirm-chuyen-tien',
    templateUrl: './confirm-chuyen-tien.component.html',
    styles: [
        `
        ::ng-deep .mat-dialog-container {
         padding: 8px 24px 24px 24px ;
        }
        `
    ]
})
export class ConfirmChuyenTienComponent
{
    public title: string;
    public confirmMessage: string;
    public confirmClose: boolean

    /**
     * Constructor
     *
     * @param {MatDialogRef<ConfirmChuyenTienComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmChuyenTienComponent>
    )
    {
    }

}
