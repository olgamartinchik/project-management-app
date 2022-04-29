import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IBoard } from '../model/board.model';
import { HttpBoardsService } from './http-boards.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public isBoardPopup$ = new BehaviorSubject(false);

  public allBoards$ = new BehaviorSubject<IBoard[]>([]);

  constructor(private httpBoardsService: HttpBoardsService) {}

  updateBoards() {
    this.httpBoardsService
      .getBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        // console.log('all boards', boards)
        this.allBoards$.next(boards);
      });
  }
}
