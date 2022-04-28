import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { INTERCEPTOR_PROVIDERS } from './interсeptors/providers';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslocoRootModule,
    FormsModule,
  ],
  providers: [INTERCEPTOR_PROVIDERS],
})
export class CoreModule {}
