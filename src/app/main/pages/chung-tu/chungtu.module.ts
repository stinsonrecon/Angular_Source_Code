import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from '@app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShareComponentModule } from '@app/shared/component/share-component.module';
import { DanhSachChungTuComponent } from './danh-sach-chung-tu/danh-sach-chung-tu.component';
import { PheDuyetKeToanComponent } from './phe-duyet-ke-toan/phe-duyet-ke-toan.component';
import { PheDuyetThuTruongComponent } from './phe-duyet-thu-truong/phe-duyet-thu-truong.component';
import { DialogConfirmComponent } from './danh-sach-chung-tu/dialog-confirm/dialog-confirm.component';
import { DialogSubmitComponent } from './danh-sach-chung-tu/dialog-submit/dialog-submit.component';
import { PheDuyetChungTuComponent } from './phe-duyet-chung-tu/phe-duyet-chung-tu.component';
import { DialogUpdateStatusComponent } from './danh-sach-chung-tu/dialog-update-status/dialog-update-status.component';
import { ChiTietHoSoComponent } from '../ho-so-thanh-toan/chi-tiet-ho-so/chi-tiet-ho-so.component';
import { XemChungTuComponent } from './xem-chung-tu/xem-chung-tu.component';
import { DsYeuCauChiComponent } from './ds-yeu-cau-chi/ds-yeu-cau-chi.component';
import { UNCDetailComponent } from './ds-yeu-cau-chi/unc-detail/unc-detail.component';
import { ViewPhieuChiNganHangComponent } from './view-phieu-chi-ngan-hang/view-phieu-chi-ngan-hang.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DialogViewDetailComponent } from './danh-sach-chung-tu/dialog-view-detail/dialog-view-detail.component';
import { AuthGuard } from '@app/shared/guard';
import { DsChungTuGsComponent } from './ds-chung-tu-gs/ds-chung-tu-gs.component';
import { XemChungTuGsComponent } from './xem-chung-tu-gs/xem-chung-tu-gs.component';
import { KyChungTuGsComponent } from './ky-chung-tu-gs/ky-chung-tu-gs.component';
import { DsChungTuGsCap2Component } from './ds-chung-tu-gs-cap2/ds-chung-tu-gs-cap2.component';

const routes: Routes = [
    {
        path: 'danhsachchungtu',
        component: DanhSachChungTuComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pheduyetketoan',
        component: PheDuyetKeToanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pheduyetthutruong',
        component: PheDuyetThuTruongComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'danhsachyeucauchi',
        component: DsYeuCauChiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dschungtugs',
        component: DsChungTuGsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dschungtugscap2',
        component: DsChungTuGsCap2Component,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [
        DanhSachChungTuComponent,
        PheDuyetKeToanComponent,
        PheDuyetThuTruongComponent,
        DialogConfirmComponent,
        DialogSubmitComponent,
        PheDuyetChungTuComponent,
        DialogUpdateStatusComponent,
        // ChiTietHoSoComponent,
        XemChungTuComponent,
        DsYeuCauChiComponent,
        UNCDetailComponent,
        ViewPhieuChiNganHangComponent,
        DialogViewDetailComponent,
        DsChungTuGsComponent,
        XemChungTuGsComponent,
        KyChungTuGsComponent,
        DsChungTuGsCap2Component
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
        MatProgressBarModule,
        ShareComponentModule,
        NgxExtendedPdfViewerModule
    ],
    exports: [
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class ChungtuModule { }