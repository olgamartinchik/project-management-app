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
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(
        request.clone({
          headers: new HttpHeaders({
            Accept: 'application/json',
            // 'Content-Type': '',
            Authorization:
              `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNTZjNDJjOS1iODU5LTQ4MDQtOWQ1Mi01OTJmZWRiY2MwYjIiLCJsb2dpbiI6ImthdGVAZ21haWwiLCJpYXQiOjE2NTEyNDM1Nzh9.yNFvOJxmjkXBwmV5VlJVv6FZWcJ3a8bQk4bmRtGJ_Qw'}` ||
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhOWYyNDhiZi1iZjljLTQwYzAtYjI0MC1lMTY5MDU4N2I1NTciLCJsb2dpbiI6Im9seWFAbWFpbCIsImlhdCI6MTY1MTI0NDcyOH0.zkfjgaeIPyaXRBSGk2HinmWMW2Oj0X0iP6G_bsToD4o
