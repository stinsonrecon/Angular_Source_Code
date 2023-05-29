import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
  HttpHeaderResponse, HttpResponseBase, HttpResponse
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class RequestResponseHandlerInterceptor implements HttpInterceptor {
  apiConfig: any = {}
  public pendingRequest: number = 0;
  public showLoading: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) {
    //this.apiConfig = this.appConfigService.getAppConfig().api;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequest++;
    return next.handle(request).pipe(tap((res: any) => {
      if (request.url.indexOf("sapxep") == -1 && request.url.indexOf("/sendmail") == -1 && request.url.indexOf("/checkpassword") == -1) {
        this.turnOnModal();
      }
    }, (err: any) => {
      this.turnOffModal();
    })).pipe(
      finalize(() => {
      this.turnOffModal();
    }))
  }

  turnOnModal() {
    // if (!this.showLoading) {
    //   this.showLoading = true;
      this.spinnerService.show("sp3");
    // }
    // this.showLoading = true;
  }

  turnOffModal() {
    this.pendingRequest--;
    if (this.pendingRequest <= 0) {
      // if (this.showLoading) {
        this.spinnerService.hide("sp3");
      // }
      // this.showLoading = false;
    }
  }

}
