import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/services/validation/validate.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';
import { FormMessagesModel, LOGIN_MESSAGES } from './login-form.components.messages';

import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public messages: FormMessagesModel = LOGIN_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private validation: ValidationService,
    private router: Router,
    public errorService: ErrorMessagesService,
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.pattern(CORRECT_CHAR),
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(CORRECT_CHAR),
          this.validation.validatePasswordStrong,
        ],
      ],
    });
  }

  public submit(): void {
    this.api
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/main'], { replaceUrl: true });
        },
        error: (err) => {
          this.loginForm.setErrors({ formError: err.error.message }, { emitEvent: true });
        },
      });
  }
}
