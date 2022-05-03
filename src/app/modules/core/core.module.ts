import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INTERCEPTOR_PROVIDERS } from './interсeptors/providers';
import { BoardPopupComponent } from './components/board-popup/board-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { HttpService } from './services/http.service';
import { ConfirmService } from './services/confirm.service';
import { ToggleScrollService } from './services/toggle-scroll.service';

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
  ],
  providers: [INTERCEPTOR_PROVIDERS, HttpService, ConfirmService, ToggleScrollService],
})
export class CoreModule {}
