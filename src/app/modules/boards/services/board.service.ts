import { Injectable } from '@angular/core';
import { Observable, switchMap, of, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../../core/services/api.service';

import { updateBoard } from '../../../redux/actions/board.actions';
import { selectBoardById } from '../../../redux/selectors/board.selectors';
import { selectRouteParams } from '../../../redux/selectors/route.selectors';

import { IAppState } from '../../../redux/state.model';
import { BoardModel } from '../../core/models/board.model';

@Injectable()
export class BoardService {
  public boardId = '';

  constructor(private apiService: ApiService, private store: Store<IAppState>) {}

  public getBoardData(): Observable<BoardModel> {
    return this.store.select(selectBoardById).pipe(
      switchMap((board: BoardModel | undefined): Observable<BoardModel> => {
        if (!board || board.columns === undefined) {
          return this.saveBoardFromApi();
        }
        return of(board);
      }),
    );
  }

  public updateBoard(): void {
    this.apiService
      .getBoardById(this.boardId)
      .pipe(take(1))
      .subscribe((board) => {
        board.columns = board.columns.sort((a, b) => a.order - b.order);
        board.columns.forEach((column) => column.tasks!.sort((a, b) => a.order! - b.order!));
        this.store.dispatch(updateBoard({ board }));
      });
  }

  private getBoardId(): void {
    this.store
      .select(selectRouteParams)
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.boardId = id;
      });
  }

  private saveBoardFromApi(): Observable<BoardModel> {
    this.getBoardId();

    return this.apiService.getBoardById(this.boardId).pipe(
      switchMap((board: BoardModel): Observable<BoardModel> => {
        // сортируем колонки по возврастанию по свойству order
        board.columns = board.columns.sort((a, b) => a.order - b.order);

        this.store.dispatch(updateBoard({ board }));
        return of(board);
      }),
      take(1),
    );
  }
}
