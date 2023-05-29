import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { CurrencyInputDirective } from './currency-input.directive';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CurrencyInputDirective],
  exports: [CurrencyInputDirective],
})
export class CurrencyInputModule { }
