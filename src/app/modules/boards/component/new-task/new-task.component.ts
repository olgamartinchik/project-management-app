import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit {
  public taskForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    public errorMessagesService: ErrorMessagesService,
    public taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(225)]],
    });
  }

  public closePopup(): void {
    this.taskService.isNewTaskPopup$.next(false);
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public createTask(): void {
    console.log('new task', { ...this.taskForm.value });
    this.taskService.isNewTaskPopup$.next(false);
    this.taskForm.reset();
  }
}
