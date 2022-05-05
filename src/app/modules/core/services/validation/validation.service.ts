import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { PASSWORD_REGEXP } from '../../constants/validation.service.constants';

@Injectable()
export class ValidationService {
  public validatePasswordStrong({ value }: AbstractControl): ValidationErrors | null {
    const errors: string[] = [];

    if (value === null) return null;

    // проверяем value по каждому параметру
    // при наличии ошибки, добавляем ее в массив
    if (!(value.length >= 8 && value.length <= 20)) {
      errors.push('passwordErrors.length');
    }

    if (!PASSWORD_REGEXP.uppercase.test(value) || !PASSWORD_REGEXP.lowercase.test(value)) {
      errors.push('passwordErrors.bothCase');
    }

    if (!PASSWORD_REGEXP.digit.test(value)) {
      errors.push('passwordErrors.number');
    }

    if (!PASSWORD_REGEXP.specialChar.test(value)) {
      errors.push('passwordErrors.specialChar');
    }

    // при наличии ошибок, возвращаем объект ValidationErrors, иначе null
    if (errors.length > 0) {
      return { weakPasswordErrors: errors };
    }

    return null;
  }

  public validatePasswordMatch({ value }: AbstractControl): ValidationErrors | null {
    if (value.password === value.confirmPassword) {
      return null;
    }

    return { passwordMatch: true };
  }
}
