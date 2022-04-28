import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../../../core/services/validation/validation.service';
import { CORRECT_CHAR } from '../../../core/services/validation/validate.service.constants';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';
import { FormMessagesModel, LOGIN_MESSAGES } from './login-form.components.messages';

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
    private validation: ValidationService,
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
    console.log(this.loginForm.value);
  }
}
