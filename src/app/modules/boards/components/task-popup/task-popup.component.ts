import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// services
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages.service';
import { TaskService } from '../../services/task.service';

// ngrx
import { usersSelect } from 'src/app/redux/selectors/users.selector';

// models
import { IAppState } from 'src/app/redux/state.model';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { UserModel } from 'src/app/modules/core/models/user.model';

// constants
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPopupComponent implements OnInit, OnDestroy {
  @Input() public boardId!: string;

  public users: Observable<UserModel[]> = this.store.select(usersSelect);

  public taskForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private subscription: Subscription = new Subscription();

  constructor(
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
    private store: Store<IAppState>,
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.subscription = this.taskService.taskSubject$.subscribe(({ popupFunction }) => {
      if (popupFunction === 'edit') {
        this.taskForm.setValue({
          title: this.taskService.task!.title,
          description: this.taskService.task!.description,
          done: this.taskService.task!.done,
          userId: this.taskService.task!.userId,
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public closePopup(): void {
    this.taskService.closePopup();
    this.taskForm.reset();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public submit(): void {
    if (this.taskService.taskSubject$.value.popupFunction === 'add') {
      this.taskService.createTask(this.boardId, this.taskForm.value);
    } else {
      this.taskService.updateTask(this.boardId, this.taskForm.value);
    }

    this.closePopup();
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(225)]],
      done: [false],
      userId: ['', Validators.required],
    });
  }
}
