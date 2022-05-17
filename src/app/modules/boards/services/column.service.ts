import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ColumnModel } from '../../core/models/column.model';

import { ApiService } from '../../core/services/api.service';
import { BoardService } from './board.service';

@Injectable()
export class ColumnService {
  constructor(private apiService: ApiService, private boardService: BoardService) {}

  public createColumn(title: string, columns: ColumnModel[]): void {
    const columnData: ColumnModel = {
      title,
      order: columns.length === 0 ? 0 : columns[columns.length - 1].order + 1,
    };

    this.apiService
      .createColumn(this.boardService.boardId, columnData)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  }

  public editColumn(column: ColumnModel, title: string): void {
    const columnData = { title, order: column.order };

    this.apiService
      .updateColumn(this.boardService.boardId, column.id!, columnData)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  }

  public deleteColumn(columnId: string): void {
    this.apiService
      .deleteColumn(this.boardService.boardId, columnId)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  }
}
