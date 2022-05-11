import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad, CanDeactivate<unknown> {
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

  public canDeactivate(): boolean {
    if (confirm('Are you sure you want to exit?')) {
      localStorage.removeItem('authToken');
      return true;
    }
    return false;
  }
}
