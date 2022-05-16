import { BehaviorSubject, Subject, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITask } from '../../core/models/ITask.model';
import { ApiService } from '../../core/services/api.service';

import { BoardService } from './board.service';
import { UserModel } from '../../core/models/user.model';
import { IAppState } from 'src/app/redux/state.model';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskService {
  public users$ = new Subject<UserModel>();

  public editTask$ = new Subject<ITask>();

  public isNewTaskPopup$ = new BehaviorSubject(false);

  public isEditTaskPopup$ = new BehaviorSubject(false);

  constructor(
    private store: Store<IAppState>,
    private apiService: ApiService,
    private boardService: BoardService,
  ) {}

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
      .subscribe((tasksData) => {
        console.log('new task', tasksData);
      });
  }

  // public updateTask(
  //   boardId: string,
  //   columnId: string,
  //   taskId: string,
  //   value: ITask,
  //   order: number,
  // ): void {
  //   const taskDate: ITask = {
  //     ...value,
  //     order,
  //     boardId,
  //     columnId,
  //   };
  //   console.log('taskDate',taskDate,taskId)
  //   this.apiService
  //     .putTask(boardId, columnId, taskId, taskDate)
  //     .pipe(
  //       take(1),
  //       tap(() => {
  //         this.boardService.updateBoard();
  //       }),
  //     )
  //     .subscribe((tasks) => {
  //       console.log('update task', tasks);
  //     });
  // }
  public updateTask(
    boardId: string,
    columnId: string,
    // taskId: string,
    value: ITask,
    // order: number,
  ): void {
    this.editTask$.subscribe((task) => {
      const taskDate: ITask = {
        ...value,
        order: task.order,
        boardId,
        columnId,
      };
      console.log('taskDate', taskDate, task.id);
      this.apiService
        .putTask(boardId, columnId, task.id!, taskDate)
        .pipe(
          take(1),
          tap(() => {
            this.boardService.updateBoard();
          }),
        )
        .subscribe((tasks) => {
          console.log('update task', tasks);
        });
    });
  }
}
