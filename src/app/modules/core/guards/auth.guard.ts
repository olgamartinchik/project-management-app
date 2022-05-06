import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }

  public canLoad(): boolean {
    if (this.authService.getToken()) {
      return true;
    }

    return false;
  }
}
