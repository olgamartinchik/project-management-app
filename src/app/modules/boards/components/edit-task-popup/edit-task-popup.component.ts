import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, take } from 'rxjs';
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { ITask } from 'src/app/modules/core/models/ITask.model';
import { UserModel } from 'src/app/modules/core/models/user.model';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';
import { usersSelect } from 'src/app/redux/selectors/users.selector';
import { IAppState } from 'src/app/redux/state.model';
import { BoardService } from '../../services/board.service';
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

  // public allUsers!: UserModel[];

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private unsubscribe$: Subject<void> = new Subject<void>();

  public users: Observable<UserModel[]> = this.store.select(usersSelect);

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
    private boardService: BoardService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.createForm();

    this.taskService.editTask$
      .pipe
      // takeUntil(this.unsubscribe$)
      ()
      .subscribe((taskData) => {
        console.log('11111', taskData);
        this.editTaskForm.setValue({
          title: taskData.title,
          description: taskData.description,
          done: taskData.done,
          userId: taskData.userId,
        });
      });
  }

  private createForm(): void {
    this.editTaskForm = this.fb.group({
      title: [``, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [``, [Validators.required, Validators.minLength(2), Validators.maxLength(225)]],
      done: [false],

      userId: [``, Validators.required],
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
    this.taskService.updateTask(
      this.boardId,
      this.columnId,
      // this.task.id!,
      { ...this.editTaskForm.value },
      // this.task.order!,
    );
    this.taskService.editTask$.pipe(take(1)).subscribe((task) => {
      console.log('task1111111', task);

      // const taskDate: ITask = {
      //   ...this.editTaskForm.value,
      //  order: task.order,
      //   boardId:this.boardId,
      //   columnId:this.columnId,
      // };
      // this.apiService
      //     .putTask(this.boardId, this.columnId, task.id!, taskDate)
      //     .pipe(
      //       take(1),
      //       tap(() => {
      //         this.boardService.updateBoard();
      //       }),
      //     ).subscribe(()=>this.boardService.updateBoard())
    });

    this.taskService.isEditTaskPopup$.next(false);
    this.editTaskForm.reset();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
