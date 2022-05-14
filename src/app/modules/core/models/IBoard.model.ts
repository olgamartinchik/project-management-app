import { ColumnModel } from './column.model';

export interface IBoard {
  id?: string;
  title: string;
  description?: string;
  columns?: ColumnModel[];
}
