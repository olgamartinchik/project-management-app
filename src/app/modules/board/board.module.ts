import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './component/board-component/board.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnContainerComponent } from './component/column-container/column-container.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './component/task/task.component';

@NgModule({
  declarations: [BoardComponent, ColumnContainerComponent, TaskComponent],
  imports: [CommonModule, FormsModule, BoardRoutingModule, SharedModule, TranslocoRootModule],
})
export class BoardModule {}
