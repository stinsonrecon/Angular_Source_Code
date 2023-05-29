import { DialogShowToTrinh } from './ho-so-toi-tao/them-moi/dialog-show-to-trinh/dialog-show-to-trinh.component';
import { TableAddMaterials } from './them-moi/table-add-materials/table-add-materials.component';
import { ChiTietLichSuThayDoiMaterialComponent } from './chi-tiet-lich-su-thay-doi-material/chi-tiet-lich-su-thay-doi-material.component';
import { UpdateHoSoThanhToanComponent } from './update/update.component';
import { TableMaterials } from './them-moi/table-materials/table-materials.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from '@app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DsHoSoToiTaoComponent } from './ds-ho-so-toi-tao/ds-ho-so-toi-tao.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablePaymentInfo } from './them-moi/table-payment-info/table-payment-info.component';
import { DialogUpdateThongTinPaymentComponent } from './them-moi/dialog-update-thongtin-payment/dialog-update-thongtin-payment.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DialogShowMaterials } from './them-moi/dialog-show-materials/dialog-show-materials.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShareComponentModule } from '@app/shared/component/share-component.module';
import { ViewTableMaterials } from './chi-tiet-ho-so/table-materials/table-materials.component';
import { ViewTablePaymentInfo } from './chi-tiet-ho-so/table-payment-info/table-payment-info.component';
import { DialogApproveComponent } from './chi-tiet-ho-so/dialog-approve/dialog-approve.component';
import { HoSoChuaPheDuyetComponent } from './ho-so-chua-phe-duyet/ho-so-chua-phe-duyet.component';
import { HoSoDaPheDuyetComponent } from './ho-so-da-phe-duyet/ho-so-da-phe-duyet.component';
import { HoSoYeuCauThayDoiComponent } from './ho-so-yeu-cau-thay-doi/ho-so-yeu-cau-thay-doi.component';
import { DialogTaoChungTuComponent } from './chi-tiet-ho-so/dialog-taochungtu/dialog-taochungtu.component';
import { ViewDialogUpdateThongTinPaymentComponent } from './chi-tiet-ho-so/dialog-update-thongtin-payment/dialog-update-thongtin-payment.component';
import { DialogLichsupheduyetComponent } from './chi-tiet-ho-so/dialog-lichsupheduyet/dialog-lichsupheduyet.component';
import { DialogUpdateMaterial } from './them-moi/dialog-update-material/dialog-update-material.component';
import { ChiTietHoSoComponent } from './chi-tiet-ho-so/chi-tiet-ho-so.component';
import { DsGiayToComponent } from './ds-giay-to/ds-giay-to.component';
import { SharedDirectivesModule } from '@app/shared/directives/shared-directives.module';
import { DialogDofficeComponent } from './them-moi/dialog-doffice/dialog-doffice.component';
import { DofficeHosoComponent } from './them-moi/dialog-doffice/doffice-hoso/doffice-hoso.component';
import { DofficeVanbanComponent } from './them-moi/dialog-doffice/doffice-vanban/doffice-vanban.component';
import { DialogShowMaterialUpDates } from './ho-so-toi-tao/them-moi/dialog-show-materials-update/dialog-show-materials-update.component';
import { ToTringModule } from '../to-trinh/totrinh.module';
import { ViewPdfHSTTComponent } from './view-pdf/view-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DanhSachHoSoThamChieuComponent } from './ds-hs-tham-chieu/danhsachhosothamchieu.component';
import { FileDragNDropDirective } from './ho-so-toi-tao/them-moi/dialog-show-to-trinh/file-drag-n-drop.directive';
import { AuthGuard } from '@app/shared/guard';
import { DsHoSoThamTraComponent } from './ds-ho-so-tham-tra/ds-ho-so-tham-tra.component';
import { DialogTaoPhieuThamTra } from './chi-tiet-ho-so/dialog-taophieuthamtra/dialog-taophieuthamtra.component';
import { KyHoSoThamChieuComponent } from './chi-tiet-ho-so/ky-ho-so-tham-chieu/ky-ho-so-tham-chieu.component';
import { ViewPhieuChiNganHangComponent } from './view-phieu-chi-ngan-hang/view-phieu-chi-ngan-hang.component';
import { DsHsChoTiepNhanComponent } from './ds-hs-cho-tiep-nhan/ds-hs-cho-tiep-nhan.component';
import { XacnhanComponent } from './ds-hs-cho-tiep-nhan/xacnhan/xacnhan.component';
import { DsHoSoThamTraCuaToiComponent } from './ds-ho-so-tham-tra-cua-toi/ds-ho-so-tham-tra-cua-toi.component';
import { DialogPortalComponent } from './them-moi/dialog-portal/dialog-portal.component';
import { PhieuDangKyComponent } from './them-moi/dialog-portal/phieu-dang-ky/phieu-dang-ky.component';
import { PhieuTongHopComponent } from './them-moi/dialog-portal/phieu-tong-hop/phieu-tong-hop.component';
import { DialogDetailComponent } from './them-moi/dialog-portal/dialog-detail/dialog-detail.component';
import { PhanCongPheDuyetHsComponent } from './phan-cong-phe-duyet-hs/phan-cong-phe-duyet-hs.component';
import { NgxLoadingModule } from 'ngx-loading';
import { PhanCongTiepNhanComponent } from './ds-hs-cho-tiep-nhan/phan-cong-tiep-nhan/phan-cong-tiep-nhan.component';
import { DsHsChoPhanCongLapPhieuThamTraComponent } from './ds-hs-cho-phan-cong-lap-phieu-tham-tra/ds-hs-cho-phan-cong-lap-phieu-tham-tra.component';

