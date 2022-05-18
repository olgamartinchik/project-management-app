import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin, take, Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { BoardService } from './board.service';

import { ColumnModel } from '../../core/models/column.model';
import { ITask } from '../../core/models/ITask.model';

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
    { currentIndex }: CdkDragDrop<string[]>,
  ): void {
    const updateReq: Observable<ITask>[] = [];
    let nextOrder = this.findMaxOrder(tasks) + 1;

    // проходимся по массиву от индекса текущего элемента до конца
    for (let i = currentIndex; i < tasks.length; ++i) {
      const taskData: ITask = { ...tasks[i], order: nextOrder };

      updateReq.push(
        this.apiService.putTask(boardId, columnId, tasks[i].id!, taskData).pipe(take(1)),
      );

      nextOrder++;
    }

    forkJoin([...updateReq]).subscribe({
      complete: () => this.boardService.updateBoard(),
    });
  }

  private findMaxOrder(items: ITask[] | ColumnModel[]): number {
    let maxOrder = 0;
    items.forEach((el) => {
      if (el.order > maxOrder) maxOrder = el.order;
    });

    return maxOrder;
  }
}
