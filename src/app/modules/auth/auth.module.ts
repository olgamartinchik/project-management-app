import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

// components
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

// services
import { ValidationService } from '../core/services/validation.service';
import { ErrorMessagesService } from '../core/services/error-messages.service';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule, TranslocoRootModule],
  providers: [ErrorMessagesService, ValidationService],
})
export class AuthModule {}
