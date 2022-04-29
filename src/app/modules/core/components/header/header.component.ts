import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardService } from 'src/app/modules/core/services/boards/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isNavOpen = false;

  public lang: string = 'ru';

  constructor(private translocoService: TranslocoService, private boardService: BoardService) {}

  public switchLang() {
    this.translocoService.setActiveLang(this.lang!);
  }

  public openPopupCreateBoard() {
    this.boardService.isBoardPopup$.next(true);
  }
}
