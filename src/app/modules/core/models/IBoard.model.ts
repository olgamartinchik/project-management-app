import { IColumn } from './IColumn.model';

export interface IBoard {
  id?: string;
  title: string;
  description?: string;
  columns?: IColumn[];
}
