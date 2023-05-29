import { DialogDofficeComponent } from './../dialog-doffice/dialog-doffice.component';
import { ChiTietLichSuThayDoiMaterialComponent } from './../../chi-tiet-lich-su-thay-doi-material/chi-tiet-lich-su-thay-doi-material.component';
import { environment } from '@environments/environment';
import { formatDate } from '@app/shared/constants/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { DialogShowMaterialUpDates } from '../../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';
import { DialogShowMaterials } from '../dialog-show-materials/dialog-show-materials.component';
import { TYPE_FILE_ACCEPT } from '@app/shared/constants/hosothanhtoan.const';
import { DialogPortalComponent } from '../dialog-portal/dialog-portal.component';
import { finalize } from 'rxjs/operators';

const TYPE_IMG = ['jpg', 'jpeg', 'png', 'gif']
@Component({
    selector: 'app-table-materials',
    templateUrl: './table-materials.component.html',
    styleUrls: ['./table-materials.component.scss']
})
export class TableMaterials extends BaseClass implements OnInit {

    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
    displayedColumnsMaterial: string[] = [
        "stt",
        "maTaiLieu",
        // "tenTaiLieu",
        // "ngayTao",
        // "nguoiTao",
        "nguonTaiLieu",
        // "pheDuyet",
        "noiDungAndLink",
        "lichSuThayDoi"
    ];
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
    public dataFake = [
        {
            "id": "3333",
            "tenGiayTo": "GiayToTest",
            "maGiayTo": null,
            "kySo": 0,
            "nguon": null,
            "trangThai": 0,
            "ngayTao": "2021-11-23T10:50:20.2045919",
            "nguoiTaoId": null,
            "tenNguoiTao": null
        },
        {
            "id": "11111",
            "tenGiayTo": "GiayToTest",
            "maGiayTo": null,
            "kySo": 0,
            "nguon": null,
            "trangThai": 0,
            "ngayTao": "2021-11-23T10:50:20.2045919",
            "nguoiTaoId": null,
            "tenNguoiTao": null
        },
        {
            "id": "4444",
            "tenGiayTo": "GiayToTest",
            "maGiayTo": null,
            "kySo": 0,
            "nguon": null,
            "trangThai": 0,
            "ngayTao": "2021-11-23T10:50:20.2045919",
            "nguoiTaoId": null,
            "tenNguoiTao": null
        }
    ]

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
        
