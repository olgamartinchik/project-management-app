import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin, take, Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { BoardService } from './board.service';

import { ColumnModel } from '../../core/models/column.model';

@Injectable()
export class DragDropService {
  constructor(private apiService: ApiService, private boardService: BoardService) {}

  public moveColumn(
    boardId: string,
    columns: ColumnModel[],
    { currentIndex }: CdkDragDrop<string[]>,
  ): void {
    const updateColumnsReq: Observable<ColumnModel>[] = [];
    let nextOrder = this.findMaxOrder(columns) + 1;

    // проходимся по массиву от индекса текущего элемента до конца
    for (let i = currentIndex; i < columns.length; ++i) {
      const columnData = { title: columns[i].title, order: nextOrder };

      updateColumnsReq.push(
        this.apiService.updateColumn(boardId, columns[i].id!, columnData).pipe(take(1)),
      );

      nextOrder++;
    }

    forkJoin([...updateColumnsReq]).subscribe({
      complete: () => this.boardService.updateBoard(),
    });
  }

  private findMaxOrder(columns: ColumnModel[]): number {
    let maxOrder = 0;
    columns.forEach((el) => {
      if (el.order > maxOrder) maxOrder = el.order;
    });

    return maxOrder;
  }
}
