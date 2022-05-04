import { FormMessagesModel } from '../models/signup-form.component.models';

export const SIGNUP_MESSAGES: FormMessagesModel = {
  nameMessages: {
    required: 'Please enter a name',
    minlength: 'The name is too short',
    maxlength: 'The name is too long',
    pattern: 'Use only latin letters, numbers and special characters',
  },
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
