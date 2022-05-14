import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  public canActivate(): boolean {
    return Boolean(this.authService.getItem('authToken'));
  }

  public canLoad(): boolean {
    return Boolean(this.authService.getItem('authToken'));
  }
}
