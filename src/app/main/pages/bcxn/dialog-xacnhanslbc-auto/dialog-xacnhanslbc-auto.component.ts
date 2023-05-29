import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DanhMucBaoCaoService } from '@app/shared/services/bcxn/danhmucbaocao.service';
import { TableauService } from '@app/shared/services/bcxn/tableau.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { environment } from '@environments/environment';
import { DialogUpdateYeuCauXacBhanBcComponent } from '../danhsachyeucaubaocao/dialog-update-yeucauxacnhanbc/dialog-update-yeucauxacnhanbc.component';
import { DialogViewImageComponent } from '../chitietyeucau-bkh/dialog-view-image-baocao/dialog-view-image-baocao.component';
// Declare var tableau because it is referencing the tableau js library
declare var tableau: any;
@Component({
    selector: 'app-dialog-xacnhanslbc-auto',
    templateUrl: './dialog-xacnhanslbc-auto.component.html',
    styleUrls: ['./dialog-xacnhanslbc-auto.component.scss']
})
export class DialogXacNhanSlbcAutoComponent extends BaseClass implements OnInit {
    displayedColumns = ["stt", "soLieu", "yKien", "thoiGianXN", "nguoiXN", "xem"]
    tableData: any = ['', ''];
    formControl: FormGroup;
    dsLichSuXn: any[];
    trangThaiDuLieu: boolean = false;
    ghiChu: any = "";
    src: any = "";
    ticket:any = "";
    environment = environment;
    viz: any;
    resetImage: any = false;
    imageAfterReset: any;
    constructor(private tableauService: TableauService, public dialogRef: MatDialogRef<DialogUpdateYeuCauXacBhanBcComponent>, private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public notification: NotificationService, public chiTietYcbcService: ChiTietYcbcService) { super() }

    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            isOk: [''],
            yKien: [''],
        });
        this.getTicket();
        this.getLichSuXnById();
    }
    
    getLichSuXnById() {
        this.dsLichSuXn = []
        this.chiTietYcbcService.getLichSuXnById(this.data.item.yeuCauBaoCaoId, this.data.item.baoCaoId).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.length) {
                this.dsLichSuXn = next;
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }

    // getFileXNBC() {
    //     this.dsLichSuXn = []
    //     this.chiTietYcbcService.getFileXNBC(this.data.item.siteId, this.data.item.viewName).pipe(this.unsubsribeOnDestroy).subscribe(next => {
    //         this.src = next.data;
    //     }, error => {
    //         this.notification.open(error, mType.error)
    //     })
    // }

    xacNhanBaoCao() {
        this.getTokenTableau();
    }

    getTicket(){
        this.tableauService.getTicket(this.data.item.siteName).subscribe(resp => {
            if (resp) {
                this.ticket = resp.ticket;
                    // this.getFileXNBC();
        var placeholderDiv = document.getElementById('vizContainer');
        // Replace this url with the url of your Tableau dashboard
        var url = 'https://bcqt.evn.com.vn/trusted/'+this.ticket+'/views/'+this.data.item.urlLink+'?:embed=y&:showVizHome=no&:host_url=https://bcqt.evn.com.vn/&:tabs=yes&:toolbar=yes&:display_spinner=no&:loadOrderID=0';
        var options = {
          hideTabs: true,
          width: "100%",
          height: "500px",
          onFirstInteractive: function() {
            // The viz is now ready and can be safely used.
            console.log("Run this code when the viz has finished loading.");
          }
        };
        // Creating a viz object and embed it in the container div.
        this.viz = new tableau.Viz(placeholderDiv, url, options);
            }
        })
    }
    updateConfirm() {
        let params = {
            trangThaiDuLieu: this.trangThaiDuLieu ? 1 : 2,
            ghiChu: this.ghiChu,
            nguoiTaoId: JSON.parse(localStorage.getItem("user")).id,           
        }
        this.chiTietYcbcService.xacNhanBaoCao(this.data.item.id, params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next.statusCode == 200) {
                this.notification.open('Xác nhận thành công', mType.success)
                this.getLichSuXnById();
            }
            else {
                this.notification.open('Xác nhận thất bại', mType.error)
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    getTokenTableau() {
        this.tableauService.getToken(this.data.item.siteName).subscribe(resp => {
            if (resp) {
                this.tableauService.getView(resp.credentials.site.id, this.data.item.viewName, resp.credentials.token).subscribe(resp2 => {
                    if (resp2) {
                        this.tableauService.getFileTableau(resp.credentials.site.id, resp2.viewid, resp.credentials.token).subscribe(resp3 => {
                            if (resp3) {
                                let params = {
                                    trangThaiDuLieu: this.trangThaiDuLieu ? 1 : 2,
                                    ghiChu: this.ghiChu,
                                    nguoiTaoId: JSON.parse(localStorage.getItem("user")).id,
                                    fileBaoCao: resp3 && resp3.file ? resp3.file.replaceAll("\\","/").replaceAll("wwwroot","") : ""
                                }
                                this.data.item.fileBaoCao=params.fileBaoCao;
                                this.chiTietYcbcService.xacNhanBaoCao(this.data.item.id, params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                                    if (next.statusCode == 200) {
                                        this.notification.open('Xác nhận thành công', mType.success)
                                        this.getLichSuXnById();
                                    }
                                    else {
                                        this.notification.open('Xác nhận thất bại', mType.error)
                                    }
                                }, error => {
                                    this.notification.open(error, mType.error)
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    LammoiBaoCao() {
        this.tableauService.getToken(this.data.item.siteName).subscribe(resp => {
            if (resp) {
                this.tableauService.getView(resp.credentials.site.id, this.data.item.viewName, resp.credentials.token).subscribe(resp2 => {
                    if (resp2) {
                        this.tableauService.getFileTableau(resp.credentials.site.id, resp2.viewid, resp.credentials.token).subscribe(resp3 => {
                            if (resp3) {
                                let params = {
                                    trangThaiDuLieu: this.trangThaiDuLieu ? 1 : 2,
                                    ghiChu: this.ghiChu,
                                    nguoiTaoId: JSON.parse(localStorage.getItem("user")).id,
                                    fileBaoCao: resp3 && resp3.filename ? "/fileTableAu/" + resp3.filename.replaceAll("\\","/").replaceAll("wwwroot","") : ""
                                }
                                this.chiTietYcbcService.CapnhatBC(this.data.item.id, params).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                                    if (next.statusCode == 200) {
                                        this.notification.open('Tải mới thành công', mType.success)
                                        this.resetImage = true;
                                        this.imageAfterReset = "/fileTableAu/" + resp3.filename;
                                    }
                                    else {
                                        this.notification.open('Lỗi kết nối hệ thống BI', mType.error)
                                    }
                                }, error => {
                                    this.notification.open(error, mType.error)
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    

    openDialogViewImageXacNhan(element: any) {
        let item: any = JSON.parse(JSON.stringify(element));
        console.log(item);
        const dialogRef = this.dialog.open(DialogViewImageComponent, {
            width: '1000px',
            autoFocus: false,
            data: {
                item,
            }
        });
        dialogRef.afterClosed().subscribe((response: any) => {

        });
    }
}


