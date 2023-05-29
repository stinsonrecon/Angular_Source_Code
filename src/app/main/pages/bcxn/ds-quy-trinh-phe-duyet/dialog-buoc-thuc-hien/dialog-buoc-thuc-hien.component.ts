import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { TrangThaiChungTu, trangThaiCT } from '@app/shared/constants/chungtu.const';
import { TrangThaiHoSo, TRANG_THAI_HO_SO } from '@app/shared/constants/hosothanhtoan.const';
import { DanhMucLoaiHoSoService } from '@app/shared/services/bcxn/danhmucloaihoso.service';
import { QuytrinhpheduyetService } from '@app/shared/services/bcxn/quytrinhpheduyet.service';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ncc } from '../../quanlynhomquyen/dialog-add-nhomquyen/dialog-add-nhomquyen.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DANH_SACH_THAO_TAC } from '@app/shared/constants/thaotac.constants';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialog-buoc-thuc-hien',
  templateUrl: './dialog-buoc-thuc-hien.component.html',
  styleUrls: ['./dialog-buoc-thuc-hien.component.scss']
})
export class DialogBuocThucHienComponent extends BaseClass implements OnInit {
  formCauHinhBuoc: FormGroup
  dataToDisplay: any = [];
  listBuocPD: any
  listGiayTo: any
  displayedColumns: string[] = [
    "stt",
    "hanhDong",
    "kySo",
    "loaiKy",
    "isSendMail",
    "taiLieu",
    "trangThaiHoSo",
    "trangThaiChungTu",
    "diDenBuocPheDuyet",
    "thaoTac"
  ];
  selectedRow: number = -1
  dataTable: any = [];
  inputHangDong: FormControl
  inputKySo: FormControl
  inputLoaiKy: FormControl
  inputNguoiXuLy: FormControl
  inputThoiGianXuLy: FormControl
  inputGiayTo: FormControl
  inputTrangThaiHoSo: FormControl
  inputTrangThaiChungTu: FormControl
  inputIsSendMail: FormControl
  inputDiDenBuocPheDuyet: FormControl

  public chipSelectedNcc: Ncc[] = [];
  dsUser: any
  allNcc: Ncc[] = []
  public filteredNcc: Observable<String[]>;
  public nccControl = new FormControl();
  private allowFreeTextAddNcc = false;
  @ViewChild('nccInput') nccInput: ElementRef<HTMLInputElement>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dataBuoc: any

