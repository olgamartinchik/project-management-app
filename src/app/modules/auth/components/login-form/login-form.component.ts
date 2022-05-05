import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/constants/validation.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';

import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';

import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef,
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
          this.validationService.validatePasswordStrong,
        ],
      ],
    });
  }

  public reset(): void {
    this.loginForm.reset();
    this.cdr.markForCheck();
  }

  public submit(): void {
    this.apiService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/main'], { replaceUrl: true });
        },
        error: (err: string) => {
          this.handleApiError(err);
        },
      });
  }

  private handleApiError(errText: string): void {
    this.errorService.setFormError(this.loginForm, errText, this.messages['api']);
    this.cdr.markForCheck();
  }
}
