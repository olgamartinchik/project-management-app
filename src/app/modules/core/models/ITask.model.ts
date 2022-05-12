import { IFiles } from './IFiles.model';

export interface ITasks {
  id: string;
  title: string;
  order: 1;
  done: false;
  description: string;
  userId: string;
  files: IFiles;
}
