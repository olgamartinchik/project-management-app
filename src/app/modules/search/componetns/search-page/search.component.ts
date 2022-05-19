import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor(public searchService: SearchService, public sortService: SortService) {}
}
