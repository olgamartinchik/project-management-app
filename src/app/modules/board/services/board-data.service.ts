import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { IColumn } from '../../core/models/IBoard.model';

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
        // console.log('columns', columns);
      });
  }
}
