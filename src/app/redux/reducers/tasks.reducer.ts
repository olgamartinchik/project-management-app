import { createReducer, on } from '@ngrx/store';
import * as TasksActions from '../actions/tasks.actions';
import { initialTasksModalState } from '../state.model';

export const tasksReducer = createReducer(
  initialTasksModalState,
  on(TasksActions.setTask, (state, { task }) => {
    return { ...state, task };
  }),
);
