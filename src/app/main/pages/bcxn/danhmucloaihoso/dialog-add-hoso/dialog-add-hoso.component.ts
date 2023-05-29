import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { MatTable } from '@angular/material/table';
import { AuthService } from '@app/shared/services';
import { TableTaiLieuYeuCau } from './table-tai-lieu-yeu-cau/table-tai-lieu-yeu-cau.component';
import { Router } from '@angular/router';
import { DanhMucLuongPheDuyetComponent } from '../../danhmucluongpheduyet/danhmucluongpheduyet.component';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import * as go from 'gojs';
import { TableTaiLieuYeuCauUpdateComponent } from './table-tai-lieu-yeu-cau-update/table-tai-lieu-yeu-cau-update.component';

@Component({
    selector: 'app-dialog-add-hoso',
    templateUrl: './dialog-add-hoso.component.html',
    styleUrls: ['./dialog-add-hoso.component.scss']
})
export class DialogAddHoSoComponent extends BaseClass implements OnInit {
    isNew: boolean = true
    formControl: FormGroup
    maHoSo: string = '';
    tenLoaiHoSo: string = '';
    listTaiLieu: any = [];
    luongPheDuyet: any = []
    coHieuLuc: string = ''
    moTa: string = ''
    nguoiTao: string = ''
    thoiGianTao = new Date(Date.now()).toLocaleDateString();
    ghiChu: string = ''
    lichSuCapNhat: string = ''
    diagramData: any;
    diagramNodeData: go.ObjectData[];
    diagramLinkData: go.ObjectData[];
    diagramModelData: go.ObjectData = { prop: 'value' };
    skipsDiagramUpdate: boolean = false;
    diagramDivClassName: string = 'diagram';
    listNode: any = []
    trangThai: boolean

    @ViewChild(TableTaiLieuYeuCau) tailieu: TableTaiLieuYeuCau;
    @ViewChild(TableTaiLieuYeuCauUpdateComponent) tailieuupdate: TableTaiLieuYeuCauUpdateComponent;
    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    totalRecord: any;
    dsChucNang: any;
    tuKhoaChange: any = "";
    trangThaiChange: any = -99;

    constructor(
        public dialog: MatDialog,
        public _service: DanhMucLoaiHoSoService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private _authService: AuthService,
        public dialogRef: MatDialogRef<DialogAddHoSoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) {
        super();
        this.formControl = this.formBuilder.group({
            tenHoSo: ['', [Validators.required]],
            maLoaiHoSo: ['', [Validators.required]],
            moTa: [''],
            trangThai: [true]
        });
        this.formControl.patchValue({
            trangThai: this.data.item.trangThai === 1 ? true : false
        });
    }
    
    ngOnInit(): void {
        this.dialogRef.keydownEvents().subscribe(event => {
            if (event.key === "Escape") {
                this.dialogRef.close(false);
            }
        });
        console.log(this.data.item)
        if (this.data.item.loaiHoSoId !== undefined) {
            this.isNew = false;
            this._service.setDataLuongPheDuyet(this.data.item.luongPheDuyetResponse);
        } else {
            this.isNew = true
        };
        // this.listTaiLieu = this.data.item.TaiLieuYeuCau ? this.data.item.TaiLieuYeuCau : []
        this.nguoiTao = this._authService.userName;
        this._service.getNodePheDuyet().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.listNode = next;
            this._service.getDataLuongPheDuyet().pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    response => {
                        if (response) {
                            this.diagramData = response;
                            this.createLinkDiagram();
                            this.createDiagramData();
                            console.log(this.listNode)
                        }
                    }, err => {
                        this._notification.open(
                            err,
                            mType.error
                        );
                    }
                )
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        })
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
        this.diagramNodeData = this.diagramData.map(x => {
            return {
                id: x.thuTu,
                text: this.listNode.find(e => e.id === x.vaiTroId?.toLowerCase())?.roleName,
                color: 'lightblue'
            }
        })
    }

    createLinkDiagram() {
        this.diagramLinkData = this.diagramData.map((x, i) => {
            if (i === (this.diagramData.length - 1)) return;
            return {
                key: -1 - i,
                from: x.thuTu,
                to: this.diagramData[i + 1].thuTu
            }
        });
        this.diagramLinkData.pop();
    }

    get f() {
        return this.formControl.controls;
    }

    save() {
        this.formControl.markAllAsTouched();
        if (this.formControl.invalid) {
            console.log(this.formControl.value)
            console.log('false')
            return;
        } else {
            this._service.getDataLuongPheDuyet()
                .pipe(this.unsubsribeOnDestroy)
                .subscribe(
                    response => {
                        if (response) {
                            this.data.item.luongPheDuyet = response
                        }
                    }
                )
            this.data.item.trangThai = this.formControl.controls['trangThai'].value === true ? 1 : 2;
            this.data.item.taiLieuYeuCau = this.data.actions === 'CREATE' ? this.tailieu.dataToDisplay.data : this.data.item.giayToLoaiHoSoResponse;
            this.dialogRef.close(true)
        }
    }

    link() {
        let item: any = {}
        item = JSON.parse(JSON.stringify(item));
        const dialogRef = this.dialog.open(DanhMucLuongPheDuyetComponent, {
            width: '80%',
            panelClass: 'my-dialog',
            autoFocus: false,
            data: {
                item,
                actions: this.data.actions
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        })
    }
}
