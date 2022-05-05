import { IBoard } from '../modules/management/model/IBoard.model';

export interface IBoardState {
  boards: IBoard[];
  boardById: IBoard | {};
  error: Error | null;
}

export const initialBoardState: IBoardState = {
  boards: [],
  boardById: {},
  error: null,
};

export interface IAppState {
  boardState: IBoardState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
};
