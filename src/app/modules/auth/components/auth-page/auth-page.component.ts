import { Component, ViewChild } from '@angular/core';

import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  @ViewChild('loginForm') loginForm!: LoginFormComponent;

  @ViewChild('signupForm') signupForm!: SignupFormComponent;

  public isLoginForm = true;

  public changeForm(): void {
    this.isLoginForm = !this.isLoginForm;

    this.loginForm.loginForm.reset();
    this.signupForm.signupForm.reset();
  }
}
