import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';

import { LangModel } from '../../models/lang.model';
import { SearchService } from '../../services/search.service';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isNavOpen = false;

  public lang: LangModel = 'ru';

  public inputValue = '';

  constructor(
    public authService: AuthService,
    private translocoService: TranslocoService,
    private boardPopupService: BoardPopupService,
    private router: Router,
    private searchService: SearchService,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.usersService.initAllUsers();
    if (this.authService.getItem('searchResult')) {
      this.searchService.initSearchTask(this.authService.getItem('searchResult')!);
    }
  }

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }

  public openBoardPopup(): void {
    this.boardPopupService.open('create');
  }

  public getSearchResult(): void {
    if (this.inputValue.trim() !== '') {
      this.router.navigate(['/search']);
      this.authService.saveSearchResult(this.inputValue);
      this.searchService.initSearchTask(this.inputValue.toLocaleLowerCase().trim());

      this.inputValue = '';
    }
  }
}
