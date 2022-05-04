import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../management/model/IBoard.model';
import { URL } from '../constants/constants';
import { IColumn } from '../model/http.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${URL}/boards`, value);
  }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${URL}/boards`);
  }

  public getBoardsId(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${URL}/boards/${id}`);
  }

  public updateDataBoard(id: string, value: IBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${URL}/boards/${id}`, value);
  }

  public deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${URL}/boards/${id}`);
  }

  public getColumns(id: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`${URL}/boards/${id}/columns`);
  }

  public postColumns(id: string, value: IColumn): Observable<IColumn> {
    return this.http.post<IColumn>(`${URL}/boards/${id}/columns`, value);
  }

  public deleteColumns(idBoard: string, idColumn: string): Observable<IColumn[]> {
    return this.http.delete<IColumn[]>(`${URL}/boards/${idBoard}/columns/${idColumn}`);
  }
}
