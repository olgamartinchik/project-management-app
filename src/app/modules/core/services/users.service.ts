import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { getUsers } from 'src/app/redux/actions/user.actions';
import { usersSelect } from 'src/app/redux/selectors/users.selector';

import { IAppState } from 'src/app/redux/state.model';
import { UserModel } from '../models/user.model';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: Observable<UserModel[]> = this.store.select(usersSelect);

  public userName!: string;

  constructor(private store: Store<IAppState>, private apiService: ApiService) {}

  public initAllUsers(): void {
    this.apiService
      .getAllUsers()
      .pipe()
      .subscribe((users) => {
        this.store.dispatch(getUsers({ users }));
      });
  }

  public getUserName(userId: string): string {
    this.users
      .pipe(
        take(1),
        map((users) => users.find((user) => user.id === userId)),
      )
      .subscribe((user) => {
        this.userName = user?.name!;
      });
    return this.userName;
  }
}
