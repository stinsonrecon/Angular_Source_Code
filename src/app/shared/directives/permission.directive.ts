import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';

@Directive({
    selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
    @Input() appFunction: string;
    @Input() appAction: string;

    constructor(private el: ElementRef, private authService: AuthService) {

    }

    ngOnInit(): void {
        const loggedInUser = this.authService.isAuthenticated();
        const user = this.authService.user;
        if (user) {
            const permissions = user.permissions;
            if (permissions && permissions.filter(x => x === this.appFunction + '_' + this.appAction).length > 0) {
                this.el.nativeElement.style.display = '';

            } else {
                this.el.nativeElement.style.display = 'none';
            }
        } else {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
