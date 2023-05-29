import { DialogAddQuocGiaComponent } from './danhmucquocgia/dialog-add-quocgia/dialog-add-quocgia.component';
import { DanhmucquocgiaComponent } from './danhmucquocgia/danhmucquocgia.component';
import { DialogEditTaiKhoanNganHangComponent } from './quanlytknh/dialog-add-tknh/dialog-edit-tknh/dialog-edit-tknh.component';
import { DialogAddConfigTaiKhoanNganHangComponent } from './quanlytknh/dialog-config-tknh/dialog-add-config-tknh/dialog-add-config-tknh.component';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from '@app/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { AuthGuard } from '@app/shared/guard';
import { QuanLyNguoiDungComponent } from './quanlynguoidung/quanlynguoidung.component';
import { DialogAddNguoidungComponent } from './quanlynguoidung/dialog-add-nguoidung/dialog-add-nguoidung.component';
import { DialogUpdatePasswordComponent } from './quanlynguoidung/dialog-update-password/dialog-update-password.component';
import { DanhMucDonViComponent } from './danhmucdonvi/danhmucdonvi.component';
import { DialogAddDonViComponent } from './danhmucdonvi/dialog-add-donvi/dialog-add-donvi.component';
import { QuanLyNhomQuyenComponent } from './quanlynhomquyen/quanlynhomquyen.component';
import { NamebyId } from './quanlynhomquyen/dialog-add-nhomquyen/viewNameById.pipe';
import { DanhMucChucNangComponent } from './danhmucchucnang/danhmucchucnang.component';
import { DialogAddChucnangComponent } from './danhmucchucnang/dialog-add-chucnang/dialog-add-chucnang.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import localeVI from '@angular/common/locales/vi';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RoleGuard } from '@app/shared/guard/guard-role.guard';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogAddNhomQuyenComponent } from './quanlynhomquyen/dialog-add-nhomquyen/dialog-add-nhomquyen.component';
import { DanhSachYeuCauBaoCaoComponent } from './danhsachyeucaubaocao/danhsachyeucaubaocao.component';
import { DialogUpdateYeuCauXacBhanBcComponent } from './danhsachyeucaubaocao/dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';
import { ChiTietYeuCauBkhComponent } from './chitietyeucau-bkh/chitietyeucau-bkh.component';
import { DanhCachYcxnbcBcmComponent } from './danhsachycxnbc-bcm/danhsachycxnbc-bcm.component';
import { ChitietycbcBcmComponent } from './chitietycbc-bcm/chitietycbc-bcm.component';
import { DanhmucbaocaoComponent } from './danhmucbaocao/danhmucbaocao.component';
import { DialogUpdateBaocaoComponent } from './danhmucbaocao/dialog-update-baocao/dialog-update-baocao.component';
import { DanhmuclinhvucComponent } from './danhmuclinhvuc/danhmuclinhvuc.component';
import { DialogAddBaocaoComponent } from './danhmucbaocao/dialog-add-baocao/dialog-add-baocao.component';
import { DialogAddLinhvucComponent } from './danhmuclinhvuc/dialog-add-linhvuc/dialog-add-linhvuc.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogXacNhanSlbcAutoComponent } from './dialog-xacnhanslbc-auto/dialog-xacnhanslbc-auto.component';
import { DialogXacNhanSlbcFileComponent } from './dialog-xacnhanslbc-file/dialog-xacnhanslbc-file.component';
import { DialogXemLichSuComponent } from './dialog-xem-lichsu/dialog-xem-lichsu.component';
import { DialogViewBaocaoComponent } from './danhmucbaocao/dialog-view-baocao/dialog-view-baocao.component';
import { DialogViewImageComponent } from './chitietyeucau-bkh/dialog-view-image-baocao/dialog-view-image-baocao.component';
import { DialogViewImageBaocaoBcmComponent } from './chitietycbc-bcm/dialog-view-image-baocao-bcm/dialog-view-image-baocao-bcm.component';
import { DialogDongXacnhanComponent } from './chitietyeucau-bkh/dialog-dong-xacnhan/dialog-dong-xacnhan.component';
import { QuanLyLenhNganHangComponent } from './quanlylenhnganhang/quanlylenhnganhang.component';
import { DanhMucLoaiHoSoComponent } from './danhmucloaihoso/danhmucloaihoso.component';
import { DialogAddHoSoComponent } from './danhmucloaihoso/dialog-add-hoso/dialog-add-hoso.component';
import { TableTaiLieuYeuCau } from './danhmucloaihoso/dialog-add-hoso/table-tai-lieu-yeu-cau/table-tai-lieu-yeu-cau.component';
import { DanhMucLuongPheDuyetComponent } from './danhmucluongpheduyet/danhmucluongpheduyet.component';
import { DanhMucTrangThaiComponent } from './danhmuctrangthai/danhmuctrangthai.component';
import { GojsAngularModule } from 'gojs-angular';
import { ShareComponentModule } from '@app/shared/component/share-component.module';
import { DanhmucgiaytoComponent } from './danhmucgiayto/danhmucgiayto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogGiaytoComponent } from './danhmucgiayto/dialog-giayto/dialog-giayto.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuanLyTaiKhoanNganHangComponent } from './quanlytknh/quanlytknh.component';
import { DialogAddTaiKhoanNganHangComponent } from './quanlytknh/dialog-add-tknh/dialog-add-tknh.component';
import { DsTaikhoanComponent } from './quanlytknh/ds-taikhoan/ds-taikhoan.component';
import { DialogTaikhoanComponent } from './quanlytknh/dialog-taikhoan/dialog-taikhoan.component';
import { DsChinhanhComponent } from './quanlytknh/ds-chinhanh/ds-chinhanh.component';
import { DialogChinhanhComponent } from './quanlytknh/dialog-chinhanh/dialog-chinhanh.component';
import { TableTaiLieuYeuCauUpdateComponent } from './danhmucloaihoso/dialog-add-hoso/table-tai-lieu-yeu-cau-update/table-tai-lieu-yeu-cau-update.component';
import { DanhmuctinhtpComponent } from './danhmuctinhtp/danhmuctinhtp.component';
import { DialogAddTinhtpComponent } from './danhmuctinhtp/dialog-add-tinhtp/dialog-add-tinhtp.component';
import { DsQuyTrinhPheDuyetComponent } from './ds-quy-trinh-phe-duyet/ds-quy-trinh-phe-duyet.component';
import { DialogQuyTrinhPheDuyetComponent } from './ds-quy-trinh-phe-duyet/dialog-quy-trinh-phe-duyet/dialog-quy-trinh-phe-duyet.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DialogBuocThucHienComponent } from './ds-quy-trinh-phe-duyet/dialog-buoc-thuc-hien/dialog-buoc-thuc-hien.component';
import { DsBuocCuaMotQuyTrinhComponent } from './ds-quy-trinh-phe-duyet/ds-buoc-cua-mot-quy-trinh/ds-buoc-cua-mot-quy-trinh.component';
registerLocaleData(localeVI, 'vi-VN');

