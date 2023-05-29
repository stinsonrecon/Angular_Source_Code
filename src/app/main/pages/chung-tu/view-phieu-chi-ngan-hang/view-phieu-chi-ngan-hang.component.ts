import { Component, Input, OnInit } from '@angular/core';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { PheDuyetChungTuService } from '@app/shared/services/chung-tu/phe-duyet-chung-tu.service';
import { YeuCauChiService } from '@app/shared/services/chung-tu/yeu-cau-chi.service';
import { FileService } from '@app/shared/services/files/files.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-view-phieu-chi-ngan-hang',
  templateUrl: './view-phieu-chi-ngan-hang.component.html',
  styleUrls: ['./view-phieu-chi-ngan-hang.component.scss']
})
export class ViewPhieuChiNganHangComponent extends BaseClass implements OnInit {
  pdfSource: string
  @Input() id: any;
  @Input() ctgs: any;
  @Input() kyPhieuThamTra: any;
  @Input() taiLieuKy: any;
  @Input() element: any

  constructor(
    public service_: YeuCauChiService,
    public danhMucService: DanhMucBaoCaoService,
    public _service: PheDuyetChungTuService,
    public service: FileService,
    public _notification: NotificationService
  ) {
    super();
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit(): void {
    if (this.ctgs) {
      this.service.getFileCTGS(this.id, 1, this.element.hoSoThanhToan.maHoSo).pipe(this.unsubsribeOnDestroy).subscribe((rs) => {
        // if(rs) {
        //   this.danhMucService.convertPdfToBase64(rs.Data).subscribe(
        //     res => this.pdfSource = res.data
        //   )
        // }
        this.pdfSource = rs.Data;
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      })
    } else if(this.kyPhieuThamTra) {
      this.danhMucService.convertPdfToBase64(this.taiLieuKy).subscribe(res => {
        this.pdfSource = res.data
      }, error => {
        this._notification.open(error, mType.error)
      })
    }else  {
      this.service_.getPdfPCUNC(this.id, this.element.hoSoThanhToan.maHoSo).pipe(this.unsubsribeOnDestroy).subscribe((rs: any) => {
        this.pdfSource = rs.Data;
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      })
    }
  }
}