  trangThaiChungTu = trangThaiCT
  trangThaiHoSo = TRANG_THAI_HO_SO
  danhSachThaoTac = DANH_SACH_THAO_TAC
  filterTTac: FormControl
  filteredThaoTac = DANH_SACH_THAO_TAC
  filterGT: FormControl
  filteredGiayTo: any
  filterTTHS: FormControl
  filteredTrangThaiHS = TRANG_THAI_HO_SO
  filterTTCT: FormControl
  filteredTrangThaiChungTu = trangThaiCT


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DialogBuocThucHienComponent>,
    private fb: FormBuilder,
    private _notification: NotificationService,
    private _loaiHoSoService: DanhMucLoaiHoSoService,
    private _quyTrinhService: QuytrinhpheduyetService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    super()
    this.inputHangDong = new FormControl();
    this.inputKySo = new FormControl()
    this.inputLoaiKy = new FormControl()
    this.inputNguoiXuLy = new FormControl()
    this.inputThoiGianXuLy = new FormControl()
    this.inputGiayTo = new FormControl()
    this.inputTrangThaiHoSo = new FormControl()
    this.inputTrangThaiChungTu = new FormControl()
    this.inputIsSendMail = new FormControl()
    this.inputDiDenBuocPheDuyet = new FormControl()
    this.filterTTac = new FormControl()
    this.filterGT = new FormControl()
    this.filterTTHS = new FormControl()
    this.filterTTCT = new FormControl()
  }

  ngOnInit(): void {
    this.filteredThaoTac = this.filteredThaoTac.sort((a, b) => a.name.localeCompare(b.name))
    this.formCauHinhBuoc = this.fb.group({
      tenBuoc: ["", Validators.required],
      buocTruoc: [""],
      buocSau: [""],
      thuTu: [""],
      nguoiXuLy: [""],
      thoiGianXuLy: [""],
      trangThaiHoSo: [""],
      trangThaiChungTu: [""],
      trangThai: [true],
      dinhDangKy: [""],
      viTriKy: [""]
    })
    this.getUser()
    this.getListGiayTo()
    this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
    this.getListHanhDongTheoQuyTrinh();
    // this.setDefaultValue()
    if (this.data.action == 'UPDATE') {
      this._quyTrinhService.getBuocById(this.data.data.buocPheDuyetId).subscribe(
        res => {
          if (res) {
            this.dataBuoc = res
            this.formCauHinhBuoc.patchValue({
              tenBuoc: this.dataBuoc.tenBuoc,
              buocTruoc: this.dataBuoc.buocPheDuyetTruocId,
              buocSau: this.dataBuoc.buocPheDuyetSauId,
              thuTu: this.dataBuoc.thuTu,
              nguoiXuLy: this.dataBuoc.dsNguoiThucHien,
              thoiGianXuLy: this.dataBuoc.thoiGianXuLy,
              trangThaiHoSo: Number(this.dataBuoc.trangThaiHoSo),
              trangThaiChungTu: Number(this.dataBuoc.trangThaiChungTu),
              dinhDangKy: this.dataBuoc.dinhDangKy,
              viTriKy: this.dataBuoc.viTriKy
            })
            this.dataTable = res.dsThaoTacBuocPheDuyet.map(x => {
              return {
                ...x,
                hanhDong: Number(x.hanhDong),
                trangThaiHoSo: x.trangThaiHoSo == null ? "" : Number(x.trangThaiHoSo),
                trangThaiChungTu: x.trangThaiChungTu == null ? "" : Number(x.trangThaiChungTu),
                kySo: x.kySo == true ? 1 : 2,
                isSendMail: x.isSendMail == true ? 1 : 2,
                diDenBuocPheDuyetId: x.diDenBuocPheDuyetId
              }
            })

            this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
          }
        }
      )
    }
    this.setDefaultValue()
    this.filterTTac.valueChanges.subscribe(
      value => {
        this.filteredThaoTac = this.danhSachThaoTac.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
      }
    )

    this.filterGT.valueChanges.subscribe(
      value => {
        this.filteredGiayTo = this.listGiayTo.filter(x => x.tenGiayTo.toLowerCase().includes(value.toLowerCase()));
      }
    )

    this.filterTTHS.valueChanges.subscribe(
      value => {
        this.filteredTrangThaiHS = this.trangThaiHoSo.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
      }
    )

    this.filterTTCT.valueChanges.subscribe(
      value => {
        this.filteredTrangThaiChungTu = this.trangThaiChungTu.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
      }
    )

    this.inputKySo.valueChanges.subscribe(
      value => {
        // nếu input ký số là 2 (không ký số) thì set value cho input loại ký là 3 (không ký) 
        if(value == 2){
          this.inputLoaiKy.patchValue(3)
        }
        // nếu input ký số là 21 (có ký số) thì set value cho input loại ký là 1 (ký nháy)
        if(value == 1){
          this.inputLoaiKy.patchValue(1)
        }
      }
    )
  }

  add() {
    let newData = {
      buocPheDuyetId: '',
      hanhDong: this.inputHangDong.value,
      kySo: this.inputKySo.value,
      loaiKy: this.inputLoaiKy.value,
      giayToId: this.inputGiayTo.value,
      trangThaiHoSo: this.inputTrangThaiHoSo.value,
      trangThaiChungTu: this.inputTrangThaiChungTu.value,
      isSendMail: this.inputIsSendMail.value,
      diDenBuocPheDuyetId: this.inputDiDenBuocPheDuyet.value
    }
    this.dataTable.push(newData);
    this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
    this.setDefaultValue();
    console.log(this.dataTable)
  }
  setDefaultValue() {
    this.inputHangDong.setValue(1);
    this.inputKySo.setValue('');
    this.inputLoaiKy.setValue(1);
    this.inputGiayTo.setValue('');
  }

  getListHanhDongTheoQuyTrinh() {
    this._quyTrinhService.getListBuocTheoQuyTrinh(this.data.action == "UPDATE" ? this.data.data.quyTrinhPheDuyetId : this.data.data).subscribe(
      res => {
        if (res) {
          this.listBuocPD = res
          if (this.data.action == 'CREATE') {
            this.formCauHinhBuoc.get("thuTu").setValue(res.length + 1)
          }
        }
      }
    )
  }

  getListGiayTo() {
    this._loaiHoSoService.getGiayTo().subscribe(
      res => {
        console.log(res)
        this.listGiayTo = res
        this.filteredGiayTo = res
      }
    )
  }

  getUser() {
    this.userService.getUser().pipe(this.unsubsribeOnDestroy).subscribe(next => {
      this.dsUser = next;
      for (let item of this.dsUser) {
        this.allNcc.push(item);
        if(this.data.action == 'UPDATE'){
          for (let val of this.dataBuoc.dsNguoiThucHien) {
            if (val && item.id == val) {
              this.chipSelectedNcc.push(item);
            }
          }
        }
      }
      this.filteredNcc = this.formCauHinhBuoc.controls.nguoiXuLy.valueChanges.pipe(
        startWith(null),
        map(nccName => this.filterOnValueChange(nccName))
      );
    })
  }

  private filterOnValueChange(nccName: string | null): String[] {
    let result: String[] = [];
    let allNccLessSelected = this.allNcc.filter(ncc => this.chipSelectedNcc.indexOf(ncc) < 0);
    if (nccName) {
      result = this.filterNCc(allNccLessSelected, nccName);
    } else {
      result = allNccLessSelected.map(ncc => ncc.userName);
    }
    return result;
  }

  private filterNCc(nccList: Ncc[], nccName: String): String[] {
    let filteredNccList: Ncc[] = [];
    const filterValue = nccName.toLowerCase();
    let nccsMatchingNccName = nccList.filter(ncc => ncc.userName.toLowerCase().indexOf(filterValue) === 0);
    if (nccsMatchingNccName.length || this.allowFreeTextAddNcc) {
      filteredNccList = nccsMatchingNccName;
    } else {
      filteredNccList = nccList;
    }
    return filteredNccList.map(ncc => ncc.userName);
  }

  public removeDonVi(ncc: Ncc): void {
    const index = this.chipSelectedNcc.indexOf(ncc);
    if (index >= 0) {
      this.chipSelectedNcc.splice(index, 1);
      this.resetInputs();
    }
  }
  private resetInputs() {
    this.nccInput.nativeElement.value = '';
    this.formCauHinhBuoc.controls.nguoiXuLy.setValue(null);
  }
  public nccSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectNccByName(event.option.value);
    this.resetInputs();
  }
  private selectNccByName(nccName) {
    let foundNcc = this.allNcc.filter(ncc => ncc.userName == nccName);
    if (foundNcc.length) {
      this.chipSelectedNcc.push(foundNcc[0]);
    } else {
      let highestEmployeeId = Math.max(...this.chipSelectedNcc.map(ncc => ncc.id), 0);
      this.chipSelectedNcc.push({ userName: nccName, id: highestEmployeeId + 1 });
    }
  }

  createHanhDong() {
    let ListNguoiTH = []
    let a = this.chipSelectedNcc.forEach(
      item => {
        ListNguoiTH.push(item.id)
      }
    )
    var param = {
      QuyTrinhPheDuyetId: this.data.data,
      BuocPheDuyetTruocId: this.formCauHinhBuoc.get("buocTruoc").value == "" ? null : this.formCauHinhBuoc.get("buocTruoc").value,
      BuocPheDuyetSauId: this.formCauHinhBuoc.get("buocSau").value == "" ? null : this.formCauHinhBuoc.get("buocSau").value,
      TrangThaiHoSo: this.formCauHinhBuoc.get("trangThaiHoSo").value.toString(),
      TrangThaiChungTu: this.formCauHinhBuoc.get("trangThaiChungTu").value.toString(),
      TenBuoc: this.formCauHinhBuoc.get("tenBuoc").value,
      ThuTu: parseInt(this.formCauHinhBuoc.get("thuTu").value),
      DsNguoiThucHien: ListNguoiTH,
      ThoiGianXuLy: parseInt(this.formCauHinhBuoc.get("thoiGianXuLy").value),
      DinhDangKy: this.formCauHinhBuoc.get("dinhDangKy").value,
      ViTriKy: this.formCauHinhBuoc.get("viTriKy").value,
      DsThaoTacBuocPheDuyet: this.dataTable.map(
        item => {
          return {
            BuocPheDuyetId: null,
            HanhDong: item.hanhDong.toString(),
            KySo: item.kySo == 1 ? true : false,
            LoaiKy: item.loaiKy,
            GiayToId: item.giayToId == "" ? null : item.giayToId,
            TrangThaiHoSo: item.trangThaiHoSo == null ? null : item.trangThaiHoSo.toString(),
            TrangThaiChungTu: item.trangThaiChungTu == null ? null : item.trangThaiChungTu.toString(),
            IsSendMail: item.isSendMail == 1 ? true : false,
            DiDenBuocPheDuyetId: item.diDenBuocPheDuyetId
          }
        }
      )
    }
    this._quyTrinhService.createBuocThucHhien(param).subscribe(
      res => {
        if (res.statusCode == 200) {
          this._notification.open(res.message, mType.success)
          this.dialogRef.close(true);
        }
        else if (res.statusCode == 500) {
          this._notification.open("lỗi", mType.error)
        }
        else if (res.statusCode == 400) {
          this._notification.open(res.message, mType.error)
        }
      }
    )
  }

  updateHanhDong() {
    let ListNguoiTH = []
    let a = this.chipSelectedNcc.forEach(
      item => {
        ListNguoiTH.push(item.id)
      }
    )
    var param = {
      BuocPheDuyetId: this.data.data.buocPheDuyetId,
      QuyTrinhPheDuyetId: this.data.data.quyTrinhPheDuyetId,
      BuocPheDuyetTruocId: this.formCauHinhBuoc.get("buocTruoc").value == "" ? null : this.formCauHinhBuoc.get("buocTruoc").value,
      BuocPheDuyetSauId: this.formCauHinhBuoc.get("buocSau").value == "" ? null : this.formCauHinhBuoc.get("buocSau").value,
      TrangThaiHoSo: this.formCauHinhBuoc.get("trangThaiHoSo").value.toString(),
      TrangThaiChungTu: this.formCauHinhBuoc.get("trangThaiChungTu").value.toString(),
      TenBuoc: this.formCauHinhBuoc.get("tenBuoc").value,
      ThuTu: parseInt(this.formCauHinhBuoc.get("thuTu").value),
      DsNguoiThucHien: ListNguoiTH,
      ThoiGianXuLy: parseInt(this.formCauHinhBuoc.get("thoiGianXuLy").value),
      DinhDangKy: this.formCauHinhBuoc.get("dinhDangKy").value,
      ViTriKy: this.formCauHinhBuoc.get("viTriKy").value,
      DsThaoTacBuocPheDuyet: this.dataTable.map(
        item => {
          return {
            ThaoTacBuocPheDuyetId: item.thaoTacBuocPheDuyetId,
            BuocPheDuyetId: null,
            HanhDong: item.hanhDong.toString(),
            KySo: item.kySo == 1 ? true : false,
            LoaiKy: item.loaiKy,
            GiayToId: item.giayToId == "" ? null : item.giayToId,
            TrangThaiHoSo: item.trangThaiHoSo == null ? null : item.trangThaiHoSo.toString(),
            TrangThaiChungTu: item.trangThaiChungTu == null ? null : item.trangThaiChungTu.toString(),
            IsSendMail: item.isSendMail == 1 ? true : false,
            DiDenBuocPheDuyetId: item.diDenBuocPheDuyetId
          }
        }
      )
    }
    this._quyTrinhService.updateBuocThucHhien(param).subscribe(
      res => {
        if (res.statusCode == 200) {
          this._notification.open(res.message, mType.success)
          this.dialogRef.close(true);
        }
        else if (res.statusCode == 500) {
          this._notification.open("lỗi", mType.error)
        }
        else if (res.statusCode == 400) {
          this._notification.open(res.message, mType.error)
        }
      }
    )
  }
  deleteThaoTac(i){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { disableClose: false })
        confirmDialog.componentInstance.title = 'Xác nhận xóa?';

        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataTable.splice(i, 1);
                this.dataTable.forEach((element, index) => {
                    element.thuTu = index + 1
                });
                this.dataToDisplay = new MatTableDataSource<any>(this.dataTable);
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        }, err => {
            this._notification.open(
                err,
                mType.error
            );
        });
  }

  updateThaoTac(element, i) {
    this.dataTable[i] = element
    this._notification.open(
      "Xác nhận yêu cầu cập nhật",
      mType.info
  );
  }

}
