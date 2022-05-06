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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhOWYyNDhiZi1iZjljLTQwYzAtYjI0MC1lMTY5MDU4N2I1NTciLCJsb2dpbiI6Im9seWFAbWFpbCIsImlhdCI6MTY1MTI0NDcyOH0.zkfjgaeIPyaXRBSGk2HinmWMW2Oj0X0iP6G_bsToD4o
