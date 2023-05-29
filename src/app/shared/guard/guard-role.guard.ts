import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChucNangService } from '../services/bcxn/chucnang.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  dsChucNang: any = [];
  constructor(private _chucNangService: ChucNangService, private _router: Router,) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise(res => {
      if(JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).nhomQuyenId){
        this._chucNangService.getChucNang().subscribe((resp: any) => {
          res(resp && resp.find(item => item.linkUrl && item.linkUrl.indexOf(route.routeConfig.path) != -1) ? true : this._router.navigate([JSON.parse(localStorage.getItem('user')).chucNangDefault]))
        }
        )
      }else{
        this._router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
      }
    })
  }

}
