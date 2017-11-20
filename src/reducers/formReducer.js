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

const isValidform = errors => _.size(errors) > 0 ? false : true;

const initailizeForm = (formName) => {
  return {
    name: formName, 
    pristine: true, 
    formValidate: null, 
    remoteValidate: null, 
    fieldValidates: {},
    errors: {}, 
    values: {},
    validForm: true,
  }
}

export default function formReducer(state={}, action){
  const { type, payload } = action;
  if (type === 'onchange'){
    const { formName, fieldName, value, blured } = payload;
    const form = state[formName];
    const error = validateField(value, form.fieldValidates[fieldName]);
    const values = { ...form.values, [fieldName]: value };
    const touched = { ...form.touched, [fieldName]: true };
    if (!error) {
      delete form.errors[fieldName];
    }
    const errors = error ? { ...form.errors, [fieldName]: error } : { ...form.errors };
    if (!blured){
      return { ...state, [formName]: { ...form, pristine: false, values, touched, validForm: isValidform(errors) } };
    }
    return { ...state, [formName]: { ...form, pristine: false, values, touched, errors, validForm: isValidform(errors) } };
  }
  else if (type === 'onsubmit'){
    const { formName } = payload;
    const form = state[formName];
    return { ...state, [formName]: { ...form, errors: validateForm(form.values, form.fieldValidates) }, pristine: false };
  }
  else if (type === 'onload'){
    const { formName, validate, remoteValidate } = payload;
    console.log("on Load......")
    let form = {};
    if (!state[formName]) {
      form = initailizeForm(formName);
    }
    else {
      form = { ...state[formName]};
    }
    const validForm = (_.size(form.fieldValidates) > 0 || validate) ? false : true;
    return { ...state, 
      [formName]: { ...form, pristine: true, formValidate: validate, remoteValidate, validForm }};
  }
  else if (type === 'onloadField'){
    console.log("on Load fieled ......", payload)
    const { formName, fieldName, validates } = payload;
    let form = {};
    if (!state[formName]) {
      form = initailizeForm(formName);
    }
    else {
      form = { ...state[formName]};
    }
    const fieldValidates = (validates) ? 
      { ...form.fieldValidates, [fieldName]: validates } : { ...form.fieldValidates };
    return { ...state, [formName]: { ...form, fieldValidates }};
  }
  else return state;
}

