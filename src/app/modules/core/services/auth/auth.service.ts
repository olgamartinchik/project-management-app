import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  public saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public logOut(): void {
    this.router.navigate(['welcome']);
  }
}
