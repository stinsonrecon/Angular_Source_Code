import { dsThongKe } from './../../../../shared/models/giamsat/phanchobana.viewmodel';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DialogXacNhanSlbcAutoComponent } from '../dialog-xacnhanslbc-auto/dialog-xacnhanslbc-auto.component';
import { DialogXacNhanSlbcFileComponent } from '../dialog-xacnhanslbc-file/dialog-xacnhanslbc-file.component';
import { DialogXemLichSuComponent } from '../dialog-xem-lichsu/dialog-xem-lichsu.component';
import { environment } from '@environments/environment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { DialogUpdateYeuCauXacBhanBcComponent } from '../danhsachyeucaubaocao/dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';
import { TableauService } from '@app/shared/services/bcxn/tableau.service';
import { DialogViewImageComponent } from './dialog-view-image-baocao/dialog-view-image-baocao.component';
import { DialogDongXacnhanComponent } from './dialog-dong-xacnhan/dialog-dong-xacnhan.component';

@Component({
    selector: 'app-chitietyeucau-bkh',
    templateUrl: './chitietyeucau-bkh.component.html',
    styleUrls: ['./chitietyeucau-bkh.component.scss']
})
export class ChiTietYeuCauBkhComponent extends BaseClass implements OnInit {
    displayedColumns = ["stt", "tenBaoCao","tenLinhVuc", "banXN", "loaiBaoCao", "trangThai", "soLieu", "thoiGianXN", "thaoTac"]
    displayedColumns1Lv1 = ["stt", "ban", "solieudung", "chuaDung", "chuaXacNhan", "tongSo"]
    displayedColumns1Lv2 = ["colspan-stt", "colspan-ban", "colspan-daXacNhan", "colspan-chuaXacNhan", "colspan-tongSo"]
    pagination: any = {
        pageIndex: 1,
        pageSize: 10
    }
    searchItem: any = {
        trangThaiXacNhan: -99,
    }
    dsThuTu: any[];

    tableData: any = ['', ''];
    totalRecord: any = 0;
    dsUser: any;
    idYCBC: any;
    dsBaoCaoXacNhan: any[];
    dsThongKe: any[];
    changeView = false;
    @ViewChild('table') table: MatTable<Element>;
    ycbc: any;
    tongSoBcxn: any;
    soBcDaXn: any;
    environment = environment;

