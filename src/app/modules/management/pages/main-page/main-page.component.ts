import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

//  services
import { ApiService } from '../../../core/services/api.service';
import { BoardPopupService } from '../../../core/services/board-popup.service';

// ngrx
import { setBoards } from '../../../../redux/actions/board.actions';
import { boardsSelect } from '../../../../redux/selectors/board.selectors';

// models
import { BoardModel } from '../../../core/models/board.model';
import { IAppState } from '../../../../redux/state.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  public allBoards$: Observable<BoardModel[]> = this.store.select(boardsSelect);

  public isUpBtn = false;

  public isDownBtn = false;

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
    this.boardPopupService.open('create');
  }

  public changeBtnUp(): void {
    this.isUpBtn = !this.isUpBtn;
  }

  public changeBtnDown(): void {
    this.isDownBtn = !this.isDownBtn;
  }

  public get textToFilter(): boolean {
    return this.isUpBtn;
  }

  public get textToFiltert(): boolean {
    return this.isDownBtn;
  }
}
