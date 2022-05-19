import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { ApiService } from '../../../core/services/api.service';
import { ConfirmService } from '../../../core/services/confirm.service';

// ngrx
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
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public confirmationDeleteBoard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.confirmService.open(this.deleteBoard);
  }

  private deleteBoard = (): void => {
    this.apiService
      .deleteBoard(this.boardData.id!)
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(updateAllBoards()));
  };
}
