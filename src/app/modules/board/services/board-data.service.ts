import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { IColumn } from '../../core/model/ITask.model';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardDataService {
  public allColumn$ = new BehaviorSubject<IColumn[]>([]);

  constructor(private httpService: HttpService) {}

  public getAllColumn(id: string): void {
    this.httpService
      .getColumns(id)
      .pipe(take(1))
      .subscribe((columns) => {
        this.allColumn$.next(columns);
        console.log('columns', columns);
      });
  }
}
