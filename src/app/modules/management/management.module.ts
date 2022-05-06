import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { MainComponent } from './components/main/main.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { WelcomePageComponent } from './page/welcome-page/welcome-page.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';

@NgModule({
  declarations: [
    MainComponent,
    MainPageComponent,
    BoardCardComponent,
    WelcomePageComponent,
    ErrorPageComponent,
  ],
  exports: [MainComponent],
  imports: [CommonModule, ManagementRoutingModule, TranslocoRootModule],
})
export class ManagementModule {}
