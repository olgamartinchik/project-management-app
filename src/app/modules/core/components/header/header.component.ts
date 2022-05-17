import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';

import { LangModel } from '../../models/lang.model';
import { SearchService } from '../../services/search.service';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isNavOpen = false;

  public lang: LangModel = 'ru';

  public inputValue = '';

  constructor(
    private translocoService: TranslocoService,
    private boardPopupService: BoardPopupService,
    private router: Router,
    private searchService: SearchService,
    private usersService: UsersService,
  ) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }

  public openBoardPopup(): void {
    this.boardPopupService.open('create');
  }

  public getSearchResult(): void {
    if (this.inputValue.trim() !== '') {
      // this.searchService.getSearchTask(this.inputValue.toLocaleLowerCase().trim());
      this.router.navigate(['/search']);
      this.inputValue = '';

      this.usersService.getAllUsers();

      this.searchService.getData(this.inputValue.toLocaleLowerCase().trim());
    }
  }
}
