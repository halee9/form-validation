
export default function formReducer(state={}, action){
  const { type, payload } = action;
  if (type === 'onchange'){
    const { formName, fieldName, value, validates, touched } = payload;
    const form = state[formName];
    // console.log("state: ", form);
    const values = { ...form.values, [fieldName]: value };
    const touches = { ...form.touched, [fieldName]: true };

    if (!touched){
      return { ...state, [formName]: { ...form, pristine: false, values, touched } };
    }

    let errors = {};
    if (validates){
      let err = '';
      for (let i=0; i<validates.length; i++){
        err = validates[i](value);
        if (typeof err !== 'undefined' && err !== ''){
          break; 
        }
      }
      errors = { ...form.errors, [fieldName]: err };
    }
    else if (form.formValidate){
      const errs = form.formValidate({ [fieldName]: value });
      errors = { ...form.errors, [fieldName]: errs[fieldName]};
    }
    return { ...state, [formName]: { ...form, pristine: false, values, touched: touches, errors } };
  }
  else if (type === 'onsubmit'){
    const { formName } = payload;
    const form = state[formName];
    let errorCount = Object.keys(form.errors).filter(field => (form.errors[field])).length;
    if (errorCount > 0){
      return state;
    }
    let errors = {};
    if (form.formValidate){
      errors = form.formValidate(form.values);
      errorCount = Object.keys(errors).filter(field => (errors[field])).length;
      if (errorCount > 0){
        return { ...state, [formName]: { ...form, pristine: false, errors } };
      }
    }
    // alert(form.values);
    return state;
  }
  else if (type === 'onload'){
    const { formName, validate, remoteValidate } = payload;
    return { ...state, [formName]: 
      { name: formName, pristine: true, formValidate: validate, remoteValidate: remoteValidate, errors: {}, values: {} }};
  }
  else return state;
}

