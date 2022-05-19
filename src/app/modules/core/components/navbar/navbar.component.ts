import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public isNavOpen = false;

  public isPopupOpen = false;

  public inputValue = '';

  constructor(
    public authService: AuthService,
    private searchService: SearchService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    if (this.authService.getItem('searchResult')) {
      this.searchService.initSearchTask(this.authService.getItem('searchResult')!);
    }
  }

  public openPopupOutput(): void {
    this.isNavOpen = false;
    this.isPopupOpen = !this.isPopupOpen;
  }

  public getSearchResult(): void {
    if (this.inputValue.trim() !== '') {
      this.router.navigate(['/search']);
      this.authService.saveSearchResult(this.inputValue);
      this.searchService.initSearchTask(this.inputValue.toLocaleLowerCase().trim());

      this.inputValue = '';
      this.isNavOpen = false;
    }
  }
}
