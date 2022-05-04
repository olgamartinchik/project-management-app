import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardService } from 'src/app/modules/core/services/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isNavOpen = false;

  public lang: string = 'ru';

  constructor(private translocoService: TranslocoService, private boardService: BoardService) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang!);
  }

  public openPopupCreateBoard(): void {
    this.boardService.isBoardPopup$.next(true);
  }
}
