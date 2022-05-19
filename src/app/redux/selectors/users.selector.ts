import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersModelState } from '../state.model';

export const selectState = createFeatureSelector<UsersModelState>('usersState');
export const usersSelect = createSelector(selectState, (state: UsersModelState) => state.users);
