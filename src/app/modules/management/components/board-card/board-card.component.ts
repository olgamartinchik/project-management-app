import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { BoardService } from '../../../core/services/board.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { HttpService } from '../../../core/services/http.service';

// models
import { IBoard } from '../../model/IBoard.model';
import { IAppState } from '../../../../redux/state.model';

// ngrx
import { getBoardById } from 'src/app/redux/actions/board.actions';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() public boardData!: IBoard;

  constructor(
    public boardService: BoardService,
    private confirmService: ConfirmService,
    private store: Store<IAppState>,
    private httpService: HttpService,
  ) {}

  public confirmationDeleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.confirmService.open(this.deleteBoard);
  }

  public selectCard(): void {
    this.store.dispatch(getBoardById({ boardById: this.boardData }));
  }

  private deleteBoard = (): void => {
    this.boardService.board$.pipe(take(1)).subscribe((board) => {
      this.httpService
        .deleteBoard(board.id!)
        .pipe(
          take(1),
          map(() => {
            this.store.dispatch(updateAllBoards());
          }),
        )
        .subscribe();
    });
  };
}
