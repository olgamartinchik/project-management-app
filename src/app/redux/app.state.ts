import { userReducer } from './reducers/users.reduser';
import { routerReducer } from '@ngrx/router-store';
import { boardReducer } from './reducers/board.reducer';
import { tasksReducer } from './reducers/tasks.reducer';

export const appState = {
  boardState: boardReducer,
  usersState: userReducer,
  tasksState: tasksReducer,
  router: routerReducer,
};
