import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../management/model/IBoard.model';

import { environment } from 'src/environments/environment';
@Injectable()
export class HttpService {
  [x: string]: any;
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.url}/boards`, value);
  }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/boards`);
  }

  public deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${this.url}/boards/${id}`);
  }
}
