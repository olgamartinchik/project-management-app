import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { take, switchMap, Subscription, withLatestFrom, map } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { ApiService } from '../../services/api.service';
import { BoardPopupService } from '../../services/board-popup.service';
import { ErrorMessagesService } from '../../services/error-messages.service';

// ngrx
import { updateAllBoards, updateBoard } from '../../../../redux/actions/board.actions';
import { selectBoardById } from '../../../../redux/selectors/board.selectors';

// models
import { IAppState } from '../../../../redux/state.model';
import { FormMessagesModel } from '../../models/error-messages.services.models';

// constants
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPopupComponent implements OnInit, OnDestroy {
  public boardForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private subscription: Subscription = new Subscription();

  constructor(
    public boardPopupService: BoardPopupService,
    public errorMessagesService: ErrorMessagesService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<IAppState>,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.createForm();

    this.subscription = this.boardPopupService.subject$
      .pipe(
        withLatestFrom(this.store.select(selectBoardById)),
        map(([{ popupFunction }, board]) => {
          if (popupFunction === 'edit') {
            this.boardForm.setValue({ title: board!.title, description: board!.description });
          }
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public submit(): void {
    if (this.boardPopupService.subject$.value.popupFunction === 'create') {
      this.createBoard();
    } else {
      this.editBoard();
    }

    this.boardPopupService.close();
  }

  private createForm(): void {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    });
  }

  private createBoard(): void {
    this.apiService
      .postBoard(this.boardForm.value)
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(updateAllBoards()));
    this.router.navigate(['main']);
  }

  private editBoard(): void {
    this.store
      .select(selectBoardById)
      .pipe(
        switchMap((board) => {
          return this.apiService.updateBoard(board!.id!, this.boardForm.value);
        }),
        take(1),
      )
      .subscribe((updatedBoard) => {
        this.store.dispatch(updateBoard({ board: updatedBoard }));
      });
  }
}
