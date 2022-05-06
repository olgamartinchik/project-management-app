import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBoardState } from '../state.model';

export const selectState = createFeatureSelector<IBoardState>('boardState');

export const boardsSelect = createSelector(selectState, (state: IBoardState) => state.boards);

export const boardByIdSelect = createSelector(selectState, (state: IBoardState) => state.boardById);
