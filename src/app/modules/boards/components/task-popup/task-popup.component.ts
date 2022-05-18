import { Subject, Observable, take, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';

import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages.service';
import { TaskService } from '../../services/task.service';
import { UserModel } from 'src/app/modules/core/models/user.model';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ColumnModel } from 'src/app/modules/core/models/column.model';
import { ColumnService } from '../../services/column.service';

import { IAppState } from 'src/app/redux/state.model';
import { Store } from '@ngrx/store';
import { usersSelect } from 'src/app/redux/selectors/users.selector';
import { ITask } from 'src/app/modules/core/models/ITask.model';
import { taskSelect } from 'src/app/redux/selectors/tasks.selectors';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPopupComponent implements OnInit, OnDestroy {
  @Input() public boardId!: string;

  @Input() public columnData!: ColumnModel;

  public users: Observable<UserModel[]> = this.store.select(usersSelect);

  public taskForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private unsubscribe$: Subject<void> = new Subject<void>();

  public editTask$: Observable<ITask> = this.store.select(taskSelect);

  public isNewTask!: boolean;

  constructor(
    private fb: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
    public apiService: ApiService,
    private columnService: ColumnService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.taskService.newTask$.pipe(takeUntil(this.unsubscribe$)).subscribe((flag) => {
      this.isNewTask = flag;
      if (!flag) {
        this.editTask$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(({ title, description, done, userId }) => {
            this.taskForm.setValue({
              title,
              description,
              done,
              userId,
            });
          });
      }
    });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(225)]],
      done: [false],
      userId: ['', Validators.required],
    });
  }

  public closePopup(): void {
    this.taskService.newTask$.next(true);
    this.taskService.isTaskPopup$.next(false);
    this.taskForm.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createTask(): void {
    this.taskService.isTaskPopup$.next(false);
    if (this.isNewTask) {
      this.taskService.createTask(
        this.boardId,
        this.columnService.columnId,
        { ...this.taskForm.value },
        this.columnData.tasks!,
      );
    } else {
      this.editTask$.pipe(take(1)).subscribe((selectTask) => {
        this.taskService.updateTask(
          this.boardId,
          selectTask.id!,
          { ...this.taskForm.value },
          selectTask.order!,
        );
      });
    }

    this.taskService.newTask$.next(true);
    this.taskForm.reset();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
