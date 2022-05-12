import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { ConfirmService } from '../../../core/services/confirm.service';
import { HttpService } from '../../../core/services/http.service';

// models

import { IAppState } from '../../../../redux/state.model';

// ngrx
import { getBoardById } from 'src/app/redux/actions/board.actions';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';
import { IBoard } from 'src/app/modules/core/models/IBoard.model';

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
