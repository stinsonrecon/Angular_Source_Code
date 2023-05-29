import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { SystemConstants } from '@app/shared/constants';
import { CommandCode } from '../constants/commandcode';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    returnUrl: string = ''
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
        const loggedInUser = this.authService.isAuthenticated();
        const user = this.authService.user;
        this.returnUrl = state.url
        if (!loggedInUser) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }else{
            return true;
        }
        // if (loggedInUser) {
        //     const functionCode = route.data['functionCode'] as string;
        //     const permissions = user.permissions;
        //     if (permissions && functionCode === '') {
        //         return true;
        //     }
        //     if (permissions && permissions.filter(x => x === functionCode + '_' + CommandCode.XEM).length > 0) {
        //         return true;
        //     }
        //      else {
        //         this.router.navigate(['/error/401'], {
        //             queryParams: { redirect: state.url }
        //         });
        //         return false;
        //     }
        // }
    }

}
