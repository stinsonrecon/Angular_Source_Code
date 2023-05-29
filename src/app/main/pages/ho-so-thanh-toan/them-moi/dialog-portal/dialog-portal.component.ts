import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';

@Component({
  selector: 'app-dialog-portal',
  templateUrl: './dialog-portal.component.html',
  styleUrls: ['./dialog-portal.component.scss']
})
export class DialogPortalComponent extends BaseClass implements OnInit {
  dataPhieuDangKy: any
  dataPhieuTongHop: any

  constructor(
    public dialogRef: MatDialogRef<DialogPortalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super()
   }

  ngOnInit(): void {
    this.dataPhieuDangKy = this.data.item.data.filter(x => x.tenGiayTo.toLocaleLowerCase().includes("đăng ký"))
    this.dataPhieuTongHop = this.data.item.data.filter(x => x.tenGiayTo.toLocaleLowerCase().includes("tổng hợp"))
  }

}
