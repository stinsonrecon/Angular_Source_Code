import { environment } from '@environments/environment';
import { formatDate } from '@app/shared/constants/util';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { DialogShowMaterials } from '../dialog-show-materials/dialog-show-materials.component';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import {Observable, ReplaySubject} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { DialogUpdateMaterial } from '../dialog-update-material/dialog-update-material.component';
import { ConfirmDialogComponent } from '@app/main/pages/bcxn/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-table-materials',
    templateUrl: './table-materials.component.html',
    styleUrls: ['./table-materials.component.scss']
})
export class TableMaterials extends BaseClass implements OnInit {
    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
    files = [];
    displayedColumnsMaterial: string[] = [
        "stt",
        "maTaiLieu",
        "tenTaiLieu",
        "ngayTao",
        "nguoiTao",
        "nguonTaiLieu",
        "pheDuyet",
        "noiDungAndLink",
        "lichSuThayDoi",
        "hanhDong"
    ];
    dataFakeMaterials = [
        {
            "id": 5,
            "maTaiLieu": "EVN_VPP_2021_0001_001",
            "tenTaiLieu": "Hợp đồng cung cấp văn phòng phẩm",
            "moTa": "Hợp đồng cung cấp văn phòng phẩm",
            "nguoiTao": "Nguyễn Văn C",
            "ngayTao": "14/5/1990",
            "thoiHanYeuCauTT": "TechCombank",
            "mucDoUuTien": "khẩn",
            "trangThaiHoSo": "Đang phê duyệt",
            "loaiHoSo": "Văn phòng phẩm",
            "tongTienDeNghiTT": "5 000 000",
            "hanhDong": 1,
            "batBuoc": "Yes",
            "nguonTaiLieu": 1,
            "pheDuyet": 2,
            "noiDungAndLink": [
                {
                    file: 'https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt',
                },
                {
                    file: 'http://www.pdf995.com/samples/pdf.pdf'
                },
                {
                    file: 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx'
                }
            ],
            "lichSuThayDoi": "lichSuThayDoi"
        },
    ]
    dataToDisplay = []
    formCreateMaterial: FormGroup
    dataSource = new ExampleDataSource(this.dataToDisplay);
    formData: any = new FormData();

    // form create
    pheDuyetKySo: any = 1
    inputNguonTaiLieu: any = 1
    public listMaterials = []



    constructor(
        public dialog: MatDialog,
        public chucNangService: ChucNangService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private hoSoToiTaoService: HoSoToiTaoService
    ) {
        super()
    }

    ngOnInit(): void { 
        this.formCreateMaterial = this.formBuilder.group({
            inputTenTaiLieu: ['', [Validators.required]],
            inputNguonTaiLieu: ['', [Validators.required]],
            pheDuyetKySo: ['', [Validators.required]],
            inputFile: ['', [Validators.required]]
        })
        this.getDataMaterials()
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

    onClick() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.formData.append('listFile', file);
            
                this.files.push({ data: file, inProgress: false, progress: 0 });
            }
        };
       

        fileUpload.click();
    }

    // handleAddMaterials() {
    //     const { 
    //         inputTenTaiLieu,
    //         inputNguonTaiLieu,
    //         pheDuyetKySo,
    //         inputFile
    //     } = this.formCreateMaterial.value
    //     // this.uploadFiles();
    //     this.formData.append('HoSoThanhToanId', '16C30FD5-D8C8-4C87-A74E-EB8678955DDF')
    //     this.formData.append('GiayToId', '00698C69-CB68-407D-97C6-08D9A8E97E18')
    //     this.formData.append('tenHoSoTT', inputTenTaiLieu)
    //     this.formData.append('TrangThaiGiayTo', 1)

    //     this.hoSoToiTaoService.createChitietgiaytoHSTT(this.formData).pipe(this.unsubsribeOnDestroy).subscribe(res => {
    //         if(res.statusCode === 200) {
    //             this._notification.open(
    //                 "Thêm mới tài liệu thành công!",
    //                 mType.success
    //             );
    //             this.getDataMaterials()
    //         } else {
    //             this._notification.open(
    //                 "Thêm mới tài liệu thất bại!",
    //                 mType.error
    //             );
    //         }
    //     })
        
    //     this.files = []
    // }

    get f() {
        return this.formCreateMaterial.controls
    }

    getDataMaterials() {
        let params = {
            idHSTT: '16C30FD5-D8C8-4C87-A74E-EB8678955DDF', 
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
            this.getDataMaterials()
        });
    }

    deleteMaterial(id) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa tài liệu?';

        confirmDialog.afterClosed().subscribe(result => {
            if(result) {
                this.hoSoToiTaoService.deleteHoSTT(id).pipe(this.unsubsribeOnDestroy).subscribe(res => {
                    console.log(res);
                    if(res.statusCode === 200) {
                        this.dataToDisplay = this.dataToDisplay.filter(item => item.chiTietHoSoId !== id)
                        this._notification.open(
                            "Xoá tài liệu thành công!",
                            mType.success
                        );
                    } else {
                        this._notification.open(
                            "Xoá tài liệu thất bại",
                            mType.error
                        );
                    }
                })        
            }
        })

    }
}


class ExampleDataSource extends DataSource<any> {
    private _dataStream = new ReplaySubject<any[]>();

    constructor(initialData: any[]) {
      super();
      this.setData(initialData);
    }

    connect(): Observable<any[]> {
      return this._dataStream;
    }

    disconnect() {}

    setData(data: any[]) {
      this._dataStream.next(data);
    }
  }
