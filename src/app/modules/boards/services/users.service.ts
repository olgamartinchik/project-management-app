import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { getUsers } from 'src/app/redux/actions/user.actions';

import { IAppState } from 'src/app/redux/state.model';

import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store<IAppState>, private apiService: ApiService) {}

  public getAllUsers(): void {
    this.apiService
      .getAllUsers()
      .pipe()
      .subscribe((users) => {
        console.log('users', users);
        this.store.dispatch(getUsers({ users }));
      });
  }
}
