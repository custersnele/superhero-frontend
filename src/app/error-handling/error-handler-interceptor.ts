import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  // intercept function
  constructor(
    private toasterService: ToastrService,
  ) {}


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(evt => {
        console.log("HTTP suc6");
        if (evt instanceof HttpResponse) {
          //this.toasterService.success(evt.body.success.message, evt.body.success.title, {positionClass: 'toast-bottom-center'});
        }
      }),
      catchError((err: any) => {
        console.log("INTERCEPTOR ERROR");
        if(err instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(err.message, err.error.errors, { positionClass: 'toast-bottom-center' });
          } catch(e) {
            this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
          }
          //log error
        }
        return of(err);
      }));

  }
}
