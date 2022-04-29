import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { HttpBoardsService } from '../../services/http-boards.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  boardForm?: FormGroup;

  constructor(
    public boardService: BoardService,
    private fb: FormBuilder,
    private httpBoardsService: HttpBoardsService,
  ) {
    this.createForm();
  }

  private createForm() {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  public get _title() {
    return this.boardForm?.get('title');
  }

  public closePopup() {
    this.boardService.isBoardPopup$.next(false);
    this.boardForm?.reset();
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public createBoard() {
    this.boardService.isBoardPopup$.next(false);
    // console.log('title', this.boardForm?.value.title);
    this.httpBoardsService
      .postBoard({ title: this.boardForm?.value.title })
      .pipe(
        take(1),
        map(() => {
          this.boardService.updateBoards();
        }),
      )
      .subscribe();

    this.boardForm?.reset();
  }
}
