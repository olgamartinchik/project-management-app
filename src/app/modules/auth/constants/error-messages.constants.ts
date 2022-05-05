import { FormMessagesModel } from '../../core/models/error-messages.services.models';

export const FORM_ERROR_MESSAGES: FormMessagesModel = {
  name: {
    required: 'nameErrors.required',
    minlength: 'nameErrors.minlength',
    maxlength: 'nameErrors.maxlength',
    pattern: 'commonErrors.pattern',
  },
  login: {
    required: 'loginErrors.required',
    minlength: 'loginErrors.minlength',
    maxlength: 'loginErrors.maxlength',
    pattern: 'commonErrors.pattern',
  },
  password: {
    required: 'passwordErrors.required',
    weakPasswordErrors: 'passwordErrors.weak',
    pattern: 'commonErrors.pattern',
  },
  api: {
    forbidden: 'apiErrors.forbidden',
    conflict: 'apiErrors.conflict',
  },
};
