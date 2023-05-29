import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import * as util from '@app/shared/constants/util';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { PortalSerice } from '@app/shared/services/ho-so-thanh-toan/portal.service';
import { DialogShowMaterialUpDates } from '../../../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';
import { DialogShowMaterials } from '../../dialog-show-materials/dialog-show-materials.component';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-phieu-tong-hop',
  templateUrl: './phieu-tong-hop.component.html',
  styleUrls: ['./phieu-tong-hop.component.scss']
})
export class PhieuTongHopComponent extends BaseClass implements OnInit {
  @Input() data: any = [];
  displayedColumns: string[] = ['stt', 'formCode', 'status', 'regDate', 'tinhTrangPhieu', 'detail', 'action'];
  displayedColumnsListDocuments: string[] = ['stt', 'nameDocument', 'resources', 'fileLists'];
  dataSource = [];
  dataAll = [];
  _dateTo = new Date();
  _dateFrom = new Date();
  tableListMaterialAdded = [];
  totalRecord: any = 0;
  searchItem: any = {
    tungay: this._dateFrom,
    denngay: this._dateTo
  };
  showPickDocument: boolean = false;
  indexCurrent: number;
  files = [];
  binary: any;
  viewData = {
    pageSize: 10,
    pageNumber: 1
  }

  constructor(
    public _service: PortalSerice,
    public _notification: NotificationService,
    public hoSoToiTaoService: HoSoToiTaoService,
    public dialog: MatDialog,
  ) {
    super();
    this._dateFrom.setFullYear(this._dateFrom.getFullYear() - 2);
  }

  ngOnInit(): void {
    this.hoSoToiTaoService.getListDataFile()
      .pipe(this.unsubsribeOnDestroy)
      .subscribe(
        response => {
          if (response) {
            this.files = response;
            console.log(response)
          }
        }, err => {
          this._notification.open(
            err,
            mType.error
          );
        }
      )
    console.log(this.files)
    this.tableListMaterialAdded = this.data;
    this.search();
  }

  search() {
    if(this.searchItem.tungay == null || this.searchItem.denngay == null) {
      this._notification.open(
        "Vui lòng nhập đầy đủ thông tin từ ngày, đến ngày",
        mType.info
      );
      return
    }
    const param = {
      tungay: !this.searchItem.tungay ? '' : util.formatDate(this.searchItem.tungay, 'YYYY-MM-DD'),
      denngay: !this.searchItem.denngay ? '' : util.formatDate(this.searchItem.denngay, 'YYYY-MM-DD'),
    }
    this._service.getListPhieuTongHop(param).pipe(this.unsubsribeOnDestroy).subscribe(
      (rs: any) => {
        if (rs.success) {
          this.dataAll = rs.data;
          this.dataSource = rs.data.slice((this.viewData.pageNumber - 1) * this.viewData.pageSize, this.viewData.pageSize);
          this.totalRecord = rs.data.length;
        } else {
          this.dataAll = [];
          this.dataSource = [];
          this.totalRecord = 0;
          this._notification.open(
            rs.message,
            mType.error
          );
        }
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      }
    )
  }

  chiTietPhieuTH(id: any) {
    const dialogRef = this.dialog.open(DialogDetailComponent,
      {
        autoFocus: false,
        width: '1000px',
        data: {
          id: id,
          type: 'TH'
        }
      }
    )
  }

  addFile(id, item, vitri) {
    this._service.getChiTietPhieuTH(id).pipe(this.unsubsribeOnDestroy).subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.SignInfo === "") {
            this._notification.open(
              'Không có file',
              mType.warn
            );
          } else {
            let type;
            let urlFile = JSON.parse(res.data.SignInfo)?.fileURL;
            let fileName = urlFile.slice(urlFile.lastIndexOf('/') + 1);
            const fileExtension = urlFile.split(".").pop().toLowerCase();
            if (fileExtension === 'pdf') type = "application/pdf";
            else if (fileExtension === 'docx') type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            else if (fileExtension === 'doc') type = "application/msword";
            else if (fileExtension === 'xlsx') type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            else if (fileExtension === 'xls') type = "application/vnd.ms-excel";
            this._service.downloadFileNoiDung(urlFile).pipe(this.unsubsribeOnDestroy).subscribe(
              (rs: any) => {
                if (rs?.success) {
                  const fileBlob = this.dataURItoBlob(rs.data, type);
                  this.binary = new File([fileBlob], fileName, { type: type, lastModified: new Date().getTime() });
                  this.files.push({
                    data: this.binary,
                    id: item.id ? item.id : item.chiTietHoSoId,
                    type: fileExtension,
                    unix: "id" + Math.random().toString(16).slice(2),
                    fileUpload: true
                  });
                  this.hoSoToiTaoService.setListDataFile(this.files);

                  let newArrFiles = []
                  this.files.map((item, index) => {
                    if (item.id === this.tableListMaterialAdded[vitri].id || item.id === this.tableListMaterialAdded[vitri].chiTietHoSoId) {
                      newArrFiles.push(item)
                    }
                  })
                  this.tableListMaterialAdded[vitri] = { ...this.tableListMaterialAdded[vitri], file: newArrFiles }
                } else {
                  this._notification.open(
                    rs.message,
                    mType.error
                  );
                }
              }
            )
          }
        } else {
          this._notification.open(
            'Có lỗi xảy ra',
            mType.error
          );
        }
      }, err => {
        this._notification.open(
          err,
          mType.error
        );
      }
    )

  }

  handleShowFile(file) {
    if (file.fileUpload) {
      if (file.type === "pdf") {
        const dialogRef = this.dialog.open(DialogShowMaterials, {
          width: '1920px',
          autoFocus: false,
          data: {
            file
          }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
        });
      } else {
        this.getBase64(file.data).then((data: string) => {
          // window.open(data)
          let downloadLink = document.createElement("a");
          downloadLink.href = data;
          downloadLink.download = file.data.name;

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        })
      }
    } else {
      let document = file.data.name
      const dialogRef = this.dialog.open(DialogShowMaterialUpDates, {
        width: '1920px',
        autoFocus: false,
        data: {
          document,
        }
      });

      dialogRef.afterClosed().subscribe((response: any) => {
      });
    }
  }

  pageChange(e) {
    this.viewData.pageSize = e.pageSize;
    this.viewData.pageNumber = e.pageIndex + 1;
    this.dataSource = this.dataAll.slice((this.viewData.pageNumber - 1) * this.viewData.pageSize, this.viewData.pageNumber * this.viewData.pageSize);
  }

  handleAddDocument(e, index) {
    console.log(index);
    console.log(this.showPickDocument);
  }

  deleteMaterial(meterial) {
    this.files = this.files.filter(item => item.unix !== meterial.unix)
    this.hoSoToiTaoService.setListDataFile(this.files);

  }

  dataURItoBlob(dataURI, type) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: type });
    return blob;
  }
  formatName(data: string) {
    if (data.split('\\')[1] === "fileTaiLieuHoSoTT") {
      return data.replace("wwwroot\\fileTaiLieuHoSoTT\\", "")
    }
    return data.replace("wwwroot\\fileChiTietGiayToHoSTT\\", "")
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
