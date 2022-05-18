import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { UsersService } from 'src/app/modules/core/services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public searchService: SearchService,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    if (this.authService.getItem('searchResult') !== null) {
      this.searchService.getSearchTask(this.authService.getItem('searchResult')!);
    }
  }
}
