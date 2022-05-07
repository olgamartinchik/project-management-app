import * as BoardActions from '../actions/board.actions';
import { createReducer, on } from '@ngrx/store';
import { initialBoardState } from '../state.model';

export const boardReducer = createReducer(
  initialBoardState,
  //all boards
  on(BoardActions.setBoards, (state, { boards }) => {
    return { ...state, boards };
  }),
  on(BoardActions.updateAllBoards, (state) => {
    return { ...state };
  }),
  on(BoardActions.getBoardsFailed, (state, { error }) => {
    return { ...state, error };
  }),

  //board by id
  on(BoardActions.getBoardById, (state, { boardById }) => {
    return { ...state, boardById };
  }),

  on(BoardActions.setBoardById, (state, { idBoard }) => {
    return { ...state, idBoard };
  }),
  on(BoardActions.getBoardByIdFailed, (state, { error }) => {
    return { ...state, error };
  }),
  on(BoardActions.updateBoard, (state) => {
    return { ...state };
  }),
);
