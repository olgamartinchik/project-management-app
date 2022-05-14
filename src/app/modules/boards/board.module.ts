import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { BoardRoutingModule } from './board-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { SharedModule } from '../shared/shared.module';

// components
import { BoardComponent } from '../boards/components/board/board.component';
import { ColumnComponent } from '../boards/components/column/column.component';
import { ColumnPopupComponent } from './components/column-popup/column-popup.component';

// services
import { BoardService } from './services/board.service';
import { ColumnService } from './services/column.service';
import { ErrorMessagesService } from '../core/services/error-messages/error-messages.service';
import { NewTaskPopupComponent } from './components/new-task/new-task-popup.component';
import { TaskComponent } from './components/task/task.component';
import { EditTaskPopupComponent } from './components/edit-task-popup/edit-task-popup.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ColumnPopupComponent,
    NewTaskPopupComponent,
    TaskComponent,
    EditTaskPopupComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [BoardService, ColumnService, ErrorMessagesService],
})
export class BoardModule {}
