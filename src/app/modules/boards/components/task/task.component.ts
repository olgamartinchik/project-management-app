import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { ITask } from 'src/app/modules/core/models/ITask.model';
import { UserModel } from 'src/app/modules/core/models/user.model';

import { ApiService } from 'src/app/modules/core/services/api.service';
import { ConfirmService } from 'src/app/modules/core/services/confirm.service';
import { UsersService } from 'src/app/modules/core/services/users.service';
import { updateAllBoards } from 'src/app/redux/actions/board.actions';
import { setTask } from 'src/app/redux/actions/tasks.actions';
import { usersSelect } from 'src/app/redux/selectors/users.selector';

import { IAppState } from 'src/app/redux/state.model';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string;

  private users$: Observable<UserModel[]> = this.store.select(usersSelect);

  public userName!: string;

  constructor(
    public taskService: TaskService,
    public apiService: ApiService,
    private store: Store<IAppState>,
    private confirmService: ConfirmService,
    public usersService: UsersService,
  ) {}

  public getUser(userId: string): string {
    this.users$
      .pipe(
        take(1),
        map((users) => users.find((user) => user.id === userId)),
      )
      .subscribe((user) => {
        this.userName = user?.name!;
      });
    return this.userName;
  }

  public openPopupEditTask(): void {
    this.taskService.newTask$.next(false);
    this.taskService.isTaskPopup$.next(true);
    this.taskService.columnId = this.columnId;
    this.store.dispatch(setTask({ task: this.task }));
  }

  public confirmDeleteTask(event: Event): void {
    event.stopPropagation();
    this.confirmService.open(this.deleteTask);
  }

  private deleteTask = (): void => {
    this.apiService
      .deleteTask(this.boardId, this.columnId, this.task.id!)
      .pipe(take(1))
      .subscribe(() => {
        this.store.dispatch(updateAllBoards());
      });
  };
}
