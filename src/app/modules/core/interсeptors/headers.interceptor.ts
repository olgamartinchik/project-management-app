import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(
        request.clone({
          // url:environment.apiUrl + request.url,
          headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjA1M2MxY2U2ZDA0MTFlMzVhYWNmMTEiLCJpYXQiOjE2NDQ3ODA5NzcsImV4cCI6MTY0NDc4NDU3N30.v-LkMsnZ1onaIqCLdnz-cLt3AFDahpVdMCmwCO1AfWc'}` ||
              '',
          }),
        }),
      )
      .pipe(
        catchError((error: HttpStatusCode.Unauthorized) => {
          return throwError(error);
        }),
      );
  }
}
