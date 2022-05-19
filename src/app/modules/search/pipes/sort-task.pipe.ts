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
    let newArray = taskList;
    if (this.sortService.filterStatus.sortFlag === FilterMarker.orderFlag) {
      this.sortTask(isUpperOrder, FilterMarker.orderFlag, newArray);
    }
    if (this.sortService.filterStatus.sortFlag === FilterMarker.titleFlag) {
      this.sortTask(isUpperTitle, FilterMarker.titleFlag, newArray);
    }

    return newArray;
  }

  private sortTask(isUpper: boolean, sortFlag: string, taskList: ITask[]): void {
    if (!isUpper) {
      taskList.sort((task, nextTask) =>
        sortFlag === FilterMarker.titleFlag
          ? task.title.toLowerCase().charCodeAt(0) - nextTask.title.toLowerCase().charCodeAt(0)
          : task.order! - nextTask.order!,
      );
    } else if (isUpper) {
      taskList.sort((task, nextTask) =>
        sortFlag === FilterMarker.titleFlag
          ? nextTask.title.toLowerCase().charCodeAt(0) - task.title.toLowerCase().charCodeAt(0)
          : nextTask.order! - task.order!,
      );
    }
  }
}
