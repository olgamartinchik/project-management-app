import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, map } from 'rxjs';

// services
import { ApiService } from '../../../core/services/api.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';
import { UsersService } from '../../services/users.service';

// ngrx
import { usersSelect } from '../../../../redux/selectors/users.selector';

// models
import { ColumnModel } from '../../../core/models/column.model';
import { ITask } from '../../../core/models/ITask.model';
import { IAppState } from '../../../../redux/state.model';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public column!: ColumnModel;

  private users$: Observable<UserModel[]> = this.store.select(usersSelect);

  public userName!: string;

  constructor(
    public taskService: TaskService,
    public apiService: ApiService,
    public usersService: UsersService,
    private store: Store<IAppState>,
    private confirmService: ConfirmService,
    private boardService: BoardService,
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

  public openEditTaskPopup(): void {
    this.taskService.openPopup('edit', this.column, this.task);
  }

  public confirmDeleteTask(event: Event): void {
    event.stopPropagation();
    this.confirmService.open(this.deleteTask);
  }

  private deleteTask = (): void => {
    this.apiService
      .deleteTask(this.boardId, this.column.id!, this.task.id!)
      .pipe(take(1))
      .subscribe(() => this.boardService.updateBoard());
  };
}
