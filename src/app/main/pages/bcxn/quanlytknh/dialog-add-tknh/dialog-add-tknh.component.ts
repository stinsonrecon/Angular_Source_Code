import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { MatTable } from '@angular/material/table';
import { AuthService } from '@app/shared/services';
import { Router } from '@angular/router';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import * as go from 'gojs';

@Component({
    selector: 'app-add-tknh',
    templateUrl: './dialog-add-tknh.component.html',
    styleUrls: ['./dialog-add-tknh.component.scss']
})
export class DialogAddTaiKhoanNganHangComponent extends BaseClass implements OnInit {
    isNew: boolean = true
    formControl: FormGroup
    maHoSo: string = '';
    tenNganHang: string = '';
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
    PhuongThucKetNoi: number = 2

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
        public dialogRef: MatDialogRef<DialogAddTaiKhoanNganHangComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) {
        super()
    }

    ngOnInit(): void {
        this.dialogRef.keydownEvents().subscribe(event => {
            if (event.key === "Escape") {
                this.dialogRef.close(false);
            }
        });
        if (this.data.item.loaiHoSoId !== undefined) {
            this.isNew = false;
            this._service.setDataLuongPheDuyet(this.data.item.luongPheDuyetResponse);
        } else {
            this.isNew = true
        };
        // this.listTaiLieu = this.data.item.TaiLieuYeuCau ? this.data.item.TaiLieuYeuCau : []
        this.nguoiTao = this._authService.userName;
        this.formControl = this.formBuilder.group({
            TenNganHang: ['', [Validators.required, Validators.maxLength(60)]],
            MaNganHang: ['', [Validators.maxLength(30)]],
            MaNganHangERP: [this.data.item.MaNganHangERP, [Validators.maxLength(30)]],
            TenVietTat: ['', [Validators.required, Validators.maxLength(30)]],
            TrangThaiTiepNhan: [true],
            GhiChu: [''],
            PhuongThucKetNoi: [''],
            LookupType: ['CITAD']
        })
    }

    get f() {
        return this.formControl.controls;
    }

    save() {
        this.formControl.markAllAsTouched();
        const {
            TenNganHang,
            MaNganHang,
            MaNganHangERP,
            TenVietTat,
            TrangThaiTiepNhan,
            GhiChu,
            PhuongThucKetNoi,
            LookupType
        } = this.formControl.value
        let dataPost = {
            "MaNganHang": MaNganHang,
            "TrangThaiTiepNhan": TrangThaiTiepNhan ? 1 : 0,
            "GhiChu": GhiChu,
            "TenNganHang": TenNganHang,
            "TenVietTat": TenVietTat,
            "PhuongThucKetNoi": this.converPhuongThucKetNoi(PhuongThucKetNoi),
            "LookupType": LookupType,
            "MaNganHangERP": MaNganHangERP
        }
        this._service.createNganHang(dataPost).pipe(this.unsubsribeOnDestroy).subscribe((res) => {
            console.log(res);
            if (res && res.success) {
                this._notification.open("Thêm mới thành công!", mType.success);
                this.dialogRef.close(true)
            } else {
                this._notification.open(res.message, mType.error)
            }

        })
    }

    converPhuongThucKetNoi = (data) => {
        switch(data) {
            case 1: return "H2H"
            case 2: return "API"
            case 3: return "chưa kết nối"
        }
    }
}
