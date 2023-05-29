import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';

@Component({
    selector: 'app-dialog-update-baocao',
    templateUrl: './dialog-update-material.component.html',
    styleUrls: ['./dialog-update-material.component.scss']
})
export class DialogUpdateMaterial extends BaseClass implements OnInit {
    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
    formControl: FormGroup;
    public files = []
    public listShowFiles = this.data.item.file
    formData : any = new FormData();

    constructor(
        public dialogRef: MatDialogRef<DialogUpdateMaterial>, 
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public danhMucBaoCaoService: DanhMucBaoCaoService, 
        public dialog: MatDialog, 
        public notification: NotificationService,
        public hoSoToiTaoService: HoSoToiTaoService
    ) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            idGiayTo: [this.data.item.idGiayTo, [Validators.required]],
            tenHoSoTT: [this.data.item.tenHoSoTT, [Validators.required]],
            // soTienThanhToan: [this.data.item.soTienThanhToan, [Validators.required]],
            nguonTaiLieu: [this.data.item.nguonTaiLieu, [Validators.required]],
            pheDuyet: [this.data.item.pheDuyet, [Validators.required]],
           
        });
    }
    
    get f() {
        return this.formControl.controls;
    }

    onClick() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({ data: file, inProgress: false, progress: 0 });
            }
        };
        
        fileUpload.click();
    }

    deleteMaterial(data) {
        this.listShowFiles = this.listShowFiles.filter(item => item !== data)
    }

    handleUpdateMaterials() {
        this.formData.append('ChiTietHoSoId', this.data.item.chiTietHoSoId)
        this.formData.append('NguoiCapNhatId', '1')
        this.formData.append('HoSoThanhToanId', this.data.item.idHoSoTT)
        this.formData.append('GiayToId', this.data.item.idGiayTo)
        this.formData.append('TrangThaiGiayTo', 1)

        this.files.map((file) => {
            this.formData.append('listFile', file.data)
        })
        this.hoSoToiTaoService.updateChitietgiaytoHSTT(this.formData).pipe(this.unsubsribeOnDestroy).subscribe(res => {
            if(res.statusCode === 200) {
                this.notification.open(
                    "Cập nhập thành công!",
                    mType.success
                );
            } else {
                this.notification.open(
                    "Cập nhập thất bại!",
                    mType.error
                );
            }
            this.dialogRef.close(true)
            
        })

       
    }
}
