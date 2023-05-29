import { NgModule } from '@angular/core';
import { InputNumberDirective } from './inputNumber.directive';
import { PermissionDirective } from './permission.directive';

import {DecimalPipe} from '@angular/common';

@NgModule({
    imports: [],
    declarations: [PermissionDirective, InputNumberDirective],
    exports: [PermissionDirective, InputNumberDirective],
    providers: [DecimalPipe]
})
export class SharedDirectivesModule {
    // Dung de dang ky cac directive
   
}
