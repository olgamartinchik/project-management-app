import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public saveUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
