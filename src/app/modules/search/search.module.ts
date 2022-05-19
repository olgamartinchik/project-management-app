import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './componetns/search-page/search.component';
import { SearchTaskComponent } from './componetns/search-task/search-task.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { SortTaskComponent } from './componetns/sort-task/sort-task.component';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SortService } from './services/sort.service';

@NgModule({
  declarations: [SearchComponent, SearchTaskComponent, SortTaskComponent],
  imports: [CommonModule, SearchRoutingModule, TranslocoRootModule, SharedModule],
  providers: [SortService],
})
export class SearchModule {}
