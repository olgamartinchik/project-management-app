import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private boardService: BoardService) {}

public  openPopup() {
    this.boardService.isBoardPopup$.next(true);
  }
}
