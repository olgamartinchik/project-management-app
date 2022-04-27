import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TranslocoRootModule } from 'src/app/modules/transloco-root.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule,TranslocoRootModule],
  exports: [MainComponent],
})
export class MainModule {}
