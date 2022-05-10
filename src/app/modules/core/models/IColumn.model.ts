import { ITask } from './ITask.model';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
  tasks?: ITask[];
}
