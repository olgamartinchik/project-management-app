import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { ApiService } from '../../services/api/api.service';
import { ConfirmService } from '../../services/confirm.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state.model';
import { boardByIdSelect } from 'src/app/redux/selectors/board.selectors';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupComponent {
  private board$ = this.store.select(boardByIdSelect);

  constructor(
    public boardService: BoardService,
    public confirmService: ConfirmService,
    private apiService: ApiService,
    private toggleScrollService: ToggleScrollService,
    private store: Store<IAppState>,
  ) {}

  public closeConfirmPopup(): void {
    this.confirmService.isConfirmPopup$.next(false);
    this.toggleScrollService.showScroll();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public deleteItem(): void {
    console.log('delete');
  }
}
