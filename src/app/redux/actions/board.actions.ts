import { createAction, props } from '@ngrx/store';
import { IBoard } from 'src/app/modules/core/models/IBoard.model';

export const setBoards = createAction('[MAIN PAGE] GET ALL BOARDS', props<{ boards: IBoard[] }>());

export const getBoardById = createAction(
  '[BOARD DATA] GET  BOARD BY ID',
  props<{ boardById: IBoard }>(),
);

export const updateAllBoards = createAction('[UPDATE BOARDS] GET ALL BOARDS');

export const getBoardsFailed = createAction(
  '[BOARDS EFFECT]  FETCHED BOARDS WAS FAILED',
  props<{ error: Error }>(),
);
