import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

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
export class BoardComponent implements OnInit, OnDestroy {
  public board!: BoardModel;

  public isColumnPopupOpen = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private boardService: BoardService,
    private boardPopupService: BoardPopupService,
    private cdr: ChangeDetectorRef,
    public taskService: TaskService,
    public usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.boardService.getBoardData().subscribe((board) => {
        this.board = board;
        this.cdr.markForCheck();
      }),
    );
    this.usersService.getAllUsers();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleColumnPopup(): void {
    this.isColumnPopupOpen = !this.isColumnPopupOpen;
  }

  public openEditBoardPopup(): void {
    this.boardPopupService.open('edit');
  }
}
