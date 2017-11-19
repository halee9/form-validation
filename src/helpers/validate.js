export const required = value => (value ? '' : 'Required');
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : '';
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : '';
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : '';
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : '';
const emailForm = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : '';
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : '';
const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : '';

export const username = value => required(value) || minLength(2)(value) || maxLength(10)(value);
export const email = value => required(value) || emailForm(value);
