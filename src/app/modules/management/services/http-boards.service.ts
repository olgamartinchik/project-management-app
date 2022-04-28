import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard } from '../model/board.model';

@Injectable({
  providedIn: 'root',
})
export class HttpBoardsService {
  constructor(private http: HttpClient) {}

  postBoard(value: IBoard) {
    let url = 'localhost:4000/boards';

    return this.http.post<IBoard>(url, value);
  }

  getBoards() {
    let url = 'localhost:4000/boards';
    return this.http.get<IBoard>(url);
  }
}
