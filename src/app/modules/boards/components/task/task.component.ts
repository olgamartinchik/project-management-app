import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask } from 'src/app/modules/core/models/ITask.model';
import { ApiService } from 'src/app/modules/core/services/api.service';

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

  // public name:string='vasya'
  constructor(public taskService: TaskService, public apiService: ApiService) {}

  public openPopupEditTask(): void {
    this.taskService.isEditTaskPopup$.next(true);
  }

  public deleteTask(event: Event): void {
    event.stopPropagation();
  }
}
