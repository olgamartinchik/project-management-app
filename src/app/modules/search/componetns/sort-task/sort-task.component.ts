import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { FilterMarker } from '../../models/sort-task.model';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-sort-task',
  templateUrl: './sort-task.component.html',
  styleUrls: ['./sort-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTaskComponent {
  public isUpperOrder = false;

  public isUpperTitle = false;

  public isDone = false;

  constructor(public searchService: SearchService, private sortService: SortService) {}

  public sortByOrder(): void {
    if (this.sortService.filterStatus.isUpperOrder) {
      this.sortService.changeValue({ isUpperOrder: false });
    } else {
      this.sortService.changeValue({ isUpperOrder: true });
    }
    this.isUpperOrder = this.sortService.filterStatus.isUpperOrder;
    this.sortService.changeValue({ sortFlag: FilterMarker.orderFlag });
  }

  public sortByTitle(): void {
    if (this.sortService.filterStatus.isUpperTitle) {
      this.sortService.changeValue({ isUpperTitle: false });
    } else {
      this.sortService.changeValue({ isUpperTitle: true });
    }
    this.isUpperTitle = this.sortService.filterStatus.isUpperTitle;
    this.sortService.changeValue({ sortFlag: FilterMarker.titleFlag });
  }

  public sortByDoneTask(): void {
    if (this.sortService.filterStatus.isDone) {
      this.sortService.changeValue({ isDone: false });
    } else {
      this.sortService.changeValue({ isDone: true });
    }
    this.isDone = this.sortService.filterStatus.isDone;
    this.sortService.changeValue({ sortFlag: FilterMarker.doneFlag });
  }
}
