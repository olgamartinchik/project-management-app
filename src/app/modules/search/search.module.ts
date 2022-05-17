import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './componetns/search-page/search.component';
import { SearchTaskComponent } from './componetns/search-task/search-task.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

@NgModule({
  declarations: [SearchComponent, SearchTaskComponent],
  imports: [CommonModule, SearchRoutingModule, TranslocoRootModule],
})
export class SearchModule {}
