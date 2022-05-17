import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './componetns/search-page/search.component';
import { SearchTaskComponent } from './componetns/search-task/search-task.component';

@NgModule({
  declarations: [SearchComponent, SearchTaskComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
