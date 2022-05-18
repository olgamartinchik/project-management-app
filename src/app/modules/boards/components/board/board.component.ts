import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';

import { BoardModel } from '../../../core/models/board.model';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  public board$!: Observable<BoardModel>;

  public isColumnPopupOpen = false;

  constructor(
    private boardService: BoardService,
    private boardPopupService: BoardPopupService,
    public taskService: TaskService,
    public usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.board$ = this.boardService.getBoardData();
    this.usersService.initAllUsers();
  }

  public toggleColumnPopup(): void {
    this.isColumnPopupOpen = !this.isColumnPopupOpen;
  }

  public openEditBoardPopup(): void {
    this.boardPopupService.open('edit');
  }
}
