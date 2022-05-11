import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BoardModelState } from '../state.model';

export const selectState = createFeatureSelector<BoardModelState>('boardState');

export const boardsSelect = createSelector(selectState, (state: BoardModelState) => state.boards);

export const boardByIdSelect = createSelector(
  selectState,
  (state: BoardModelState) => state.boardById,
);

export const idBoard = createSelector(selectState, (state: BoardModelState) => state.idBoard);
