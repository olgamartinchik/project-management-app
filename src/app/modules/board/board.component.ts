import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { IColumn } from '../core/model/ITask.model';
import { BoardService } from '../core/services/board.service';
import { HttpService } from '../core/services/http.service';
import { BoardDataService } from './services/board-data.service';
import { IAppState } from 'src/app/redux/state.model';
import { boardByIdSelect } from 'src/app/redux/selectors/board.selectors';
import { setBoardById } from 'src/app/redux/actions/board.actions';
import { IBoard } from '../core/models/IBoard.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public idBoard: string = '';

  private count: number = 1;

  public columns?: IColumn[];

  public board$: Observable<IBoard> = this.store.select(boardByIdSelect);

  public titleBoard!: string;

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
    });

    // this.boardService.updateBoardById(this.idBoard);
    // this.httpService.getBoardsId(this.idBoard).subscribe((value) => console.log('value', value));
    // this.boardDataService.orderColumns!==0?this.count=this.boardDataService.orderColumns:this.count=0
  }

  public addColumn(): void {
    this.httpService
      .postColumns(this.idBoard, { title: 'task', order: this.count++ })
      .pipe(take(1))
      .subscribe();
    // this.httpService.deleteColumns(this.idBoard,'fb5907fd-d479-43e9-89b5-b8cf3f753672').subscribe()
    this.boardDataService.getAllColumn(this.idBoard);
  }

  public changeTitleBoard(): void {
    this.httpService
      .updateBoard(this.idBoard, { title: this.titleBoard })
      .pipe(take(1))
      .subscribe();
    // this.store.dispatch(updateBoard());
    // if(event.keyCode === 13){
    //   event.target.blur()
    // }
  }

  public looseFocus(event: Event): void {
    (event!.target as HTMLInputElement)!.blur();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
