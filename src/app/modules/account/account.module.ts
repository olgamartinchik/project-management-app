import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

// components
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

// services
import { ValidationService } from '../core/services/validation.service';
import { ErrorMessagesService } from '../core/services/error-messages.service';

@NgModule({
  declarations: [EditFormComponent, ProfileComponent, AccountPageComponent],
  imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule, TranslocoRootModule],
  providers: [ValidationService, ErrorMessagesService],
})
export class AccountModule {}
