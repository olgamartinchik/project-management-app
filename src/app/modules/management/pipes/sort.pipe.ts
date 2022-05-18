/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Pipe, PipeTransform } from '@angular/core';
import { BoardModel } from '../../core/models/board.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(boardsList: BoardModel[], isUpBtn: boolean, isDownBtn: boolean): any {
    if (isUpBtn) {
      const copyBoardsList = [...boardsList];
      return copyBoardsList.sort((a: { title: string }, b: { title: string }) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    }
    if (isDownBtn) {
      const copyBoardsList = [...boardsList];
      return copyBoardsList.sort((a: { title: string }, b: { title: string }) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    }

    return boardsList;
  }
}