const routes: Routes = [
    {
        path: 'hosotoitao',
        component: DsHoSoToiTaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'themmoi',
        component: ThemMoiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cap-nhap/:id',
        component: UpdateHoSoThanhToanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hosochuapheduyet',
        component: HoSoChuaPheDuyetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hosodapheduyet',
        component: HoSoDaPheDuyetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hosoyeucauthaydoi',
        component: HoSoYeuCauThayDoiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhsachgiayto',
        component: DsGiayToComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'chitiethoso/:id',
        component: ChiTietHoSoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hosothamtra',
        component: DsHoSoThamTraComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hosothamtracuatoi',
        component: DsHoSoThamTraCuaToiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dshschotiepnhan',
        component: DsHsChoTiepNhanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dshschophancongtaophieuthamtra',
        component: DsHsChoPhanCongLapPhieuThamTraComponent,
        canActivate: [AuthGuard]
    },

];


@NgModule({
    declarations: [
        DsHoSoToiTaoComponent,
        HoSoChuaPheDuyetComponent,
        HoSoDaPheDuyetComponent,
        HoSoYeuCauThayDoiComponent,
        ThemMoiComponent,
        TablePaymentInfo,
        TableMaterials,
        DialogUpdateThongTinPaymentComponent,
        DialogShowMaterials,
        DialogUpdateMaterial,
        ViewTableMaterials,
        ViewTablePaymentInfo,
        ChiTietHoSoComponent,
        DsGiayToComponent,
        UpdateHoSoThanhToanComponent,
        DialogApproveComponent,
        ChiTietLichSuThayDoiMaterialComponent,
        DialogTaoChungTuComponent,
        ViewDialogUpdateThongTinPaymentComponent,
        DialogLichsupheduyetComponent,
        TableAddMaterials,
        DialogShowToTrinh,
        DialogDofficeComponent,
        DofficeHosoComponent,
        DofficeVanbanComponent,
        DialogShowMaterialUpDates,
        ViewPdfHSTTComponent,
        DanhSachHoSoThamChieuComponent,
        FileDragNDropDirective,
        DsHoSoThamTraComponent,
        DialogTaoPhieuThamTra,
        KyHoSoThamChieuComponent,
        ViewPhieuChiNganHangComponent,
        DsHsChoTiepNhanComponent,
        XacnhanComponent,
        DsHoSoThamTraCuaToiComponent,
        DialogPortalComponent,
        PhieuDangKyComponent,
        PhieuTongHopComponent,
        DialogDetailComponent,
        PhanCongPheDuyetHsComponent,
        PhanCongTiepNhanComponent,
        DsHsChoPhanCongLapPhieuThamTraComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        NgxMatSelectSearchModule,
        TreeViewModule,
        DragDropModule,
        MatFormFieldModule,
        FlexLayoutModule,
        NgxDocViewerModule,
        MatProgressBarModule,
        ShareComponentModule,
        SharedDirectivesModule,
        ToTringModule,
        NgxExtendedPdfViewerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxLoadingModule.forRoot({})
    ],
    exports: [
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class HosothanhtoanModule { }




