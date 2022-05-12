import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { ConfirmService } from '../../../core/services/confirm.service';
import { ApiService } from '../../../core/services/api/api.service';

// ngrx
import { getBoardById } from '../../../../redux/actions/board.actions';
import { updateAllBoards } from '../../../../redux/actions/board.actions';

// models
import { BoardModel } from '../../../core/models/board.model';
import { IAppState } from '../../../../redux/state.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() public boardData!: BoardModel;

  constructor(
    private confirmService: ConfirmService,
    private store: Store<IAppState>,
    private apiService: ApiService,
  ) {}

  public confirmationDeleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.confirmService.open(this.deleteBoard);
  }

  private deleteBoard = (): void => {
    this.apiService
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
