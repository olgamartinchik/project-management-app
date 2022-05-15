import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { ITask } from 'src/app/modules/core/models/ITask.model';
import { UserModel } from 'src/app/modules/core/models/user.model';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskPopupComponent implements OnInit, OnDestroy {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string;

  public editTaskForm!: FormGroup;

  public allUsers!: UserModel[];

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    // console.log('inputTask',this.task)
    this.createForm();
    this.apiService
      .getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        // console.log('users', users);
        this.allUsers = users;
      });
  }

  private createForm(): void {
    this.editTaskForm = this.fb.group({
      title: [
        `${this.task.title}`,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      description: [
        `${this.task.description}`,
        [Validators.required, Validators.minLength(2), Validators.maxLength(225)],
      ],
      done: [this.task.done],

      userId: [`${this.task.userId}`, Validators.required],
    });
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closePopup(): void {
    this.taskService.isEditTaskPopup$.next(false);
    this.editTaskForm.reset();
  }

  public updateTask(): void {
    // console.log('edit form', this.editTaskForm.value);
    this.taskService.updateTask(
      this.boardId,
      this.columnId,
      this.task.id!,
      { ...this.editTaskForm.value },
      this.task.order!,
    );
    this.taskService.isEditTaskPopup$.next(false);
    this.editTaskForm.reset();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
