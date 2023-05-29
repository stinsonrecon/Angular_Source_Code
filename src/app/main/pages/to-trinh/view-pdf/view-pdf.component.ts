import { Component, Input, OnInit } from '@angular/core';
import { BaseClass } from '@app/base-class';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent extends BaseClass implements OnInit {

  @Input() pdfSource: string
  constructor() {
    super();
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
   }

  ngOnInit(): void {
  }

}
