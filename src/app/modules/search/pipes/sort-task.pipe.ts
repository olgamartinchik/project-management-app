import { ITask } from 'src/app/modules/core/models/ITask.model';
import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../services/sort.service';
import { FilterMarker } from '../models/sort-task.model';

@Pipe({
  name: 'sortTask',
})
export class SortTaskPipe implements PipeTransform {
  constructor(private sortService: SortService) {}

  public transform(
    taskList: ITask[] | [],

    isUpperOrder: boolean,
    isUpperTitle: boolean,
  ): ITask[] {
    if (taskList.length == 0) return taskList;
    if (this.sortService.filterStatus.sortFlag === FilterMarker.orderFlag) {
      this.sortByOrderTask(isUpperOrder, taskList);
    }
    if (this.sortService.filterStatus.sortFlag === FilterMarker.titleFlag) {
      this.sortByTitleTask(isUpperTitle, taskList);
    }

    return taskList;
  }

  private sortByOrderTask(isUpperOrder: boolean, taskList: ITask[]): void {
    if (!isUpperOrder) {
      taskList.sort((task, nextTask) => task.order! - nextTask.order!);
    } else if (isUpperOrder) {
      taskList.sort((task, nextTask) => nextTask.order! - task.order!);
    }
  }

  private sortByTitleTask(isUpperTitle: boolean, taskList: ITask[]): void {
    if (!isUpperTitle) {
      taskList.sort(
        (task, nextTask) =>
          task.title.toLowerCase().charCodeAt(0) - nextTask.title.toLowerCase().charCodeAt(0),
      );
    } else if (isUpperTitle) {
      taskList.sort(
        (task, nextTask) =>
          nextTask.title.toLowerCase().charCodeAt(0) - task.title.toLowerCase().charCodeAt(0),
      );
    }
  }
}
