import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { BoardService } from '../../../core/services/board.service';

import { ToggleScrollService } from 'src/app/modules/core/services/toggle-scroll.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state.model';
import { setBoards } from 'src/app/redux/actions/board.actions';
import { ApiService } from 'src/app/modules/core/services/api/api.service';
import { boardsSelect } from 'src/app/redux/selectors/board.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BoardModel } from '../../../core/models/board.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  public allBoards$: Observable<BoardModel[]> = this.store.select(boardsSelect);

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public boardService: BoardService,
    private toggleScrollService: ToggleScrollService,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.apiService
      .getBoards()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((boards) => {
        this.store.dispatch(setBoards({ boards }));
      });
  }

  public openPopupNewBoard(): void {
    this.boardService.isBoardPopup$.next(true);
    this.toggleScrollService.hiddenScroll();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
