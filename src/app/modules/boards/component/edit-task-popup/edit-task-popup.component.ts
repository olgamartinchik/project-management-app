import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';
import { UserModel } from 'src/app/modules/core/models/api.service.models';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';
import { HttpService } from 'src/app/modules/core/services/http.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskPopupComponent implements OnInit, OnDestroy {
  public editTaskForm!: FormGroup;

  public allUsers!: UserModel[];

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public httpService: HttpService,
    private fb: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.httpService
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
        'some title',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      description: [
        'some description',
        [Validators.required, Validators.minLength(2), Validators.maxLength(225)],
      ],
      done: [false],

      userId: ['', Validators.required],
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
    console.log('edit form', this.editTaskForm.value);
    this.taskService.isEditTaskPopup$.next(false);
    this.editTaskForm.reset();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
