import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../../core/services/board.service';
import { HttpBoardsService } from '../../../core/services/http-boards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public boards: IBoard[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public boardService: BoardService, public httpBoardsService: HttpBoardsService) {}

  ngOnInit() {
    this.boardService.updateBoards();
  }

  public openPopup(): void {
    this.boardService.isBoardPopup$.next(true);
  }
}
