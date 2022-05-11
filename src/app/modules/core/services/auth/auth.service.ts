import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  public clearStorage(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public saveUser(token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', this.decodeIdFromToken(token));
  }

  private decodeIdFromToken(token: string): string {
    return JSON.parse(atob(token.split('.')[1])).userId;
  }

  public isLoggedIn(): boolean {
    return this.getItem('userId') !== null;
  }

  public logOut(): void {
    this.router.navigate(['welcome']);
  }
}
