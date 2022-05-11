import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardService } from '../../services/board.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { ApiService } from '../../services/api/api.service';
import { IAppState } from 'src/app/redux/state.model';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  public newBoardForm!: FormGroup;

  constructor(
    public boardService: BoardService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toggleScrollService: ToggleScrollService,
    private store: Store<IAppState>,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.newBoardForm = this.fb.group({
      title: ['', Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      description: ['', Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    });
  }

  public closePopup(): void {
    this.boardService.isBoardPopup$.next(false);
    this.toggleScrollService.showScroll();
    this.newBoardForm.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createBoard(): void {
    this.boardService.isBoardPopup$.next(false);
    this.apiService
      .postBoard(this.newBoardForm.value)
      .pipe(
        take(1),
        map(() => {
          this.store.dispatch(updateAllBoards());
        }),
      )
      .subscribe();

    this.toggleScrollService.showScroll();
    this.newBoardForm.reset();
  }
}
