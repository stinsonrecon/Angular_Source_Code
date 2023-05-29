import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from '@app/shared/guard';
import { MatCardModule} from '@angular/material/card';
const routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    //     data: { functionCode: '' },
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     data: { functionCode: '' },
    //     canActivate: [AuthGuard]
    // }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MatButtonModule,
        MatCardModule,

    ],
    // exports     : [
    //     HomeComponent
    // ]
    // entryComponents: [
    //     DonViLamViecDiaLogComponent
    // ]
})

export class HomeModule {
}
