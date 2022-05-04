import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { ValidationService } from '../core/services/validation/validation.service';
import { ErrorMessagesService } from '../core/services/error-messages/error-messages.service';

import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
  providers: [ErrorMessagesService, ValidationService],
})
export class AuthModule {}
