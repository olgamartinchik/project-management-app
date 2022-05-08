import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';

import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { ValidationService } from '../core/services/validation/validation.service';
import { ErrorMessagesService } from '../core/services/error-messages/error-messages.service';

@NgModule({
  declarations: [EditFormComponent, ProfileComponent, AccountPageComponent],
  imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule, TranslocoRootModule],
  providers: [ValidationService, ErrorMessagesService],
})
export class AccountModule {}
