import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { IBoard } from '../models/IBoard.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public isBoardPopup$ = new BehaviorSubject(false);

  constructor(private httpService: HttpService) {}

  // public updateBoardById(id: string): void {
  //   this.board$
  //     .pipe(
  //       take(1),
  //       map((data) => {
  //         if (Object.keys(data).length === 0) {
  //           this.httpService
  //             .getBoardsId(id)
  //             .pipe(take(1))
  //             .subscribe((board) => {
  //               this.board$.next(board);
  //             });
  //         }
  //         return data;
  //       }),
  //     )
  //     .subscribe();
  // }

  public deleteBoard$ = new BehaviorSubject<IBoard>({ id: '', title: '' });
}
