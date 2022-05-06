import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  LoginRequestModel,
  LoginResponseModel,
  SignupRequestModel,
  SignupResponseModel,
} from '../../models/api.service.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public singup(signupData: SignupRequestModel): Observable<SignupResponseModel> {
    return this.http.post<SignupResponseModel>(`${this.url}/signup`, signupData);
  }

  public login(loginData: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.url}/signin`, loginData);
  }
}
