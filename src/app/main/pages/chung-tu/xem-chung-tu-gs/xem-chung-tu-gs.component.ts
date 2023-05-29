import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu } from '@app/shared/constants/chungtu.const';
import { PheDuyetChungTuService } from '@app/shared/services/chung-tu/phe-duyet-chung-tu.service';
import { YeuCauChiService } from '@app/shared/services/chung-tu/yeu-cau-chi.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-xem-chung-tu-gs',
  templateUrl: './xem-chung-tu-gs.component.html',
  styleUrls: ['./xem-chung-tu-gs.component.scss']
})
export class XemChungTuGsComponent extends BaseClass implements OnInit {
  dataView: any;
  class1: string = '';
  class2: string = '';
  class3: string = '';
  pdfSource: string
  constTrangThaiChungTu = TrangThaiChungTu

  constructor(
    public _service: PheDuyetChungTuService,
    public _notification: NotificationService,
    public service_: YeuCauChiService,
    public dialogRef: MatDialogRef<XemChungTuGsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super()
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.dialogRef.close(false);
      }
    });
    this._service.getBanTheHien(this.data.id).pipe(this.unsubsribeOnDestroy).subscribe(next => {
      this.dataView = next;
      if (this.dataView.ChungTu?.capKy === 4) {
        this.class1 = "active";
      }
      if (this.dataView.ChungTu?.capKy === 5) {
        this.class1 = "completed"
        this.class2 = "active"
      }
      if (this.dataView.ChungTu?.capKy >= 6) {
        this.class1 = "completed"
        this.class2 = "completed"
      }
      console.log(next)
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    });
  }
}
