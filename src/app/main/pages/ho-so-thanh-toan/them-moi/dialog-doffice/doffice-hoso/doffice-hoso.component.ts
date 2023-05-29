import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DofficeSerice } from '@app/shared/services/to-trinh/doffice.service';
import { environment } from '@environments/environment';
import { DialogShowMaterials } from '../../dialog-show-materials/dialog-show-materials.component';
import * as util from '@app/shared/constants/util';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { AuthService } from '@app/shared/services';
import { finalize, map, switchMap } from 'rxjs/operators';
import { DialogShowMaterialUpDates } from '../../../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';

@Component({
  selector: 'app-doffice-hoso',
  templateUrl: './doffice-hoso.component.html',
  styleUrls: ['./doffice-hoso.component.scss']
})
export class DofficeHosoComponent extends BaseClass implements OnInit {

  environment = environment;
  @Input() data: any = [];
  _dateTo = new Date();
  _dateFrom = new Date();
  selectedIdHS = -1;
  searchItem: any = {
    // ID_DV: 0,
    USERNAME: '',
    SEARCH: '',
    NAM_HS: '',
    perPage: 10,
    currentPage: 1,
    TU_NGAY_LAP: this._dateFrom,
    DEN_NGAY_LAP: this._dateTo,
  };
  searchTaiLieu: any = {
    currentPage: 1,
    perPage: 10,
    ID_HS: '',
  }
  downloadItem: any = {
    username: '',
    // ID_DV: 0,
    ID_LOAI_VB: '',
    ID_FILE: ''
  }
  file: any;
  totalRecord: any = 0;
  totalRecord1: any = 0;
  isSelected = -1;
  displayedColumns = ["stt", "tieuDe", "loaiHoSo", "nguoiDuyet", "thaoTac"];
  displayedColumns1 = ["stt", "loaiVanBan", "soKyHieu", "trichYeu", "thaoTac"];
  displayedColumns2 = ["stt", "taiLieu", "nguon", "file"];
  dataTable: any = [];
  dataTable1: any = [];
  dataTable2: any = [];
  dsLoaiHs = []
  files = [];
  listYears = util.getYearsInit()

  constructor(
    public _service: DofficeSerice,
    private _authService: AuthService,
    public hoSoToiTaoService: HoSoToiTaoService,
    private changeDetectorRefs: ChangeDetectorRef,
    public _notification: NotificationService,
    public dialog: MatDialog,
  ) {
    super();
    this._dateFrom.setMonth(this._dateFrom.getMonth() - 1);
    this.searchItem.USERNAME = this._authService.userName;
    this.downloadItem.username = this._authService.userName;
    // this.searchItem.ID_DV = this._authService.idDvDoffice;
    // this.downloadItem.ID_DV = this._authService.idDvDoffice;
  }

  ngOnInit(): void {
    this.dataTable2 = this.data;
    console.log(this.data)
    this.search();
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
  }

