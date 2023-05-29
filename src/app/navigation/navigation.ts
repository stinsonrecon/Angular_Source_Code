import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Router } from '@angular/router';
import { AuthService,  } from '@app/shared/services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImisNavigation {
    navigation: any;

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _router: Router,
        private _authService: AuthService,
     
    ) { }

    getMenu(menuid: string): void {
        if (this._authService.user == null) {
            return;
        }
        
    }

}



export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'sample',
                title: 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'email',
                url: '/sample',
                badge: {
                    title: '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            }
        ]
    }
];

//http://react-material.fusetheme.com/ui/icons

