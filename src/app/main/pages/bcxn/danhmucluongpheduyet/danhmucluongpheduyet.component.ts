import { I } from '@angular/cdk/keycodes';
import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import * as go from 'gojs';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-danhmucluongpheduyet',
    templateUrl: './danhmucluongpheduyet.component.html',
    styleUrls: ['./danhmucluongpheduyet.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DanhMucLuongPheDuyetComponent extends BaseClass implements OnInit {

    displayedColumns: string[] = [
        'stt',
        'tenBuoc',
        'vaiTroId',
        'vaitro',
        'coThamTra',
        'chuyenSangERP',
        'action',
    ];
    listNktc: any
    dataTable: MatTableDataSource<any>;
    listTest: any;
    listNode: any
    listVaitro: any
    dataChange: any = {
        vaiTroId: '',
        trangThaiHoSoId: '',
        coThamTra: '',
        chuyenSangERP: '',
    }

    selectedRow: number = -1;
    tenBuocChange: FormControl;
    inputTenBuoc: FormControl;
    selectedNode: FormControl;
    selectedVaitro: FormControl;
    selectedThamtra: FormControl;
    selectedChuyenthongtin: FormControl;
    diagramNodeData: go.ObjectData[];
    diagramLinkData: go.ObjectData[];
    diagramModelData: go.ObjectData = { prop: 'value' };
    skipsDiagramUpdate: boolean = false;

    diagramDivClassName: string = 'diagram';
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(
        public dialog: MatDialog,
        public _service: DanhMucLoaiHoSoService,
        public dialogRef: MatDialogRef<DanhMucLuongPheDuyetComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _notification: NotificationService,
    ) {
        super()
        this.tenBuocChange = new FormControl('', [Validators.required]);
        this.inputTenBuoc = new FormControl('', [Validators.required]);
        this.selectedNode = new FormControl();
        this.selectedVaitro = new FormControl();
        this.selectedThamtra = new FormControl();
        this.selectedChuyenthongtin = new FormControl();
    }

    ngOnInit(): void {
        this.dialogRef.keydownEvents().subscribe(event => {
            if (event.key === "Escape") {
                this.dialogRef.close(false);
            }
        });
        const getNode = this._service.getNodePheDuyet();
        const getTrangThai = this._service.getTrangThaiHoSo();
        forkJoin([getNode, getTrangThai])
            .subscribe(
                res => {
                    if (res[0]?.length) {
                        this.listNode = res[0];
                    } else {
                        this.listNode = []
                    }
                    if (res[1]) {
                        this.listVaitro = res[1].data;
                    } else {
                        this.listVaitro = [];
                    }
                    this.setDefaultValue()
                    this.createDiagramData();
                }, err => {
                    this._notification.open(
                        err,
                        mType.error
                    );
                }
            );

        this._service.getDataLuongPheDuyet()
            .pipe(this.unsubsribeOnDestroy)
            .subscribe(
                response => {
                    if (response) {
                        this.dataTable = new MatTableDataSource<any>(response);
                        console.log(response)
                        this.createLinkDiagram();
                    }
                }, err => {
                    this._notification.open(
                        err,
                        mType.error
                    );
                }
            )



    }

    initDiagram(): go.Diagram {
        const $ = go.GraphObject.make;
        const dia = $(go.Diagram, {
            'undoManager.isEnabled': true,
            model: $(go.GraphLinksModel,
                {
                    nodeKeyProperty: 'id',
                    linkKeyProperty: 'key'
                }
            )
        });

        dia.layout = $(go.TreeLayout, { angle: 0, layerSpacing: 35 });

        dia.nodeTemplate =
            $(go.Node, 'Auto',
                $(go.Shape, 'RoundedRectangle', { stroke: null },
                    new go.Binding('fill', 'color')
                ),
                $(go.TextBlock, { margin: 8, editable: false },
                    new go.Binding('text').makeTwoWay())
            );

        dia.model.isReadOnly = true;
        return dia;
    }

    diagramModelChange = function (changes: go.IncrementalData) {
        console.log(changes);
    };

    createDiagramData() {
        this.diagramNodeData = this.dataTable?.data.map(x => {
            return {
                id: x.thuTu,
                // text: x.tenBuoc,
                text: this.listNode.find(e => e.id === x.vaiTroId?.toLowerCase())?.roleName,
                color: 'lightblue'
            }
        })
    }

    createLinkDiagram() {
        this.diagramLinkData = this.dataTable?.data.map((x, i) => {
            if (i === (this.dataTable?.data.length - 1)) return;
            return {
                key: -1 - i,
                from: x.thuTu,
                to: this.dataTable?.data[i + 1].thuTu
            }
        });
        this.diagramLinkData.pop();
    }

    setDefaultValue() {
        this.selectedNode.setValue(this.listNode[0].id);
        this.inputTenBuoc.setValue('');
        this.selectedVaitro.setValue(this.listVaitro[0].trangThaiHoSoId);
        this.selectedThamtra.setValue(2);
        this.selectedChuyenthongtin.setValue(2);
    }

    edit(idx) {
        if (this.selectedRow === idx) {
            this.selectedRow = -1;
            return;
        }
        this.selectedRow = idx;
        this.dataChange = {
            ...this.dataTable.data[idx],
            vaiTroId: this.dataTable.data[idx].vaiTroId?.toLowerCase(),
            trangThaiHoSoId: this.dataTable.data[idx].trangThaiHoSoId?.toLowerCase()
        }
    }

    cancel() {
        this.selectedRow = -1;
        this.dataChange = {
            vaiTroId: '',
            trangThaiHoSoId: '',
            coThamTra: '',
            chuyenSangERP: '',
        }
    }

    saveChange(idx) {
        this.tenBuocChange.markAsTouched();
        if (this.tenBuocChange.invalid || this.tenBuocChange.value === '') {
            return
        } else {
            if (this.dataTable.data[idx].vaiTroId.toLowerCase() !== this.dataChange.vaiTroId && this.dataTable.data.filter(x => x.vaiTroId.toLowerCase() == this.selectedNode.value).length > 0) {
                this._notification.open(
                    "Vai trò này đã được định nghĩa",
                    mType.warn
                )
            }
            else {
                console.log(this.dataChange);
                this.dataTable.data[idx] = this.dataChange;
                this.selectedRow = -1;
                this.dataChange = {
                    vaiTroId: '',
                    trangThaiHoSoId: '',
                    coThamTra: '',
                    chuyenSangERP: '',
                }
                this._service.setDataLuongPheDuyet(this.dataTable.data);
                // if(this.data.actions === 'UPDATE'){
                //     this.update()
                // }
                this.dataTable = new MatTableDataSource<any>(this.dataTable.data);
                this.createDiagramData();
                this.createLinkDiagram();
            }
        }
    }

    delete(idx) {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';

        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataTable.data.splice(idx, 1);
                this.addThuTu();
                this._service.setDataLuongPheDuyet(this.dataTable.data);
                // if(this.data.actions === 'UPDATE'){
                //     this.update()
                // }
                this.dataTable = new MatTableDataSource<any>(this.dataTable.data);
                this.createDiagramData();
                this.createLinkDiagram();
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

    addThuTu() {
        for (let i = 0; i < this.dataTable.data.length; i++) {
            this.dataTable.data[i] = {
                thuTu: i + 1,
                ...this.dataTable.data[i]
            }
        }
    }

    add() {
        this.inputTenBuoc.markAsTouched();
        if (this.inputTenBuoc.invalid) {
            return
        } else {
            const newRecord = {
                buocThucHienId: '',
                thuTu: this.dataTable.data.length + 1,
                tenBuoc: this.inputTenBuoc.value,
                vaiTroId: this.selectedNode.value,
                trangThaiHoSoId: this.selectedVaitro.value,
                coThamTra: this.selectedThamtra.value,
                chuyenSangERP: this.selectedChuyenthongtin.value,
            }
            // if (this.dataTable.data.length > 0 && this.dataTable.data.filter(x => x.vaiTroId.toLowerCase() == this.selectedNode.value.toLowerCase()).length > 0) {
            //     this._notification.open(
            //         "Vai trò này đã được định nghĩa",
            //         mType.warn
            //     )
            // }
            // else {
                this.dataTable.data.push(newRecord);
            // }
            this._service.setDataLuongPheDuyet(this.dataTable.data);
            // if(this.data.actions === 'UPDATE'){
            //     this.update()
            // }
            this.dataTable = new MatTableDataSource<any>(this.dataTable.data);
            // this.table.renderRows();
            this.setDefaultValue();
            this.inputTenBuoc.markAsUntouched();
            this.createDiagramData();
            this.createLinkDiagram();
        }
    }

    save() {
        this._service.setDataLuongPheDuyet(this.dataTable.data);
        if(this.data.actions === 'UPDATE'){
            this.update();
            this.dialogRef.close(true);
        } else this.dialogRef.close(true);
    }

    update() {
        this._service.getDataLuongPheDuyet()
          .pipe(this.unsubsribeOnDestroy)
          .subscribe(
            response => {
              if (response) {
                this.data.item.luongPheDuyet = response
              }
            }
          )
        this.data.item.taiLieuYeuCau = this.data.item.giayToLoaiHoSoResponse? this.data.item.giayToLoaiHoSoResponse : this.data.item.taiLieuYeuCau;
        delete this.data.item["giayToLoaiHoSoResponse"];
        delete this.data.item["luongPheDuyetResponse"];
        this._service.updateLoaiHoSo(this.data.item).pipe(this.unsubsribeOnDestroy).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this._notification.open("Cập nhật thành công!", mType.success);
          } else {
            this._notification.open("Cập nhật thất bại!", mType.error);
          }
        }, err => {
          this._notification.open(
            err,
            mType.error
          );
        });
      }
}
