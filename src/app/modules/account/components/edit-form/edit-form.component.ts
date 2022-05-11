import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';

//services
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ValidationService } from '../../../core/services/validation/validation.service';
import { ErrorMessagesService } from '../../../core/services/error-messages/error-messages.service';

// models
import { FormMessagesModel } from '../../../core/models/error-messages.services.models';
import { UserModel } from '../../../core/models/api.service.models';

// constants
import { CORRECT_CHAR } from '../../../core/constants/validation.service.constants';
import { FORM_ERROR_MESSAGES } from '../../../core/constants/error-messages.constants';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent implements OnInit {
  @Input() public currentUser!: UserModel;

  @Output() public submitForm = new EventEmitter<void>();

  public editUserForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public errorMessagesService: ErrorMessagesService,
  ) {}

  public ngOnInit(): void {
    this.editUserForm = this.fb.group(
      {
        name: [
          this.currentUser.name,
          [
            Validators.required,
            Validators.pattern(CORRECT_CHAR),
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        login: [
          this.currentUser.login,
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
    const userData = {
      name: this.editUserForm.controls['name'].value,
      login: this.editUserForm.controls['login'].value,
      password: this.editUserForm.controls['password'].value,
    };

    this.apiService
      .editUser(this.authService.getItem('userId')!, userData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.resetForm();
          this.submitForm.emit();
        },
        error: (err: string) => {
          this.handleApiError(err);
        },
      });
  }

  private handleApiError(errText: string): void {
    this.errorMessagesService.setFormError(this.editUserForm, errText, this.messages['api']);
    this.cdr.markForCheck();
  }

  private resetForm(): void {
    this.editUserForm.get('password')?.reset();
    this.editUserForm.get('confirmPassword')?.reset();
    this.editUserForm.markAsPristine();
  }
}
