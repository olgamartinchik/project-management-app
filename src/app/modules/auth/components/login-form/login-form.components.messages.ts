import { MessageModel } from '../../../core/services/error-messages/error-messages.services.models';

export interface FormMessagesModel {
  loginMessages: MessageModel;
  passwordMessages: MessageModel;
}

export const LOGIN_MESSAGES: FormMessagesModel = {
  loginMessages: {
    required: 'Please enter a login',
    minlength: 'The login is too short',
    maxlength: 'The login is too long',
    pattern: 'Use only latin letters, numbers and special characters',
  },
  passwordMessages: {
    required: 'Please enter a password',
    pattern: 'Use only latin letters, numbers and special characters',
    weakPasswordErrors: "Your password isn't strong enough",
  },
};
