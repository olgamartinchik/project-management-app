import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/constants/validation.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';

import { FormMessagesModel } from '../../models/signup-form.component.models';
import { SIGNUP_MESSAGES } from '../../constants/signup-form.component.constants';

import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  @Output() submitingForm = new EventEmitter<void>();

  signupForm!: FormGroup;

  public messages: FormMessagesModel = SIGNUP_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private validationService: ValidationService,
    public errorService: ErrorMessagesService,
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

  public submit(): void {
    const data = {
      name: this.signupForm.controls['name'].value,
      login: this.signupForm.controls['login'].value,
      password: this.signupForm.controls['password'].value,
    };

    this.apiService
      .singup(data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.submitingForm.emit();
        },
        error: (err) => {
          this.signupForm.setErrors({ formError: err.error.message }, { emitEvent: true });
        },
      });
  }
}
