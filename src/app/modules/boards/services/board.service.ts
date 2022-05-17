import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../../core/services/api.service';

import { updateBoard } from '../../../redux/actions/board.actions';
import { selectRouteParams } from '../../../redux/selectors/route.selectors';
import { selectBoardById } from '../../../redux/selectors/board.selectors';

import { IAppState } from '../../../redux/state.model';
import { BoardModel } from '../../core/models/board.model';

@Injectable()
export class BoardService {
  public boardId = '';

  constructor(private apiService: ApiService, private store: Store<IAppState>) {}

  public getBoardData(): Observable<BoardModel> {
    this.updateBoard();

    return this.store.select(selectBoardById);
  }

  public updateBoard(): void {
    this.getBoardId();

    this.apiService
      .getBoardById(this.boardId)
      .pipe(take(1))
      .subscribe((board) => {
        board.columns = board.columns.sort((a, b) => a.order - b.order);
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
}
