import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { IBoard } from '../../management/model/IBoard.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public isBoardPopup$ = new BehaviorSubject(false);

  public allBoards$ = new BehaviorSubject<IBoard[]>([]);

  public board$ = new BehaviorSubject<IBoard>({} as IBoard);

  constructor(private httpService: HttpService) {}

  public updateBoards(): void {
    this.httpService
      .getBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        this.allBoards$.next(boards as IBoard[]);
      });
  }

  public updateBoardById(id: string): void {
    this.board$
      .pipe(
        take(1),
        map((data) => {
          if (Object.keys(data).length === 0) {
            this.httpService
              .getBoardsId(id)
              .pipe(take(1))
              .subscribe((board) => {
                this.board$.next(board);
              });
          }
          return data;
        }),
      )
      .subscribe();
  }
}
