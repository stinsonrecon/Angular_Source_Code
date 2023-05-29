import { formatDate } from '@app/shared/constants/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import * as moment from 'moment';
import { DialogShowMaterialUpDates } from '../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';
@Component({
    selector: 'app-chi-tiet-lich-su-thay-doi-material',
    templateUrl: './chi-tiet-lich-su-thay-doi-material.component.html',
    styleUrls: ['./chi-tiet-lich-su-thay-doi-material.component.scss']
})
export class ChiTietLichSuThayDoiMaterialComponent extends BaseClass implements OnInit {
    public dataHistory = null
    checkImg: string = ''
    status: boolean = false
    
    constructor(
        public dialogRef: MatDialogRef<ChiTietLichSuThayDoiMaterialComponent>, 
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public hoSoToiTaoService: HoSoToiTaoService, 
        public dialog: MatDialog, 
        public notification: NotificationService
    ) { super() }
    
    
    ngOnInit(): void {
        this.hoSoToiTaoService.getLichSuChiTietHoSo(this.data.e.idHoSoTT, this.data.e.idGiayTo).pipe(this.unsubsribeOnDestroy).subscribe(data => {
            this.dataHistory = data.data
        })
    }

    formatTime(time: Date) {
        return formatDate(time)
    }

    formatName(data: string) {
        return data.replace("wwwroot\\fileLichSuChiTietGTHSTT\\", "")
    }

    handleShowFIle(file) {
        let document = file
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

    checkTypeFile(file) {
        if(file.split('.').pop() === "pdf") return true
        return false
        // switch (this.checkImg) {
        //     case 'docx':
        //         this.status = true;
        //         break;
        //     case 'xlsx':
        //         this.status = true
        //         break;
        //     case 'ppt':
        //         this.status = true
        //         break;
        //     case 'pdf':
        //         this.status = true
        //         break;
        //     default:
        //         break;
        // }
    }

      
}
