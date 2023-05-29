import { Component, Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Directive() 
export abstract class BaseClass implements OnDestroy {
    private destroyer$ = new Subject<any>();
    protected unsubsribeOnDestroy = (source: Observable<any>): Observable<any> => {
        return source.pipe(
            takeUntil(this.destroyer$)
        );
    }
    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }
}
