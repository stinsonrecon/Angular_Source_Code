import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { User, Company } from '@app/shared/models';
import { AuthService } from '@app/shared/services';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { mType, NotificationService } from '@app/shared/component/notification-dialog/notification.service';
import { DialogUpdatePasswordComponent } from '@app/main/pages/bcxn/quanlynguoidung/dialog-update-password/dialog-update-password.component';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    

    // Private
    private _unsubscribeAll: Subject<any>;
    user: User | null;
    company: Company | null;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _authService: AuthService,
        private _router: Router,
        private _dialog: MatDialog,
        private userService: UserService,
        public _notification: NotificationService
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'vi',
                title: 'Việt Nam',
                flag: 'vn'
            },
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            // {
            //     id: 'tr',
            //     title: 'Turkish',
            //     flag: 'tr'
            // }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        _authService._authUser
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });
        _authService._curCompany
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(company => {
                this.company = company;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //window.onbeforeunload = () =>localStorage.clear();

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    get username(): string {
        return this.user != null ? this.user.username : '';
    }

    get companyname(): string {
        return this.company != null ? this.company.tenDonVi : '';
    }

  

    signOut(): void {
        this._authService.logout();
        this._router.navigate(['/login']);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    openDialogUpdatePassword() {
        let item: any = {
            passwordNew:null,
            id: JSON.parse(localStorage.getItem('user')).id,
            userName: JSON.parse(localStorage.getItem('user')).username,
            isAccountHolder: true,
            isClose:true
        };
        // item = JSON.parse(JSON.stringify(element));
        const dialogRef = this._dialog.open(DialogUpdatePasswordComponent, {
            width: '500px',
            data: {
                item
            }
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
