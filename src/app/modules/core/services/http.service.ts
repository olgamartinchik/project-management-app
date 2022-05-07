import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, IColumn } from '../models/IBoard.model';

import { environment } from 'src/environments/environment';
@Injectable()
export class HttpService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.url}/boards`, value);
  }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/boards`);
  }

  public getBoard(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.url}/boards/${id}`);
  }

  public updateBoard(id: string, value: IBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.url}/boards/${id}`, value);
  }

  public deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${this.url}/boards/${id}`);
  }

  public getColumns(idBoard: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`${this.url}/boards/${idBoard}/columns`);
  }

  public postColumns(id: string, value: IColumn): Observable<IColumn> {
    return this.http.post<IColumn>(`${this.url}/boards/${id}/columns`, value);
  }

  public deleteColumns(idBoard: string, idColumn: string): Observable<IColumn[]> {
    return this.http.delete<IColumn[]>(`${this.url}/boards/${idBoard}/columns/${idColumn}`);
  }
}
