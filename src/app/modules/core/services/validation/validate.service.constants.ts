export const PASSWORD_REGEXP = {
  uppercase: /(?=.*[A-Z])/,
  lowercase: /(?=.*[a-z])/,
  digit: /(?=.*\d)/,
  specialChar: /(?=.*[!@#$%^&*?[\]-_():;])/,
};

export const CORRECT_CHAR = /^[\da-zA-Z!@#$%^&*?[\]-_():;]*$/;
