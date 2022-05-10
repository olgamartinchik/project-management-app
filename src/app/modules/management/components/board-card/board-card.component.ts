import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBoard } from '../../../core/models/IBoard.model';

import { ConfirmService } from 'src/app/modules/core/services/confirm.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state.model';
import { getBoardById, updateAllBoards } from 'src/app/redux/actions/board.actions';
import { map, take } from 'rxjs';
import { HttpService } from 'src/app/modules/core/services/http.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() public boardData!: IBoard;

  constructor(
    private confirmService: ConfirmService,
    private store: Store<IAppState>,
    private httpService: HttpService,
  ) {}

  public confirmationDeleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.confirmService.open(this.deleteBoard);
  }

  private deleteBoard = (): void => {
    this.httpService
      .deleteBoard(this.boardData.id!)
      .pipe(
        take(1),
        map(() => {
          this.store.dispatch(updateAllBoards());
        }),
      )
      .subscribe();
  };

  public selectCard(): void {
    this.store.dispatch(getBoardById({ boardById: this.boardData }));
  }
}
