import { BoardModel } from '../modules/core/models/board.model';

export interface BoardModelState {
  boards: BoardModel[];
  boardById: BoardModel;
  idBoard: string;
  error: Error | null;
}

export const initialBoardState: BoardModelState = {
  boards: [],
  boardById: {} as BoardModel,
  idBoard: '',
  error: null,
};

export interface IAppState {
  boardState: BoardModelState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
};
