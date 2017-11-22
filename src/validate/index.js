export const required = value => (value ? '' : 'Required');
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : '';
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : '';
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : '';
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : '';
export const maxValue = max => value =>
  value && value > max ? `Must be at most ${max}` : '';
export const emailForm = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : '';
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : '';
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : '';

export const username = value => required(value) || minLength(2)(value) || maxLength(10)(value);
export const email = value => required(value) || emailForm(value);
