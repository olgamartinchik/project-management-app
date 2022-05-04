import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { IColumn } from '../../core/model/http.model';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class BoardDataService {
  public allColumn$ = new BehaviorSubject<IColumn[]>([]);

  public orderColumns: number = 0;

  constructor(private httpService: HttpService) {}

  getAllColumn(id: string) {
    this.httpService
      .getColumns(id)
      .pipe(take(1))
      .subscribe((columns) => {
        this.allColumn$.next(columns);
        console.log('columns', columns);
        this.orderColumns = +columns.length;
      });
  }
}
