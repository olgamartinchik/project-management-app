import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modules
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

//services
import { LoaderService } from './services/loader.service';
import { ToggleScrollService } from './services/toggle-scroll.service';
import { ErrorMessagesService } from './services/error-messages/error-messages.service';
import { INTERCEPTOR_PROVIDERS } from './interсeptors/providers';

//components
import { HeaderComponent } from './components/header/header.component';
import { BoardPopupComponent } from './components/board-popup/board-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { FooterComponent } from './components/footer/footer.component';

import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BoardPopupComponent,
    ConfirmPopupComponent,
    LoaderComponent,
  ],
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
  providers: [INTERCEPTOR_PROVIDERS, LoaderService, ErrorMessagesService, ToggleScrollService],
})
export class CoreModule {}
