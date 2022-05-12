import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BoardRoutingModule } from './board-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

// components
import { BoardComponent } from '../boards/components/board/board.component';
import { ColumnComponent } from '../boards/components/column/column.component';
import { ColumnPopupComponent } from './components/column-popup/column-popup.component';

// services
import { BoardService } from './services/board.service';

@NgModule({
  declarations: [BoardComponent, ColumnComponent, ColumnPopupComponent],
  imports: [CommonModule, BoardRoutingModule, TranslocoRootModule, ReactiveFormsModule],
  providers: [BoardService],
})
export class BoardModule {}
