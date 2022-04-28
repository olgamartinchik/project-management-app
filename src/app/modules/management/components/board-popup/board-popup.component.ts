import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  constructor(public boardService: BoardService) {}

  closePopup() {
    this.boardService.isBoardPopup$.next(false);
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
