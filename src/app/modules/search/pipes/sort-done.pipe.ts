import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../core/models/ITask.model';
import { FilterMarker } from '../models/sort-task.model';
import { SortService } from '../services/sort.service';

@Pipe({
  name: 'sortDone',
})
export class SortDonePipe implements PipeTransform {
  constructor(private sortService: SortService) {}

  public transform(taskList: ITask[] | [], isDone: boolean): ITask[] {
    if (this.sortService.filterStatus.sortFlag === FilterMarker.doneFlag) {
      taskList = this.sortByDoneTask(isDone, taskList);
    }
    return taskList;
  }

  private sortByDoneTask(isDone: boolean, taskList: ITask[]): ITask[] {
    let newList: any;
    if (isDone) {
      newList = taskList.filter((task) => !!task.done);
    } else if (!isDone) {
      newList = taskList.filter((task) => !task.done);
    }
    return newList;
  }
}
