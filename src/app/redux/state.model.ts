import { UserModel } from './../modules/core/models/user.model';
import { BoardModel } from '../modules/core/models/board.model';
import { ITask } from '../modules/core/models/ITask.model';

export interface BoardModelState {
  boards: BoardModel[];
}

export const initialBoardState: BoardModelState = {
  boards: [],
};
export interface TasksModelState {
  task: ITask;
}
export const initialTasksModalState: TasksModelState = {
  task: {
    title: '',
    done: false,
    order: 1,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
  },
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
  tasksState: TasksModelState;
}
export const initialAppState: IAppState = {
  boardState: initialBoardState,
  usersState: initialUsersModalState,
  tasksState: initialTasksModalState,
};
