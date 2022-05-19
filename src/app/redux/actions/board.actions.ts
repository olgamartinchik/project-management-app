import { createAction, props } from '@ngrx/store';

import { BoardModel } from 'src/app/modules/core/models/board.model';

export const setBoards = createAction(
  '[MAIN PAGE] GET ALL BOARDS',
  props<{ boards: BoardModel[] }>(),
);

export const updateAllBoards = createAction('[UPDATE BOARDS] GET ALL BOARDS');

export const updateBoard = createAction(
  '[BOARD CARD] SET BOARD COLUMNS',
  props<{ board: BoardModel }>(),
);
