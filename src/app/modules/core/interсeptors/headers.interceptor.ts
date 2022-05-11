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
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken() as string;

    return next
      .handle(
        request.clone({
          headers: new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
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
