import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './../../app.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class KeyInterceptor implements HttpInterceptor {
  keys: string[] = [];

  constructor(private appService: AppService, private snackbar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 403) {
          this.keys = this.appService.keys;
          let keyIndex = -1;

          let keyIndexString = localStorage.getItem('keyIndex');
          if (keyIndexString) {
            keyIndex = parseInt(keyIndexString);
          }

          localStorage.setItem('keyIndex', keyIndex.toString());
          this.appService.openSnackbar('Key ran out of quota');

          keyIndex += 1;
          this.changeKey(keyIndex);
        }
        return throwError(() => console.log(error));
      })
    );
  }

  changeKey(keyIndex: number) {
    if (this.keys[keyIndex]) {
      this.appService.setKeyToLocal(this.keys[keyIndex]);
    } else {
      this.appService.setKeyToLocal(this.keys[0]);
    }
    this.appService.openSnackbar('Key has changed');
  }
}
