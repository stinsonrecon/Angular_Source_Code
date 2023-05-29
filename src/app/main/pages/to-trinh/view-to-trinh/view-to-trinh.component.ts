import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { ToTrinhService } from '@app/shared/services/to-trinh/to-trinh.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-view-to-trinh',
  templateUrl: './view-to-trinh.component.html',
  styleUrls: ['./view-to-trinh.component.scss']
})
export class ViewToTrinhComponent extends BaseClass implements OnInit {

  dataView: any = '';
  class1: string = '';
  class2: string = '';
  class3: string = '';
  pdfSource: string;

  constructor(
    public _notification: NotificationService,
    public dialogRef: MatDialogRef<ViewToTrinhComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: ToTrinhService,
    public danhMucService: DanhMucBaoCaoService,
  ) {
    super();
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    if (this.data.item.capKy === 1) {
      this.class1 = "active";
    }
    if (this.data.item.capKy === 2) {
      this.class1 = "completed"
      this.class2 = "active"
    }
    if (this.data.item.capKy === 3) {
      this.class1 = "completed"
      this.class2 = "completed"
      this.class3 = "active"
    }
    if (this.data.item.capKy > 3) {
      this.class1 = "completed"
      this.class2 = "completed"
      this.class3 = "completed"
    }
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.dialogRef.close(false);
      }
    });
    this.danhMucService.convertPdfToBase64(this.data.item.fileName).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      if (next.success) {
        this.pdfSource = next.data;
      } else {
        this._notification.open(
          next.message,
          mType.error
        );
      }
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    });
  }

}
