import React, { Component } from 'react';
import { connect } from 'react-redux';

import withForm from './helpers/withForm';
import { onChange, onSubmit } from './actions/formAction';
import { username, email, required } from './helpers/validate';

import Field from './components/Field';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  
  return errors
}

class FormValidateFormLevel extends Component {
  render() {
    const { handleSubmit, formName } = this.props;
    console.log(this.props);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name= 'username'
            label= 'UserName: '
          />
          <Field
            name= 'email'
            label= 'Email: '
          />
          <button type="submit">Submit</button>
        </form>      
      </div>
    );
  }
}

export default withForm({ formName: "form1", validate: validate })(FormValidateFormLevel);
