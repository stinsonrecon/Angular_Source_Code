import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { environment } from '@environments/environment';
import { DialogShowMaterials } from '../../them-moi/dialog-show-materials/dialog-show-materials.component';
import { DialogShowMaterialUpDates } from '../../ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';

@Component({
    selector: 'app-view-table-materials',
    templateUrl: './table-materials.component.html',
    styleUrls: ['./table-materials.component.scss']
})
export class ViewTableMaterials extends BaseClass implements OnInit {
    environment = environment;
    @Input() id: string = '';
    @Input() arrTrangThaiHoSo;
    @Output() arrTrangThaiHSChanged: EventEmitter<number> =   new EventEmitter();
    displayedColumnsMaterial: string[] = [
        "stt",
        "maTaiLieu",
        "ngayTao",
        "nguoiTao",
        "noiDungAndLink",
    ];
    listGiayTo: MatTableDataSource<any>;

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
        const param = {
            idHSTT: this.id,
            PageIndex: 1,
            PageSize: 100
        }
        this.hoSoToiTaoService.getDataChiTietGiayToHSTT(param)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                result => {
                    this.arrTrangThaiHoSo = result.data.map(item => {
                        return item
                    })
                    this.arrTrangThaiHSChanged.emit(this.arrTrangThaiHoSo)
                    if (result?.statusCode === 200 && result?.data.length > 0) {
                        this.listGiayTo = new MatTableDataSource(result.data);
                    } else {
                        this.listGiayTo = new MatTableDataSource([]);
                    }
                },
                err => {
                    this._notification.open(
                        'Có lỗi xảy ra! Vui lòng thử lại.',
                        mType.error
                    )
                }
            )

    }

    formatLinkMaterial(link: string) {
        return link.replace('wwwroot', environment.apiUrl)
    }

    formatName(data: string) {
        if(data.split('\\')[1] === "fileTaiLieuHoSoTT") {
            return data.replace("wwwroot\\fileTaiLieuHoSoTT\\", "")
        }
        return data.replace("wwwroot\\fileChiTietGiayToHoSTT\\", "")
    }

    checkTypeFile(file: string) {
        const fileExtension = file.split(".").pop().toLowerCase();
        return fileExtension
    }

    handleShowDocument(document) {
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
