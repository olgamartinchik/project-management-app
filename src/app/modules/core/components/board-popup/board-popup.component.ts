import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardService } from '../../services/board.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { HttpService } from '../../services/http.service';
import { IAppState } from 'src/app/redux/state.model';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';
import { FormMessagesModel } from '../../models/error-messages.services.models';
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  // public title!: FormControl;
  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  public boardForm!: FormGroup;

  constructor(
    public boardService: BoardService,
    private httpService: HttpService,
    private toggleScrollService: ToggleScrollService,
    private store: Store<IAppState>,
    public errorMessagesService: ErrorMessagesService,
    private fb: FormBuilder,
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
        map(() => {
          this.store.dispatch(updateAllBoards());
        }),
      )
      .subscribe();

    this.toggleScrollService.showScroll();
    this.boardForm?.reset();
  }
}
