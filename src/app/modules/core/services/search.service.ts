import { ITask } from './../models/ITask.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public tasks$ = new BehaviorSubject<ITask[] | null>([]);

  public isSearchResult$ = new Subject();

  private allTasks: ITask[] = [];

  constructor(private apiService: ApiService) {}

  public getSearchTask(inputValue: string): void {
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
                    tasks.forEach((task) => {
                      if (
                        task.title.toLowerCase().trim().includes(inputValue) ||
                        task.description.toLowerCase().trim().includes(inputValue) ||
                        task.order!.toString().trim().includes(inputValue)
                      ) {
                        this.allTasks.push(task);
                        this.tasks$.next(this.allTasks);
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
                              this.tasks$.next(this.allTasks);
                            }
                          });
                          if (this.allTasks.length === 0) {
                            this.isSearchResult$.next(true);
                          } else {
                            this.isSearchResult$.next(false);
                          }
                        });
                    });
                  });
              });
            });
        });
      });
  }
}
