import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board.actions';
import { initialBoardState } from '../state.model';

export const boardReducer = createReducer(
  initialBoardState,

  on(BoardActions.setBoards, (state, { boards }) => {
    return { ...state, boards };
  }),

  on(BoardActions.updateAllBoards, (state) => {
    return { ...state };
  }),

  on(BoardActions.updateBoard, (state, { board }) => {
    let boards = [...state.boards];

    if (state.boards.length === 0) {
      boards.push(board);
    } else {
      boards = state.boards.map((el) => (el.id === board.id ? board : el));
    }

    return { ...state, boards };
  }),
);
