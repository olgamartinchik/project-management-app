import { IColumn } from './IColumn.model';

export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[];
}
