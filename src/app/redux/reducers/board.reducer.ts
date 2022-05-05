import * as BoardActions from '../actions/board.actions';
import { createReducer, on } from '@ngrx/store';
import { initialBoardState } from '../state.model';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.setBoards, (state, { boards }) => {
    return { ...state, boards };
  }),
  on(BoardActions.getBoardById, (state, { boardById }) => {
    return { ...state, boardById };
  }),
  on(BoardActions.updateAllBoards, (state) => {
    return { ...state };
  }),
  on(BoardActions.getBoardsFailed, (state, { error }) => {
    return { ...state, error };
  }),
);
