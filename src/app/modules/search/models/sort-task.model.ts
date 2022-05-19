export type TFilter = {
  isUpperOrder: boolean;
  isUpperTitle: boolean;
  sortFlag: string;
};
export enum FilterMarker {
  orderFlag = 'order',
  titleFlag = 'title',
}
