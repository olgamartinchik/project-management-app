import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './component/board-component/board.component';

import { SharedModule } from '../shared/shared.module';
import { ColumnContainerComponent } from './component/column-container/column-container.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './component/task/task.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { ErrorMessagesService } from '../core/services/error-messages/error-messages.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [BoardComponent, ColumnContainerComponent, TaskComponent, NewTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardRoutingModule,
    SharedModule,
    TranslocoRootModule,
  ],
  providers: [ErrorMessagesService, TaskService],
})
export class BoardModule {}
