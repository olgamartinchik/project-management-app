import { Component, Input } from '@angular/core';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/board.service';

import { ConfirmService } from 'src/app/modules/core/services/confirm.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() boardData?: IBoard;

  constructor(public boardService: BoardService, private confirmService: ConfirmService) {}

  public deleteBoard(): void {
    this.confirmService.isConfirmPopup$.next(true);
  }
}
