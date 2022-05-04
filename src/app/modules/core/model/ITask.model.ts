export interface ITask {
  id?: string;
  title?: string;
  order?: number;
  description?: string;
  userId?: ITaskUserId;
  boardId?: ITaskBoardId;
  columnId?: string;
}
interface ITaskBoardId {
  description: string;
}
interface ITaskUserId {
  description: string;
}
