import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBoard } from '../../../core/models/IBoard.model';
import { BoardService } from '../../../core/services/board.service';

import { ConfirmService } from 'src/app/modules/core/services/confirm.service';
import { ToggleScrollService } from 'src/app/modules/core/services/toggle-scroll.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state.model';
import { getBoardById } from 'src/app/redux/actions/board.actions';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() public boardData!: IBoard;

  constructor(
    private boardService: BoardService,
    private confirmService: ConfirmService,
    private toggleScrollService: ToggleScrollService,
    private store: Store<IAppState>,
  ) {}

  public deleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.boardService.deleteBoard$.next(this.boardData);
    this.confirmService.isConfirmPopup$.next(true);
    this.toggleScrollService.hiddenScroll();
  }

  public selectCard(): void {
    this.store.dispatch(getBoardById({ boardById: this.boardData }));
  }
}
