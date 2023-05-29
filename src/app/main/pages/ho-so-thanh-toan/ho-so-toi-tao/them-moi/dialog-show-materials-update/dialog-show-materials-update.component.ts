import { environment } from '@environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
@Component({
    selector: 'dialog-show-materials-update',
    templateUrl: './dialog-show-materials-update.component.html',
    styleUrls: ['./dialog-show-materials-update.component.scss']
})
export class DialogShowMaterialUpDates extends BaseClass implements OnInit {
    doc: string = ''
    checkImg: string = ''
    status: boolean = false
    pdfSource: any

    constructor(
        public dialogRef: MatDialogRef<DialogShowMaterialUpDates>, 
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public danhMucBaoCaoService: DanhMucBaoCaoService, 
        public dialog: MatDialog, 
        public notification: NotificationService
    ) { 
        super()
        pdfDefaultOptions.assetsFolder = 'bleeding-edge';
     }

    ngOnInit(): void {
        
        this.doc = this.data.document
        this.checkImg = this.checkImage(this.doc);
        console.log(this.checkImg);

        this.checkShowFile()
        if(this.checkImg === "pdf") {
            this.danhMucBaoCaoService.convertPdfToBase64(this.data.document).subscribe(res => {
                if(res && res?.success) {
                    this.pdfSource = res.data
                } else {
                    this.notification.open(
                        "Đã xảy ra lỗi trong quá trình đọc tài liệu",
                        mType.error
                    );
                }
            }, error => {
                this.notification.open(
                    "Đã xảy ra lỗi trong quá trình đọc tài liệu",
                    mType.error
                );
            })
        }
        
    }

    checkShowFile() {
        switch (this.checkImg) {
            case 'docx':
                this.status = true;
                break;
            case 'xlsx':
                this.status = true
            case 'ppt':
                this.status = true
            case 'pdf':
                this.status = true
            default:
                break;
        }
    }

    checkImage(link) {
        let a = link.split(".")
        return a[a.length - 1]
    }

    formatLinkMaterial() {
        return `data:image/${this.checkImg};base64, ${this.pdfSource}`
    }

    downloadPdf(base64String, fileName) {
        let typeDownload = this.checkTypeFileToDownload()
        const source = `data:${typeDownload};base64, ${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}`
        link.click();
      }

      onClickDownloadPdf(){
        this.checkTypeFileToDownload()
        let base64String =  this.pdfSource;
        this.downloadPdf(base64String, this.data.document);
      }

    checkTypeFileToDownload() {
        let type = this.data.document.split('.')[1]
        switch (type) {
            case 'pdf':
                return 'application/pdf'
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            case 'doc':
                return 'application/msword'
            case 'xlsx': 
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            case 'xls': 
                return 'application/vnd.ms-excel'
            case 'jpg':
                return 'image/jpg'
            case 'jpeg':
                return 'image/jpeg'
            case 'png':
                return 'image/png'
            default:
                break;
        }
    }


    formatName(data: string) {
        if(data.split('\\')[1] === "fileTaiLieuHoSoTT") {
            return data.replace("wwwroot\\fileTaiLieuHoSoTT\\", "")
        }
        if(data.split(`\\`)[1] === "fileLichSuChiTietGTHSTT"){
            return data.replace("wwwroot\\fileLichSuChiTietGTHSTT\\", "")
        }
        return data.replace("wwwroot\\fileChiTietGiayToHoSTT\\", "")
    }

    getBase64(file) {
        console.log(file);
        
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

    
}
