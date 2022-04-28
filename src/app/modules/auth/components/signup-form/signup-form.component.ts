import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/services/validation/validate.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';
import { FormMessagesModel, SIGNUP_MESSAGES } from './signup-form.components.messages';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  public messages: FormMessagesModel = SIGNUP_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
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
            this.validation.validatePasswordStrong,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.validation.validatePasswordMatch },
    );
  }

  public submit(): void {
    console.log(this.signupForm.value);
  }
}
