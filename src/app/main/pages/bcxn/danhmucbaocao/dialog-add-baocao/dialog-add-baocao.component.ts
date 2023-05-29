import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { BaoCaoService } from '@app/shared/services/bcxn/baocao.service';

@Component({
    selector: 'app-dialog-add-baocao',
    templateUrl: './dialog-add-baocao.component.html',
    styleUrls: ['./dialog-add-baocao.component.scss']
})
export class DialogAddBaocaoComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    dsLoaiBaoCao: any = [];
    dsLinhVuc: any = [];
    dsLinhVucCha: any = [];
    dsPhongBan: any = [];
    dsPhongBanCha: any = [];
    dsSoLieu: any = [];
    token: any = null;
    @ViewChild("divUrl", {read: ElementRef}) divUrl: ElementRef;
    @ViewChild("divSiteView", {read: ElementRef}) divSiteView: ElementRef;
    @ViewChild("divId", {read: ElementRef}) divId: ElementRef;
    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddBaocaoComponent>, private baoCaoService: BaoCaoService,
        @Inject(MAT_DIALOG_DATA) public data: any) { super() }
    
    ngOnInit(): void {
        this.formControl = this.formBuilder.group({
            tenBaoCao: ['', [Validators.required]],
            loaiBaoCao: ['', this.checkNull],
            phongBan: ['', this.checkNull],
            linhVuc: ['', this.checkNull],
            soLieu: ['', [Validators.required]],
            urlLink: [''],
            siteName: [''],
            viewName: [''],
            trangThai: ['']
        });
        this.getLinhVuc();
        this.getPhongBan();
    }
    checkNull(control: AbstractControl): { [key: string]: any } | null {
        if(control.value == -99) return {"null": true};
        return null;
    }
    siteNameError(control: AbstractControl): {[key: string]: any} {
        return {"siteNameError": true};
    }
    viewNameError(control: AbstractControl): {[key: string]: any} {
        return {"viewNameError": true};
    }
    getLinhVuc() {
        this.baoCaoService.getLinhVuc().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            for(let obj of next.data) {
                if(obj.linhVucChaId == 0) {
                    this.dsLinhVuc.push(obj);
                    this.dsLinhVucCha.push(obj);
                }
            }
            for(let index in next.data) {
                if(next.data[index].linVucChaId != 0) {
                    let tmp = this.dsLinhVucCha.map(res => res.id).indexOf(next.data[index].linhVucChaId);
                    if(tmp == this.dsLinhVucCha.length - 1) {
                        this.dsLinhVuc.push(next.data[index]);
                    }
                    else {
                        let tmp2 = this.dsLinhVuc.map(res => res.id).indexOf(this.dsLinhVucCha[tmp + 1].id);
                        if(tmp2 > 0) {
                            this.dsLinhVuc.splice(tmp2, 0, next.data[index]);
                        }
                    }
                }
            }
        });
    }
    getPhongBan() {
        this.baoCaoService.getPhongBan().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            for(let obj of next.data) {
                if(obj.donViChaId == 0) {
                    this.dsPhongBan.push(obj);
                    this.dsPhongBanCha.push(obj);
                }
            }
            for(let index in next.data) {
                if(next.data[index].donViChaId != 0) {
                    let tmp = this.dsPhongBanCha.map(res => res.id).indexOf(next.data[index].donViChaId);
                    if(tmp == this.dsPhongBanCha.length - 1) {
                        this.dsPhongBan.push(next.data[index]);
                    }
                    else {
                        let tmp2 = this.dsPhongBan.map(res => res.id).indexOf(this.dsPhongBanCha[tmp + 1].id);
                        if(tmp2 > 0) {
                            this.dsPhongBan.splice(tmp2, 0, next.data[index]);
                        }
                    }
                }
            }
        });
    }
    getSiteId() {
        if(this.data.item.soLieuId == 1) {
            if(this.data.item.siteName == null) this.data.item.siteName = "";
            this.baoCaoService.getSiteId(this.data.item.siteName).subscribe(res => {
                if(res.credentials) {
                    this.formControl.controls["siteName"].clearValidators();
                    let tmp = this.formControl.controls["siteName"].value;
                    this.formControl.controls["siteName"].reset();
                    this.formControl.controls["siteName"].setValue(tmp);
                    this.data.item.siteId = res.credentials.site.id;
                    this.token = res.credentials.token;
                    this.getViewId();
                }
                else {
                    this.data.item.siteId = null;
                    this.data.item.viewId = null;
                    this.formControl.controls["siteName"].setValidators(this.siteNameError);
                    let tmp = this.formControl.controls["siteName"].value;
                    this.formControl.controls["siteName"].reset();
                    this.formControl.controls["siteName"].setValue(tmp);
                    this.formControl.controls["viewName"].clearValidators();
                    tmp = this.formControl.controls["viewName"].value;
                    this.formControl.controls["viewName"].reset();
                    this.formControl.controls["viewName"].setValue(tmp);
                    this.save();
                }
            });
        }
        else {
            this.data.item.urlLink = null;
            this.data.item.siteId = null;
            this.data.item.siteName = null;
            this.data.item.viewId = null;
            this.data.item.viewName = null;
            this.save();
        }
    }
    getViewId() {
        this.baoCaoService.getViewId(this.token, this.data.item.viewName, this.data.item.siteId).subscribe(res => {
            if(res) {
                this.formControl.controls["viewName"].clearValidators();
                let tmp = this.formControl.controls["viewName"].value;
                this.formControl.controls["viewName"].reset();
                this.formControl.controls["viewName"].setValue(tmp);
                this.data.item.viewId = res.viewid;
            }
            else {
                if(this.data.item.viewName.trim()) {
                    this.formControl.controls["viewName"].setValidators(this.viewNameError);
                    let tmp = this.formControl.controls["viewName"].value;
                    this.formControl.controls["viewName"].reset();
                    this.formControl.controls["viewName"].setValue(tmp);
                }
                this.data.item.viewId = null;
            }
            this.save();
        });
    }
    get f() {
        return this.formControl.controls;
    }
    changeDisplay() {
        if(this.divUrl) {
            if(this.divUrl.nativeElement.classList.contains("hidden")) {
                this.divUrl.nativeElement.classList.remove("hidden");
            }
            else {
                this.divUrl.nativeElement.classList.add("hidden");
            }
        }
        if(this.divSiteView) {
            if(this.divSiteView.nativeElement.classList.contains("hidden")) {
                this.divSiteView.nativeElement.classList.remove("hidden");
            }
            else {
                this.divSiteView.nativeElement.classList.add("hidden");
            }
        }
        if(this.divId) {
            if(this.divId.nativeElement.classList.contains("hidden")) {
                this.divId.nativeElement.classList.remove("hidden");
            }
            else {
                this.divId.nativeElement.classList.add("hidden");
            }
        }
    }
    save() {
        this.data.item.trangThaiHoatDong = this.data.item.trangThaiHoatDong ? 1 : 0;
        this.formControl.markAllAsTouched();

        if (this.formControl.invalid) {
            return;
        } else {
            
            this.dialogRef.close(true);
        }

    }

}
