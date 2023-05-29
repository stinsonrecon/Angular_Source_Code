import { ChiTietLichSuThayDoiMaterialComponent } from '../../chi-tiet-lich-su-thay-doi-material/chi-tiet-lich-su-thay-doi-material.component';
import { environment } from '@environments/environment';
import { formatDate } from '@app/shared/constants/util';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { DialogShowMaterials } from '../dialog-show-materials/dialog-show-materials.component';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DialogUpdateMaterial } from '../dialog-update-material/dialog-update-material.component';
import { DialogDofficeComponent } from '../dialog-doffice/dialog-doffice.component';
import { TYPE_FILE_ACCEPT } from '@app/shared/constants/hosothanhtoan.const';
import { DialogPortalComponent } from '../dialog-portal/dialog-portal.component';

const TYPE_IMG = ['jpg', 'jpeg', 'png', 'gif']
@Component({
    selector: 'app-table-add-materials',
    templateUrl: './table-add-materials.component.html',
    styleUrls: ['./table-add-materials.component.scss']
})
export class TableAddMaterials extends BaseClass implements OnInit {
    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
    @Input() count: number;
    displayedColumnsMaterial: string[] = ["stt", "maTaiLieu", "nguonTaiLieu", "noiDungAndLink",];
    files = [];
    dataToDisplay = []
    formCreateMaterial: FormGroup
    formData: any = new FormData();
    // form create
    pheDuyetKySo: any = 1
    inputNguonTaiLieu: any = 1
    id: string = ''
    ngaytao = ''
    nguoiTao = ''
    nguonTaiLieu = ''
    idHSTT = ''
    showWhenEdit = true
    listNameMaterial = []
    dataNew = []
    public listMaterials = []

    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private hoSoToiTaoService: HoSoToiTaoService,
        private router: ActivatedRoute
    ) {
        super()
    }

    ngOnInit(): void {
        this.hoSoToiTaoService.getListDataFile()
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                response => {
                    if (response) {
                        this.files = response;
                        for (let i = 0; i < this.dataNew.length; i++) {
                            this.changeDataNew(i);
                        }
                        this.hoSoToiTaoService.changeDataMaterial(this.dataNew)
                    }
                }
            )
        this.dataNew = []
        this.listNameMaterial = []
        this.hoSoToiTaoService.idHoSoTT.subscribe(data => {

            this.getDataMaterials(data || '')
            if (data === '') {
                // this.showWhenEdit = false
            } else {
                this.idHSTT = data
            }
        })
        this.hoSoToiTaoService.currentMessage.subscribe(message => {
            this.dataNew = []
            if (message) {
                this.id = message
                this.formCreateMaterial = this.formBuilder.group({
                    inputTenTaiLieu: [''],
                    idTenTaiLieu: [this.id],
                    inputNguonTaiLieu: [''],
                    pheDuyetKySo: [''],
                    inputFile: ['', [Validators.required]]
                })
                this.hoSoToiTaoService.getNameByIDHoSo(message).subscribe(data => {

                    if (data !== null || data?.length > 0) {
                        this.listNameMaterial = data
                        this.listNameMaterial.map((item) => {
                            this.dataNew.push({ ...item, file: [] })
                        })

                    } else {
                        this.dataNew = []
                        this.listNameMaterial = []
                    }
                    this.hoSoToiTaoService.changeDataMaterial(this.dataNew)
                })
            }
        });
    }

    ngOnDestroy() {
        this.hoSoToiTaoService.destroyMessage();
        this.hoSoToiTaoService.setListDataFile([]);
        this.dataNew = []
    }

    handleShowDocument(document) {
        const dialogRef = this.dialog.open(DialogShowMaterials, {
            width: '1920px',
            autoFocus: false,
            data: {
                document,
            }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
        });
    }

    formatDatetime(date) {
        return formatDate(date)
    }

    openDialogDOffice(element, vitri) {
        console.log('listNameMaterial', this.listNameMaterial)
        let item: any = {
            data: this.listNameMaterial.filter(e => e.nguon === "DOFFICE")
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogDofficeComponent, {
            width: '70%',
            autoFocus: false,
            panelClass: 'dialog-doffice',
            data: {
                item
            }
        });
    }
    
    openDialogPortal(element, vitri) {
        console.log('listNameMaterial', this.listNameMaterial)
        let item: any = {
            data: this.listNameMaterial.filter(e => e.nguon === "EVNPortal")
        };
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DialogPortalComponent, {
            width: '70%',
            autoFocus: false,
            panelClass: 'dialog-portal',
            data: {
                item
            }
        });
    }

    handleChangeFile(element, vitri) {
        const fileUpload = this.fileUpload.nativeElement;

        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                const fileExtension = file.name.split(".").pop().toLowerCase();

                if (!TYPE_FILE_ACCEPT.includes(fileExtension)) {
                    this._notification.open(
                        "Chỉ chấp nhận file Ảnh, file DOC và PDF, vui lòng kiểm tra lại",
                        mType.error
                    );
                    return
                }
                this.formData.append('listFile', file);

                this.files.push({
                    data: file,
                    id: element.id,
                    type: fileExtension,
                    unix: "id" + Math.random().toString(16).slice(2)
                });
                this.hoSoToiTaoService.setListDataFile(this.files);
                this.changeDataNew(vitri)
            }
            this.hoSoToiTaoService.changeDataMaterial(this.dataNew)
        };
        this.fileUpload.nativeElement.value = '';
        fileUpload.click();
    }

    changeDataNew(vitri) {
        let newArrFiles = []
        this.files.map((item, index) => {
            if (item.id === this.dataNew[vitri].id) {
                newArrFiles.push(item)
            }
        })
        this.dataNew[vitri] = { ...this.dataNew[vitri], file: newArrFiles }
    }

    checkFileInvalid(file: string) {
        if (file === "png" || file === "pdf" || file === "jpg" || file === "jpeg") {
            return true
        }
        return false
    }

    get f() {
        return this.formCreateMaterial.controls
    }

    getDataMaterials(idHSTT: string) {
        let params = {
            idHSTT: idHSTT,
            PageSize: 100,
            PageIndex: 1
        }
        this.hoSoToiTaoService.getDataChiTietGiayToHSTT(params).pipe(this.unsubsribeOnDestroy).subscribe(datas => {
            this.dataToDisplay = datas.data
        })
    }

    formatLinkMaterial(link) {
        return link.replace('wwwroot', environment.apiUrl)
    }

    editMaterial(element) {
        const item = JSON.parse(JSON.stringify(element))

        const dialogRef = this.dialog.open(DialogUpdateMaterial, {
            width: '600px',
            autoFocus: false,
            data: {
                item
            }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            this.getDataMaterials(this.idHSTT || '')
        });
    }

    showLichSuThayDoi(e) {
        const dialogRef = this.dialog.open(ChiTietLichSuThayDoiMaterialComponent, {
            width: '600px',
            autoFocus: false,
            data: {
                e
            }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            // this.getDataMaterials(this.idHSTT || '')
        });
    }

    deleteMaterial(meterial: any) {
        let newArr = []
        let dataAfterDeleted = []

        // delete file tren giao dien
        newArr = this.files.filter(item => item.unix !== meterial.unix)
        this.files = newArr
        this.hoSoToiTaoService.setListDataFile(this.files);

        // xoa file trong listDatanew
        let materialDelete = this.dataNew.filter(item => item.id === meterial.id)[0]
        let materialAfterDelete = materialDelete.file.filter(item => item.unix !== meterial.unix)

        console.log(materialDelete);

        dataAfterDeleted = this.dataNew.map((item, index) => {
            if (item.id === meterial.id) {
                return { ...item, file: materialAfterDelete }
            }
            return item
        })

        // pass data to component them moi
        this.dataNew = dataAfterDeleted;
        this.hoSoToiTaoService.changeDataMaterial(this.dataNew)
    }

    handleShowFile(file) {
        if (file.type === "pdf" || TYPE_IMG.includes(file.type)) {
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
                // window.open(data);
                let downloadLink = document.createElement("a");
                downloadLink.href = data;
                downloadLink.download = file.data.name;
                console.log('1',file.data.name)

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            })
        }
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
