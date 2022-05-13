import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './component/board-component/board.component';

import { SharedModule } from '../shared/shared.module';
import { ColumnContainerComponent } from './component/column-container/column-container.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './component/task/task.component';

import { ErrorMessagesService } from '../core/services/error-messages/error-messages.service';
import { TaskService } from './services/task.service';
import { EditTaskPopupComponent } from './component/edit-task-popup/edit-task-popup.component';
import { NewTaskPopupComponent } from './component/new-task/new-task-popup.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnContainerComponent,
    TaskComponent,
    NewTaskPopupComponent,
    EditTaskPopupComponent,
  ],
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
