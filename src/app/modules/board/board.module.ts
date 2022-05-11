import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [BoardComponent, ColumnComponent],
  imports: [CommonModule, BoardRoutingModule, TranslocoRootModule],
})
export class BoardModule {}
