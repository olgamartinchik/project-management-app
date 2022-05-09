import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

// components
import { MainComponent } from './components/main/main.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { BoardCardComponent } from './components/board-card/board-card.component';

@NgModule({
  declarations: [MainComponent, MainPageComponent, BoardCardComponent],
  exports: [MainComponent],
  imports: [CommonModule, ManagementRoutingModule, TranslocoRootModule],
})
export class ManagementModule {}
