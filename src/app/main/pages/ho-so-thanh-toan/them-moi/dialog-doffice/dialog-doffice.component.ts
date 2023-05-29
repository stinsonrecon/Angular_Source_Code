import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';

@Component({
  selector: 'app-dialog-doffice',
  templateUrl: './dialog-doffice.component.html',
  styleUrls: ['./dialog-doffice.component.scss']
})
export class DialogDofficeComponent extends BaseClass implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDofficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super()
  }

  ngOnInit(): void {
  }

}
