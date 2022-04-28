import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { PASSWORD_REGEXP } from './validate.service.constants';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  public validatePasswordStrong({ value }: AbstractControl): ValidationErrors | null {
    const errors: string[] = [];

    // проверяем value по каждому параметру
    // при наличии ошибки, добавляем ее в массив
    if (!(value.length >= 8 && value.length <= 20)) {
      errors.push('at least 8 and maximum 20 characters');
    }

    if (!PASSWORD_REGEXP.uppercase.test(value) || !PASSWORD_REGEXP.lowercase.test(value)) {
      errors.push('a mixture of both uppercase and lowercase letters');
    }

    if (!PASSWORD_REGEXP.digit.test(value)) {
      errors.push('a mixture of letters and numbers');
    }

    if (!PASSWORD_REGEXP.specialChar.test(value)) {
      errors.push('inclusion of at least one special character, e.g., !@#?]');
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
