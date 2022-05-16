import { UserModel } from './../modules/core/models/user.model';
import { BoardModel } from '../modules/core/models/board.model';

export interface BoardModelState {
  boards: BoardModel[];
}

export const initialBoardState: BoardModelState = {
  boards: [],
};
export interface UsersModelState {
  users: UserModel[];
}
export const initialUsersModalState: UsersModelState = {
  users: [],
};
export interface IAppState {
  boardState: BoardModelState;
  usersState: UsersModelState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
  usersState: initialUsersModalState,
};
