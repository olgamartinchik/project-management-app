import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

// components
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardCardComponent } from './components/board-card/board-card.component';

@NgModule({
  declarations: [MainPageComponent, BoardCardComponent],
  imports: [CommonModule, ManagementRoutingModule, TranslocoRootModule],
})
export class ManagementModule {}
