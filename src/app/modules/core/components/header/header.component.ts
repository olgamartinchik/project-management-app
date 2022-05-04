import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isNavOpen = false;

  public disabled = true;

  public lang: string = 'ru';

  constructor(private translocoService: TranslocoService) {}

  public switchLang() {
    this.translocoService.setActiveLang(this.lang!);
  }
}
