import { Component, Input } from '@angular/core';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/boards/board.service';
import { HttpBoardsService } from '../../../core/services/boards/http-boards.service';
import { ConfirmService } from 'src/app/modules/core/services/conform-popup/confirm.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() boardData?: IBoard;

  constructor(
    private httpBoardsService: HttpBoardsService,
    public boardService: BoardService,
    private confirmService: ConfirmService,
  ) {}

  public deleteBoard(): void {
    this.confirmService.isConfirmPopup$.next(true);
  }
}
