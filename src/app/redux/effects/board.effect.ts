import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getBoardsFailed, setBoards, updateAllBoards } from '../actions/board.actions';
import { HttpService } from 'src/app/modules/core/services/http.service';

@Injectable({ providedIn: 'any' })
export class BoardEffect {
  constructor(private httpService: HttpService, private actions: Actions) {}

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
}
