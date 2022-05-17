import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// imports
import { ManagementRoutingModule } from './management-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { SharedModule } from '../shared/shared.module';

// components
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
  declarations: [MainPageComponent, BoardCardComponent, WelcomePageComponent, ErrorPageComponent],
  imports: [CommonModule, ManagementRoutingModule, TranslocoRootModule, SharedModule],
})
export class ManagementModule {}
