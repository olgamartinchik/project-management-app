import { Component } from '@angular/core';
import { map, take } from 'rxjs';
import { BoardService } from '../../services/boards/board.service';
import { HttpBoardsService } from '../../services/boards/http-boards.service';
import { ConfirmService } from '../../services/conform-popup/confirm.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  constructor(
    public boardService: BoardService,
    public confirmService: ConfirmService,
    private httpBoardsService: HttpBoardsService,
  ) {}

  closeConfirmPopup() {
    this.confirmService.isConfirmPopup$.next(false);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  deleteItem() {
    this.boardService.board$.pipe(take(1)).subscribe((board) => {
      this.httpBoardsService
        .deleteBoard(board.id!)
        .pipe(
          take(1),
          map(() => {
            this.boardService.updateBoards();
          }),
        )
        .subscribe();
    });

    this.confirmService.isConfirmPopup$.next(false);
  }
}
