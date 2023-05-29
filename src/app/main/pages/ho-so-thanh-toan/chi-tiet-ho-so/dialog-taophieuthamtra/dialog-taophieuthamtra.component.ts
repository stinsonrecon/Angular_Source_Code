import { mType } from '@app/shared/component/notification-dialog/notification.service';
import { NotificationService } from '../../../../../shared/component/notification-dialog/notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HoSoToiTaoService } from '@app/shared/services/ho-so-thanh-toan/ho-so-toi-tao.service';
import { BaseClass } from '@app/base-class';
import { TRANG_THAI_PHE_DUYET, TYPE_FILE_ACCEPT } from '@app/shared/constants/hosothanhtoan.const';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DanhmucgiaytoService } from '@app/shared/services/bcxn/danhmucgiayto.service';
import { DialogShowMaterials } from '../../them-moi/dialog-show-materials/dialog-show-materials.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DanhSachThaoTac } from '@app/shared/constants/thaotac.constants';

@Component({
    selector: 'app-dialog-taophieuthamtra',
    templateUrl: './dialog-taophieuthamtra.component.html',
    styleUrls: ['./dialog-taophieuthamtra.component.scss']
})
export class DialogTaoPhieuThamTra extends BaseClass implements OnInit {

    trangThai = TRANG_THAI_PHE_DUYET
    displayedColumns: string[] = ['stt', 'nguoiDuyet', 'ngayDuyet', 'trangThai', 'noiDung'];
    history: MatTableDataSource<any>;
    loaiHoSo: any = 1
    filterLoaiHoSo: FormControl
    // FormPhieuThamTra: FormGroup
    filteredLoaiHoSo = []
    dataLoaiHoSo = []
    doc: string = ''
    checkImg: string = ''
    status: boolean = false
    public files: any;
    listFileFromMaterial = []
    pdfSource: string;
    listHD = []
    dataInfo: any;
    danhSachThaoTac = DanhSachThaoTac

    constructor(
        public location: Location,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DialogTaoPhieuThamTra>,
        private _service: HoSoToiTaoService,
        @Inject(MAT_DIALOG_DATA) private data,
        private _notification: NotificationService,
        private danhMucGTService: DanhmucgiaytoService,
        private formBuilder: FormBuilder,
    ) {
        super();
    }

    ngOnInit(): void {
        this.danhMucGTService.getListGiayTo({}).pipe(this.unsubsribeOnDestroy).subscribe(listHoSo => {
            this.filteredLoaiHoSo = listHoSo.data
            this.dataLoaiHoSo = listHoSo.data
            // this.FormPhieuThamTra.patchValue({ loaiHoSo: this.dataLoaiHoSo[0].loaiHoSoId })
        })
        
        this.filterLoaiHoSo = new FormControl('')
        this.filterLoaiHoSo.valueChanges.subscribe(
            value => {
                this.filteredLoaiHoSo = this.dataLoaiHoSo.filter(x => x.tenGiayTo.toLowerCase().includes(value.toLowerCase()));
            }
        )
        // this.FormPhieuThamTra = this.formBuilder.group({
        //     loaiHoSo: ['', [Validators.required]],
        // })
        this._service.getChitiet(this.data.hoSoID).subscribe(
            res => {
              if(res.statusCode == 200) {
                this.dataInfo = res.data[0];
                      this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
                          this.listHD.push(x.hanhDong)
                      })
                    //   this.listHD.forEach(x => {
                    //       if(x == 17 && this.dataInfo.buocPheDuyet.dsNguoiThucHien.indexOf(JSON.parse(localStorage.user).id) !== -1){
                    //           this.enableButtonDongYTiepNhanHoSo = true
                    //       }
                    //   })
              }
            }
          )
    }

    getTrangThai(value): string {
        return this.trangThai.find(x => x.value.toString() === value)?.name;
    }

    doSomething(event) {
        console.log(event)
    }
    onFileChange(pFile: any) {
        const file = pFile[0];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!TYPE_FILE_ACCEPT.includes(fileExtension)) {
            this._notification.open(
                "Chỉ chấp nhận file Ảnh, file DOC và PDF, vui lòng kiểm tra lại",
                mType.error
            );
            this.doc = ''
            this.files = null
            return
        }
        this.doc = pFile[0].name
        this.files = pFile[0]

        // const dialogRef = this.dialog.open(DialogShowMaterials, {
        //     width: '1920px',
        //     autoFocus: false,
        //     data: {
        //         file: {
        //             data: pFile[0],
        //             type: fileExtension,
        //             unix: "id" + Math.random().toString(16).slice(2)
        //         }
        //     }
        // });

        // dialogRef.afterClosed().subscribe((response: any) => {
        // });
      }

    viewTaiLieu () {
        const dialogRef = this.dialog.open(DialogShowMaterials, {
            width: '1920px',
            autoFocus: false,
            data: {
                file: {
                    data: this.files,
                    type: this.files.name.split(".").pop().toLowerCase(),
                    unix: "id" + Math.random().toString(16).slice(2)
                }
            }
        });

        dialogRef.afterClosed().subscribe((response: any) => {
        });
    }
    
    deleteFile(f) {
        this.files = this.files.filter(function (w) { return w.name != f.name });
    }

    handleDeleteFile() {
    this.doc = ''
    }

    taoPhieuThamTra(action) {
        let thaoTacBuocPheDuyetId = ''
        this.dataInfo.buocPheDuyet.dsThaoTacBuocPheDuyet.forEach(x => {
          if(x.hanhDong == action) {
            thaoTacBuocPheDuyetId = x.thaoTacBuocPheDuyetId
          }

        })
        let formData: any = new FormData()
        formData.append('file', this.files)
        formData.append('GiayToId', "")
        formData.append('NguoiCapNhatId', this.data.userId)
        formData.append('HoSoThanhToanId', this.data.hoSoID)
        formData.append('ThaoTacBuocPheDuyetId', thaoTacBuocPheDuyetId)
        formData.append('BuocPheDuyetId', this.dataInfo.buocPheDuyet.buocPheDuyetId)

        this._service.taoPhieuThamTra(formData).subscribe((res: any) => {
            if(!res?.success) {
                this._notification.open("Có lỗi không mong muốn xảy ra", mType.error)
                this.dialogRef.close(true)
                this.location.back()
                return
            }
            this.location.back()
            this._notification.open("Thêm phiếu thẩm tra hành công", mType.success)
            this.dialogRef.close(true)
        }, error => {
            this.location.back()
            this._notification.open("Có lỗi không mong muốn xảy ra", mType.error)
            this.dialogRef.close(true)
        })
    }

}
