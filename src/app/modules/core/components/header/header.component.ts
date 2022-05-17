import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BoardPopupService } from 'src/app/modules/core/services/board-popup.service';

import { LangModel } from '../../models/lang.model';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isNavOpen = false;

  public lang: LangModel = 'ru';

  public result = '';

  constructor(
    private translocoService: TranslocoService,
    private boardPopupService: BoardPopupService,
    private router: Router,
    private searchService: SearchService,
  ) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }

  public openBoardPopup(): void {
    this.boardPopupService.open('create');
  }

  public getSearchResult(): void {
    console.log('result', this.result);
    if (this.result.trim() !== '') {
      // this.searchService.getSearchTask(this.result.toLocaleLowerCase().trim());
      this.router.navigate(['/search']);
      this.result = '';
      this.searchService.tasks$.pipe(take(1)).subscribe((data) => {
        console.log('data', data);
      });
    }
  }
}
