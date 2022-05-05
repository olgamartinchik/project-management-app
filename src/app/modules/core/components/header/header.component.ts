import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { LangModel } from '../../models/lang.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isNavOpen = false;

  public disabled = true;

  public lang: LangModel = 'ru';

  constructor(private translocoService: TranslocoService) {}

  public switchLang(): void {
    this.translocoService.setActiveLang(this.lang);
  }
}
