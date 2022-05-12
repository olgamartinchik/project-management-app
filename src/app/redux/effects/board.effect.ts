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
} from '../actions/board.actions';
import { ApiService } from '../../modules/core/services/api/api.service';
import { IAppState } from '../state.model';
import { idBoard } from '../selectors/board.selectors';

@Injectable({ providedIn: 'any' })
export class BoardEffect {
  constructor(
    private apiService: ApiService,
    private actions: Actions,
    private store: Store<IAppState>,
  ) {}

  public getBoards: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(updateAllBoards),
      switchMap(() =>
        this.apiService.getBoards().pipe(
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
      ofType(setBoardById),
      withLatestFrom(this.store.select(idBoard)),
      switchMap(([, id]) =>
        this.apiService.getBoardById(id).pipe(
          map((boardById) => {
            return getBoardById({ boardById });
          }),
          catchError((error) => of(getBoardByIdFailed(error))),
        ),
      ),
    );
  });
}
