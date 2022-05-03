import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/board.service';
import { HttpBoardsService } from '../../../core/services/http-boards.service';
import { ToggleScrollService } from 'src/app/modules/core/services/toggle-scroll.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public boards: IBoard[] = [];

  constructor(
    public boardService: BoardService,
    public httpBoardsService: HttpBoardsService,
    private toggleScrollService: ToggleScrollService,
  ) {}

  ngOnInit() {
    this.boardService.updateBoards();
  }

  public openPopupNewBoard(): void {
    this.boardService.isBoardPopup$.next(true);
    this.toggleScrollService.hiddenScroll();
  }
}
