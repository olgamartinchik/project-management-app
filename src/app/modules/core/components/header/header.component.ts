import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardService } from 'src/app/modules/core/services/board.service';

import { LangModel } from '../../models/lang.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public lang: LangModel = 'ru';

  public loginIn: boolean = true;

  constructor(
    private translocoService: TranslocoService,
    private boardService: BoardService,
    public authService: AuthService,
  ) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang!);
  }

  public openPopupCreateBoard(): void {
    this.boardService.isBoardPopup$.next(true);
    this.translocoService.setActiveLang(this.lang);
  }

  public logout(): void {
    this.authService.logOut();
  }
}
