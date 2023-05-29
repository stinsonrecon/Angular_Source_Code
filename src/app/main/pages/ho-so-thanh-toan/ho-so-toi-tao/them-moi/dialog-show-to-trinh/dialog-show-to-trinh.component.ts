import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';
import { formatDate } from '@app/shared/constants/util';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dialog-show-to-trinh',
  templateUrl: './dialog-show-to-trinh.component.html',
  styleUrls: ['./dialog-show-to-trinh.component.scss']
})
export class DialogShowToTrinh extends BaseClass implements OnInit {
  doc: string = ''
  checkImg: string = ''
  status: boolean = false
  public files: any;
  listFileFromMaterial = []
  pdfSource: string;
  loading: boolean = false;
  dataInfo: any;
  enableButtonKyVaTrinh: boolean = false
  danhSachThaoTac = DanhSachThaoTac

  constructor(
    public dialogRef: MatDialogRef<DialogShowToTrinh>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public danhMucBaoCaoService: DanhMucBaoCaoService,
    public dialog: MatDialog,
    public notification: NotificationService,
    private _snackBar: MatSnackBar,
    public hoSoToiTaoService: HoSoToiTaoService,
    public _notification: NotificationService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    // this.pdfSource = this.data.detail.taiLieuKyConvertBase64
    let listHD = []
    this.hoSoToiTaoService.getChitiet(this.data.newIDHSTT != undefined ? this.data.newIDHSTT : this.data.idHSTT).subscribe(
      res => {
        if(res.statusCode == 200) {
          this.dataInfo = res.data[0];
                this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                    listHD.push(x.hanhDong)
                })
                listHD.forEach(x => {
                    if(x == 3 && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                        this.enableButtonKyVaTrinh = true
                    }
                })
        }
      }
    )
  }

  onFileChange(pFile: any) {
    this.doc = pFile[0].name
    this.files = pFile[0]
  }

  deleteFile(f) {
    this.files = this.files.filter(function (w) { return w.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  handleDeleteFile() {
    this.doc = ''
  }

  handleKyvaTrinh(action) {
    let thaoTacBuocPheDuyetId = ''
    this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
      if(x.hanhDong == action) {
        thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
      }
      
    })
    this.loading = true
    if(this.data.idHSTT) {
      this.hoSoToiTaoService.kyVaTrinh(this.data.idHSTT, this.files, thaoTacBuocPheDuyetId, this.dataInfo.buocPheDuyet.buocPheDuyetId).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this._notification.open(
            "Ký và trình thành công!",
            mType.success
          );
          
        } else if (res.statusCode === 201) {
          this._notification.open(
            "Bạn đã không đồng ý ký tờ trình",
            mType.error
          );
        } else if (res.statusCode === 400) {
          this._notification.open(
            // "Ký không thành công, lỗi hồ sơ đang phê duyệt",
            "Ký không thành công",
            mType.error
          );
        } else {
          this._notification.open(
            "Đã xảy ra lỗi trong quá trình ký số tài liệu, vui lòng kiểm tra lại",
            mType.error
          );
        }
        setTimeout(() => {
          this.dialogRef.close(true)
          this.loading = false
          this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
        }, 1500);
      }, error => {
        this._notification.open(
          "Đã xảy ra lỗi trong quá trình ký số tài liệu, vui lòng kiểm tra lại",
          mType.error
        );
      })
    } else {
      if(this.data.newIDHSTT) {
        this.hoSoToiTaoService.kyVaTrinh(this.data.newIDHSTT, this.files, thaoTacBuocPheDuyetId, this.dataInfo.buocPheDuyet.buocPheDuyetId).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this._notification.open(
              "Ký và trình thành công!",
              mType.success
            );
            
          } else if (res.statusCode === 201) {
            this._notification.open(
              "Bạn đã không đồng ý ký tờ trình",
              mType.error
            );
          } else {
            this._notification.open(
              "Có lỗi trong quá trình ký số tài liệu, vui lòng kiểm tra lại",
              mType.error
            );
          }
          setTimeout(() => {
            this.dialogRef.close(true)
            this.loading = false
            this.router.navigate(['/ho-so-thanh-toan/hosotoitao'])
          }, 1500);
        }, error => {
          this._notification.open(
            "Đã xảy ra lỗi trong quá trình ký số",
            mType.error
          );
        })
      }
    }
    // this.hoSoToiTaoService.kyVaTrinh()
  }

  deleteFromArray(index) {
    this.files.splice(index, 1);
  }

  removeDots(number: string) {
    return number.split('.').join("");
  }

}
