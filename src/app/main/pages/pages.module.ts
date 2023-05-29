import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectivesModule } from '@app/shared/directives/shared-directives.module';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    
    {
        path: 'bcxn',
        loadChildren: () => import('./bcxn/bcxn.module').then(m => m.BcxnModule),
    },
    {
        path: 'ho-so-thanh-toan',
        loadChildren: () => import('./ho-so-thanh-toan/hosothanhtoan.module').then(m => m.HosothanhtoanModule)
    },
    {
        path: 'chung-tu',
        loadChildren: () => import('./chung-tu/chungtu.module').then(m => m.ChungtuModule)
    },
    {
        path: 'to-trinh',
        loadChildren: () => import('./to-trinh/totrinh.module').then(m => m.ToTringModule)
    },
    // {
    //     path: '',
    //     loadChildren: () => import('./csdlgia/csdlgia.module').then(m => m.CsdlgiaModule),
    // }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedDirectivesModule,
        SharedDirectivesModule,
        MatCardModule,
        MatTableModule,
        
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatIconModule,
        MatInputModule
    ],
    declarations: []
})
export class PagesModule {
}