import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ColumnContainerComponent } from './component/column-container/column-container.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from './component/board-component/board.component';

@NgModule({
  declarations: [BoardComponent, ColumnContainerComponent],
  imports: [CommonModule, FormsModule, BoardRoutingModule, SharedModule, TranslocoRootModule],
})
export class BoardModule {}
