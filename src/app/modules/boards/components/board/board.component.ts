import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';
import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';
import { DragDropService } from '../../services/drag-drop.service';

import { BoardModel } from '../../../core/models/board.model';

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
    public taskService: TaskService,
    public usersService: UsersService,
    private boardService: BoardService,
    private boardPopupService: BoardPopupService,
    private dragDropService: DragDropService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.subscription = this.boardService.getBoardData().subscribe((board) => {
      this.board = board;
      this.cdr.markForCheck();
    });
    this.usersService.getAllUsers();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public moveColumn(event: CdkDragDrop<string[]>): void {
    if (event.currentIndex !== event.previousIndex) {
      const movingColumns = [...this.board.columns];
      moveItemInArray(movingColumns, event.previousIndex, event.currentIndex);
      this.board = { ...this.board, columns: movingColumns };

      this.dragDropService.moveColumn(this.board.id!, this.board.columns, event);
    }
  }

  public toggleColumnPopup(): void {
    this.isColumnPopupOpen = !this.isColumnPopupOpen;
  }

  public openEditBoardPopup(): void {
    this.boardPopupService.open('edit');
  }
}
