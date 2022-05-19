import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

import { LangModel } from '../../models/lang.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isNavOpen = false;

  public lang: LangModel = 'ru';

  constructor(
    public authService: AuthService,
    private translocoService: TranslocoService,
    private boardPopupService: BoardPopupService,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.usersService.initAllUsers();
  }

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }

  public openBoardPopup(): void {
    this.boardPopupService.open('create');
  }
}
