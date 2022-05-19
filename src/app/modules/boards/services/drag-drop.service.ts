import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin, take, Observable, switchMap } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { BoardService } from './board.service';

import { ColumnModel } from '../../core/models/column.model';
import { ITask } from '../../core/models/ITask.model';
import { BoardModel } from '../../core/models/board.model';

@Injectable()
export class DragDropService {
  constructor(private apiService: ApiService, private boardService: BoardService) {}

  public moveColumn(
    boardId: string,
    columns: ColumnModel[],
    { currentIndex }: CdkDragDrop<string[]>,
  ): void {
    const updateReq: Observable<ColumnModel>[] = [];
    let nextOrder = this.findMaxOrder(columns) + 1;

    // проходимся по массиву от индекса текущего элемента до конца
    for (let i = currentIndex; i < columns.length; ++i) {
      const columnData = { title: columns[i].title, order: nextOrder };

      updateReq.push(
        this.apiService.updateColumn(boardId, columns[i].id!, columnData).pipe(take(1)),
      );

      nextOrder++;
    }

    forkJoin([...updateReq]).subscribe({
      complete: () => this.boardService.updateBoard(),
    });
  }

  public moveTask(
    boardId: string,
    columnId: string,
    tasks: ITask[],
    { currentIndex }: CdkDragDrop<ITask[]>,
  ): void {
    const updateReq: Observable<ITask>[] = [];
    let nextOrder = this.findMaxOrder(tasks) + 1;

    // проходимся по массиву от индекса текущего элемента до конца
    for (let i = currentIndex; i < tasks.length; ++i) {
      const { title, description, userId, done } = tasks[i];
      const taskData: ITask = {
        title,
        description,
        userId,
        done,
        order: nextOrder,
        boardId,
        columnId,
      };

      updateReq.push(
        this.apiService.putTask(boardId, columnId, tasks[i].id!, taskData).pipe(take(1)),
      );

      nextOrder++;
    }

    forkJoin([...updateReq]).subscribe({
      complete: () => this.boardService.updateBoard(),
    });
  }

  public moveTaskBetweenColumn(
    board: BoardModel,
    tasks: ITask[],
    event: CdkDragDrop<ITask[]>,
  ): void {
    const prevColumn = board.columns.find((el) => el.id! === event.previousContainer.id)!;

    this.apiService
      .deleteTask(board.id!, prevColumn.id!, prevColumn!.tasks![event.previousIndex].id!)
      .pipe(
        switchMap(() => {
          // получаем данные перемещенной таски
          const { title, description, done, userId } = prevColumn.tasks![event.previousIndex];

          return this.apiService.postTask(board.id!, event.container.id, {
            title,
            description,
            order: this.findMaxOrder(tasks),
            done,
            userId,
          });
        }),
        take(1),
      )
      .subscribe(() => this.moveTask(board.id!, event.container.id, tasks, event));
  }

  private findMaxOrder(items: ITask[] | ColumnModel[]): number {
    let maxOrder = 0;
    items.forEach((el) => {
      if (el.order > maxOrder) maxOrder = el.order;
    });

    return maxOrder;
  }
}
