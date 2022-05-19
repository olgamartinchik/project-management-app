import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';
import { BoardService } from './board.service';

import { ColumnModel } from '../../core/models/column.model';
import { ITask } from '../../core/models/ITask.model';

interface TaskSubjectModel {
  isOpen: boolean;
  popupFunction: FunctionModel;
  column: ColumnModel | null;
}

type FunctionModel = 'edit' | 'add';

@Injectable()
export class TaskService {
  public taskSubject$ = new BehaviorSubject<TaskSubjectModel>({
    isOpen: false,
    popupFunction: 'add',
    column: null,
  });

  public task: ITask | null = null;

  constructor(private apiService: ApiService, private boardService: BoardService) {}

  public openPopup(popupFunction: FunctionModel, column: ColumnModel, task?: ITask): void {
    this.task = task || null;
    this.taskSubject$.next({ isOpen: true, popupFunction, column });
  }

  public closePopup(): void {
    this.taskSubject$.next({ isOpen: false, popupFunction: 'add', column: null });
  }

  public createTask(boardId: string, value: ITask): void {
    const tasks = this.taskSubject$.value.column!.tasks!;
    const taskData: ITask = {
      ...value,
      order: tasks.length === 0 ? 0 : tasks[tasks.length - 1].order! + 1,
      done: false,
    };

    this.apiService
      .postTask(boardId, this.taskSubject$.value.column!.id!, taskData)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  }

  public updateTask(boardId: string, value: ITask): void {
    const taskData: ITask = {
      ...value,
      order: this.task!.order,
      boardId,
      columnId: this.taskSubject$.value.column!.id,
    };

    this.apiService
      .putTask(boardId, this.taskSubject$.value.column!.id!, this.task!.id!, taskData)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  }
}
