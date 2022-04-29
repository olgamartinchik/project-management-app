import { Component, Input } from '@angular/core';
import { map, take } from 'rxjs';
import { IBoard } from '../../model/board.model';
import { BoardService } from '../../services/board.service';
import { HttpBoardsService } from '../../services/http-boards.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() boardData?: IBoard;

  constructor(private httpBoardsService: HttpBoardsService, private boardService: BoardService) {}

  deleteBoard() {
    this.httpBoardsService
      .deleteBoard(this.boardData!.id!)
      .pipe(
        take(1),
        map(() => {
          this.boardService.updateBoards();
        }),
      )
      .subscribe();
  }
}
