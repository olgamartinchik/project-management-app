//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//services
import { ConfirmService } from './services/confirm.service';
import { ToggleScrollService } from './services/toggle-scroll.service';
import { INTERCEPTOR_PROVIDERS } from './interсeptors/providers';

//components
import { BoardPopupComponent } from './components/board-popup/board-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BoardPopupComponent, ConfirmPopupComponent],
  exports: [HeaderComponent, FooterComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslocoRootModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [INTERCEPTOR_PROVIDERS, ConfirmService, ToggleScrollService],
})
export class CoreModule {}