  search() {
    this.isSelected = -1;
    const param = {
      ...this.searchItem,
      TU_NGAY_LAP: !this.searchItem.TU_NGAY_LAP ? '' : util.formatDate(this.searchItem.TU_NGAY_LAP, 'YYYY-MM-DD'),
      DEN_NGAY_LAP: !this.searchItem.DEN_NGAY_LAP ? '' : util.formatDate(this.searchItem.DEN_NGAY_LAP, 'YYYY-MM-DD')
    }
    const url = `v1/hstl/hstl?USERNAME=${param.USERNAME}` +
    `&NAM_HS=${param.NAM_HS}` +
    `&SEARCH=${param.SEARCH}` +
    `&TU_NGAY_LAP=${param.TU_NGAY_LAP}` +
    `&DEN_NGAY_LAP=${param.DEN_NGAY_LAP}` +
    `&perPage=${param.perPage}` +
    `&currentPage=${param.currentPage}`

    this._service.callApiDoffice(url).pipe(this.unsubsribeOnDestroy).subscribe(res => {
      if (res?.success) {
        let convertRes = JSON.parse(res.data);
        if (convertRes !== null) {
          if (convertRes?.success) {
            console.log('res', convertRes)
            this.dataTable = convertRes.data?.apiResult;
            this.totalRecord = convertRes.data?.total;
          } else if (!convertRes?.success) {
            this._notification.open(
              res.Message,
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
    this.searchItem.perPage = e.pageSize;
    this.searchItem.currentPage = e.pageIndex + 1;
    this.search();
  }

  pageChange1(e) {
    this.searchTaiLieu.perPage = e.pageSize;
    this.searchTaiLieu.currentPage = e.pageIndex + 1;
    this.getTaiLieu(this.selectedIdHS);
  }

  change(idHS, idx) {
    this.dataTable1 = [];
    this.searchTaiLieu.perPage = 10;
    this.searchTaiLieu.currentPage = 1;
    if (this.isSelected === idx) {
      this.isSelected = -1;
      this.selectedIdHS = -1;
      this.changeDetectorRefs.detectChanges();
    } else {
      this.isSelected = idx;
      this.selectedIdHS = idHS;
      this.getTaiLieu(idHS);
      this.changeDetectorRefs.detectChanges();
    }
  }

  getFileTaiLieu(data) {
    if (data?.success) {
      let convertData = JSON.parse(data.data);
      let arrayApi = convertData.data?.apiResult.map(e => {
        return `v1/vanban/VBDE/ListFileVB?ID_VB=${e.ID_VB}`
      })
      return this._service.callApiDoffice(arrayApi)
    }
  }

  getTaiLieu(idHS) {
    let url = `v1/hstl/hstl_tai_lieu?currentPage=${this.searchTaiLieu.currentPage}&perPage=${this.searchTaiLieu.perPage}&ID_HS=${idHS}`
    this._service.callApiDoffice(url).pipe(
      switchMap(data => this.getFileTaiLieu(data).pipe(map(innerData => {
        if (innerData?.success) {
          let converInnerData = JSON.parse(data.data).data.apiResult;
          innerData.data.map((e, i) => {
            let convert = JSON.parse(e);
            if (convert?.State) {
              converInnerData[i] = {
                ...converInnerData[i],
                FILE: convert.Data
              }
            } else {
              converInnerData[i] = {
                ...converInnerData[i],
                FILE: []
              }
            }
          })
          return [converInnerData, JSON.parse(data.data).data.total]
        } else {
          this._notification.open(
            innerData.message,
            mType.error
          );
        }
      })))
    ).subscribe(finalData => {
      this.dataTable1 = finalData[0];
      this.totalRecord1 = finalData[1];
      console.log(this.totalRecord1);
    })
  }

  addFile(element, item, vitri) {
    let type;
    const fileExtension = element.TEN_FILE.split(".").pop().toLowerCase();
    if (fileExtension === 'pdf') type = "application/pdf";
    else if (fileExtension === 'docx') type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    else if (fileExtension === 'doc') type = "application/msword";
    else if (fileExtension === 'xlsx') type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    else if (fileExtension === 'xls') type = "application/vnd.ms-excel";
    let url = `v2/files/FileVb/open-api/DownloadFileVB?username=${this.downloadItem.username}&ID_LOAI_VB=${element.ID_VB}&ID_FILE=${element.ID_FILE}`
    this._service.downloadDoffice(url).pipe(this.unsubsribeOnDestroy).subscribe(res => {
      if (res?.success) {
        const fileBlob = this.dataURItoBlob(res?.data[0], type)
        this.file = new File([fileBlob], element.TEN_FILE, { type: type, lastModified: new Date().getTime() });
        this.files.push({
          data: this.file,
          id: item.id ? item.id : item.chiTietHoSoId,
          type: fileExtension,
          unix: "id" + Math.random().toString(16).slice(2),
          fileUpload: true
        });
        this.hoSoToiTaoService.setListDataFile(this.files);

        let newArrFiles = []
        this.files.map((item, index) => {
          if (item.id === this.dataTable2[vitri].id) {
            newArrFiles.push(item)
          }
        })
        this.dataTable2[vitri] = { ...this.dataTable2[vitri], file: newArrFiles }

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
    let url = `v2/files/FileVb/open-api/DownloadFileVB?username=${this.downloadItem.username}&ID_LOAI_VB=${element.ID_VB}&ID_FILE=${element.ID_FILE}`
    this._service.downloadDoffice(url).subscribe(res => {
      if (res?.success) {
        const fileBlob = this.dataURItoBlob(res.data[0], type)
        this.file = new File([fileBlob], element.TEN_FILE, { type: type, lastModified: new Date().getTime() });
        let dataFile = {
          data: this.file,
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

  log(e, f) {
    console.log('ele', e);
    console.log('file', f);
    console.log(this.dataTable1)
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

  checkTypeFile(file: string) {
    const fileExtension = file.split(".").pop();
    if (fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jepg" || fileExtension === "gif") {
      return true
    }
    return false
  }

  formatLinkMaterial(link: string) {
    return link.replace('wwwroot', environment.apiUrl)
  }

  formatName(data: string) {
    if (data.split('\\')[1] === "fileTaiLieuHoSoTT") {
      return data.replace("wwwroot\\fileTaiLieuHoSoTT\\", "")
    }
    return data.replace("wwwroot\\fileChiTietGiayToHoSTT\\", "")
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
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
