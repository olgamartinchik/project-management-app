import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/board.service';

import { ConfirmService } from 'src/app/modules/core/services/confirm.service';
import { ToggleScrollService } from 'src/app/modules/core/services/toggle-scroll.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() boardData?: IBoard;

  @Input() index?: number;

  constructor(
    public boardService: BoardService,
    private confirmService: ConfirmService,
    private toggleScrollService: ToggleScrollService,
  ) {}

  public deleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.confirmService.isConfirmPopup$.next(true);
    this.toggleScrollService.hiddenScroll();
  }
}
