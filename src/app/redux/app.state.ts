import { routerReducer } from '@ngrx/router-store';
import { boardReducer } from './reducers/board.reducer';

export const appState = {
  boardState: boardReducer,
  router: routerReducer,
};
