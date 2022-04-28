import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isNavOpen = false;

  lang?: string;

  constructor(private translocoService: TranslocoService) {}

  switchLang() {
    this.translocoService.setActiveLang(this.lang!);
  }
}
