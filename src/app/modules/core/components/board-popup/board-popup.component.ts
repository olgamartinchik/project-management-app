import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { BoardPopupService } from '../../services/board-popup.service';
import { ApiService } from '../../services/api/api.service';
import { ErrorMessagesService } from '../../services/error-messages/error-messages.service';

// ngrx
import { updateAllBoards } from '../../../../redux/actions/board.actions';

// models
import { IAppState } from '../../../../redux/state.model';
import { FormMessagesModel } from '../../models/error-messages.services.models';

// constants
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent implements OnInit {
  public newBoardForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    public boardPopupService: BoardPopupService,
    public errorMessagesService: ErrorMessagesService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public closePopup(): void {
    this.boardPopupService.close();
    this.newBoardForm.reset();
  }

  public createBoard(): void {
    this.apiService
      .postBoard(this.newBoardForm.value)
      .pipe(
        take(1),
        tap(() => {
          this.store.dispatch(updateAllBoards());
        }),
      )
      .subscribe();

    this.closePopup();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  private createForm(): void {
    this.newBoardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });
  }
}
