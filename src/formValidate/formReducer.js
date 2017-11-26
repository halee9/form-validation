import _ from 'lodash';

const validateField = (value, validates) => {
  if (_.isArray(validates)){
    for (let i=0; i<validates.length; i++){
      const error = validates[i](value);
      if (error) return error;
    }
    return false;
  }
  return false;
}

const validateForm = (values, fieldValidates) => {
  return _.reduce(fieldValidates, (acc, validates, key) => {
    const value = values[key];
    let error = validateField(value, validates)
    if (error) acc[key] = error;
    return acc;
  }, {});
}

const isValidform = valids => {
  const falsy = _.filter(valids, item => !item).length;
  return falsy > 0 ? false : true; 
}

const initailizeForm = (formName) => {
  return {
    name: formName, 
    pristine: {}, 
    formValidate: null, 
    remoteValidate: null, 
    fieldValidates: {},
    errors: {}, 
    values: {},
    validForm: true,
    valids: {},
  }
}

export function formReducer(state={}, action){
  const { type, payload } = action;
  if (type === 'onchange'){
    const { formName, fieldName, value, blured } = payload;
    const form = state[formName];
    const error = validateField(value, form.fieldValidates[fieldName]);
    if (!value) {
      delete form.values[fieldName];
    }
    const values = value ? { ...form.values, [fieldName]: value } : { ...form.values };
    const touched = { ...form.touched, [fieldName]: true };
    const valids = { ...form.valids, [fieldName]: false };
    if (!error) {
      delete form.errors[fieldName];
      valids[fieldName] = true;
    }
    const errors = error ? { ...form.errors, [fieldName]: error } : { ...form.errors };
    if (!blured){
      return { ...state, [formName]: { ...form, pristine: false, values, touched, validForm: isValidform(valids), valids } };
    }
    return { ...state, [formName]: { ...form, pristine: false, values, touched, errors, validForm: isValidform(valids), valids } };
  }
  else if (type === 'onsubmit'){
    const { formName } = payload;
    const form = state[formName];
    return { ...state, [formName]: { ...form, errors: validateForm(form.values, form.fieldValidates) }, pristine: false };
  }
  else if (type === 'onload'){
    const { formName, validate, remoteValidate } = payload;
    // console.log("on Load......")
    let form = {};
    if (!state[formName]) {
      form = initailizeForm(formName);
    }
    else {
      form = { ...state[formName]};
    }
    const validForm = (_.size(form.fieldValidates) > 0 || validate) ? false : true;
    return { ...state, 
      [formName]: { ...form, formValidate: validate, remoteValidate, validForm }};
  }
  else if (type === 'onloadField'){
    // console.log("on Load fieled ......", payload)
    const { formName, fieldName, validates, initValue=undefined } = payload;
    let form = {};
    if (!state[formName]) {
      form = initailizeForm(formName);
    }
    else {
      form = { ...state[formName]};
    }
    const fieldValidates = (validates) ? 
      { ...form.fieldValidates, [fieldName]: validates } : { ...form.fieldValidates };
    const valids = (validates) ? 
      { ...form.valids, [fieldName]: false } : { ...form.valids, [fieldName]: true };
    const values = initValue ? { ...form.values, [fieldName]: initValue } : { ...form.values };
    const pristine = { ...form.pristine, [fieldName]: true };
      return { ...state, [formName]: { ...form, fieldValidates, values, pristine, valids }};
  }
  else return state;
}

