import { IFiles } from './IFiles.model';

export interface ITask {
  id?: string;
  title: string;
  done?: false;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files?: IFiles;
}
