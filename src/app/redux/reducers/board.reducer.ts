import * as BoardActions from '../actions/board.actions';
import { createReducer, on } from '@ngrx/store';
import { initialBoardState } from '../state.model';

export const boardReducer = createReducer(
  initialBoardState,

  on(BoardActions.setBoards, (state, { boards }) => {
    return { ...state, boards };
  }),

  on(BoardActions.updateAllBoards, (state) => {
    return { ...state };
  }),

  on(BoardActions.setBoardColumns, (state, { board }) => {
    const boards = state.boards.map((el) => (el.id === board.id ? board : el));

    return { ...state, boards };
  }),

  on(BoardActions.addNewColumn, (state, { column }) => {
    console.log(state, column);

    return { ...state };
  }),
);
