import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any = [];

    itemParent: any = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _chucNangService: ChucNangService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Load the navigation either from the input or from the service
        // this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // // Subscribe to the current navigation changes
        // this._fuseNavigationService.onNavigationChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {

        //         // Load the navigation
        //         this.navigation = this._fuseNavigationService.getCurrentNavigation();

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // // Subscribe to navigation item
        // merge(
        //     this._fuseNavigationService.onNavigationItemAdded,
        //     this._fuseNavigationService.onNavigationItemUpdated,
        //     this._fuseNavigationService.onNavigationItemRemoved
        // ).pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
        // this.navigation = [
        //     {
        //         chucNangChaId: "item1",
        //         title: "Yêu cầu báo giá",
        //         url: "csdlgia/yeucaubaogia"
        //     },
        //     {
        //         type:"item",
        //         title: "Báo giá nhà cung cấp",
        //         url:"csdlgia/yeucaubaogiancc"
        //     }
        // ]
        // console.log('navigation', this.navigation);
        if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).nhomQuyenId) {
            this._chucNangService.getChucNang().subscribe(resp => {
                this.navigation = resp.filter(item => item.type == 1);
                this.itemParent = this.navigation ? this.navigation.filter(item => item.chucNangChaId == 0) : [];
                this._changeDetectorRef.markForCheck();
            })
        }

    }
}
