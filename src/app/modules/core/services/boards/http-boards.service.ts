import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../../../../modules/management/model/board.model';

@Injectable({
  providedIn: 'root',
})
export class HttpBoardsService {
  private url = 'http://localhost:4200/api/boards';

  constructor(private http: HttpClient) {}

  postBoard(value: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(this.url, value);
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.url);
  }

  deleteBoard(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${this.url}/${id}`);
  }
}
