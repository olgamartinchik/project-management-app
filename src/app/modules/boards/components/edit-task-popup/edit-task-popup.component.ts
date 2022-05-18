// import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable, Subject, take, takeUntil } from 'rxjs';
// import { TaskService } from 'src/app/modules/boards/services/task.service';
// import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';
// import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
// import { ITask } from 'src/app/modules/core/models/ITask.model';
// import { UserModel } from 'src/app/modules/core/models/user.model';
// import { ApiService } from 'src/app/modules/core/services/api.service';
// import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';
// import { taskSelect } from 'src/app/redux/selectors/tasks.selectors';
// import { usersSelect } from 'src/app/redux/selectors/users.selector';
// import { IAppState } from 'src/app/redux/state.model';
// // import { TaskService } from '../../../boards/services/task.service';

// @Component({
//   selector: 'app-edit-task-popup',
//   templateUrl: './edit-task-popup.component.html',
//   styleUrls: ['./edit-task-popup.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class EditTaskPopupComponent implements OnInit, OnDestroy {
//   @Input() public task!: ITask;

//   @Input() public boardId!: string;

//   @Input() public columnId!: string;

//   public editTaskForm!: FormGroup;

//   public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

//   private unsubscribe$: Subject<void> = new Subject<void>();

//   public users$: Observable<UserModel[]> = this.store.select(usersSelect);

//   public editTask$: Observable<ITask> = this.store.select(taskSelect);

//   constructor(
//     public apiService: ApiService,
//     private fb: FormBuilder,
//     public errorMessagesService: ErrorMessagesService,
//     public taskService: TaskService,
//     private store: Store<IAppState>,
//   ) {}

//   public ngOnInit(): void {
//     this.createForm();
//     this.editTask$.pipe(takeUntil(this.unsubscribe$)).subscribe((taskData) => {
//       this.editTaskForm.setValue({
//         title: taskData.title!,
//         description: taskData.description,
//         done: taskData.done,
//         userId: taskData.userId,
//       });
//     });
//   }

//   private createForm(): void {
//     this.editTaskForm = this.fb.group({
//       title: [``, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
//       description: [``, [Validators.required, Validators.minLength(2), Validators.maxLength(225)]],
//       done: [false],

//       userId: [``, Validators.required],
//     });
//   }

//   public stopPropagation(event: Event): void {
//     event.stopPropagation();
//   }

//   public closePopup(): void {
//     this.taskService.isEditTaskPopup$.next(false);
//     this.editTaskForm.reset();
//   }

//   public updateTask(): void {
//     this.editTask$.pipe(take(1)).subscribe((selectTask) => {
//       this.taskService.updateTask(
//         this.boardId,

//         selectTask.id!,
//         { ...this.editTaskForm.value },
//         selectTask.order!,
//       );
//     });

//     this.taskService.isEditTaskPopup$.next(false);
//     this.editTaskForm.reset();
//   }

//   public ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }
// }
