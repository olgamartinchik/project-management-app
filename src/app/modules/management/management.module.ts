import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { MainComponent } from './components/main/main.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { ColumnComponent } from './components/column/column.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MainComponent, MainPageComponent, ColumnComponent],
  exports: [MainComponent],
  imports: [CommonModule, ManagementRoutingModule, DragDropModule],
})
export class ManagementModule {}
