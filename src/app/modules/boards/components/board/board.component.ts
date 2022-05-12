import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { BoardService } from '../../services/board.service';

// models
import { BoardModel } from '../../../core/models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  public board$!: Observable<BoardModel>;

  public isColumnPopupOpen = false;

  constructor(private boardService: BoardService) {}

  public ngOnInit(): void {
    this.board$ = this.boardService.getBoardData();
  }

  public toggleColumnPopup(): void {
    this.isColumnPopupOpen = !this.isColumnPopupOpen;
  }
}
