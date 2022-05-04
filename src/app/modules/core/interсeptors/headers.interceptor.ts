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
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // let headers=new HttpHeaders()
    // if(request.method!=='DELETE'){
    //        headers=headers.set('Content-Type', 'application/json')
    // }
    return next
      .handle(
        request.clone({
          headers: new HttpHeaders({
            Accept: 'application/json',
            Authorization:
              `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNDk2NDI4ZS01Y2NlLTRmNmQtYTVjZC0xMDIyNjMyMzJhZWIiLCJsb2dpbiI6ImxvbGFAbWFpbCIsImlhdCI6MTY1MTY5MzA2NX0.yc4N2JU8KJnwmjboNplr2xsAGpp8_wdkMz47cwiAh64'}` ||
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
