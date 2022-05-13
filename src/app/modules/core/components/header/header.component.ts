import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';

import { LangModel } from '../../models/lang.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isNavOpen = false;

  public lang: LangModel = 'ru';

  constructor(
    private translocoService: TranslocoService,
    private boardPopupService: BoardPopupService,
  ) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }

  public openBoardPopup(): void {
    this.boardPopupService.open('create');
  }
}
