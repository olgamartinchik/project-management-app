import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../management/model/board.model';
import { URL } from '../constants/constants';
import { IColumn } from '../model/http.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${URL}/boards`, value);
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${URL}/boards`);
  }

  getBoardsId(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${URL}/boards/${id}`);
  }

  updateDataBoard(id: string, value: IBoard) {
    return this.http.put<IBoard>(`${URL}/boards/${id}`, value);
  }

  deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${URL}/boards/${id}`);
  }

  getColumns(id: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`${URL}/boards/${id}/columns`);
  }

  postColumns(id: string, value: IColumn): Observable<IColumn> {
    return this.http.post<IColumn>(`${URL}/boards/${id}/columns`, value);
  }

  deleteColumns(idBoard: string, idColumn: string) {
    return this.http.delete<IColumn[]>(`${URL}/boards/${idBoard}/columns/${idColumn}`);
  }
}
