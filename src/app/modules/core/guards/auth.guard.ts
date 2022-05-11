import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  public canActivate(): boolean {
    if (this.authService.getItem('authToken')) {
      return true;
    }

    return false;
  }

  public canLoad(): boolean {
    if (this.authService.getItem('authToken')) {
      return true;
    }

    return false;
  }
}
