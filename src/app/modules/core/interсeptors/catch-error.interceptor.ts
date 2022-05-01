import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('error', error.message);
        this.notificationService.showNotifications(error.statusText);
        return of(error);
      }),
    );
  }
}
