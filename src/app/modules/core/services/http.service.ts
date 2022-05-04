import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../management/model/board.model';
import { URL } from '../constants/constants';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${URL}/boards`, value);
  }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${URL}/boards`);
  }

  public deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${URL}/boards/${id}`);
  }
}
