import { Component, Input, OnInit } from '@angular/core';
import { BaseClass } from '@app/base-class';
import { DofficeSerice } from '@app/shared/services/to-trinh/doffice.service';
import * as util from '@app/shared/constants/util';
import { environment } from '@environments/environment';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogShowMaterials } from '../../dialog-show-materials/dialog-show-materials.component';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { AuthService } from '@app/shared/services';
import { DialogShowMaterialUpDates } from '../../../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';

@Component({
  selector: 'app-doffice-vanban',
  templateUrl: './doffice-vanban.component.html',
  styleUrls: ['./doffice-vanban.component.scss']
})
export class DofficeVanbanComponent extends BaseClass implements OnInit {
  @Input() data: any = [];
  displayedColumns: string[] = ['stt', 'typeDocument', 'symbol', 'trichYeu', 'action'];
  displayedColumnsListDocuments: string[] = ['stt', 'nameDocument', 'resources', 'fileLists'];
  dataSource = [];
  _dateTo = new Date();
  _dateFrom = new Date();
  tableListMaterialAdded = [];
  totalRecord: any = 0;
  searchItem: any = {
    Username: '',
    // ID_DV: 0,
    MainKeyWord: '',
    DateFrom: this._dateFrom,
    DateTo: this._dateTo,
    LoaiVB: 'all',
    TINH_TRANG_CV: 'all',
    pageSize: 10,
    pageNumber: 1,
  };
  downloadItem: any = {
    username: '',
    // ID_DV: 0,
    ID_LOAI_VB: '',
    ID_FILE: ''
  }
  showPickDocument: boolean = false;
  indexCurrent: number;
  files = [];
  binary: any;

  constructor(
    public _service: DofficeSerice,
    private _authService: AuthService,
    public _notification: NotificationService,
    public hoSoToiTaoService: HoSoToiTaoService,
    public dialog: MatDialog,
  ) {
    super();
    this._dateFrom.setMonth(this._dateFrom.getMonth() - 1);
    this.searchItem.Username = this._authService.userName;
    this.downloadItem.username = this._authService.userName;
    // this.searchItem.ID_DV = this._authService.idDvDoffice;
    // this.downloadItem.ID_DV = this._authService.idDvDoffice;
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
    const param = {
      ...this.searchItem,
      DateFrom: !this.searchItem.DateFrom ? '' : util.formatDate(this.searchItem.DateFrom, 'YYYY-MM-DD'),
      DateTo: !this.searchItem.DateTo ? '' : util.formatDate(this.searchItem.DateTo, 'YYYY-MM-DD'),
      TINH_TRANG_CV: this.searchItem.TINH_TRANG_CV === 'HOAN_THANH' ? 'DA_CHUYEN&TINH_TRANG_CV=HOAN_THANH' : this.searchItem.TINH_TRANG_CV
    }
    let checkTinhTrangCV = param.TINH_TRANG_CV === 'all' ? '' : `&TINH_TRANG_CV=${param.TINH_TRANG_CV}`;
    const urlSearch = `v1/congviec/Searching/open-api/advancedSearch?Username=${param.Username}` + 
    `&pageSize=${param.pageSize}` + 
    `&pageNumber=${param.pageNumber}` +
    `&LoaiVB=${param.LoaiVB}` +
    `${param.LoaiVB === 'vbde' ? `${checkTinhTrangCV}` : ''}` +
    `&MainKeyWord=${param.MainKeyWord}` +
    `&DateFrom=${param.DateFrom}` +
    `&DateTo=${param.DateTo}`

    this._service.callApiDoffice(urlSearch).pipe(this.unsubsribeOnDestroy).subscribe(res => {
      if (res?.success) {
        let convertRes = JSON.parse(res.data)
        if (convertRes !== null) {
          if (convertRes?.State) {
            this.dataSource = convertRes.Data;
            this.totalRecord = convertRes.Paginator?.TotalCount;
          } else if (!convertRes?.State) {
            this._notification.open(
              convertRes?.Message,
              mType.error
            );
          }
        } else {
          this._notification.open(
            "Không có dữ liệu",
            mType.error
          );
        }
      } else {
        this._notification.open(
          res.message,
          mType.error
        );
      }
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    })
  }

  pageChange(e) {
    this.searchItem.PageSize = e.pageSize;
    this.searchItem.pageNumber = e.pageIndex + 1;
    this.search();
  }

  handleAddDocument(e, index) {
    console.log(index);
    console.log(this.showPickDocument);
  }

  addFile(element, item, vitri) {
    let type;
    console.log(item);
    const fileExtension = element.TEN_FILE.split(".").pop().toLowerCase();
    if (fileExtension === 'pdf') type = "application/pdf";
    else if (fileExtension === 'docx') type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    else if (fileExtension === 'doc') type = "application/msword";
    else if (fileExtension === 'xlsx') type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    else if (fileExtension === 'xls') type = "application/vnd.ms-excel";
    let url = `v2/files/FileVb/open-api/DownloadFileVB?username=${this.downloadItem.username}` +
    `&ID_LOAI_VB=${element.ID_VB}` +
    `&ID_FILE=${element.ID_FILE}`
    this._service.downloadDoffice(url).pipe(this.unsubsribeOnDestroy).subscribe(res => {
      if (res?.success) {
        const fileBlob = this.dataURItoBlob(res.data[0], type)
        this.binary = new File([fileBlob], element.TEN_FILE, { type: type, lastModified: new Date().getTime() });
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
          res.message,
          mType.error
        );
      }
    })
  }

  viewFile(element) {
    let type;
    const fileExtension = element.TEN_FILE.split(".").pop().toLowerCase();
    if (fileExtension === 'pdf') type = "application/pdf";
    else if (fileExtension === 'docx') type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    else if (fileExtension === 'doc') type = "application/msword";
    else if (fileExtension === 'xlsx') type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    else if (fileExtension === 'xls') type = "application/vnd.ms-excel";
    let url = `v2/files/FileVb/open-api/DownloadFileVB?username=${this.downloadItem.username}` + 
    `&ID_LOAI_VB=${element.ID_VB}` + 
    `&ID_FILE=${element.ID_FILE}`
    this._service.downloadDoffice(url).subscribe(res => {
      if (res?.success) {
        const fileBlob = this.dataURItoBlob(res.data[0], type)
        this.binary = new File([fileBlob], element.TEN_FILE, { type: type, lastModified: new Date().getTime() });
        let dataFile = {
          data: this.binary,
          type: fileExtension,
          unix: "id" + Math.random().toString(16).slice(2),
          fileUpload: true
        }
        if (fileExtension === "pdf") {
          this.handleShowFile(dataFile)
        } else {
          // window.open(`data:${type};base64,${res.data[0]}`);
          let downloadLink = document.createElement("a");
          downloadLink.href = `data:${type};base64,${res.data[0]}`;
          downloadLink.download = element.TEN_FILE;

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } else {
        this._notification.open(
          res.message,
          mType.error
        );
      }
    }, err => {
      this._notification.open(
        err,
        mType.error
      );
    })
  }

  deleteMaterial(meterial) {
    this.files = this.files.filter(item => item.unix !== meterial.unix)
    this.hoSoToiTaoService.setListDataFile(this.files);

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
