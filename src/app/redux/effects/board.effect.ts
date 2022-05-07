import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  getBoardById,
  getBoardByIdFailed,
  getBoardsFailed,
  setBoardById,
  setBoards,
  updateAllBoards,
  updateBoard,
} from '../actions/board.actions';
import { HttpService } from 'src/app/modules/core/services/http.service';
import { IAppState } from '../state.model';
import { idBoard } from '../selectors/board.selectors';

@Injectable({ providedIn: 'any' })
export class BoardEffect {
  constructor(
    private httpService: HttpService,
    private actions: Actions,
    private store: Store<IAppState>,
  ) {}

  public getBoards: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(updateAllBoards),
      switchMap(() =>
        this.httpService.getBoards().pipe(
          map((boards) => {
            return setBoards({ boards });
          }),
          catchError((error) => of(getBoardsFailed(error))),
        ),
      ),
    );
  });

  public getBoard: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(setBoardById || updateBoard),
      withLatestFrom(this.store.select(idBoard)),
      switchMap(([, id]) =>
        this.httpService.getBoard(id).pipe(
          map((boardById) => {
            return getBoardById({ boardById });
          }),
          catchError((error) => of(getBoardByIdFailed(error))),
        ),
      ),
    );
  });
}
