import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, take } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  public title!: FormControl;

  constructor(
    public boardService: BoardService,
    private fb: FormBuilder,
    private httpService: HttpService,
    private toggleScrollService: ToggleScrollService,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]);
  }

  public closePopup(): void {
    console.log('title', this.title.value);
    this.boardService.isBoardPopup$.next(false);
    this.toggleScrollService.showScroll();
    this.title?.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createBoard(): void {
    this.boardService.isBoardPopup$.next(false);
    this.httpService
      .postBoard({ title: this.title?.value })
      .pipe(
        take(1),
        map(() => {
          this.boardService.updateBoards();
        }),
      )
      .subscribe();
    this.toggleScrollService.showScroll();
    this.title?.reset();
  }
}
