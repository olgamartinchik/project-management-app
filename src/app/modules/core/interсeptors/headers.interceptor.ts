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
  private token: string | null = this.authService.getToken();

  constructor(private authService: AuthService) {}

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
            Authorization: `Bearer ${this.token}` || '',
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
