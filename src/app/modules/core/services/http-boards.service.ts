import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../management/model/board.model';
import { URL } from '../constants/constants';

@Injectable()
export class HttpBoardsService {
  constructor(private http: HttpClient) {}

  postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${URL}/boards`, value);
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${URL}/boards`);
  }

  deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${URL}/boards/${id}`);
  }
}
