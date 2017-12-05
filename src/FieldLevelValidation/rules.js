import _ from 'lodash';

export const required = value => {
  if (_.isArray(value)){
    return value.length < 1 ? 'Required' : undefined;
  }
  return (value ? undefined : 'Required');
}
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const maxValue = max => value =>
  value && value > max ? `Must be at most ${max}` : undefined;
export const emailForm = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const username = value => required(value) || minLength(2)(value) || maxLength(10)(value);
export const email = value => required(value) || emailForm(value);
