import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

//  services
import { ApiService } from '../../../core/services/api/api.service';
import { BoardPopupService } from '../../../core/services/board-popup.service';

// ngrx
import { setBoards } from '../../../../redux/actions/board.actions';
import { boardsSelect } from '../../../../redux/selectors/board.selectors';

// models
import { BoardModel } from '../../../core/models/board.model';
import { IAppState } from '../../../../redux/state.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public allBoards$: Observable<BoardModel[]> = this.store.select(boardsSelect);

  constructor(
    public boardPopupService: BoardPopupService,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.apiService
      .getBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        this.store.dispatch(setBoards({ boards }));
      });
  }

  public openBoardPopup(): void {
    this.boardPopupService.open();
  }
}
