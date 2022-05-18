import { BehaviorSubject, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITask } from '../../core/models/ITask.model';
import { ApiService } from '../../core/services/api.service';

import { BoardService } from './board.service';

@Injectable()
export class TaskService {
  public isNewTaskPopup$ = new BehaviorSubject(false);

  public isEditTaskPopup$ = new BehaviorSubject(false);

  public columnId!: string;

  constructor(private apiService: ApiService, private boardService: BoardService) {}

  public createTask(boardId: string, columnId: string, value: ITask, tasks: ITask[]): void {
    const dataTask: ITask = {
      ...value,
      order: tasks.length === 0 ? 0 : tasks[tasks.length - 1].order! + 1,
      done: false,
    };
    this.apiService
      .postTask(boardId, columnId, dataTask)
      .pipe(
        take(1),
        tap(() => {
          this.boardService.updateBoard();
        }),
      )
      .subscribe((taskData) => {
        console.log(taskData.order);
      });
  }

  public updateTask(boardId: string, taskId: string, value: ITask, order: number): void {
    const taskDate: ITask = {
      ...value,
      order,
      boardId,
      columnId: this.columnId,
    };
    this.apiService
      .putTask(boardId, this.columnId, taskId, taskDate)
      .pipe(
        take(1),
        tap(() => {
          this.boardService.updateBoard();
        }),
      )
      .subscribe();
  }
}
