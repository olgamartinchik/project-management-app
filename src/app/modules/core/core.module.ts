import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { CatchErrorInterceptor } from './interceptors/catch-error.interceptor';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, TranslocoRootModule, FormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true }],
})
export class CoreModule {}
