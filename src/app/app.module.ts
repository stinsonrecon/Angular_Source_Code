import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AuthGuard } from '@app/shared/guard';
import { AuthInterceptor } from '@app/shared/interceptors';
import { HomeModule } from './main/home/home.module';
import { FuseProgressBarModule } from './shared/component/progress-bar/progress-bar.module';
import { MaterialModule } from './material.module';
import { LoginModule } from './main/login/login.module';
import { PagesModule } from './main/pages/pages.module';
import { CurrencyInputModule } from './shared/component/currency-input/currency-input.module';
import { NotifiContenComponent } from './shared/component/notification-dialog/notifi-conten/notifi-conten.component';
import { RequestResponseHandlerInterceptor } from './shared/interceptors/request-response-handler.interceptor';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/providers/Paginator';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

registerLocaleData(localeVi);

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/login/login.module#LoginModule'

    },
    {
        path: 'login',
        loadChildren: './main/login/login.module#LoginModule'

    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',
    },
    {
        path: 'help',
        loadChildren: () => import('./main/help/help.module').then(m => m.HelpModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./main/error/error.module').then(m => m.ErrorModule)
    },
    { path: '**', redirectTo: 'error/404' },
];
@NgModule({
    declarations: [
        AppComponent,
        NotifiContenComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        RouterModule.forRoot(appRoutes, { useHash: true }),
        TranslateModule.forRoot(),
        NgxSpinnerModule,
        // Material moment date module
        MatMomentDateModule,
        MaterialModule,
        CurrencyInputModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseProgressBarModule,

        // Layout module
        LayoutModule,

        // Main modules
        HomeModule,
        LoginModule,
        PagesModule,
        NgxExtendedPdfViewerModule,
    ],
    providers: [
        AuthGuard,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestResponseHandlerInterceptor,
            multi: true
        },
        { provide: LOCALE_ID, useValue: 'vi-VN' },
        { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }
    ],
    bootstrap: [AppComponent
    ],
})
export class AppModule { }
