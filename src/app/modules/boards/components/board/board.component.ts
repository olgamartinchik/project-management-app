import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take, switchMap, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { BoardPopupService } from '../../../core/services/board-popup.service';
import { ApiService } from '../../../core/services/api/api.service';

import { selectBoardById } from 'src/app/redux/selectors/board.selectors';
import { selectRouteParams } from 'src/app/redux/selectors/route.selectors';

import { IAppState } from 'src/app/redux/state.model';
import { BoardModel } from '../../../core/models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board$!: Observable<BoardModel>;

  private boardId: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    public boardPopupService: BoardPopupService,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectRouteParams)
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.boardId = id;
      });

    this.board$ = this.store.select(selectBoardById).pipe(
      switchMap((data: any): Observable<any> => {
        if (!data) {
          return this.apiService.getBoardById(this.boardId);
        }

        return of(data);
      }),
      take(1),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addColumn(): void {
    console.log('add column');
    /* this.httpService
      .postColumns(this.idBoard, { title: 'task', order: this.count++ })
      .pipe(
        take(1),
        map(() => {
          this.store.dispatch(setBoardById({ idBoard: this.idBoard }));
        }),
      )
      .subscribe();

    this.boardDataService.getAllColumn(this.idBoard);

    this.store.dispatch(setBoardById({ idBoard: this.idBoard })); */
  }
}
