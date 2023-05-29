import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseClass } from '@app/base-class';

@Component({
  selector: 'app-addchungtu',
  templateUrl: './addchungtu.component.html',
  styleUrls: ['./addchungtu.component.scss']
})
export class AddChungtuComponent extends BaseClass implements OnInit {

  formControl: FormGroup;
  nguoiThanhToan: string;
  tongTienDeNghi: number;
  tongTTThucTe: number;
  creDate = new Date();
  donViTT: any;
  loaiTien: any;
  tyGia: any;
  chungTuAP: string;
  chungTuCM: string;
  chungTuGL: string;
  STKNhan: number;
  nganHangNhan: any;
  chuTaiKhoanNhan: string;
  
  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      nguoiThanhToan: ['', [Validators.required]],
      tongTienDeNghi: ['', [Validators.required]],
      tongTTThucTe: ['', [Validators.required]],
      creDate: [''],
      donViTT: ['', [Validators.required]],
      loaiTien: ['', [Validators.required]],
      tyGia: [''],
      chungTuAP: ['', [Validators.required]],
      chungTuCM: ['', [Validators.required]],
      chungTuGL: ['', [Validators.required]],
      STKNhan: ['', [Validators.required]],
      nganHangNhan: ['', [Validators.required]],
      chuTaiKhoanNhan: ['', [Validators.required]],
    })
  }

  get f() {
    return this.formControl.controls;
  }

}