const routes: Routes = [
    {
        path: 'quanlynguoidung',
        component: QuanLyNguoiDungComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucdonvi',
        component: DanhMucDonViComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'quanlynhomquyen',
        component: QuanLyNhomQuyenComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucchucnang',
        component: DanhMucChucNangComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhsachyeucaubaocao',
        component: DanhSachYeuCauBaoCaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhsachyeucaubaocaobcm',
        component: DanhCachYcxnbcBcmComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'chitietyeucaubkh',
        component: ChiTietYeuCauBkhComponent,
        // canActivate: [RoleGuard]
    },
    {
        path: 'chitietyeucaubcm',
        component: ChitietycbcBcmComponent,
        // canActivate: [RoleGuard]
    },
    {
        path: 'danhmuclinhvuc',
        component: DanhmuclinhvucComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucbaocao',
        component: DanhmucbaocaoComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'danhsachycxnncbcm',
        component: DanhCachYcxnbcBcmComponent,
        // canActivate: [RoleGuard]
    },
    {
        path: 'danhmucluongpheduyet',
        component: DanhMucLuongPheDuyetComponent
    },
    {
        path: 'danhmuctrangthai',
        component: DanhMucTrangThaiComponent
    }
    ,
    {
        path: 'quanlylenhnganhang',
        component: QuanLyLenhNganHangComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'danhmucloaihoso',
        component: DanhMucLoaiHoSoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmucgiayto',
        component: DanhmucgiaytoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'quanlytknh',
        component: QuanLyTaiKhoanNganHangComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dstaikhoan',
        component: DsTaikhoanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dschinhanh',
        component: DsChinhanhComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhmuctinhtp',
        component: DanhmuctinhtpComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'quytrinhpheduyet',
        component: DsQuyTrinhPheDuyetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "danhmucquocgia",
        component: DanhmucquocgiaComponent,
        canActivate: [AuthGuard]
    },
];


