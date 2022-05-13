import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  constructor(public taskService: TaskService) {}

  public openPopupEditTask(): void {
    this.taskService.isEditTaskPopup$.next(true);
  }
}
