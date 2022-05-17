import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { UsersService } from 'src/app/modules/core/services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor(public searchService: SearchService, private usersService: UsersService) {}
}