@NgModule({
    declarations: [
        QuanLyNguoiDungComponent,
        DialogAddNguoidungComponent,
        DialogUpdatePasswordComponent,
        DanhMucDonViComponent,
        DialogAddDonViComponent,
        QuanLyNhomQuyenComponent,
        NamebyId,
        DanhMucChucNangComponent,
        DialogAddChucnangComponent,
        InfoDialogComponent,
        DialogAddNhomQuyenComponent,
        DanhSachYeuCauBaoCaoComponent,
        DialogUpdateYeuCauXacBhanBcComponent,
        ChiTietYeuCauBkhComponent,
        DanhCachYcxnbcBcmComponent,
        ChitietycbcBcmComponent,
        DanhmucbaocaoComponent,
        DialogUpdateBaocaoComponent,
        DanhmuclinhvucComponent,
        DialogAddBaocaoComponent,
        DialogAddLinhvucComponent,
        DialogXacNhanSlbcAutoComponent,
        DialogXacNhanSlbcFileComponent,
        DialogXemLichSuComponent,
        DialogViewBaocaoComponent,
        DialogViewImageComponent,
        DialogViewImageBaocaoBcmComponent,
        DialogDongXacnhanComponent,
        QuanLyLenhNganHangComponent,
        DanhMucLoaiHoSoComponent,
        DialogAddHoSoComponent,
        TableTaiLieuYeuCau,
        DanhMucLuongPheDuyetComponent,
        DanhmucgiaytoComponent,
        DialogGiaytoComponent,
        QuanLyTaiKhoanNganHangComponent,
        DialogAddTaiKhoanNganHangComponent,
        DialogEditTaiKhoanNganHangComponent,
        DialogAddConfigTaiKhoanNganHangComponent,
        DsTaikhoanComponent,
        DialogTaikhoanComponent,
        DsChinhanhComponent,
        DialogChinhanhComponent,
        TableTaiLieuYeuCauUpdateComponent,
        DanhmuctinhtpComponent,
        DialogAddTinhtpComponent,
        DsQuyTrinhPheDuyetComponent,
        DialogQuyTrinhPheDuyetComponent,
        DialogBuocThucHienComponent,
        DsBuocCuaMotQuyTrinhComponent,
        DialogAddQuocGiaComponent,
        DanhmucquocgiaComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatChipsModule,
        MaterialModule,
        FormsModule,
        NgxMatSelectSearchModule,
        TreeViewModule,
        DragDropModule,
        GojsAngularModule,
        ShareComponentModule,
        FlexLayoutModule,
        MatProgressBarModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
    exports: [

        // MatChipsModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class BcxnModule { }




