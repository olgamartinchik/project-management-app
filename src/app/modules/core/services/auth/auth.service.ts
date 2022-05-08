import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public saveUser(token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', this.decodeIdFromToken(token));
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private decodeIdFromToken(token: string): string {
    return JSON.parse(atob(token.split('.')[1])).userId;
  }
}
