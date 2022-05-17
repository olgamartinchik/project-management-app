import { ITask } from './../models/ITask.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public tasks$ = new BehaviorSubject<ITask[]>([]);

  public allTasks: ITask[] = [];

  constructor(private apiService: ApiService) {}

  public getData(inputValue: string): void {
    this.allTasks = [];
    this.tasks$.next([]);
    this.apiService
      .getBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        boards.forEach((board) => {
          this.apiService
            .getColumns(board.id!)
            .pipe(take(1))
            .subscribe((columns) => {
              columns.forEach((column) => {
                this.apiService
                  .getTasks(board.id!, column.id!)
                  .pipe(take(1))
                  .subscribe((tasks) => {
                    // console.log("tasks",tasks)
                    tasks.forEach((task) => {
                      if (
                        task.title.toLowerCase().trim().includes(inputValue) ||
                        task.description.toLowerCase().trim().includes(inputValue) ||
                        task.order!.toString().trim().includes(inputValue)
                      ) {
                        this.allTasks.push(task);
                        this.tasks$.next(this.allTasks);
                        console.log(' this.allTasks', this.allTasks);
                      }
                      this.apiService
                        .getAllUsers()
                        .pipe(take(1))
                        .subscribe((users) => {
                          users.forEach((user) => {
                            if (
                              task.userId === user.id &&
                              user.name.toLowerCase().trim().includes(inputValue)
                            ) {
                              this.allTasks.push(task);
                              console.log(' this.allTasks', this.allTasks);
                              this.tasks$.next(this.allTasks);
                            }
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  }

  // public getSearchTask(inputValue: string): void {
  //   this.allTasks = [];
  //   this.tasks$.next([]);
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
  //                   // console.log('111111111',tasks)
  //                   for (let s = 0; s < tasks.length; s++) {
  //                     if (
  //                       tasks[s].title.toLowerCase().trim().includes(inputValue) ||
  //                       tasks[s].description.toLowerCase().trim().includes(inputValue) ||
  //                       tasks[s].order!.toString().trim().includes(inputValue)
  //                     ) {
  //                       // console.log('tasks', tasks[s]);
  //                       // this.allTasks.push(tasks[s]);
  //                       // console.log('this.allTasks', this.allTasks);
  //                       // this.tasks$.next(this.allTasks);
  //                     }
  //                     this.apiService
  //                       .getAllUsers()
  //                       .pipe(take(1))
  //                       .subscribe((users) => {
  //                         for (let u = 0; u < users.length; u++) {
  //                           if (
  //                             tasks[s].userId === users[u].id &&
  //                             users[u].name.toLowerCase().trim().includes(inputValue)
  //                           ) {
  //                             // this.allTasks.push(tasks[s]);
  //                             // console.log('this.allTasks', this.allTasks);
  //                             // this.tasks$.next(this.allTasks);
  //                           }
  //                         }
  //                       });
  //                   }
  //                 });
  //             }
  //           });
  //       }
  //     });
  // }
}