    // get AttachFile
    @ViewChildren("fileUpload") fileUpload: QueryList<ElementRef>;
    constructor(private router: Router, private route: ActivatedRoute, public notification: NotificationService, public chiTietYcbcService: ChiTietYcbcService, public dialog: MatDialog, public danhSachYeuCauBaoCaoService: DanhSachYeuCauBaoCaoService, private tableauService: TableauService) {
        super()
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.idYCBC = params['id'];
            this.getBcxnById();
            this.getYcbcById();
            this.getThongKeBC();
        });
    }

    getThongKeBC() {
        this.dsThongKe = []
        this.chiTietYcbcService.getThongKeBC(this.idYCBC).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (!next.length) {
                this.notification.open('Chưa có dữ liệu thống kê', mType.info)
            }
            else {
                this.dsThongKe = next;
                // this.linhVucId = next && next[0] ? next[0].id : null
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }

    getBcxnById(e?: any) {
        this.dsBaoCaoXacNhan = []
        let donViId: any = [];
        donViId = -1;
        this.chiTietYcbcService.getBcxnById(donViId, this.idYCBC, this.searchItem.trangThaiXacNhan).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (!next.length) {
                this.notification.open('Chưa có dữ liệu báo cáo xác nhận', mType.info)
            }
            else {
                this.dsBaoCaoXacNhan = next;
                this.dsThuTu = [];
                for (let i = 1; i <= this.dsBaoCaoXacNhan.length; i++) {
                    this.dsThuTu.push({ hienthi: i, giatri: i });
                    this.dsBaoCaoXacNhan[i-1].sapXep=i;
                }
                console.log(this.dsBaoCaoXacNhan);
                // this.linhVucId = next && next[0] ? next[0].id : null
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    getYcbcById() {
        this.ycbc = {}
        this.tongSoBcxn = ''
        this.soBcDaXn = ''
        let donViId: any = [];
        donViId = -1;
        this.chiTietYcbcService.getYcbcById(donViId, this.idYCBC).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next) {
                this.ycbc = next;
                this.ycbc.baoCaoDaXN = this.ycbc.baoCaoDaXN.replace(/\s+/g, '')
                let a = this.ycbc.baoCaoDaXN.indexOf("/")
                this.soBcDaXn = this.ycbc.baoCaoDaXN.substring(0, a)
                this.tongSoBcxn = this.ycbc.baoCaoDaXN.substring(a + 1, this.ycbc.baoCaoDaXN.length)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    saveGiaThuTu(data: any) {      
        let tang = false;
        let batdau = 0;
        let ketthuc = this.dsBaoCaoXacNhan.length - 1;
        for (let i = 0; i < this.dsBaoCaoXacNhan.length; i++)
            if (this.dsBaoCaoXacNhan[i].id == data.id)//Kiem tra neu trung id
            {
                if (data.sapXep - 1 > i) {
                    tang = true;
                    batdau = i;
                    ketthuc = data.sapXep - 1;
                }
                else {
                    tang = false;
                    batdau = data.sapXep - 1;
                    ketthuc = i;
                }
                //this.dsBaoCaoXacNhan[i].sapXep = data.sapXep;
               
            }

        for (let i = batdau; i < ketthuc; i++) {
            if (this.dsBaoCaoXacNhan[i].id == data.id)//Kiem tra neu trung id
            {
                this.dsBaoCaoXacNhan[i].sapXep = data.sapXep;
            }
            else {
                if (tang) {
                    this.dsBaoCaoXacNhan[i].sapXep = i - 1;
                }
                else {
                    this.dsBaoCaoXacNhan[i].sapXep = i + 2;
                }

            }
            console.log(this.dsBaoCaoXacNhan[i]);
            console.log('thutu'+i);
        }
        let tableData = this.dsBaoCaoXacNhan.map(item => {
            return {
                id: item.id,
                sapXep: item.sapXep
            }
        })

        console.log(tableData);
        this.chiTietYcbcService.putBcxn(tableData).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.getBcxnById()
            }
            else {
                this.notification.open('Chưa lưu được cách sắp xếp', mType.error)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })

    }
    dropTable(event: CdkDragDrop<Element[]>) {
        // let item = this.dsBaoCaoXacNhan.splice(event.previousIndex, 1);
        // this.dsBaoCaoXacNhan.splice(event.currentIndex, 0, item[0]);
        moveItemInArray(this.dsBaoCaoXacNhan, event.previousIndex, event.currentIndex);
        this.dsBaoCaoXacNhan = [...this.dsBaoCaoXacNhan]
        this.dsBaoCaoXacNhan.forEach((element, index) => {
            element.sapXep = index + 1
        });
        this.putTable(this.dsBaoCaoXacNhan)
    }

    drop(event: CdkDragDrop<any>) {
        this.dsBaoCaoXacNhan[event.previousContainer.data.index] = event.container.data.item
        this.dsBaoCaoXacNhan[event.container.data.index] = event.previousContainer.data.item
        this.dsBaoCaoXacNhan.forEach((element, index) => {
            element.sapXep = index + 1
        });
        this.putTable(this.dsBaoCaoXacNhan)
    }

    putTable(data: any) {
        let tableData = data.map(item => {
            return {
                id: item.id,
                sapXep: item.sapXep
            }
        })
        this.chiTietYcbcService.putBcxn(tableData).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.getBcxnById()
            } else {
                this.notification.open('Chưa lưu được cách sắp xếp', mType.error)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }

    openDialogUpdateYcbc() {
        let item: any = JSON.parse(JSON.stringify(this.ycbc));
        const dialogRef = this.dialog.open(DialogUpdateYeuCauXacBhanBcComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.danhSachYeuCauBaoCaoService.updateYcbc(item).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                    if (next.statusCode == 200) {
                        if (item.trangThai == 2) {
                            this.notification.open(
                                "Đã gửi yêu cầu báo cáo!",
                                mType.success
                            );

                        }
                        else {
                            this.notification.open(
                                "Đã cập nhật yêu cầu báo cáo!",
                                mType.success
                            );
                        }
                        this.getYcbcById();
                        this.getBcxnById();
                        this.getThongKeBC();
                    } else {
                        this.notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }

    openDialogXacNhan(element: any) {
        if (this.ycbc.trangThai != 2) {
            return;
        }
        if (element.soLieuId == 1) {
            this.openDialogXacNhanSlbcAuto(element)
        }
        else {
            if (element.soLieuId == 2) {
                this.openDialogXacNhanSlbcFile(element)
            }
        }
    }

    openDialogXacNhanSlbcAuto(element: any) {
        console.log(element);
        let item: any = JSON.parse(JSON.stringify(element));
        const dialogRef = this.dialog.open(DialogXacNhanSlbcAutoComponent, {
            maxWidth: '100vw',
            maxHeight: 'auto',
            height: 'auto',
            width: '98%',
            autoFocus: false,
            data: {
                item,
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            this.getBcxnById();
            this.getThongKeBC();
            this.getYcbcById();
        });
    }

    openDialogViewImageXacNhan(element: any) {

        let item: any = JSON.parse(JSON.stringify(element));
        console.log(item);
        const dialogRef = this.dialog.open(DialogViewImageComponent, {
            maxWidth: '100vw',
            maxHeight: 'auto',
            height: 'auto',
            width: '98%',
            autoFocus: false,
            data: {
                item,
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {

        });
    }

    openDialogXacNhanSlbcFile(element: any) {

        let item: any = element;
        //   let item:{
        //     isOk:0,
        //     yKien:''
        // }
        const dialogRef = this.dialog.open(DialogXacNhanSlbcFileComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item,
                // ycbcId: this.idYCBC,
                // bcxnId:element.id
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            this.getBcxnById();
            this.getThongKeBC();
            this.getYcbcById();
        });
    }
    openDialogXemLichSu(element: any) {
        let item: any = JSON.parse(JSON.stringify(element));

        const dialogRef = this.dialog.open(DialogXemLichSuComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item,
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {
        });
    }
    goBack() {
        this.router.navigate(['/bcxn/danhsachyeucaubaocao']
        );
    }
    checkRole(id: any) {
        if (JSON.parse(localStorage.getItem("user")).listChucNang.indexOf(id) != -1) {
            return true;
        } else {
            return false;
        }
    }
    dongXacNhan() {
        let item: any = {
            file: null
        }
        const confirmDialog = this.dialog.open(DialogDongXacnhanComponent, { 
            width: "1000px",
            autoFocus: false,
            data: {
                item
            }
        });
        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                const formData = new FormData();
                formData.append('file', item.file);
                this.chiTietYcbcService.uploadCompletedFileMerge(formData, this.idYCBC).pipe(this.unsubsribeOnDestroy).subscribe({
                    next: resFile => {
                        if(resFile.success) {
                            this.danhSachYeuCauBaoCaoService.updateTrangThaiYcbc(this.idYCBC, 4).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                                if (next.statusCode == 200) {
                                    this.notification.open(
                                        "Đóng xác nhận thành công!",
                                        mType.success
                                    );
                                    this.getBcxnById();
                                    this.getThongKeBC();
                                    this.getYcbcById();
                                } else {
                                    this.notification.open(
                                        "Đóng xác nhận thất bại!",
                                        mType.error
                                    );
                                }
                            });
                        }
                        else {
                            this.notification.open(
                                "Đóng xác nhận thất bại!",
                                mType.error
                            );
                        }
                    },
                    error: err => {
                        this.notification.open(
                            "Đóng xác nhận thất bại!",
                            mType.error
                        );
                    }
                });
            } else {
                //this._notification.open('Xoá thất bại!', mType.error);
            }
        });
    }

    downloadTemplate() {
        window.open(environment.apiUrl + "/template/template.pptx");
    }

    downloadFileMerge() {
        let listFileName = [];
        this.dsBaoCaoXacNhan.map(item => {
            if (item.fileBaoCao) {
                if(item.fileBaoCao == "wwwroot/fileTableAu/template.pptx") {
                    listFileName.push("template.pptx");
                }
                else {
                    listFileName.push(item.fileBaoCao.split("/").pop().replaceAll(".jpg", ".pptx"));
                }
            }
        })
        let params = {
            data: listFileName,
            ycbcId: parseInt(this.idYCBC)
        }
        this.tableauService.getFileMerge(params).subscribe(resp => {
            console.log(resp);
            window.open(resp && resp.filePPTXFullPath ? environment.apiUrl + resp.filePPTXFullPath.replaceAll("\\", "/").replaceAll("wwwroot", "") : "");
        })
    }

    downloadFileMergeByID() {
        let listid = [];
        let listFileName = [];
        this.dsBaoCaoXacNhan.map(item => {
            listid.push(item.baoCaoId);
            if (item.fileBaoCao) {
                if(item.fileBaoCao == "wwwroot/fileTableAu/template.pptx") {
                    listFileName.push("template.pptx");
                }
                else {
                    listFileName.push(item.fileBaoCao.split("/").pop().replaceAll(".jpg", ".pptx"));
                }
            }
        })
        
        let params = {
            dataid: listid,
            datafile: listFileName,
            ycbcId: parseInt(this.idYCBC)
        }
        console.log(listFileName);
        console.log(listid);
        this.tableauService.getFileMerge(params).subscribe(resp => {
            console.log(resp);
            window.open(resp && resp.filePPTXFullPath ? environment.apiUrl + resp.filePPTXFullPath.replaceAll("\\", "/").replaceAll("wwwroot", "") : "");
        })
    }

    downloadCompletedFileMerge() {
        this.chiTietYcbcService.getCompletedFileMerge(this.idYCBC).subscribe(res => {
            window.open(res && res.data ? environment.apiUrl + res.data.replaceAll("\\", "/").replaceAll("wwwroot", "").replaceAll(".jpg", ".pptx") : "");
        });
    }

    // get AttachFile
    changeName(element: any) {
        let index = this.dsBaoCaoXacNhan.indexOf(element);
        if(!element.fileUpload) {
            element.fileUpload = this.fileUpload.toArray()[index].nativeElement;
        }
        if (element.fileUpload) {
            element.tenFile = element.fileUpload.files[0].name;
        }
        if(element.fileUpload.files[0].type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || element.fileUpload.files[0].type == "application/vnd.ms-powerpoint") {
            this.openDialogXacNhanSlbcFile(element);
        }
        else {
            this.notification.open("Chỉ chọn file định dạng ppt, pptx", mType.info);
        }
    }
    onDragOver(event: any, element: any) {
        event.preventDefault();
        event.stopPropagation();
        element.isActive = true;
    }
    onDrop(event: any, element: any) {
        event.preventDefault();
        event.stopPropagation();
        let droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            let index = this.dsBaoCaoXacNhan.indexOf(element);
            this.fileUpload.toArray()[index].nativeElement.files = droppedFiles;
            element.fileUpload = this.fileUpload.toArray()[index].nativeElement;
        }
        this.changeName(element);
        element.isActive = false;
    }
    onDragLeave(event: any, element: any) {
        event.preventDefault();
        event.stopPropagation();
        element.isActive = false;
    }
}
