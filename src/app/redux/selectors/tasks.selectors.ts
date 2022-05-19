import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksModelState } from '../state.model';

export const selectState = createFeatureSelector<TasksModelState>('tasksState');
export const taskSelect = createSelector(selectState, (state: TasksModelState) => state.task);
