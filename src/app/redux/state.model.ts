import { IBoard } from '../modules/core/models/IBoard.model';

export interface IBoardState {
  boards: IBoard[];
  boardById: IBoard;
  idBoard: string;
  error: Error | null;
}

export const initialBoardState: IBoardState = {
  boards: [],
  boardById: {} as IBoard,
  idBoard: '',
  error: null,
};

export interface IAppState {
  boardState: IBoardState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
};
