import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TFilter } from '../models/sort-task.model';

@Injectable()
export class SortService {
  public filterStatus: TFilter = {
    isUpperOrder: false,
    isUpperTitle: false,
    sortFlag: '',
  };

  public filterStatusSubject = new BehaviorSubject(this.filterStatus);

  public changeValue(payload: object): void {
    this.filterStatus = { ...this.filterStatus, ...payload };
    this.filterStatusSubject.next(this.filterStatus);
  }
}
