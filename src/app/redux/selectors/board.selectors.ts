import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from './route.selectors';

import { BoardModelState } from '../state.model';
import { BoardModel } from 'src/app/modules/core/models/board.model';

export const selectState = createFeatureSelector<BoardModelState>('boardState');

export const boardsSelect = createSelector(selectState, (state: BoardModelState) => state.boards);

export const selectBoardById = createSelector(
  boardsSelect,
  selectRouteParams,
  (boards: BoardModel[], { id }) => boards.find((el) => el.id === id)!,
);
