import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest } from 'app/shared/models';
import { AuthService } from '@app/shared/services';
import { MessageConstants } from '@app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DialogUpdatePasswordComponent } from '../pages/bcxn/quanlynguoidung/dialog-update-password/dialog-update-password.component';
import { AuthGuard } from '@app/shared/guard';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;
    error = '';
    loginForm: FormGroup;
    req = new LoginRequest();
    typeArray = [
        { id: 0, name: 'System' },
        { id: 1, name: 'Domain' }
    ];
    accountType: any = "1";

    /**
     * 
     * @param {FuseConfigService} _fuseConfigService 
     * @param {FormBuilder} _formBuilder 
     * @param {Router} _router 
     * @param {AuthService} _authService 
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _dialog: MatDialog,
        private userService: UserService,
        public _notification: NotificationService,
        public _authGuard: AuthGuard
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * ngOnInit
     * 
     */
    ngOnInit(): void {

        if (localStorage.getItem('accessToken_Ex')) {
            if(this._router.url != "/"){
                let urlReturn = this._authGuard.returnUrl
                this._router.navigateByUrl(urlReturn)
            }
            else {
                this._router.navigateByUrl(JSON.parse(localStorage.getItem('user')).chucNangDefault);

            }
        }

        this.loginForm = this._formBuilder.group({
            // userName: ['', [Validators.required]],
            // password: ['', [Validators.required, Validators.minLength(6)]],
            accountType: ['', Validators.required],

            username: new FormControl(this.req.username, Validators.required),
            password: new FormControl(this.req.password, Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ])),
            // accountType: new FormControl(this.req.accountType, Validators.required)
        });
    }

    // loadData(): void {
    //     this.loginForm.patchValue({
    //         accountType: '0'
    //     });
    // }

    get f(): any { return this.loginForm.controls; }

    onSubmit(): void {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.req = this.loginForm.getRawValue();
        // this.req.accountType = parseInt(this.req.accountType.toString(), 0);
        // this.req.rememberMe = false;
        if (this.accountType == 0) {
            this._authService.login(this.req)
                // .pipe(first())
                .subscribe(
                    data => {
                        if (data.success&& data.resultObj.token) {
                            let differenceDate = (new Date().getTime() - new Date(data.resultObj.changePassWordDate).getTime()) / (24 * 3600000);
                            if(this._router.url != '/' && this._router.url != '/login'){
                                let urlReturn = this._authGuard.returnUrl
                                this._router.navigateByUrl(urlReturn)
                            }
                            else{
                                this._router.navigate([data.resultObj.chucNangDefault]);
                            }
                            if (data.resultObj && data.resultObj.changePassWordDate && differenceDate >= 90) {
                                this.openDialogUpdatePassword();
                            }
                        }
                        else {
                            // this.error = data.message;
                            this.error = MessageConstants.LOGIN_FAILD;
                            this.loading = false;
                        }
                    },
                    error => {
                        // this.error = error.error.message;
                        this.error = MessageConstants.LOGIN_FAILD;
                        this.loading = false;
                    }
                );
        }
        else if (this.accountType == 1) {
            let item: any = {
                userName: this.req.username,
                password: this.req.password,
                deviceId: this.generateUUID()
            }
            this._authService.loginHRMS(item).subscribe(
                data => {
                    // console.log("cuoi cung1"+ this.loading);  
                    console.log(data);          
                    if (data.success&& data.resultObj.token) {
                        let differenceDate = (new Date().getTime() - new Date(data.resultObj.changePassWordDate).getTime()) / (24 * 3600000);
                        if(this._router.url != '/' && this._router.url != '/login'){
                            let urlReturn = this._authGuard.returnUrl
                            this._router.navigateByUrl(urlReturn)
                        }
                        else{
                            this._router.navigate([data.resultObj.chucNangDefault]);
                        }
                        if (data.resultObj && data.resultObj.changePassWordDate && differenceDate >= 90) {
                            this.openDialogUpdatePassword();
                        }
                    }
                    else {
                        console.log("Dang nhap khong dung");
                        this.error = MessageConstants.LOGIN_FAILD;
                        this.loading = false;
                    }
                },
                error => {
                    console.log("Loi"+ this.loading);
                    this.error = MessageConstants.LOGIN_FAILD;
                    this.loading = false;
                }
            );
            console.log("cuoi cung"+ this.loading);
        }
    }

    generateUUID(): any { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    openDialogUpdatePassword() {
        let item: any = {
            passwordNew: null,
            id: JSON.parse(localStorage.getItem('user')).id,
            userName: JSON.parse(localStorage.getItem('user')).username,
            isAccountHolder: true,
            isClose: false
        };
        // item = JSON.parse(JSON.stringify(element));
        const dialogRef = this._dialog.open(DialogUpdatePasswordComponent, {
            width: '500px',
            data: {
                item
            },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((response: any) => {
            if (response === true) {
                this.userService.userChangePassword(item).subscribe(resp => {
                    if (resp.statusCode == 200) {
                        this._notification.open(
                            "Cập nhật thành công!",
                            mType.success
                        );
                        this._router.navigate(['/login']);
                    } else {
                        this._notification.open(
                            "Cập nhật thất bại!",
                            mType.error
                        );
                    }

                })
            }
        });
    }
}

