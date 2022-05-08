import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public clearStorage(): void {
    localStorage.clear();
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
}
