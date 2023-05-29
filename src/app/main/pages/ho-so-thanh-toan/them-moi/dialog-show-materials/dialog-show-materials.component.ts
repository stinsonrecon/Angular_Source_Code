import { environment } from './../../../../../../environments/environment.hmr';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

const FILE_TYPE = ['docx', 'xlxs', 'doc']
const FILE_IMG = ['jpg', 'jpeg', 'png', 'gif']
@Component({
    selector: 'app-dialog-show-materials',
    templateUrl: './dialog-show-materials.component.html',
    styleUrls: ['./dialog-show-materials.component.scss']
})
export class DialogShowMaterials extends BaseClass implements OnInit {
    doc: string
    link: any;
    dataBase64: any
    checkImg: string = ''
    status: boolean = false
    imageToUpload: File = null;
    selectedImage: string = 'https://dummyimage.com/318x200/000/fff';
    selectedPdf: string = 'https://dummyimage.com/318x200/000/fff';

    caption = 'Choose an image';
    pdfSrc = "";
    pageVariable = 1;
    captionPdf = 'Choose a PDF';
    pdfSource: any = '';
    fileImg: any = ''
    constructor(
        public dialogRef: MatDialogRef<DialogShowMaterials>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public danhMucBaoCaoService: DanhMucBaoCaoService,
        public dialog: MatDialog,
        public notification: NotificationService,
        public sanitizer: DomSanitizer
    ) {
        super();
    }

    ngOnInit(): void {
        console.log(this.data);

        let typeFilePreview = this?.data?.file?.data?.name.split('.').pop();
        let checkType = FILE_TYPE.includes(typeFilePreview)

        // nếu file là file ảnh
        if (FILE_IMG.includes(typeFilePreview)) {
            var reader: any = new FileReader();
            reader.readAsDataURL(this.data.file.data); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.fileImg = event.target.result;
            }
        }

        this.getBase64(this.data.file.data).then((data: string) => {
            this.link = data;
            const _idx = data.indexOf(",");
            this.dataBase64 = data.slice(_idx + 1);
        })


        if (this.data.file.data && !checkType) {
            this.imageToUpload = this.data.file.data;
            const reader = new FileReader();
            reader.readAsDataURL(this.imageToUpload);
            reader.onload = e => this.selectedPdf = reader.result.toString();
            this.captionPdf = this.data.file.data.name;
        }
        if (checkType) {
            this.captionPdf = this.data.file.data.name;
        }
    }


    async fileToBase64(file) {
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (e) => reject(e)
        })
    }
    handleFileSelect(file) {
        var f = file; // FileList object
        var reader: any = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData: any = e.target.result;
                //Converting Binary Data to base 64
                var base64String = window.btoa(binaryData);
                //showing file converted to base64
                console.log(base64String);
                this.pdfSource = base64String
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsBinaryString(f);
    }
    checkShowFile() {
        switch (this.checkImg) {
            case 'docx':
                this.status = true;
                break;
            case 'xlsx':
                this.status = true
                break;
            case 'ppt':
                this.status = true
                break;
            case 'pdf':
                this.status = true
                break;
            default:
                break;
        }
    }

    checkImage(link) {
        let a = link.split(".")
        return a[a.length - 1]
    }

    formatLinkMaterial(link) {
        return link.replace('wwwroot', environment.apiUrl)
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    downloadFile() {
        // window.open(this.link)
        let downloadLink = document.createElement("a");
        downloadLink.href = this.link;
        downloadLink.download = this.captionPdf;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
