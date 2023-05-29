import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifi-conten',
  templateUrl: './notifi-conten.component.html',
  styleUrls: ['./notifi-conten.component.scss']
})
export class NotifiContenComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: Message) {
  }
  ngOnInit(): void {
    if (this.data.type === 'error')   { this.data.title = 'Có lỗi!'; }
    if (this.data.type === 'warning') { this.data.title = 'Cảnh báo!'; }
    if (this.data.type === 'info')    { this.data.title = 'Thông báo!'; }
    if (this.data.type === 'done')    { this.data.title = 'Thành công!'; }
  }
}
export interface Message {
  title?: string;
  message: string;
  type: string;
}
