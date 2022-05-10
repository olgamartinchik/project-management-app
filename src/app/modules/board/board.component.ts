import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { BoardService } from '../core/services/board.service';
import { HttpService } from '../core/services/http.service';
import { BoardDataService } from './services/board-data.service';
import { IAppState } from 'src/app/redux/state.model';
import { boardByIdSelect } from 'src/app/redux/selectors/board.selectors';
import { setBoardById } from 'src/app/redux/actions/board.actions';
import { IBoard } from '../core/models/IBoard.model';
import { IColumn } from '../core/models/IColumn.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public idBoard = '';

  //временный count для создания контейнера
  private count = 0;

  public columns?: IColumn[];

  public board$: Observable<IBoard> = this.store.select(boardByIdSelect);

  public titleBoard = '';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public boardDataService: BoardDataService,
    private route: ActivatedRoute,
    public boardService: BoardService,
    private httpService: HttpService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.idBoard = this.route.snapshot.params['id'];
    this.boardDataService.getAllColumn(this.idBoard);
    this.store.dispatch(setBoardById({ idBoard: this.idBoard }));
    this.board$.pipe(takeUntil(this.unsubscribe$)).subscribe((board) => {
      this.titleBoard = board.title;
      // console.log('updateBoard', board.columns)
    });
  }

  public addColumn(): void {
    this.httpService
      //передаю дефолтные данные
      .postColumns(this.idBoard, { title: 'task', order: this.count++ })
      .pipe(
        take(1),
        map(() => {
          this.store.dispatch(setBoardById({ idBoard: this.idBoard }));
        }),
      )
      .subscribe();

    this.boardDataService.getAllColumn(this.idBoard);

    this.store.dispatch(setBoardById({ idBoard: this.idBoard }));
  }

  public changeTitleBoard(): void {
    this.httpService
      .updateBoard(this.idBoard, { title: this.titleBoard })
      .pipe(take(1))
      .subscribe();
  }

  public looseFocus(event: Event): void {
    (event!.target as HTMLInputElement)!.blur();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
