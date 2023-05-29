import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService, mType } from '@app/shared/component/notification-dialog/notification.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { MatTable } from '@angular/material/table';
import { AuthService } from '@app/shared/services';
import { Router } from '@angular/router';
import { CauHinhNganHangService } from '@app/shared/services/bcxn/cau-hinh-ngan-hang.service';
import * as go from 'gojs';

@Component({
    selector: 'app-config-tknh',
    templateUrl: './dialog-add-config-tknh.component.html',
    styleUrls: ['./dialog-add-config-tknh.component.scss']
})
export class DialogAddConfigTaiKhoanNganHangComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    diagramData: any;
    diagramNodeData: go.ObjectData[];
    diagramLinkData: go.ObjectData[];
    diagramModelData: go.ObjectData = { prop: 'value' };
    skipsDiagramUpdate: boolean = false;
    diagramDivClassName: string = 'diagram';
    listNode: any = []

    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    totalRecord: any;

    constructor(
        public dialog: MatDialog,
        public _service: CauHinhNganHangService,
        public _notification: NotificationService,
        private formBuilder: FormBuilder,
        private _authService: AuthService,
        public dialogRef: MatDialogRef<DialogAddConfigTaiKhoanNganHangComponent>,

        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) {
        super()
    }

    ngOnInit(): void {
        this.dialogRef.keydownEvents().subscribe(event => {
            if(event.key === "Escape") {
                this.dialogRef.close(false);
            }
        });

        this.formControl = this.formBuilder.group({
            nganHangId : [this.data.item.nganHangId],
            linkTransferUrl : [this.data.item.linkTransferUrl],
            linkQueryBaseUrl: [this.data.item.linkQueryBaseUrl],
            ftpPath : [this.data.item.ftpPath],
            ftpUserName : [this.data.item.ftpUserName],
            ftpPassword : [this.data.item.ftpPassword],
            evndsaPath : [this.data.item.evndsaPath],
            passPhraseDSA : [this.data.item.passPhraseDSA],
            evnrsaPath : [this.data.item.evnrsaPath],
            passPhraseRSA : [this.data.item.passPhraseRSA],
            bankDSAPath : [this.data.item.bankDSAPath],
            bankRSAPath : [this.data.item.bankRSAPath],
            bankApprover : [this.data.item.bankApprover],
            bankSenderAddr : [this.data.item.bankSenderAddr],
            bankModel : [this.data.item.bankModel],
            version : [this.data.item.version],
            softwareProviderId : [this.data.item.softwareProviderId],
            bankLanguage : [this.data.item.bankLanguage],
            bankAppointedApprover : [this.data.item.bankAppointedApprover],
            bankChannel : [this.data.item.bankChannel],
            bankMerchantId : [this.data.item.bankMerchantId],
            bankClientIP : [this.data.item.bankClientIP],
            daXoa : [this.data.item.daXoa]
        })
    }

    get f() {
        return this.formControl.controls;
    }

    save() {
        this.formControl.markAllAsTouched();
        const {
            nganHangId,
            linkTransferUrl,
            linkQueryBaseUrl,
            ftpPath,
            ftpUserName,
            ftpPassword,
            evndsaPath,
            passPhraseDSA,
            evnrsaPath,
            passPhraseRSA,
            bankDSAPath,
            bankRSAPath,
            bankApprover,
            bankSenderAddr,
            bankModel,
            version,
            softwareProviderId,
            bankLanguage,
            bankAppointedApprover,
            bankChannel,
            bankMerchantId,
            bankClientIP,
            daXoa
        } = this.formControl.value

        let dataPost = {
            nganHangId : nganHangId,
            linkTransferUrl : linkTransferUrl,
            linkQueryBaseUrl : linkQueryBaseUrl,
            ftpPath : ftpPath,
            ftpUserName : ftpUserName,
            ftpPassword : ftpPassword,
            evndsaPath : evndsaPath,
            passPhraseDSA : passPhraseDSA,
            evnrsaPath : evnrsaPath,
            passPhraseRSA : passPhraseRSA,
            bankDSAPath : bankDSAPath,
            bankRSAPath : bankRSAPath,
            bankApprover : bankApprover,
            bankSenderAddr : bankSenderAddr,
            bankModel : bankModel,
            version : version,
            softwareProviderId : softwareProviderId,
            bankLanguage : bankLanguage,
            bankAppointedApprover : bankAppointedApprover,
            bankChannel : bankChannel,
            bankMerchantId : bankMerchantId,
            bankClientIP : bankClientIP,
            daXoa : daXoa === true ? false : true
        }

        this._service.createCauHinhNganHang(dataPost).pipe(this.unsubsribeOnDestroy).subscribe((res) => {
            if(res && res.success) {
                this._notification.open("Cấu hình ngân hàng thành công!", mType.success);
                this.dialogRef.close(true)
                this.dialogRef.addPanelClass('custom-disable')
            } else {
                this._notification.open("Cấu hình ngân hàng thất bại, vui lòng kiểm tra lại", mType.error)
            }
        })
    }
}