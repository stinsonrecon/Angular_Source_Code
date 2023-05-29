import { Component, OnInit, OnDestroy } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as vietnam } from './i18n/vi';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { User, Company } from '@app/shared/models';
import { AuthService,  } from '@app/shared/services';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { ImisNavigation } from '@app/navigation/navigation';
import { fuseAnimations } from '@fuse/animations';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: fuseAnimations
})
export class HomeComponent {
    navigation: any;
    user: User | null;
    company: Company | null;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _router: Router,
        private _authService: AuthService,
      
        private _imisNavigation: ImisNavigation
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                }
            }
        };

        this._fuseTranslationLoaderService.loadTranslations(vietnam, english, turkish);

        _authService._authUser.subscribe(user => {
            this.user = user;
        });
        _authService._curCompany.subscribe(company => {
            this.company = company;
        });

    }

    gotoModule(menuid: string): void {
        this._authService.setMenu(menuid);
        this._imisNavigation.getMenu(menuid);
        if (menuid === '110000') {
            this._router.navigateByUrl('/hethong/quantri/users');
        }
        else if (menuid === '120000') {
            this._router.navigateByUrl('/kehoach/duan/dsduan');
        }
        else if (menuid === '130000') {
            this._router.navigateByUrl('/cbdt/ketqua/dsttdt');
        }
        else if (menuid === '140000') {
            this._router.navigateByUrl('/btgpmb');
        }
        else if (menuid === '150000') {
            this._router.navigateByUrl('/dauthau/gtdtxd/dskhlcnt');
        }
        else if (menuid === '160000') {
            this._router.navigateByUrl('/qlhd/hopdong/danhsach');
        }
        else if (menuid === '170000') {
            this._router.navigateByUrl('/pdtkbvtc');
        }
        else if (menuid === '180000') {
            this._router.navigateByUrl('/gsks');
        }
        else if (menuid === '190000') {
            this._router.navigateByUrl('/gstc');
        }
        else if (menuid === '200000') {
            this._router.navigateByUrl('/gsat');
        }
        else if (menuid === '210000') {
            this._router.navigateByUrl('/gntt');
        }
        else if (menuid === '220000') {
            this._router.navigateByUrl('/cbvh');
        }
        else if (menuid === '230000') {
            this._router.navigateByUrl('/ktdautu/ttquyettoan/dsquyettoan');
        }
        else if (menuid === '240000') {
            this._router.navigateByUrl('/hstl');
        }
        else if (menuid === '250000') {
            this._router.navigateByUrl('/qlgia');
        }
        else if (menuid === '260000') {
            this._router.navigateByUrl('/dgclnt');
        }
        else if (menuid === '270000') {
            this._router.navigateByUrl('/khodlnt');
        }
    }

}
