import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { HttpBoardsService } from '../../services/http-boards.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  public boardForm?: FormGroup;

  constructor(
    public boardService: BoardService,
    private fb: FormBuilder,
    private httpBoardsService: HttpBoardsService,
    private toggleScrollService: ToggleScrollService,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  public get _title() {
    return this.boardForm?.get('title');
  }

  public closePopup(): void {
    this.boardService.isBoardPopup$.next(false);
    this.toggleScrollService.showScroll();
    this.boardForm?.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createBoard(): void {
    this.boardService.isBoardPopup$.next(false);
    this.httpBoardsService
      .postBoard({ title: this.boardForm?.value.title })
      .pipe(
        take(1),
        map(() => {
          this.boardService.updateBoards();
        }),
      )
      .subscribe();
    this.toggleScrollService.showScroll();
    this.boardForm?.reset();
  }
}
