import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, take } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { HttpService } from '../../services/http.service';
import { ConfirmService } from '../../services/confirm.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state.model';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';
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
    private httpService: HttpService,
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
    //тк компонет должен быть универсальный, предлагаю в будущем проверять по роуту
    // страницу для выполнения действия

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

    this.confirmService.isConfirmPopup$.next(false);
    this.toggleScrollService.showScroll();
  }
}
