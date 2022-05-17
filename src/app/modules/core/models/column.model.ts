import { ITasks } from './ITask.model';

export interface ColumnModel {
  id?: string;
  title: string;
  order: number;
  tasks?: ITasks[];
}
