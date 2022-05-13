import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

// services
import { ApiService } from '../../../core/services/api.service';
import { ValidationService } from '../../../core/services/validation/validation.service';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';

//models
import { FormMessagesModel } from '../../../core/models/error-messages.services.models';

// constants
import { CORRECT_CHAR } from '../../../core/constants/validation.service.constants';
import { FORM_ERROR_MESSAGES } from '../../../core/constants/error-messages.constants';

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
            Validators.maxLength(20),
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

  public resetForm(): void {
    this.signupForm.reset();
    this.cdr.markForCheck();
  }

  public submit(): void {
    const userData = {
      name: this.signupForm.controls['name'].value,
      login: this.signupForm.controls['login'].value,
      password: this.signupForm.controls['password'].value,
    };

    this.apiService
      .singup(userData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.submitForm.emit();
          this.resetForm();
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
