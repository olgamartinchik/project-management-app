import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnContainerComponent } from './component/column-container/column-container.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

@NgModule({
  declarations: [BoardComponent, ColumnContainerComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule, TranslocoRootModule],
})
export class BoardModule {}
