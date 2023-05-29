import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { NotifiContenComponent } from './notifi-conten/notifi-conten.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}
  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarAutoHide = '3000';
  open(message: string, type: mType) {
    const notifyClass = 'snackbar-' + type;
    this.snackBarRef = this._snackBar.openFromComponent(NotifiContenComponent, {
      data: {
        message,
        type
      },
      panelClass: [notifyClass],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: parseInt(this.snackBarAutoHide, 0),
    });
  }
}
export  enum mType {
  success = 'done',
  info = 'info',
  warn = 'warning',
  error = 'error',
}
