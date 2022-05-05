import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      }),
    );
  }
}
