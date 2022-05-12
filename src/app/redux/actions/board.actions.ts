import { createAction, props } from '@ngrx/store';

import { BoardModel } from 'src/app/modules/core/models/board.model';
import { ColumnModel } from '../../modules/core/models/column.model';

export const setBoards = createAction(
  '[MAIN PAGE] GET ALL BOARDS',
  props<{ boards: BoardModel[] }>(),
);

export const getBoardById = createAction(
  '[BOARD DATA] GET BOARD BY ID',
  props<{ board: BoardModel }>(),
);
export const getBoardByIdFailed = createAction(
  '[BOARD DATA EFFECT] FETCHED BOARD BY ID WAS FAILED',
  props<{ error: Error }>(),
);

export const setBoardById = createAction('[SET BOARD ID] SET ID', props<{ idBoard: string }>());

export const updateAllBoards = createAction('[UPDATE BOARDS] GET ALL BOARDS');

export const getBoardsFailed = createAction(
  '[BOARDS EFFECT] FETCHED BOARDS WAS FAILED',
  props<{ error: Error }>(),
);

export const setBoardColumns = createAction(
  '[BOARD CARD] SET BOARD COLUMNS',
  props<{ board: BoardModel }>(),
);

export const addNewColumn = createAction(
  '[COLUMN POPUP] ADD NEW COLUMN',
  props<{ column: ColumnModel }>(),
);