        this.dataNew = []
        this.listNameMaterial = []
        this.hoSoToiTaoService.idHoSoTT
        // .pipe(finalize(() => {
        //     this.hoSoToiTaoService.getListDataFile()
        //     .pipe(this.unsubsribeOnDestroy)
        //     .subscribe(
        //         response => {
        //             if (response) {
        //                 this.files = response;
        //                 for (let i = 0; i < this.dataToDisplay.length; i++) {
        //                     this.changeDataNew(i);
        //                 }
        //                 this.hoSoToiTaoService.changeDataMaterial(this.dataToDisplay)
        //             }
        //         }
        //     )
        // }))
        .subscribe(data => {

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
            }
        });

    }
    changeDataNew(vitri) {
        let newArrFiles = []
        this.files.map((item, index) => {
            if (item.id === this.dataToDisplay[vitri].chiTietHoSoId) {
                newArrFiles.push(item)
            }
        })
        this.dataToDisplay[vitri] = { ...this.dataToDisplay[vitri], file: newArrFiles }
    }

    ngOnDestroy() {
        this.hoSoToiTaoService.destroyMessage()
        this.dataNew = []
    }

    onChange(event) { }

    checkTypeFile(file: string) {
        return file.split('.').pop()
    }

    handleShowDocument(file) {
        console.log(file);
        if (file.fileUpload) {
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

    formatDatetime(date) {
        return formatDate(date)
    }

    openDialogDOffice(element, vitri) {
        let item: any = {
            data: this.dataToDisplay.filter(e => e.nguon === "DOFFICE")
        };
        console.log('dataDO', item)
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
        let item: any = {
            data: this.dataToDisplay.filter(e => e.nguon === "EVNPortal")
        };
        console.log("dataPT",item)
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
        let newArrFiles = []
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

                // tạo mảng object file
                this.files.push({
                    data: file,
                    id: element.chiTietHoSoId,
                    type: fileExtension,
                    unix: "id" + Math.random().toString(16).slice(2),
                    fileUpload: true
                });

                // lấy ra số lượng file hiện tại của tài liệu và push vào mảng mới
                newArrFiles = this.dataToDisplay[vitri].file
                this.files.map((item, index) => {
                    if (item.id === this.dataToDisplay[vitri].chiTietHoSoId) {
                        newArrFiles = [...newArrFiles, item]
                    }
                })

                // add file vào mảng chính
                let newListDataAddedFile = this.dataToDisplay.map((item, index) => {
                    if (element.chiTietHoSoId === item.chiTietHoSoId) {
                        return { ...item, file: newArrFiles }
                    }
                    return item
                })

                this.dataToDisplay = newListDataAddedFile

                // reset để cho lần chọn file tiép theo
                newArrFiles = []
            }
            this.hoSoToiTaoService.changeDataMaterial(this.dataToDisplay)
        };
        this.fileUpload.nativeElement.value = '';
        fileUpload.click();
    }

    checkFileInvalid(file: string) {
        if (file === "png" || file === "pdf" || file === "jpg" || file === "jpeg") {
            return true
        }
        return false
    }

    changeNameHoSo(data) {
        let a: any = this.dataFake.filter(item => data.value === item.id)[0]
        this.ngaytao = formatDate(a.ngayTao)
        this.nguoiTao = a.tenNguoiTao
        this.nguonTaiLieu = a.nguonTaiLieu
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
            let arr = []
            let tranformData = datas.data.map(item => {
                if (item.file.length > 0) {
                    let newDataFile = {}
                    let arrFiles = []
                    item.file.map(file => {
                        newDataFile = {
                            data: { name: file },
                            unix: "id" + Math.random().toString(16).slice(2),
                            id: item.chiTietHoSoId,
                            type: this.checkTypeFile(file),
                            mandatory: item.batBuoc
                        }
                        arr.push(newDataFile);
                        arrFiles.push(newDataFile)
                    })
                    return { ...item, file: arrFiles }
                }
                return item
            })
            this.hoSoToiTaoService.setListDataFile(arr);
            this.dataToDisplay = tranformData
            this.hoSoToiTaoService.getListDataFile()
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                response => {
                    if (response) {
                        this.files = response;
                        for (let i = 0; i < this.dataToDisplay.length; i++) {
                            this.changeDataNew(i);
                        }
                        this.hoSoToiTaoService.changeDataMaterial(this.dataToDisplay)
                    }
                }
            )
        })
    }

    formatName(data: string) {
        if (data.split('\\')[1] === "fileTaiLieuHoSoTT") {
            return data.replace("wwwroot\\fileTaiLieuHoSoTT\\", "")
        }
        return data.replace("wwwroot\\fileChiTietGiayToHoSTT\\", "")
    }

    formatLinkMaterial(link) {
        return link.replace('wwwroot', environment.apiUrl)
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

    deleteMaterial(material: any) {
        let newArr = []
        let dataAfterDeleted = []
        let materialDelete = this.dataToDisplay.filter(item => item.chiTietHoSoId === material.id)[0]
        let materialAfterDelete = materialDelete.file.filter(item => item.unix !== material.unix)
        newArr = this.files.filter(item => item.unix !== material.unix)
        this.files = newArr
        this.hoSoToiTaoService.setListDataFile(this.files);

        dataAfterDeleted = this.dataToDisplay.map((item, index) => {
            if (item.chiTietHoSoId === material.id) {
                return { ...item, file: materialAfterDelete }
            }
            return item
        })
        // pass data to component them moi
        this.dataToDisplay = dataAfterDeleted;
        // truyền data sang component cha
        this.hoSoToiTaoService.changeDataMaterial(this.dataToDisplay)
    }

    handleShowFile(file) {
        console.log(file);
        const dialogRef = this.dialog.open(DialogShowMaterials, {
            width: '1920px',
            autoFocus: false,
            data: {
                file
            }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
        });
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
