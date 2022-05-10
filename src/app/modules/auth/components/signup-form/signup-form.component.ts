import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/constants/validation.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';

import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { FORM_ERROR_MESSAGES } from '../../constants/error-messages.constants';

import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  @Output() public submitForm = new EventEmitter<void>();

  public signupForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef,
    public errorMessagesService: ErrorMessagesService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(CORRECT_CHAR),
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
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
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.validationService.validatePasswordMatch },
    );
  }

  public reset(): void {
    this.signupForm.reset();
    this.cdr.markForCheck();
  }

  public submit(): void {
    const data = {
      name: this.signupForm.controls['name'].value,
      login: this.signupForm.controls['login'].value,
      password: this.signupForm.controls['password'].value,
    };

    this.apiService
      .singup(data)
      .pipe(
        take(1),
        map((userData) => {
          this.authService.saveUserId(userData.id);
        }),
      )
      .subscribe({
        next: () => {
          this.submitForm.emit();
          this.reset();
        },
        error: (err: string) => {
          this.handleApiError(err);
        },
      });
  }

  private handleApiError(errText: string): void {
    this.errorMessagesService.setFormError(this.signupForm, errText, this.messages['api']);
    this.cdr.markForCheck();
  }
}
