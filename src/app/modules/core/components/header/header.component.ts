import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isNavOpen = false;

  isRuLang: boolean = true;

  constructor(private translocoService: TranslocoService) {}

  switchLang() {
    if (this.isRuLang) {
      this.translocoService.setActiveLang('en');
      this.isRuLang = false;
    } else {
      this.translocoService.setActiveLang('ru');
      this.isRuLang = true;
    }
  }
}
