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
import { BoardModel } from '../../models/board.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getBoard(id: string): Observable<BoardModel> {
    return this.http.get<BoardModel>(`${this.url}/boards/${id}`);
  }

  public singup(signupData: SignupRequestModel): Observable<SignupResponseModel> {
    return this.http.post<SignupResponseModel>(`${this.url}/signup`, signupData);
  }

  public login(loginData: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.url}/signin`, loginData);
  }

  public postBoard(boardData: BoardModel): Observable<BoardModel> {
    return this.http.post<BoardModel>(`${this.url}/boards`, boardData);
  }

  public getBoards(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(`${this.url}/boards`);
  }

  public deleteBoard(id: string): Observable<BoardModel> {
    return this.http.delete<BoardModel>(`${this.url}/boards/${id}`);
  }
}
