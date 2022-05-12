import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getBoardsFailed, setBoards, updateAllBoards } from '../actions/board.actions';

import { ApiService } from '../../modules/core/services/api/api.service';

@Injectable({ providedIn: 'any' })
export class BoardEffect {
  constructor(private apiService: ApiService, private actions: Actions) {}

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
}
