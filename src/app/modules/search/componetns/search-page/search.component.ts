import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { UsersService } from 'src/app/modules/core/services/users.service';
import { SortService } from '../../services/sort.service';

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
    public sortService: SortService,
  ) {}

  public ngOnInit(): void {
    if (this.authService.getItem('searchResult') !== null) {
      this.searchService.initSearchTask(this.authService.getItem('searchResult')!);
    }
  }
}
