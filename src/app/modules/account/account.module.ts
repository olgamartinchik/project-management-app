import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

@NgModule({
  declarations: [EditFormComponent, ProfileComponent, AccountPageComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
