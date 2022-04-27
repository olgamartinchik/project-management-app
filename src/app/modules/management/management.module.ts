import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { MainComponent } from './components/main/main.component';
import { MainPageComponent } from './page/main-page/main-page.component';

@NgModule({
  declarations: [MainComponent, MainPageComponent],
  exports: [MainComponent],
  imports: [CommonModule, ManagementRoutingModule],
})
export class ManagementModule {}
