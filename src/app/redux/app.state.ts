import { userReducer } from './reducers/users.reduser';
import { routerReducer } from '@ngrx/router-store';
import { boardReducer } from './reducers/board.reducer';

export const appState = {
  boardState: boardReducer,
  usersState: userReducer,
  router: routerReducer,
};
