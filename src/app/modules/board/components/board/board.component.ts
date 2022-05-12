import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subscription,
  take,
  switchMap,
  Observable,
  of,
} from 'rxjs';
import { Store } from '@ngrx/store';

import { BoardPopupService } from '../../../core/services/board-popup.service';
import { ApiService } from '../../../core/services/api/api.service';

import { selectBoardById } from 'src/app/redux/selectors/board.selectors';
import { selectRouteParams } from 'src/app/redux/selectors/route.selectors';

import { IAppState } from 'src/app/redux/state.model';
import { BoardModel } from '../../../core/models/board.model';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board!: BoardModel;

  public boardHeading!: FormGroup;

  private boardId: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    public boardPopupService: BoardPopupService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.createForm();

    this.subscription.add(this.subscribeFormChange('title'));
    this.subscription.add(this.subscribeFormChange('description'));

    this.store
      .select(selectRouteParams)
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.boardId = id;
      });

    this.store
      .select(selectBoardById)
      .pipe(
        switchMap((data: any): Observable<any> => {
          if (!data) {
            return this.apiService.getBoardById(this.boardId);
          }

          return of(data);
        }),
        take(1),
      )
      .subscribe((data) => {
        this.board = data;
        this.boardHeading.setValue(
          { title: data.title, description: data.description },
          { emitEvent: false },
        );
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addColumn(): void {
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

  public looseFocus(event: Event): void {
    (event!.target as HTMLInputElement)!.blur();
  }

  private changeBoardHeading(): void {
    this.apiService.updateBoard(this.boardId, this.boardHeading.value).pipe(take(1)).subscribe();
  }

  private createForm(): void {
    this.boardHeading = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });
  }

  private subscribeFormChange(formControlName: string): Subscription {
    return this.boardHeading.controls[formControlName].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => this.boardHeading.controls[formControlName].valid),
      )
      .subscribe((): void => {
        this.changeBoardHeading();
        this.store.dispatch(updateAllBoards());
      });
  }
}
