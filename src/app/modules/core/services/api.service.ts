import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  LoginRequestModel,
  LoginResponseModel,
  SignupRequestModel,
} from '../models/api.service.models';
import { UserModel } from '../models/user.model';
import { BoardModel } from '../models/board.model';
import { ColumnModel } from '../models/column.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // signup and signin
  public singup(signupData: SignupRequestModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/signup`, signupData);
  }

  public login(loginData: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.url}/signin`, loginData);
  }

  // users
  public getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/users/${id}`);
  }

  public editUser(id: string, userData: SignupRequestModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.url}/users/${id}`, userData);
  }

  public getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}/users`);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/users/${id}`);
  }

  // boards
  public getBoards(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(`${this.url}/boards`);
  }

  public getBoardById(id: string): Observable<BoardModel> {
    return this.http.get<BoardModel>(`${this.url}/boards/${id}`);
  }

  public postBoard(boardData: BoardModel): Observable<BoardModel> {
    return this.http.post<BoardModel>(`${this.url}/boards`, boardData);
  }

  public updateBoard(id: string, boardData: BoardModel): Observable<BoardModel> {
    return this.http.put<BoardModel>(`${this.url}/boards/${id}`, boardData);
  }

  public deleteBoard(id: string): Observable<BoardModel> {
    return this.http.delete<BoardModel>(`${this.url}/boards/${id}`);
  }

  // columns
  public getColumns(id: string): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>(`${this.url}/boards/${id}/columns`);
  }

  public createColumn(id: string, columnData: ColumnModel): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`${this.url}/boards/${id}/columns`, columnData);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    columnData: ColumnModel,
  ): Observable<ColumnModel> {
    return this.http.put<ColumnModel>(
      `${this.url}/boards/${boardId}/columns/${columnId}`,
      columnData,
    );
  }

  public deleteColumn(boardId: string, columnId: string): Observable<ColumnModel> {
    return this.http.delete<ColumnModel>(`${this.url}/boards/${boardId}/columns/${columnId}`);
  }
}
