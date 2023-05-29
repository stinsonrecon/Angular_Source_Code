import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ConfirmDialogComponent } from '@app/main/pages/bcxn/confirm-dialog/confirm-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
    selector: 'app-table-tai-lieu-yeu-cau',
    templateUrl: './table-tai-lieu-yeu-cau.component.html',
    styleUrls: ['./table-tai-lieu-yeu-cau.component.scss']
})
export class TableTaiLieuYeuCau extends BaseClass implements OnInit {
    dragDisabled = true;
    inputTenTaiLieu: FormControl
    inputMoTa: FormControl
    inputBatBuoc: FormControl
    inputNguonTaiLieu: FormControl
    inputPheDuyet: FormControl
    @Input() dataRes: any;
    @Input() item: any;
    @Input() actions: any;
    dataTable = [];
    disabledDrag: boolean = false;
    dataToDisplay: any = [];
    selectedRow: number = -1;
    filterTL: FormControl;
    filteredTL: any;
    displayedColumns: string[] = [
        "stt",
        "giayToId",
        "moTa",
        "batBuoc",
        "nguon",
        "pheDuyetKySo",
        "hanhDong"
    ];
    listNode: any
    nguonTaiLieuOptions = [
        { id: 1, name: 'Scan bản giấy' },
        { id: 2, name: 'D-Office' },
        { id: 3, name: 'EVNPortal' },
        { id: 4, name: 'HRMS' },
        { id: 5, name: 'Khác' },
    ]
    dataChange: any = {
        giayToId: '',
        moTa: '',
        batBuoc: '',
        Nguon: '',
        pheDuyetKySo: ''
    }

    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(
        public dialog: MatDialog,
        public _service: DanhMucLoaiHoSoService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<TableTaiLieuYeuCau>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        super();
        this.inputTenTaiLieu = new FormControl();
        this.inputMoTa = new FormControl()
        this.inputBatBuoc = new FormControl()
        this.inputNguonTaiLieu = new FormControl()
        this.inputPheDuyet = new FormControl()
        this.filterTL = new FormControl('');
    }

    ngOnInit(): void {
        this.filterTL.valueChanges.subscribe(
            value => {
                this.filteredTL = this.listNode.filter(x => x.tenGiayTo.toLowerCase().includes(value.toLowerCase()));
            }
        )
        if (this.data.actions === 'CREATE') {
            this.dataTable = this.dataRes ? this.dataRes : [];
        } else {
            this.dataTable = this.data.item.giayToLoaiHoSoResponse;
            this.item = this.data.item;
        }
        this._service.getGiayTo().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.listNode = next;
            this.filteredTL = this.listNode;
            console.log(this.listNode)
            this.setDefaultValue();
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
        this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
        console.log(this.dataToDisplay);
        console.log(this.dataRes);
    }

    isDisabled(element) {
        return (this.dataTable.findIndex(e => e.giayToId === element) !== -1 ? true : false)
    }

    setDefaultValue() {
        this.inputTenTaiLieu.setValue(this.listNode[0]?.id);
        this.inputMoTa.setValue('');
        this.inputBatBuoc.setValue(2);
        this.inputNguonTaiLieu.setValue('');
        this.inputPheDuyet.setValue(2);
    }

    add() {
        let newData = {
            giayToLoaiHoSoId: '',
            giayToId: this.inputTenTaiLieu.value,
            moTa: this.inputMoTa.value,
            batBuoc: this.inputBatBuoc.value,
            nguon: this.inputNguonTaiLieu.value,
            pheDuyetKySo: this.inputPheDuyet.value,
            thuTu: this.dataTable.length + 1,
        }
        if (this.dataTable.length > 0 && this.dataTable.filter(x => x.giayToId == this.inputTenTaiLieu.value).length > 0) {
            this._notification.open(
                "Tài liệu này đã được định nghĩa",
                mType.warn
            )
        }
        else {
            this.dataTable.push(newData);
        }
        this.setDefaultValue();
        this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
    }

    cancel() {
        this.selectedRow = -1;
        this.disabledDrag = false;
        this.dataChange = {
            giayToId: '',
            moTa: '',
            batBuoc: '',
            Nguon: '',
            pheDuyetKySo: ''
        }
    }

    delete(i: any) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';

        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataTable.splice(i, 1);
                this.dataTable.forEach((element, index) => {
                    element.thuTu = index + 1
                });
                this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });

    }

    edit(idx) {
        if (this.selectedRow === idx) {
            this.selectedRow = -1;
            return;
        }
        this.disabledDrag = true;
        this.selectedRow = idx;
        this.dataChange = {
            ...this.dataTable[idx],
            giayToId: this.dataTable[idx].giayToId,
        };
        console.log(this.dataChange)
    }

    saveChange(idx) {
        if (this.dataTable[idx].giayToId !== this.dataChange.giayToId && this.dataTable.filter(x => x.giayToId == this.dataChange.giayToId).length > 0) {
            this._notification.open(
                "Tài liệu này đã được định nghĩa",
                mType.warn
            )
        }
        else {
            this.dataTable[idx] = this.dataChange;
            this.selectedRow = -1;
            this.disabledDrag = false;
            this.dataChange = {
                giayToId: '',
                moTa: '',
                batBuoc: '',
                Nguon: '',
                pheDuyetKySo: ''
            }
        }
        this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
        // this.table.renderRows();
    }

    drop(event: CdkDragDrop<Element[]>) {
        this.dragDisabled = true;
        moveItemInArray(this.dataTable, event.previousIndex, event.currentIndex);
        console.log(event.currentIndex);
        this.dataTable = [...this.dataTable];
        this.dataTable.forEach((element, index) => {
            element.thuTu = index + 1
        });
        this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
        console.log(this.dataTable)
    }

    update() {
        delete this.item["giayToLoaiHoSoResponse"];
        delete this.item["luongPheDuyetResponse"];
        this._service.getDataLuongPheDuyet()
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                response => {
                    if (response) {
                        this.item.luongPheDuyet = response
                    }
                }
            )
        this.item.taiLieuYeuCau = this.dataTable;
        this._service.updateLoaiHoSo(this.item).pipe(this.unsubsribeOnDestroy).subscribe((res: any) => {
            if (res.statusCode == 200) {
                this._notification.open(res.message, mType.success);
                this.dialogRef.close(true);
            } else {
                this._notification.open(res.message, mType.error);
            }
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
    }

}
