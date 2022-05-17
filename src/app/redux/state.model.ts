import { BoardModel } from '../modules/core/models/board.model';

export interface BoardModelState {
  boards: BoardModel[];
}

export const initialBoardState: BoardModelState = {
  boards: [],
};

export interface IAppState {
  boardState: BoardModelState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
};
