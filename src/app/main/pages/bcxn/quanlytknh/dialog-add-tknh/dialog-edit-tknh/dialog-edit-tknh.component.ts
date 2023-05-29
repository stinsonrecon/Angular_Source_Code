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
    selector: 'app-edit-tknh',
    templateUrl: './dialog-edit-tknh.component.html',
    styleUrls: ['./dialog-edit-tknh.component.scss']
})
export class DialogEditTaiKhoanNganHangComponent extends BaseClass implements OnInit {
    isNew: boolean = true
    formControl: FormGroup
    maHoSo: string = '';
    tenNganHang: string = '';
    listTaiLieu :any = [];
    luongPheDuyet: any = []
    coHieuLuc: string = ''
    moTa: string = ''
    nguoiTao: string = ''
    thoiGianTao = new Date(Date.now()).toLocaleDateString();
    // ghiChu: string = ''
    lichSuCapNhat: string = ''
    diagramData: any;
    diagramNodeData: go.ObjectData[];
    diagramLinkData: go.ObjectData[];
    diagramModelData: go.ObjectData = { prop: 'value' };
    skipsDiagramUpdate: boolean = false;
    diagramDivClassName: string = 'diagram';
    listNode: any = []

    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
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
        public dialogRef: MatDialogRef<DialogEditTaiKhoanNganHangComponent>,
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
        if(this.data.item.loaiHoSoId !== undefined) {
            this.isNew = false;
            this._service.setDataLuongPheDuyet(this.data.item.luongPheDuyetResponse);
        } else {
            this.isNew = true
        };
        // this.listTaiLieu = this.data.item.TaiLieuYeuCau ? this.data.item.TaiLieuYeuCau : []
        this.nguoiTao = this._authService.userName;
        this.formControl = this.formBuilder.group({
            nganHangId: [this.data.item.nganHangId],
            TenNganHang: [this.data.item.tenNganHang, [Validators.required, Validators.maxLength(60)]],
            MaNganHang: [this.data.item.maNganHang, [Validators.maxLength(30)]],
            MaNganHangERP: [this.data.item.maNganHangERP, [Validators.maxLength(30)]],
            TenVietTat: [this.data.item.tenVietTat, [Validators.required, Validators.maxLength(30)]],
            GhiChu: [this.data.item.ghiChu],
            TrangThaiTiepNhan: [this.data.item.trangThaiTiepNhan],
            PhuongThucKetNoi: [this.converPhuongThucKetNoi(this.data.item.phuongThucKetNoi)],
            LookupType: [this.data.item.lookupType]
        })
    }

    get f() {
        return this.formControl.controls;
    }

    save() {
        this.formControl.markAllAsTouched();
        const {
            TenNganHang,
            nganHangId,
            MaNganHang,
            MaNganHangERP,
            TenVietTat,
            TrangThaiTiepNhan,
            GhiChu,
            PhuongThucKetNoi,
            LookupType
        } = this.formControl.value
        let dataPost = {
            nganHangId,
            MaNganHang,
            MaNganHangERP,
            "TrangThaiTiepNhan": TrangThaiTiepNhan ? 1 : 0,
            GhiChu,
            TenNganHang,
            TenVietTat,
            "PhuongThucKetNoi": this.convertPTKNWhenUpdate(PhuongThucKetNoi),
            LookupType
        }
        this._service.updateNganHang(dataPost).pipe(this.unsubsribeOnDestroy).subscribe((res) => {
            if(res && res.success) {
                this._notification.open("Cập nhập thành công!", mType.success);
                this.dialogRef.close(true)
            } else {
                this._notification.open("Cập nhập thất bại, vui lòng kiểm tra lại", mType.error)
            }

        })
    }

    converPhuongThucKetNoi = (data) => {
        switch(data) {
            case "H2H": return 1
            case "API": return 2
            case "chưa kết nối": return 3
            default:
                return 3
        }
    }

    convertPTKNWhenUpdate = (data) => {
        switch(data) {
            case 1: return "H2H"
            case 2: return "API"
            case 3: return "chưa kết nối"
            default:
                return "chưa kết nối"
        }
    }




}
