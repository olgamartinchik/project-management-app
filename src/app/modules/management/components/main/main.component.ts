import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/boards/board.service';
import { HttpBoardsService } from '../../../core/services/boards/http-boards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public boards: IBoard[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public boardService: BoardService, public httpBoardsService: HttpBoardsService) {}

  ngOnInit() {
    this.boardService.updateBoards();
    this.boardService.allBoards$.pipe(takeUntil(this.unsubscribe$)).subscribe((boards) => {
      this.boards = boards;
    });
  }

  public openPopup() {
    this.boardService.isBoardPopup$.next(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
