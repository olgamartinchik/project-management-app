import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [BoardPageComponent, ColumnComponent],
  imports: [CommonModule, BoardRoutingModule, TranslocoRootModule],
})
export class BoardModule {}
