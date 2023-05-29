import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseClass } from '@app/base-class';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { loaiDonVi } from '@app/shared/constants/bcxn.constants';
import { formatDateString } from '@app/shared/constants/util';
import { ChiTietYcbcService } from '@app/shared/services/bcxn/chitietycbc.service';
import { DanhSachYeuCauBaoCaoService } from '@app/shared/services/bcxn/danhsachyeucaubaocao.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-danhsachycxnbc-bcm',
  templateUrl: './danhsachycxnbc-bcm.component.html',
  styleUrls: ['./danhsachycxnbc-bcm.component.scss']
})
export class DanhCachYcxnbcBcmComponent extends BaseClass implements OnInit {
    chungLoai: any = []
    displayedColumns = ["stt","tieuDe", "yeuCauXacNhanBC", "bcDaXN", "hanXN", "thoiGianTao", "trangThai", "thaoTac"]
    dsDonVi: any;
    dsUser: any;
    loaiDonVi = loaiDonVi
    searchItem: any = {
        loaiBaoCao: -99,
        nam: -99,
        trangThai: -99,
        pageIndex: 1,
        pageSize: 10
    }

    tableData: any = ['', ''];
    totalRecord: any = 0;
    namList: any = [];
    nam: number;
    quy: number;
    thang: number;
    dsYcbc: any = [];
    checkNhomQuyen:boolean= true;
    constructor(public dialog: MatDialog, private router: Router, private chiTietYcbcService: ChiTietYcbcService, public notification: NotificationService, public danhSachYeuCauBaoCaoService: DanhSachYeuCauBaoCaoService) { super() }


    ngOnInit(): void {
        this.namInit();
        this.getDsYcbc();
        this.checkNhomQuyen = false;
    }

    namInit() {
        let today = new Date();
        this.nam = today.getFullYear()
        this.thang = today.getMonth()
        for (let index = today.getFullYear(); index > today.getFullYear() - 6; index--) {
            this.namList.push(index);
        }
        if (today.getMonth() < 4) {
            this.quy = 1;
        }
        else if (today.getMonth() < 7) {
            this.quy = 2;
        }
        else if (today.getMonth() < 10) {
            this.quy = 3;
        }
        else if (today.getMonth() < 13) {
            this.quy = 4;
        }
    }
    getDsYcbc(e?: any) {
        if (e && e.pageIndex !== "" && e.pageIndex !== undefined) {
            this.searchItem.pageIndex = e.pageIndex + 1;
        }
        if (e && e.pageSize !== "" && e.pageSize !== undefined) {
            this.searchItem.pageSize = e.pageSize;
        }
        this.searchItem.donViId = JSON.parse(localStorage.getItem("user")).idDonVi;
        this.danhSachYeuCauBaoCaoService.getDsYcbc(this.searchItem).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            if (next && next.statusCode == 200) {
                let today = new Date();
                next.data.forEach(element => {
                    if(new Date(element.hanHoanThanh) < new Date(formatDateString(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(), "mm/dd/yyyy")) && element.trangThai != 4){
                        element.trangThai = 3;
                        this.danhSachYeuCauBaoCaoService.updateTrangThaiYcbc(element.id, element.trangThai).pipe(this.unsubsribeOnDestroy).subscribe(next => {
                        })
                    }
                });
                this.dsYcbc = next.data;
                this.totalRecord = next ? next.totalRecord : 0;
            }
        }, error => {
            this.notification.open(error, mType.error)
        })
    }
    view(id) {
        this.router.navigate(['/bcxn/chitietyeucaubcm'], {
            queryParams: { id: id }
        });
    }
    checkRole(id: any) {
        if (JSON.parse(localStorage.getItem("user")).listChucNang.indexOf(id) != -1) {
            return true;
        } else {
            return false;
        }
    }
    downloadCompletedFileMerge(id: any) {
        this.chiTietYcbcService.getCompletedFileMerge(id).subscribe(res => {
            window.open(res && res.data ? environment.apiUrl + res.data.replaceAll("\\", "/").replaceAll("wwwroot", "").replaceAll(".jpg", ".pptx") : "");
        });
    }
}