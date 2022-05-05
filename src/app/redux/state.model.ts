import { IBoard } from '../modules/management/model/IBoard.model';

export interface IBoardState {
  boards: IBoard[];
  boardById: IBoard | {};
}

export const initialBoardState: IBoardState = {
  boards: [],
  boardById: {},
};

export interface IAppState {
  boardState: IBoardState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
};
