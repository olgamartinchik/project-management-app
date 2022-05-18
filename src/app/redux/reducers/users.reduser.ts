import { createReducer, on } from '@ngrx/store';
import * as UserAction from '../actions/user.actions';
import { initialUsersModalState } from '../state.model';

export const userReducer = createReducer(
  initialUsersModalState,
  on(UserAction.getUsers, (state, { users }) => {
    return { ...state, users };
  }),
);
