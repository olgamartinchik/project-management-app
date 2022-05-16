import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { ReduxModule } from '../../redux/redux.module';

// services
import { LoaderService } from './services/loader.service';
import { ToggleScrollService } from './services/toggle-scroll.service';
import { ErrorMessagesService } from './services/error-messages.service';
import { INTERCEPTOR_PROVIDERS } from './interсeptors/providers';

// components
import { HeaderComponent } from './components/header/header.component';
import { BoardPopupComponent } from './components/board-popup/board-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PopupContainerComponent } from './components/popup-container/popup-container.component';

// directive
import { PopupHostDirective } from './directives/popup-host.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BoardPopupComponent,
    ConfirmPopupComponent,
    LoaderComponent,
    PopupHostDirective,
    PopupContainerComponent,
  ],
  exports: [HeaderComponent, FooterComponent, BoardPopupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslocoRootModule,
    ReduxModule,
  ],
  providers: [INTERCEPTOR_PROVIDERS, LoaderService, ErrorMessagesService, ToggleScrollService],
})
export class CoreModule {}
