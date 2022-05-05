import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IBoard } from '../../management/model/IBoard.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public isBoardPopup$ = new BehaviorSubject(false);

  public allBoards$ = new BehaviorSubject<IBoard[]>([]);

  public board$ = new BehaviorSubject<IBoard>({ id: '', title: '' });

  constructor(private httpService: HttpService) {}

  public updateBoards(): void {
    this.httpService
      .getBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        this.allBoards$.next(boards as IBoard[]);
      });
  }
}
