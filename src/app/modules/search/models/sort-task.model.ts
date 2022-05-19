export type TFilter = {
  isUpperOrder: boolean;
  isUpperTitle: boolean;
  isDone: boolean;
  sortFlag: string;
};
export enum FilterMarker {
  orderFlag = 'order',
  titleFlag = 'title',
  doneFlag = 'done',
}
