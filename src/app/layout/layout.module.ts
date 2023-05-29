import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
@NgModule({
    imports: [
        VerticalLayout1Module,
        MaterialModule
    ],
    exports: [
        VerticalLayout1Module,
    ]
})
export class LayoutModule
{
}
