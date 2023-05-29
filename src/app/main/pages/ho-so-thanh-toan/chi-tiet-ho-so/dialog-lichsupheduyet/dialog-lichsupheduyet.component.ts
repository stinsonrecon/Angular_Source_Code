import { mType } from '@app/shared/component/notification-dialog/notification.service';
import { NotificationService } from './../../../../../shared/component/notification-dialog/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { BaseClass } from '@app/base-class';
import { TRANG_THAI_PHE_DUYET } from '@app/shared/constants/hosothanhtoan.const';

@Component({
    selector: 'app-dialog-lichsupheduyet',
    templateUrl: './dialog-lichsupheduyet.component.html',
    styleUrls: ['./dialog-lichsupheduyet.component.scss']
})
export class DialogLichsupheduyetComponent extends BaseClass implements OnInit {

    trangThai = TRANG_THAI_PHE_DUYET
    displayedColumns: string[] = ['stt', 'nguoiDuyet', 'ngayDuyet', 'trangThai', 'noiDung'];
    history: MatTableDataSource<any>;
    constructor(
        private _service: HoSoToiTaoService,
        @Inject(MAT_DIALOG_DATA) private data,
        private _notification: NotificationService
    ) {
        super();
    }

    ngOnInit(): void {
        this._service.getHistoryPheDuyet(this.data.id)
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                res => {
                    if (res.statusCode === 200) {
                        this.history = new MatTableDataSource(res.data)
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

    getTrangThai(value): string {
        return this.trangThai.find(x => x.value.toString() === value)?.name;
    }

}
