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
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PheDuyetToTrinhThuTruongComponent } from './phe-duyet-to-trinh-thu-truong/phe-duyet-to-trinh-thu-truong.component';
import { PheDuyetToTrinhKeToanComponent } from './phe-duyet-to-trinh-ke-toan/phe-duyet-to-trinh-ke-toan.component';
import { PheDuyetToTrinhComponent } from './phe-duyet-to-trinh/phe-duyet-to-trinh.component';
import { PheDuyetToTrinhCapMotComponent } from './phe-duyet-to-trinh-cap-mot/phe-duyet-to-trinh-cap-mot.component';
import { ViewToTrinhComponent } from './view-to-trinh/view-to-trinh.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';
import { AuthGuard } from '@app/shared/guard';

const routes: Routes = [
    {
        path: 'pheduyettotrinhketoan',
        component: PheDuyetToTrinhKeToanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pheduyettotrinhthutruong',
        component: PheDuyetToTrinhThuTruongComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'pheduyettotrinh',
    //     component: PheDuyetToTrinhCapMotComponent,
    // },
];

@NgModule({
    declarations: [
        PheDuyetToTrinhKeToanComponent,
        PheDuyetToTrinhThuTruongComponent,
        PheDuyetToTrinhComponent,
        PheDuyetToTrinhCapMotComponent,
        ViewToTrinhComponent,
        ViewPdfComponent,
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
export class ToTringModule { }