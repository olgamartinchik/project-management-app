import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  @ViewChild('loginForm') private loginForm!: LoginFormComponent;

  @ViewChild('signupForm') private signupForm!: SignupFormComponent;

  public isSignupForm = false;

  public changeForm(): void {
    this.isSignupForm = !this.isSignupForm;
  }

  public resetForms(): void {
    this.loginForm.resetForm();
    this.signupForm.resetForm();
  }
}
