import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { FileService } from '@app/shared/services/files/files.service';
import { environment } from '@environments/environment';
import { DialogViewImageComponent } from '../chitietyeucau-bkh/dialog-view-image-baocao/dialog-view-image-baocao.component';
import { DialogUpdateYeuCauXacBhanBcComponent } from '../danhsachyeucaubaocao/dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';

@Component({
    selector: 'app-dialog-xacnhanslbc-file',
    templateUrl: './dialog-xacnhanslbc-file.component.html',
    styleUrls: ['./dialog-xacnhanslbc-file.component.scss']
})
export class DialogXacNhanSlbcFileComponent extends BaseClass implements OnInit {
    displayedColumns = ["stt", "soLieu", "yKien", "thoiGianXN", "nguoiXN", "xem"]
    tableData: any = ['', ''];
    formControl: FormGroup;
    dsLichSuXn: any[];
    tenFile: any = "";
    trangThaiDuLieu: boolean = true;
    ghiChu: any = "";
    fileBaoCao:any = "";
    environment = environment;
    submitted:boolean = false;
    @ViewChild('file') myInputVariable: ElementRef;
    constructor(public dialogRef: MatDialogRef<DialogUpdateYeuCauXacBhanBcComponent>, private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public notification: NotificationService, public chiTietYcbcService: ChiTietYcbcService, private fileService: FileService) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            isOk: [''],
            yKien: [''],
        });
        this.getLichSuXnById();
        this.getAttachFile();
    }
    getLichSuXnById() {
        this.dsLichSuXn = []
        this.chiTietYcbcService.getLichSuXnById(this.data.item.yeuCauBaoCaoId, this.data.item.baoCaoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.length) {
                this.dsLichSuXn = next;
            }
        }, error => {
            this.notification.open(error, mType.error)
        });
    }
    uploadFile(files: any) {
        let file = files.files[0];
        this.tenFile = file.name;
        if(file.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file.type == "application/vnd.ms-powerpoint") {
            let formData = new FormData();
            formData.append('fileInfo', file);
            // formData.append('idDonVi', JSON.parse(localStorage.getItem('duAn')).idDonVi)
            this.fileService.fileCreate(formData).subscribe((resp: any) => {
                this.fileBaoCao = resp.dbPath ? resp.dbPath.replaceAll("\\","/").replaceAll("wwwroot","") : "";
            }, error => {
                console.log(error);
            })
        }
        else {
            if (this.myInputVariable) {
                this.myInputVariable.nativeElement.value = "";
            }
            this.fileBaoCao = null;
            this.notification.open("Chỉ chọn file định dạng ppt, pptx", mType.info);
        }
    }
    

    xacNhanBaoCao() {
        this.submitted = true;
        if(!this.fileBaoCao){
            return;
        }
        let params = {
            trangThaiDuLieu: this.trangThaiDuLieu ? 1 : 2,
            ghiChu: this.ghiChu,
            nguoiTaoId: JSON.parse(localStorage.getItem("user")).id,
            fileBaoCao: this.fileBaoCao
        }
        this.chiTietYcbcService.xacNhanBaoCao(this.data.item.id, params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.notification.open('Xác nhận thành công', mType.success)
                this.getLichSuXnById();
            }
            else {
                this.notification.open('Xác nhận thất bại', mType.error)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }

    removeFile() {
        if (this.myInputVariable) {
            this.myInputVariable.nativeElement.value = "";
        }
        this.fileBaoCao = null;
        this.tenFile = null;
    }

    openDialogViewImageXacNhan(element: any) {
        let item: any = JSON.parse(JSON.stringify(element));
        console.log(item);
        const dialogRef = this.dialog.open(DialogViewImageComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item,
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {

        });
    }

    getAttachFile() {
        if(this.data && this.data.item.fileUpload) {
            this.uploadFile(this.data.item.fileUpload);
        }
    }
}
