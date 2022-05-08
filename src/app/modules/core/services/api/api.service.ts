import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  LoginRequestModel,
  LoginResponseModel,
  SignupRequestModel,
  UserModel,
} from '../../models/api.service.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public singup(signupData: SignupRequestModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/signup`, signupData);
  }

  public login(loginData: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.url}/signin`, loginData);
  }

  public getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/users/${id}`);
  }

  public editUser(id: string, userData: SignupRequestModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.url}/users/${id}`, userData);
  }
}
