import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardService } from '../../services/board.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { HttpService } from '../../services/http.service';
import { IAppState } from 'src/app/redux/state.model';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';
import { FormMessagesModel } from '../../models/error-messages.services.models';
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent implements OnDestroy {
  // public title!: FormControl;
  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  public boardForm!: FormGroup;

  private newBoard: any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public boardService: BoardService,
    private httpService: HttpService,
    private toggleScrollService: ToggleScrollService,
    private store: Store<IAppState>,
    public errorMessagesService: ErrorMessagesService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });
  }

  public closePopup(): void {
    this.boardService.isBoardPopup$.next(false);
    this.toggleScrollService.showScroll();
    this.boardForm.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createBoard(): void {
    this.boardService.isBoardPopup$.next(false);
    this.httpService
      .postBoard({ ...this.boardForm?.value })
      .pipe(
        take(1),
        tap(() => {
          this.store.dispatch(updateAllBoards());
        }),
      )
      .subscribe((board) => {
        console.log('new board', board);
        // this.newBoard=board

        this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
          console.log('rout', event);
          // if ((event as NavigationStart).url !== '/main') {
          //   this.router.navigate([`/board/${board.id}`]);
          // }
        });
      });

    this.toggleScrollService.showScroll();
    this.boardForm?.reset();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
