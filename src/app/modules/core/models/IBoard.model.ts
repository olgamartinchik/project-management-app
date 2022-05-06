export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[];
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITasks[];
}
export interface ITasks {
  id: string;
  title: string;
  order: 1;
  done: false;
  description: string;
  userId: string;
  files: IFiles;
}
export interface IFiles {
  filename: string;
  fileSize: number;
}
