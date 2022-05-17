import { ITask } from './../models/ITask.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public tasks$ = new BehaviorSubject<ITask[]>([]);

  private allTasks: ITask[] = [];

  // constructor(private apiService: ApiService) {}

  // public getData(inputValue: string) {}

  // public getSearchTask(searchResult: string): void {
  //   this.apiService
  //     .getBoards()
  //     .pipe(take(1))
  //     .subscribe((boards) => {
  //       for (let i = 0; i < boards.length; i++) {
  //         // console.log('boards', boards[i].id)
  //         this.apiService
  //           .getColumns(boards[i].id!)
  //           .pipe(take(1))
  //           .subscribe((columns) => {
  //             for (let j = 0; j < columns.length; j++) {
  //               // console.log('columns',columns)
  //               this.apiService
  //                 .getTasks(boards[i].id!, columns[j].id!)
  //                 .pipe(take(1))
  //                 .subscribe((tasks) => {
  //                   for (let s = 0; s < tasks.length; s++) {
  //                     if (
  //                       tasks[s].title.toLowerCase().includes(searchResult) ||
  //                       tasks[s].description.toLowerCase().includes(searchResult) ||
  //                       tasks[s].order!.toString().includes(searchResult)
  //                     ) {
  //                       console.log('tasks', tasks[s]);
  //                       this.allTasks.push(tasks[s]);
  //                       // console.log('this.allTasks',this.allTasks)
  //                       this.tasks$.next(this.allTasks);
  //                     }
  //                   }
  //                 });
  //             }
  //           });
  //       }
  //     });
  // }
}
