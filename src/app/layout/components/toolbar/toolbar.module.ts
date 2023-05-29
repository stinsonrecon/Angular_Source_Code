import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FuseSearchBarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';




@NgModule({
    declarations: [
        ToolbarComponent,
       
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatGridListModule,
        MatSelectModule,
        MatDividerModule,
        MatPaginatorModule,

        FuseSharedModule,
        FuseSearchBarModule,

    ],
    exports: [
        ToolbarComponent
    ],
    entryComponents: [
        ]
})
export class ToolbarModule {
}
