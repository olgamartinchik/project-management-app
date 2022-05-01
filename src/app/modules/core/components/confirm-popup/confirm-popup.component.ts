import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, take } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { HttpBoardsService } from '../../services/http-boards.service';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupComponent {
  constructor(
    public boardService: BoardService,
    public confirmService: ConfirmService,
    private httpBoardsService: HttpBoardsService,
  ) {}

  public closeConfirmPopup(): void {
    this.confirmService.isConfirmPopup$.next(false);
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public deleteItem(): void {
    //тк компонет должен быть универсальный, предлагаю в будущем проверять по роуту
    // страницу для выполнения действия

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
