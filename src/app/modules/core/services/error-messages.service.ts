import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessageModel, PasswordMessagesModel } from '../models/error-messages.services.models';

@Injectable()
export class ErrorMessagesService {
  public showMessages(form: FormGroup, name: string, messages: MessageModel): string {
    const control = form.controls[name];
    // если в input вводили данные и есть ошибка, то получаем название этой ошибки
    const error = control.dirty && control.errors && Object.keys(control.errors)[0];
    let message = '';

    // если есть ошибка, то ищем совпадение в messages и возвращаем нужное сообщение
    if (error) {
      message = messages[error] || 'commonErrors.unknown';
    }

    return message;
  }

  public showPasswordErrors(
    form: FormGroup,
    name: string,
    messages: MessageModel,
  ): PasswordMessagesModel {
    const result: PasswordMessagesModel = { main: '', recommendations: [] };
    // вызываем метод showMessages и присваиваем свойству main текст основной ошибки
    result.main = this.showMessages(form, name, messages);
    const control = form.controls[name];

    // если ошибка в слабом пароле, то в recommendations передаем ошибку, которая является массивом строк
    if (result.main === 'passwordErrors.weak') {
      result.recommendations = control.errors && control.errors['weakPasswordErrors'];
    }

    return result;
  }

  public showPasswordMatchMessage(form: FormGroup): string {
    if (form.controls['confirmPassword'].dirty && form.errors && form.errors['passwordMatch']) {
      return 'passwordErrors.mismatch';
    }

    return '';
  }

  public setFormError(form: FormGroup, errText: string, messages: MessageModel): void {
    const error = messages[errText.toLowerCase()] || 'commonErrors.unknown';

    form.setErrors({ formError: error });
  }
}
