import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  LoginRequestModel,
  LoginResponseModel,
  SignupRequestModel,
  SignupResponseModel,
} from './api.service.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {}

  public singup(signupData: SignupRequestModel): Observable<SignupResponseModel> {
    return this.http.post<SignupResponseModel>(`${this.url}/signup`, signupData);
  }

  public login(loginData: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.url}/signin`, loginData);
  }
}
